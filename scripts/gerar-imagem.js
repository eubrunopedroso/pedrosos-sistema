// Serviço único de geração de imagens do PedrosOS.
// Usado pela skill /carrossel (foto de capa, foto interna) e por qualquer
// skill futura que precise de foto — é o único lugar que fala com o provedor.
//
// Ordem de provedor: Gemini (Nano Banana 2) → OpenAI (gpt-image-1) →
// Pollinations/FLUX (grátis, sem chave):
//   1. Gemini é bem mais barato por imagem em qualidade equivalente, e a
//      qualidade do Nano Banana 2 é competitiva. Se a chave não tiver
//      crédito (erro 429 RESOURCE_EXHAUSTED), cai pro OpenAI sozinho —
//      não precisa mexer no código depois de recarregar o pré-pagamento
//   2. OpenAI gpt-image-1 é o fallback pago de melhor qualidade
//   3. Pollinations é o último fallback, sem chave nenhuma
//
// Trocar de provedor no futuro = mexer só nas funções `chamarGemini`,
// `chamarOpenAI`, `montarUrl` e `chamarProvedor` abaixo. O resto do
// arquivo (retry, proporções, batch, CLI) não muda.
//
// API programática:
//   gerarImagem(prompt, outputPath, opcoes?)   -> uma imagem
//   gerarImagens(prompt, outputPath, opcoes?)  -> várias (opcoes.quantidade)
//   PROPORCOES                                  -> presets de largura/altura
//
// CLI (rodar com --env-file=.env pra carregar a chave da OpenAI):
//   node --env-file=.env scripts/gerar-imagem.js "prompt em inglês" "saida.jpg" \
//     [--proporcao=feed|quadrado|stories|paisagem] \
//     [--largura=N] [--altura=N] [--quantidade=N] [--seed=N]
//
//   Compatível com a forma antiga (posicional): "prompt" "saida.jpg" 1080 1350

const fs = require('fs');
const path = require('path');

// Formatos que o /carrossel usa. Se o Instagram mudar de proporção um dia,
// muda só aqui — a skill inteira acompanha.
const PROPORCOES = {
  feed: { width: 1080, height: 1350 }, // Instagram/TikTok feed, 4:5 — padrão do /carrossel
  quadrado: { width: 1080, height: 1080 }, // post único quadrado
  stories: { width: 1080, height: 1920 }, // Stories/Reels/TikTok, 9:16
  paisagem: { width: 1350, height: 1080 }, // thumbnail horizontal, capa de blog
};

const MODELOS_EM_ORDEM = ['flux', 'turbo']; // fallback Pollinations: se flux falhar, tenta turbo
const TENTATIVAS_POR_MODELO = 2;
const TENTATIVAS_OPENAI = 2;
const TENTATIVAS_GEMINI = 2;
const ESPERA_ENTRE_TENTATIVAS_MS = 600;
const GEMINI_MODELO = 'gemini-3.1-flash-image'; // "Nano Banana 2" — melhor custo/qualidade da família

// Proporções que o Nano Banana 2 aceita de verdade (doc do Gemini API).
// Mapeia largura/altura pedidas pro valor mais próximo — não precisa bater
// pixel a pixel, o resultado entra como background-image com cover.
const RAZOES_GEMINI = { '1:1': 1, '4:5': 0.8, '5:4': 1.25, '3:4': 0.75, '4:3': 1.333, '9:16': 0.5625, '16:9': 1.7778, '2:3': 0.6667, '3:2': 1.5 };
function resolverAspectRatioGemini({ width, height }) {
  const alvo = width / height;
  let melhor = '1:1';
  let menorDiff = Infinity;
  for (const [razao, valor] of Object.entries(RAZOES_GEMINI)) {
    const diff = Math.abs(valor - alvo);
    if (diff < menorDiff) {
      menorDiff = diff;
      melhor = razao;
    }
  }
  return melhor;
}

// gpt-image-1 só aceita esses 3 tamanhos (ou "auto"). Mapeia pela orientação
// do preset pedido — o resultado entra como background-image com cover no
// carrossel.html, então não precisa bater pixel a pixel.
function resolverTamanhoOpenAI({ width, height }) {
  if (width === height) return '1024x1024';
  return width > height ? '1536x1024' : '1024x1536';
}

