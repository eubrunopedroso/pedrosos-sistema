---
name: salvar
description: >
  Salva o trabalho do PedrosOS no GitHub (commit + push). Na primeira vez configura o repositório
  remoto. Use quando o usuário disser "salvar", "salva no github", "commit", "push", "/salvar"
  ou pedir backup do trabalho.
---

# /salvar — Salvar no GitHub

Skill de uma função só: garantir que o trabalho do usuário está no GitHub. Fácil pra quem nunca usou git.

🚨 **A raiz do workspace NUNCA tem remote e nunca deve ganhar um.** Cada
cliente e cada projeto próprio seu tem seu **próprio repositório**,
numa subpasta específica — nunca a raiz. Rodar `git init` / `git remote add`
/ `git push` na raiz do workspace é proibido, mesmo que pareça "a primeira
vez". Ver a tabela de rota completa e as regras em `CLAUDE.md`, seção
"Git — cada projeto no seu próprio repositório".

## Workflow

### Passo 0 — Identificar qual pasta sobe (sempre primeiro)

**Nunca rodar `git` a partir da raiz do workspace.** Primeiro descobrir qual
projeto o usuário quer salvar:

- Se ele já disse qual é ("salva o site do cliente X", "sobe o projeto Y"),
  localizar a **pasta que sobe** na tabela de `CLAUDE.md`, seção "Git — cada
  projeto no seu próprio repositório" — **fonte única**, não duplicar a
  tabela aqui (tabela copiada fica pra trás quando cliente novo entra só
  no original).

  (Cliente novo que não está na tabela: perguntar a pasta antes de continuar.)

- Se ele disse só "/salvar" sem contexto, **perguntar qual projeto** — nunca
  assumir, nunca rodar na raiz "pra ver o que acontece"

- Rodar **todo** comando git com `-C <pasta-que-sobe>` a partir daqui.
  Nunca `git add` da raiz do workspace, nunca da raiz da pasta do cliente
  (ex: `clientes/<nome-do-cliente>/`), só da subpasta que tem o `.git` de
  verdade

### Primeira vez (repositório da pasta ainda não inicializado)

Detectar com `git -C <pasta-que-sobe> rev-parse --is-inside-work-tree`. Se
falhar:

1. Perguntar:
   > "Esse projeto ainda não tem repositório. Já existe um criado no GitHub
   > pra ele?
   > 1. Sim, me passa a URL (ex: https://github.com/seu-usuario/nome.git)
   > 2. Não, vou criar agora — confirma o nome do repositório?"

2. **Se opção 1:** `git -C <pasta> init`, `git -C <pasta> add .`,
   `git -C <pasta> commit -m "Setup inicial"`, `git -C <pasta> branch -M main`,
   `git -C <pasta> remote add origin <URL>`, `git -C <pasta> push -u origin main`.

3. **Se opção 2:** verificar se o `gh` CLI está instalado (`gh --version`).
   - Se sim: `git -C <pasta> init`, commit inicial, e rodar `gh repo create`
     **de dentro da pasta** (`cd <pasta> && gh repo create <nome> --private --source=. --push`)
   - Se não: instruir a instalar `gh` (https://cli.github.com/) ou criar o
     repo manualmente em github.com/new e voltar com a URL

### Commits seguintes (já configurado)

1. `git -C <pasta-que-sobe> remote -v` **antes de qualquer coisa** — conferir
   que bate com a tabela do `CLAUDE.md`. Se não bater, ou não tiver remote,
   **parar e perguntar**, nunca chutar

2. `git -C <pasta-que-sobe> status`. Se não tiver mudanças, responder "Tá
   tudo sincronizado, sem mudança nova" e parar

3. Mostrar o `git status` curto pro usuário. Se aparecer arquivo de fora do
   escopo do projeto (ex: arquivo de outro cliente), **parar e avisar** —
   não comitar

4. Perguntar:
   > "Vou comitar tudo isso. Quer descrever a mudança em uma frase ou usa o
   > resumo automático?"

5. Se o usuário fornecer mensagem, usar. Se não, gerar uma mensagem baseada
   nos arquivos alterados (1 linha, formato: "Atualiza X" ou "Adiciona Y")

6. `git -C <pasta-que-sobe> add .` → `git -C <pasta-que-sobe> commit -m "<mensagem>"`
   → `git -C <pasta-que-sobe> push`

7. Confirmar com link do repositório (extrair de
   `git -C <pasta-que-sobe> remote get-url origin`):
   > "Sincronizado. Ver no GitHub: <URL>"

## Regras

- 🚨 **Nunca rodar `git init`, `git remote add` ou `git push` na raiz do
  workspace.** Ela não tem remote e não deve ter — ver `CLAUDE.md`
- Sempre `-C <pasta-que-sobe>`, nunca `cd` pra raiz e nunca `git add` largo
  demais (raiz do workspace ou raiz da pasta do cliente)
- Nunca usar `--force` sem o usuário pedir explicitamente
- Nunca rodar `git reset --hard` ou outras destrutivas sem confirmação clara
- Se o push falhar por divergência (alguém comitou no remoto), avisar o
  usuário e oferecer `git pull --rebase` antes de tentar de novo
- Se o usuário ainda não tiver `git` configurado (`user.name` / `user.email`),
  perguntar e configurar com `git config --global` na primeira vez
- **Nunca fazer deploy.** Esta skill só comita e dá push pro GitHub. Quem
  sobe pra produção (Vercel ou outro) é você, na mão — ver regra em `CLAUDE.md`
