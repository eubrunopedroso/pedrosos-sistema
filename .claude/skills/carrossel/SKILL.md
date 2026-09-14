---
name: carrossel
description: >
  Cria carrosséis e posts visuais pra Instagram, TikTok, LinkedIn com a identidade visual da marca.
  Gera HTML estilizado + renderiza em PNG 1080x1350 via Playwright, com legenda pronta no final.
  Suporta carrossel texto puro, carrossel com foto IA (via scripts/gerar-imagem.js —
  OpenAI gpt-image-1, com fallback grátis pro Pollinations.ai/FLUX) e post único.
  Use quando o usuário pedir "carrossel", "post", "conteúdo pro instagram", "criar imagem",
  "gerar foto", "post educativo", ou /carrossel.
---

# /carrossel — Carrossel e posts visuais

Skill central de criação de conteúdo visual. Pega um tema → entrega HTMLs estilizados + PNGs prontos pra postar + legenda no padrão da marca.

## Fora de escopo

O "cartão tipográfico" desta skill (kicker + título grande + régua, fundo
sólido) é pra **post/carrossel de feed**, não pra qualquer peça visual
pequena. **Não usar esta skill pra:**

- Ícone/capa de produto, badge de checkout, favicon, thumbnail pequeno —
  isso é imagem gerada por IA em estilo ícone/ilustração (via
  `scripts/gerar-imagem.js`), não texto sobre fundo sólido
- Qualquer peça onde o produto final é um **ícone/gráfico**, não um
  slide de conteúdo com texto pra ler

Se a peça pedida não é um post/carrossel de feed (Instagram/TikTok/
LinkedIn) com texto pra alguém ler rolando o dedo, provavelmente essa
skill é a ferramenta errada — parar e considerar geração de imagem IA
direta antes de montar HTML com o "Estilo visual base" abaixo.

## Dependências

- **Identidade visual: personalizada a cada carrossel, sem sistema fixo**
  (reaproveitar sempre a mesma paleta/tipografia/esqueleto é o que dá
  "cara de aluno de curso" — genérico e sem graça). Perguntar referência (print, conta,
  imagem) antes de cada peça nova, ou propor uma direção pensada
  especificamente pro tema e objetivo daquele post — nunca reaplicar por
  hábito a direção do carrossel anterior. O "Repertório visual" mais
  abaixo é caixa de ferramentas técnica (escala tipográfica, vocabulário
  de layout), não um look fixo pra carimbar em tudo
- **Contexto do negócio:** perguntar ao usuário — não fica em nota fixa do vault
- **Tom de voz:** perguntar ao usuário, ou seguir o que ele já escreveu na conversa
- **Playwright:** pra renderizar HTML em PNG (`npx playwright screenshot` ou via `render.js`)
- **`scripts/gerar-imagem.js`** (já instalado): gera fotos via **OpenAI gpt-image-1**
  (precisa de `OPENAI_API_KEY` no `.env` — pago por imagem, trocado do Pollinations em
  29/08/2026 por qualidade). Se a chave faltar ou a chamada falhar, cai sozinho pro
  fallback gratuito (Pollinations.ai/FLUX, sem chave). **Foto (IA ou passada pelo
  usuário) + texto em HTML é o padrão agora** (ver Tipo 1 abaixo) — texto puro só
  quando o conteúdo realmente não pedir nenhum apoio visual
- **Banco de modelos (opcional, uso pontual, não molde padrão):** se você
  tiver algum pack de referência de carrossel (comprado ou próprio),
  consultar só se travar e precisar de um empurrão de ideia — nunca como
  ponto de partida automático. Sem isso, cada carrossel escreve a própria
  estrutura do zero, pensada pro que quer dizer daquela vez
- **Outputs vão em:** `marketing/conteudo/<tipo>-<tema>-<YYYY-MM-DD>/`

---

## Tipos de conteúdo

