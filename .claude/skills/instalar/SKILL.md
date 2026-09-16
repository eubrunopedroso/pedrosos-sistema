---
name: instalar
description: >
  Instala o PedrosOS no negócio do usuário. Entrevista sobre empresa, tom de voz,
  foco atual e identidade visual, e preenche a note `obsidian-vault/Negocio - Base de
  Conhecimento.md` (seções Quem Sou + Restrições e Contexto Atual), já no formato
  consolidado — uma nota por categoria, com seções numeradas, pra nunca acumular a
  fragmentação que precisa de faxina depois. Adapta o `CLAUDE.md` conforme o perfil,
  incluindo a seção "Tom de voz" já embutida no template — tom não vira nota fixa
  separada, mesmo princípio de não fixar em nota o que é mais natural perguntar por
  peça. `identidade/design-guide.md` só é criado se o usuário trouxer referência
  visual (cor/fonte/logo) na entrevista.
  Use quando o usuário acabou de clonar o repositório e quer instalar o sistema, ou quando
  pedir explicitamente "rodar /instalar", "instalar o PedrosOS", "primeiro setup".
---

# /instalar — Instalação inicial do PedrosOS

Esse é o primeiro comando que o usuário roda depois de clonar o repositório. Não pode falhar e não pode soar burocrático. Trata como conversa de descoberta — pergunta uma coisa por vez, escuta de verdade, não enfileira tudo. O objetivo é o sistema sair daqui sabendo quem é a empresa, como ela fala, e onde tá o atrito do dia a dia.

## Pré-checagem

### 1. Nome da pasta

Conferir o nome da pasta atual (`basename "$(pwd)"`). Se for `pedrosos`, `PedrosOS`, `PedrosOS-main`, `pedrosos-main` ou variação genérica:

> "Notei que a pasta atual ainda tem nome genérico ('<nome-atual>'). O ideal é a pasta ter o nome do seu negócio, não 'PedrosOS'. Quando terminarmos o setup, te lembro de renomear (é rápido — fechar VS Code, renomear a pasta no Finder/Explorer, abrir de novo). Bora seguir?"

Registrar mentalmente o nome atual pra usar na Fase 5.

### 2. Arquivos de contexto

Conferir se alguma note do vault já está preenchida (não é placeholder
vazio/genérico), ou se o `CLAUDE.md` já tem um segundo bloco de regras
de negócio abaixo do sistema genérico (ver Fase 3 pra saber identificar
esse bloco):
- `obsidian-vault/Negocio - Base de Conhecimento.md`
- `CLAUDE.md` (bloco de regras de negócio, se já existir)
- `identidade/design-guide.md`

Se algum já tiver conteúdo real, perguntar:
> "Já tem algum contexto preenchido aqui. Quer que eu sobrescreva (recomeçar do zero) ou complemente o que falta?"

Se for setup limpo, seguir direto.

---

## Fase 1 — Escolha do perfil

Perguntar qual perfil mais combina com o negócio:

1. **Solopreneur / criador solo** — uma pessoa só, mistura de marca pessoal e negócio
2. **Freelancer** — atende clientes, organiza por projeto/cliente
3. **Agência / consultoria** — equipe pequena entregando pra vários clientes
4. **Empresa** — empresa estabelecida com setores (marketing, comercial, financeiro, etc.)

A resposta determina qual template de `CLAUDE.md` aplicar (ver `templates/perfis/`).

---

## Fase 2 — Entrevista

Fazer essas perguntas em ordem, esperando a resposta de cada uma antes de seguir. Se vier resposta vaga, repetir uma vez pedindo concretude. Não insistir mais que isso — registrar o que vier.

**Sobre o negócio:**
1. "Como você chama o que você faz? (nome da empresa, ou seu nome se for marca pessoal)"
2. "O que sua empresa entrega, em uma frase do jeito que você falaria pro vizinho?"
3. "Quem te paga? (perfil de cliente real — descreve em uma ou duas frases, sem persona genérica)"
4. "Você toca sozinho ou tem equipe? Se tem, quantos e cada um fazendo o quê?"

**Sobre voz:**
5. "Me cola um exemplo da tua escrita — uma legenda do Insta, um email pra cliente, qualquer coisa real e recente. Assim eu calibro o jeito de escrever sem precisar adivinhar."
6. "O que te dá ranço quando alguém escreve assim? (ex: 'vamos juntos!', emoji em email formal, 'caro cliente', jargão de guru, 'alavancar', 'sinergia')"

**Sobre foco:**
7. "Qual o gargalo do teu negócio hoje? O que tá segurando ele de crescer?"
8. "Se eu pudesse tirar UMA coisa que você repete toda semana das tuas costas, qual seria?"

**Sobre identidade visual:**
9. "Tem identidade visual definida ou tá no zero? Se tem, me passa as cores principais e a fonte."
10. "Tem logo? Se sim, joga o arquivo em `identidade/logo.png` (ou `.svg`) e me confirma."

---

## Fase 3 — Preenchimento dos arquivos

Criar as notas já no formato consolidado — uma nota por categoria, com seções
numeradas — pra essa instalação nunca precisar de uma faxina de consolidação
mais pra frente (nota fragmentada por assunto solto, acumulada semana a
semana, sempre acaba precisando dessa faxina — evitar desde o início é
mais barato que arrumar depois).

### `obsidian-vault/Negocio - Base de Conhecimento.md`

Criar com duas seções:

**Seção 1 — Quem Sou.** Com base nas perguntas 1-4: nome, o que faz, perfil
de cliente, equipe. Nome do arquivo e da seção **nunca** levam o nome
próprio do usuário — "Quem Sou" é o título fixo, o nome dele vai dentro do
conteúdo da seção, não no nome da nota (isso é o que permite o mesmo
template servir qualquer negócio sem precisar renomear arquivo).

**Seção 2 — Restrições e Contexto Atual.** Com base nas perguntas 7-8:
- **Gargalo atual:** [resposta da 7]
- **Pra tirar das costas:** [resposta da 8] — registrar como candidata a virar skill via `/mapear-rotinas`
- **Próximas prioridades:** derivar do gargalo (o que ataca o gargalo direto)

Linkar a nota a partir de `obsidian-vault/00 - Visão Geral.md` (seção
"Negócio") se ainda não estiver.

### `identidade/design-guide.md`
Se o usuário forneceu cores/fontes/logo (perguntas 9-10), criar o arquivo com os campos correspondentes. Se não, não criar nada e avisar:
> "Sem identidade definida ainda, sem problema. O padrão do PedrosOS é não ter guia fixo: cada peça pergunta referência (cor, fonte, print) na hora de criar, em vez de ler um arquivo só. Se você preferir travar uma identidade fixa mais pra frente, é só me pedir que eu crio o `design-guide.md`."

### `CLAUDE.md`

🚨 **Nunca sobrescrever o arquivo inteiro.** O `CLAUDE.md` da raiz já
vem com um sistema genérico (Contexto do negócio, Fluxo de trabalho,
Aprender com correções, etc.) — isso é o próprio PedrosOS, vale pra
qualquer negócio e nunca deve ser apagado. O que este passo faz é
**anexar** as regras de negócio do perfil escolhido embaixo desse
sistema, como um segundo bloco.

1. Pegar o template correspondente ao perfil escolhido na Fase 1
   (`templates/perfis/claude-md-<perfil>.md`)
2. Adaptar com o nome do negócio e estrutura de pastas mencionada nas
   respostas. Tom não vira nota própria — a seção "Tom de voz" já vem no
   template do perfil, preencher direto com base nas perguntas 5-6:
   - Derivar do exemplo de escrita real da pergunta 5 (descrever em 2-3
     frases o jeito de escrever, com referência ao exemplo)
   - **Evitar:** lista direta da resposta 6
3. Se o `CLAUDE.md` da raiz **já tem** um segundo bloco de negócio (de
   uma instalação anterior — detectado na Pré-checagem), substituir só
   esse bloco pelo novo conteúdo, mantendo o sistema genérico intacto
   acima
4. Se é a primeira instalação, **remover a linha em itálico final**
   ("*Depois do `/instalar`...*", junto com o `---` logo acima dela) e
   **anexar** o conteúdo do template no lugar dela — esse aviso só faz
   sentido antes da instalação acontecer

---

## Fase 4 — Resumo

Mostrar pro usuário o que foi configurado:

```
✓ Perfil aplicado: [perfil]
✓ Contexto do negócio: obsidian-vault/Negocio - Base de Conhecimento.md (seção 1, Quem Sou)
✓ Tom de voz: CLAUDE.md (seção "Tom de voz")
✓ Foco atual: obsidian-vault/Negocio - Base de Conhecimento.md (seção 2, Restrições e Contexto Atual)
✓ Marca: identidade/design-guide.md [criada] | sem guia fixo — pergunta referência a cada peça
✓ CLAUDE.md adaptado pro perfil [perfil]
```

---

## Fase 5 — Renomear pasta (se necessário)

Se a pasta atual ainda tem nome genérico (detectado na Pré-checagem), gerar slug do nome da empresa (resposta da pergunta 1):
- minúsculas
- sem acentos
- espaços viram hífen
- caracteres especiais removidos

Ex: "Acme Empresa Ltda" → `acme-empresa-ltda`

Mostrar:

> "Última coisa: a pasta ainda tá com nome genérico ('<nome-atual>').
> Pra ter cara do seu negócio, recomendo renomear pra '<slug>'.
>
> Como fazer:
> 1. Fecha o VS Code
> 2. Renomeia a pasta no Finder (Mac) ou Explorer (Windows) — ou no
>    terminal fora dela: `mv <nome-atual> <slug>`
> 3. Abre o VS Code de novo na pasta renomeada
>
> Se preferir outro nome, me fala que eu ajusto a sugestão."

Se a pasta já tem nome próprio (não genérico), pular essa fase.

---

## Fase 6 — Próximos passos

> "Pronto. O PedrosOS já te conhece.
>
> No começo de cada sessão de trabalho, roda `/abrir` — eu carrego tudo
> que combinamos aqui antes da primeira frase. Quando quiser fazer um
> carrossel, plano de SEO, campanha ou qualquer outra coisa, é só
> chamar a skill que cabe.
>
> Você mencionou que repete '<resposta da pergunta 8>' toda semana.
> Quando quiser tirar isso das costas de vez, roda `/mapear-rotinas`
> que eu transformo em skill própria."

Se o usuário quiser publicar o trabalho no GitHub, mencionar `/salvar`.

---

## Regras

- Não inventar dados — se a resposta for vaga, registrar do jeito que veio (ou deixar placeholder claro)
- Não escrever "este arquivo será preenchido pelo /instalar" nos arquivos finais — esse aviso só existe nos placeholders, sai depois do /instalar
- O setup deve durar 5-7 minutos no máximo. Se o usuário estiver enrolando numa pergunta, registra o que tem e segue
- Não fazer perguntas extras além das listadas acima sem motivo claro