function resolverDimensoes({ proporcao, width, height }) {
  if (proporcao) {
    const preset = PROPORCOES[proporcao];
    if (!preset) {
      throw new Error(`Proporção "${proporcao}" não existe. Use: ${Object.keys(PROPORCOES).join(', ')}`);
    }
    return preset;
  }
  return { width: width || 1024, height: height || 1024 };
}

function montarUrl(prompt, { width, height, model, seed }) {
  const base = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(prompt);
  const params = new URLSearchParams({
    width: String(width),
    height: String(height),
    model,
    nologo: 'true',
  });
  if (seed !== undefined) params.set('seed', String(seed));
  if (process.env.POLLINATIONS_API_KEY) params.set('key', process.env.POLLINATIONS_API_KEY);
  return `${base}?${params.toString()}`;
}

const aguardar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function chamarOpenAI(prompt, { width, height }) {
  const size = resolverTamanhoOpenAI({ width, height });
  let ultimoErro;

  for (let tentativa = 1; tentativa <= TENTATIVAS_OPENAI; tentativa++) {
    try {
      const resposta = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model: 'gpt-image-1', prompt, size, n: 1 }),
        signal: AbortSignal.timeout(90000),
      });

      if (!resposta.ok) {
        const corpo = await resposta.text().catch(() => '');
        throw new Error(`HTTP ${resposta.status} (tentativa: ${tentativa}) ${corpo.slice(0, 200)}`);
      }

      const json = await resposta.json();
      const b64 = json.data?.[0]?.b64_json;
      if (!b64) throw new Error('resposta sem imagem (b64_json ausente)');

      return { buffer: Buffer.from(b64, 'base64'), model: 'gpt-image-1' };
    } catch (erro) {
      ultimoErro = erro;
      console.error(`  ✗ gpt-image-1 (tentativa ${tentativa}/${TENTATIVAS_OPENAI}): ${erro.message}`);
      await aguardar(ESPERA_ENTRE_TENTATIVAS_MS * tentativa);
    }
  }
  throw ultimoErro;
}

async function chamarGemini(prompt, { width, height }) {
  const aspectRatio = resolverAspectRatioGemini({ width, height });
  let ultimoErro;

  for (let tentativa = 1; tentativa <= TENTATIVAS_GEMINI; tentativa++) {
    try {
      const resposta = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODELO}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { imageConfig: { aspectRatio } },
          }),
          signal: AbortSignal.timeout(90000),
        }
      );

      if (!resposta.ok) {
        const corpo = await resposta.text().catch(() => '');
        throw new Error(`HTTP ${resposta.status} (tentativa: ${tentativa}) ${corpo.slice(0, 200)}`);
      }

      const json = await resposta.json();
      const partes = json.candidates?.[0]?.content?.parts || [];
      const parteImagem = partes.find((p) => p.inlineData?.data || p.inline_data?.data);
      const b64 = parteImagem?.inlineData?.data || parteImagem?.inline_data?.data;
      if (!b64) throw new Error('resposta sem imagem (inlineData ausente)');

      return { buffer: Buffer.from(b64, 'base64'), model: GEMINI_MODELO };
    } catch (erro) {
      ultimoErro = erro;
      console.error(`  ✗ ${GEMINI_MODELO} (tentativa ${tentativa}/${TENTATIVAS_GEMINI}): ${erro.message}`);
      await aguardar(ESPERA_ENTRE_TENTATIVAS_MS * tentativa);
    }
  }
  throw ultimoErro;
}

async function chamarPollinations(prompt, { width, height, seed }) {
  let ultimoErro;
  for (const model of MODELOS_EM_ORDEM) {
    for (let tentativa = 1; tentativa <= TENTATIVAS_POR_MODELO; tentativa++) {
      try {
        const url = montarUrl(prompt, { width, height, model, seed });
        const resposta = await fetch(url, { signal: AbortSignal.timeout(60000) });

        if (!resposta.ok) {
          throw new Error(`HTTP ${resposta.status} (modelo: ${model}, tentativa: ${tentativa})`);
        }

        const buffer = Buffer.from(await resposta.arrayBuffer());
        if (buffer.length < 1000) {
          throw new Error(`resposta suspeita — só ${buffer.length} bytes (modelo: ${model})`);
        }

        return { buffer, model };
      } catch (erro) {
        ultimoErro = erro;
        console.error(`  ✗ ${model} (tentativa ${tentativa}/${TENTATIVAS_POR_MODELO}): ${erro.message}`);
        await aguardar(ESPERA_ENTRE_TENTATIVAS_MS * tentativa);
      }
    }
  }
  throw new Error(`Falhou em todos os modelos (${MODELOS_EM_ORDEM.join(', ')}). Último erro: ${ultimoErro.message}`);
}