Ao receber um pedido, identificar qual tipo se encaixa:

### 1. CARROSSEL COM FOTO (padrão)
- **Quando usar:** é o default agora — qualquer carrossel que tenha algo
  fotografável ou ilustrável por trás do tema
- **Formato:** 1080x1350 (4:5)
- **Estilo:** foto (IA via `scripts/gerar-imagem.js`, ou passada pelo usuário)
  como capa com gradient overlay + slides internos com foto ou apoio visual,
  texto sempre em HTML por cima (nunca escrito dentro da imagem gerada)
- **Direção visual:** pensada pra esse carrossel específico, não reaplicar
  a mesma paleta/composição de um post anterior por hábito

### 2. CARROSSEL TEXTO PURO (exceção)
- **Quando usar:** só quando o conteúdo genuinamente não pede nenhum apoio
  visual (lista rápida, dado solto) — perguntar antes de optar por esse
  em vez do padrão com foto
- **Formato:** 1080x1350 (4:5) — sempre
- **Estilo:** tipografia clean, sem fotos

### 3. POST ÚNICO
- **Quando usar:** frase de impacto, dado/estatística, depoimento, bastidores
- **Formato:** 1080x1350
- **Estilo:** varia conforme o conteúdo (citação, número grande, foto com overlay, ou layout `MANCHETE` — ver abaixo)

Se o tipo não estiver claro, perguntar:
> "Que tipo de conteúdo? (1) carrossel com foto (padrão), (2) carrossel texto puro, (3) post único"

### Estilo calmo/editorial vs. MANCHETE — escolher pelo objetivo do post

Os dois estilos convivem, não é upgrade um do outro:

- **Editorial calmo** (padrão desde sempre — tipografia clean, fundo sólido, ritmo alternado): pilares educativo, aquisição direta, autoridade — quando o objetivo é ensinar ou provar competência
- **`MANCHETE`** (layout novo, ver "Layouts nomeados"): quando o objetivo é **alcance/viral** — gancho amplo, sair da bolha. Puxa dos mesmos pilares de sempre (jornada, aquisição direta), só que com o hook fazendo o trabalho de parar o scroll, não a explicação

Se não estiver claro qual o objetivo do post, perguntar antes de escolher o layout.

---

## Repertório visual (ferramentas técnicas, não sistema fixo)

*(reframeado em 12/09/2026 — isto não é mais "o estilo padrão a aplicar
em todo carrossel". É a caixa de ferramentas técnica (escala tipográfica,
vocabulário de layout, truques de composição) pra usar quando fizer
sentido pra direção daquele carrossel específico, definida no Passo 1. O
erro antigo era carimbar sempre a mesma paleta/tipografia/layout em toda
peça — isso é o que estava deixando tudo com "cara de curso" e sem graça)*

Regras que continuam valendo sempre, qualquer que seja a direção
escolhida: sem clip-art, sem emoji decorativo, sem gradiente arco-íris,
sem template genérico de IA.

### Tipografia — referência técnica (nem sempre Inter)

- **Fonte:** Inter (Google Fonts), pesos 400/500/600/700/800/900
- **Título de capa:** 90-100px, weight 900, line-height 0.98, letter-spacing **-0.04em**
- **H2 (slides internos):** 60-72px, weight 800, line-height 1.04, letter-spacing **-0.035em**
- **Corpo:** 20-24px, weight 500, line-height 1.5
- **Eyebrow/kicker:** 13-16px, weight 700-800, **UPPERCASE**, letter-spacing **0.22-0.32em**, cor de destaque
- **Page counter (canto sup. dir.):** 14-16px, weight 500-600, letter-spacing 0.18em, cor muted
- **Meta/handle (@):** 15-18px, weight 600

Regra do tipo: títulos grandes com kerning **apertado** (-0.035em), eyebrows pequenos com kerning **aberto** (0.22em+). Esse contraste é o coração do estilo.

### Cores — exemplo que já funcionou, não obrigação

Paleta sóbria de exemplo, pra inspirar quando não houver referência
melhor: fundo dark + off-white + **UMA** cor de destaque. Nunca quatro
cores brigando entre si, seja qual for a paleta escolhida pra peça.

- Fundo escuro: `#0E1116` ou `#1A1A1A`
- Fundo claro alternativo: `#F5ECD7` (cream) ou `#FAFAF7`
- Texto sobre escuro: `#FAFAF7`
- Texto sobre claro: `#1A1A1A` (h2) e `#444` (corpo)
- Destaque: cor da marca (uma só)

### Elementos visuais recorrentes

- **Régua fina** (3-4px de altura, 60-80px de largura, cor de destaque) entre kicker e h2 ou como divisor
- **Logo top-left + page counter top-right** em todos os slides
- **Border-top 1px** `rgba(255,255,255,0.12)` separando rodapé do conteúdo (em slides escuros)
- **Stamps circulares** (200x200, border 3px translúcida, rotate -10deg) pra selos/datas/dados
- **Tags/pills** uppercase, padding generoso, kerning 0.2em, pra rotular categoria do slide
- Padding base: 70-100px nas laterais

### Layouts nomeados

Vocabulário de layout — cada slide tem um nome. Variar entre eles pra criar ritmo:

- **CAPA** — eyebrow + título grande + subtítulo + @handle. Fundo: foto com gradient overlay (`rgba(12,10,9,0.55)` → `rgba(12,10,9,0.85)`) OU sólido (escuro/claro/destaque)
- **SOLO** — split horizontal: foto à esquerda 50% + texto à direita 50% (kicker + h2 + régua + parágrafo)
- **DUO** — texto em cima (kicker + h2 + régua + p) + 2 fotos lado a lado embaixo (ou 1 foto larga)
- **NÚMERO** — numeral gigante (200-320px, weight 800, cor de destaque) como elemento gráfico + h2 + parágrafo de apoio
- **CITAÇÃO** — aspas grandes em watermark + frase em h2 + atribuição
- **CTA FINAL** — fundo na cor de destaque, logo centralizado, headline curta, botão/CTA, telefone/@handle
- **MANCHETE** — foto real/IA full-bleed + gradient escuro forte (`rgba(0,0,0,0.35)` no topo → `rgba(0,0,0,0.88)` embaixo) + frase de impacto gigante (64-84px, weight 900, line-height 1.05, letter-spacing -0.03em, branco), **1 trecho curto da frase destacado na sua cor de ação** (a mesma cor de botão — exceção deliberada à regra "cor de ação só em botão", porque aqui o destaque cumpre o mesmo papel de "chamar atenção pra uma coisa só"). Sem eyebrow, sem régua, sem ornamento — o hook é a peça inteira. Logo pequeno canto superior + seta "→" discreta no canto inferior (indica arrastar). Pensado pra etapa de alcance: gancho amplo, sem CTA de venda. Usar como CAPA de carrossel ou como POST ÚNICO — nunca em slide interno (o choque visual só funciona na primeira coisa que a pessoa vê)

**Ritmo de slide a slide:** alternar fundo escuro ↔ claro ↔ destaque. Nunca dois slides seguidos com o mesmo fundo.

---

## Padrão do carrossel

**Estrutura base (5 a 10 slides), como ponto de partida — adaptar à
direção definida no Passo 1, não copiar igual toda vez:**
- **Slide 1:** algo que cumpra o papel de capa/gancho (o layout `CAPA` do
  repertório é uma opção, não a única)
- **Slides internos:** variar composição pra criar ritmo, puxando do
  repertório (`SOLO`/`DUO`/`NÚMERO`/`CITAÇÃO`) só quando couberem na
  direção escolhida
- **Slide final:** CTA claro, coerente com a direção visual da peça