async function chamarProvedor(prompt, { width, height, seed }) {
  if (process.env.GEMINI_API_KEY) {
    try {
      return await chamarGemini(prompt, { width, height });
    } catch (erro) {
      console.error(`  ⚠ Gemini falhou de vez (${erro.message}) — caindo pro próximo provedor`);
    }
  }
  if (process.env.OPENAI_API_KEY) {
    try {
      return await chamarOpenAI(prompt, { width, height });
    } catch (erro) {
      console.error(`  ⚠ OpenAI falhou de vez (${erro.message}) — caindo pro fallback Pollinations`);
    }
  }
  return chamarPollinations(prompt, { width, height, seed });
}

/** Gera uma imagem e salva em outputPath. Cria as pastas do caminho se precisar. */
async function gerarImagem(prompt, outputPath, options = {}) {
  const { width, height } = resolverDimensoes(options);
  const { buffer, model } = await chamarProvedor(prompt, { width, height, seed: options.seed });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buffer);

  return { outputPath, model, bytes: buffer.length, width, height };
}

function caminhoComSufixo(outputPath, indice) {
  const ext = path.extname(outputPath);
  const base = ext ? outputPath.slice(0, -ext.length) : outputPath;
  return `${base}-${String(indice).padStart(2, '0')}${ext}`;
}

/**
 * Gera 1 ou várias imagens do mesmo prompt (options.quantidade).
 * Pollinations não tem endpoint de lote — cada unidade é uma chamada própria,
 * em sequência, com seed diferente pra sair variação de verdade.
 * quantidade === 1 (padrão): retorna um objeto. quantidade > 1: retorna array.
 */
async function gerarImagens(prompt, outputPath, options = {}) {
  const quantidade = options.quantidade || 1;
  if (quantidade === 1) return gerarImagem(prompt, outputPath, options);

  const resultados = [];
  for (let i = 1; i <= quantidade; i++) {
    const destino = caminhoComSufixo(outputPath, i);
    const seed = options.seed !== undefined ? options.seed + i : Math.floor(Math.random() * 1_000_000);
    resultados.push(await gerarImagem(prompt, destino, { ...options, seed }));
  }
  return resultados;
}

module.exports = { gerarImagem, gerarImagens, PROPORCOES };

// --- CLI ---
if (require.main === module) {
  const args = process.argv.slice(2);
  const posicionais = args.filter((a) => !a.startsWith('--'));
  const flags = Object.fromEntries(
    args
      .filter((a) => a.startsWith('--'))
      .map((a) => {
        const [chave, valor] = a.slice(2).split('=');
        return [chave, valor ?? true];
      })
  );

  const [prompt, outputPath, larguraPosicional, alturaPosicional] = posicionais;

  if (!prompt || !outputPath) {
    console.error(
      'Uso: node gerar-imagem.js "PROMPT" "saida.jpg" [--proporcao=feed|quadrado|stories|paisagem] [--largura=N] [--altura=N] [--quantidade=N] [--seed=N]'
    );
    console.error(`Proporções disponíveis: ${Object.keys(PROPORCOES).join(', ')}`);
    process.exit(1);
  }

  const options = {
    proporcao: flags.proporcao,
    width: flags.largura ? Number(flags.largura) : larguraPosicional ? Number(larguraPosicional) : undefined,
    height: flags.altura ? Number(flags.altura) : alturaPosicional ? Number(alturaPosicional) : undefined,
    quantidade: flags.quantidade ? Number(flags.quantidade) : 1,
    seed: flags.seed ? Number(flags.seed) : undefined,
  };

  console.log(`Gerando: "${prompt}"${options.quantidade > 1 ? ` (${options.quantidade}x)` : ''}`);

  gerarImagens(prompt, outputPath, options)
    .then((resultado) => {
      const lista = Array.isArray(resultado) ? resultado : [resultado];
      for (const r of lista) {
        console.log(`✓ Salvo em ${r.outputPath} (modelo: ${r.model}, ${r.width}x${r.height}, ${(r.bytes / 1024).toFixed(0)} KB)`);
      }
    })
    .catch((erro) => {
      console.error(`✗ ${erro.message}`);
      process.exit(1);
    });
}