Antes de criar HTML: ter a direção visual definida no Passo 1 (referência
ou proposta própria) — nunca partir direto pro repertório técnico como se
fosse o default.

### Sequência de capas no feed (planejamento de grade)

Antes de definir a capa, considerar a **última capa publicada** pra alternar:
- claro → próxima é foto/escuro
- foto/escuro → próxima é cor da marca
- cor da marca → próxima é claro
- nunca duas capas iguais em sequência

Se o usuário não souber qual foi a última, perguntar.

### Linguagem (regra crítica)

Seguir o tom que o usuário passar (perguntar se não tiver ficado claro). Em geral: frases naturais, sem jargão de marketing, sem corporativês. O público real raramente fala "ticket médio", "performance", "B2B". Falar como o público-alvo fala.

**Escrever como se fosse o próprio usuário escrevendo** — primeira pessoa, direto, nunca com cara de texto gerado por IA. Evitar travessão (—) em texto de slide, título ou legenda quando o tom pedir mais informalidade — resolver pausa com ponto ou vírgula.

**Checklist Anti-Cara de IA** — rodar mentalmente antes de fechar o texto de qualquer slide:
- Nenhum termo de guru/genérico ("turbinar", "imperdível", "descubra o poder de...", "alavancar", "transformador")
- Nenhum dos sinais de estrutura robótica: emoji de enfeite, tríade automática ("qualidade, confiança e compromisso"), simetria robótica de frase, abstração em vez de cena concreta, encerramento de redação ("em resumo..."), pergunta morna de abertura, pontuação dramática em excesso, perfeição engessada

### Legenda — sempre gerar junto

Ao terminar de renderizar os PNGs, gerar **automaticamente** a legenda do post e salvar em `legenda.md` na mesma pasta. **Não esperar o usuário pedir.** Estrutura padrão:

1. Hook (pergunta ou afirmação)
2. Contexto (1-2 frases sobre o conteúdo)
3. CTA pra arrastar ("Arraste pro lado e confere")
4. Bloco de oferta (diferenciais da empresa, contato)
5. Hashtags (10-15 — público + nicho + local se aplicável)

---

## Workflow

### Passo 1 — Entender e planejar

1. Perguntar ao usuário o tom de voz e o contexto do negócio, se não tiver ficado claro na conversa
2. **Definir uma direção visual própria pra esse carrossel** — perguntar
   referência (print, conta, imagem) ou propor uma pensada pro tema e pro
   objetivo do post. Não reaplicar por hábito a paleta/composição de um
   carrossel anterior. O "Repertório visual" abaixo é ferramenta técnica de
   apoio (escala tipográfica, vocabulário de layout), não a direção pronta
3. Identificar o tipo de conteúdo (1, 2 ou 3) — foto é o padrão
4. Definir o tema e o ângulo

### Passo 2 — Texto

Escrever o conteúdo seguindo as regras de tom:

**Pra carrossel (5-10 slides):**
- Slide 1 (Capa): título impactante, máx 8 palavras. Oferecer 3 opções
- Slides internos: um insight por slide, frases naturais, sem bullet points
- Slide final: CTA + logo

**Pra post único:**
- Frase principal em destaque
- Contexto de apoio (se necessário)
- CTA sutil

**CHECKPOINT:** Mostrar o texto completo. Esperar aprovação antes do visual.

### Passo 3 — Gerar fotos (se tipo 1, o padrão)

Só se o usuário pediu carrossel com foto IA. Usa sempre `scripts/gerar-imagem.js`
(OpenAI gpt-image-1, com fallback automático pro Pollinations.ai/FLUX se faltar
chave ou a chamada falhar — já instalado). É o único módulo do PedrosOS que fala
com o provedor de imagem; nenhuma skill deve chamar a API direto.

🚨 **Antes de montar o prompt, se você tiver uma nota própria de
referência de fotografia/anti-slop, consultar ela primeiro** — é a fonte
mais confiável pro seu estilo. Sem uma nota própria ainda, seguir a
fórmula abaixo direto.

🚫 **Nunca usar um template genérico de prompt** (tipo `Professional
[TIPO] photography of… shallow depth of field… editorial quality`) — isso
é exatamente o que produz "cara de IA": luz vinda de todo lado, pele lisa
demais, simetria perfeita, fundo borrado igual em toda parte. Cada
informação específica no prompt **estreita** o resultado pra longe da
média genérica — é o mecanismo, não enfeite de prompt.

1. Montar prompt em inglês (a API funciona melhor em inglês)
2. Seguir a fórmula abaixo, nesta ordem:

```
[ASSUNTO específico: idade, traço, roupa com material/estado]
[AÇÃO em andamento — verbo, não pose]
[LUGAR específico, com um detalhe de textura/desordem]
[LENTE + ABERTURA]
[SETUP DE LUZ + de onde vem]
[MÍDIA/FILME + grão]
[PALETA + o que fica dessaturado]
[1 ou 2 IMPERFEIÇÕES]
[RESTRIÇÕES NEGATIVAS]
```

   **Se faltar informação concreta** (quem é a pessoa, onde exatamente,
   o que está acontecendo), **perguntar ao usuário antes de gerar** — não
   preencher com categoria genérica, que é o que produz slop. Mesmo
   princípio de cobrar referência antes de fazer site.

3. Gerar via script (sempre com `--env-file=.env`, pra carregar `OPENAI_API_KEY`) —
   usar sempre `--proporcao` em vez de largura/altura na mão, pra ficar amarrado ao
   formato oficial do post (se o formato do Instagram mudar um dia, muda uma vez em
   `PROPORCOES` dentro do script, não em cada chamada):
```bash
node --env-file=.env scripts/gerar-imagem.js "PROMPT" "marketing/conteudo/<pasta>/foto-<nome>.jpg" --proporcao=feed
```
   Pra TikTok/Stories (9:16): `--proporcao=stories`. Pra post único quadrado: `--proporcao=quadrado`.

   **Foto de capa com mais de uma opção:** quando fizer sentido oferecer variações
   (do jeito que já se oferece 3 opções de título), gerar em lote com `--quantidade`:
```bash
node --env-file=.env scripts/gerar-imagem.js "PROMPT" "marketing/conteudo/<pasta>/foto-capa.jpg" --proporcao=feed --quantidade=3
```
   Isso gera `foto-capa-01.jpg`, `foto-capa-02.jpg`, `foto-capa-03.jpg` — mostrar as
   três e deixar o usuário escolher.

   **Arquivo sempre sai `.jpg`** — é o formato que a API retorna. Não usar `.png`
   no nome.

4. **Rodar o checklist antes de mostrar** — dá pra dizer de onde vem a
   luz olhando pra sombra? A pele tem textura (poro, tom desigual)? O
   desfoque de fundo aumenta com a distância? Tem algo fora do lugar
   (fio, marca de uso)? O assunto está fazendo algo, não posando? Se
   algum item não passar, avisar qual — não entregar em silêncio.
5. Mostrar a foto pro usuário antes de continuar.

**CHECKPOINT:** Foto aprovada → seguir. Se não, ajustar **uma alavanca por
vez** (troca só a lente, ou só a luz, ou só a mídia/filme) e regenerar —
não reescrever o prompt inteiro do zero.

### Passo 4 — Criar visuais (HTML + PNG)

1. Criar **um único `carrossel.html`** com TODOS os slides como `<div class="slide">` dentro do mesmo arquivo. Inline CSS, Google Fonts como única dependência externa. Aplicar:
   - Cores e tipografia da direção visual definida no Passo 1 (usar o "Repertório visual" como referência técnica de escala/tipografia, não como paleta fixa)
   - Mínimo 2 layouts diferentes (não repetir o mesmo em todos os slides)
   - Logo top-left + slide-counter top-right em todos os slides
   - Slide final: logo + CTA, fundo na cor principal

   **Pra incluir foto IA no HTML — a foto SEMPRE numa div vazia própria, nunca
   direto no `.slide`:**
   `html
   <div class="slide" style="position:relative;">
     <div style="
       position: absolute; inset: 0; z-index: 1;
       background-image: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.7)), url('foto-xxx.jpg');
       background-size: cover;
       background-position: center;
       background-repeat: no-repeat;
     "></div>
     <div class="content" style="position:relative; z-index:2;">
       <h2>Texto sobre a foto</h2>
     </div>
   </div>
   `

   ⚠️ **Nunca colocar `background-image` direto no mesmo elemento `.slide` que
   tem filhos flex com `margin-top: auto`** (o padrão comum de capa: chrome +
   stack + footer empurrados pra baixo). Essa combinação especificamente
   dispara um bug real do Chromium headless em `deviceScaleFactor: 2`: a foto
   sai duplicada/espelhada no PNG final, mesmo com `background-repeat: no-repeat`
   certo. Testado e confirmado — a foto isolada numa div vazia (`position:absolute;
   inset:0`) resolve por completo. Slides tipo `SOLO` (foto numa div separada,
   50% da largura) nunca tiveram esse problema, porque já seguem esse padrão.

2. Criar `render.js` na mesma pasta — script Node com Playwright que abre o HTML e tira screenshot de cada `.slide` em 1080x1350. Pode reutilizar `node_modules` de uma pasta anterior (não precisa rodar `npm install` toda vez):
```bash
NODE_PATH="<pasta-com-node_modules>/node_modules" node render.js
```

3. Mostrar slide 1, 2 e o CTA final renderizados. Se aprovado, mostrar os intermediários.

### Passo 5 — Salvar e organizar

```
marketing/conteudo/<tipo>-<tema>-<YYYY-MM-DD>/
  texto.md              ← texto aprovado + legenda
  foto-<nome>.jpg       ← fotos geradas por IA (se houver)
  carrossel.html
  render.js
  instagram/
    slide-01.png → slide-NN.png
  tiktok/ (se pedido — formato 9:16)
    slide-01.png → ...
  legenda.md            ← legenda Insta+FB
  legenda-linkedin.md   ← (se pedido, mais formal)
```

### Passo 6 — Conexão com blog (opcional)

Depois de criar o conteúdo visual, perguntar:

> "Esse conteúdo dá pra virar artigo no blog também. Quer que eu crie a versão blog pra SEO?"

Se sim, chamar `/publicar-tema` com o mesmo tema.

---

## Regras

- Cada carrossel tem direção visual própria (referência ou proposta pro tema) — nunca reaplicar por hábito a mesma paleta/tipografia/esqueleto de um post anterior
- Foto (IA ou do usuário) + texto em HTML é o padrão; texto puro só quando o conteúdo não pedir nenhum apoio visual
- Banco de referência (se houver) é ideia eventual, não molde a seguir por padrão
- Carrossel: 1080x1350 (4:5 retrato) — sempre. TikTok/Reels: 1080x1920 (9:16) — só quando pedido explicitamente
- Linguagem segue o tom que o usuário passar, estritamente
- Sempre considerar a sequência de capa no feed antes de definir capa nova
- Sempre gerar legenda automaticamente ao final, salvando em `legenda.md`
- Fotos IA: sempre pedir aprovação antes de usar no carrossel
- Fotos IA: prompts em inglês
- Fotos IA: nunca gerar fotos de pessoas/rostos identificáveis
- HTMLs: um único arquivo `carrossel.html` com todos os slides + `render.js` na mesma pasta. Inline CSS
- Render: reutilizar `node_modules` quando possível (não rodar `npm install` em cada pasta)
- Não repetir layout entre slides — usar variação visual
