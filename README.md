# PedrosOS

O sistema que uso todo dia no Claude Code pra tocar meu negócio de IA —
skills, organização e jeito de trabalhar prontos, direto na pasta.

## Instalar

1. Clone este repositório e abra a pasta no Claude Code (VS Code + extensão, ou terminal)
2. **Antes de qualquer coisa, desconecte este repositório do remoto original**, pra
   seu conteúdo de negócio nunca subir de volta pra cá:
   ```bash
   git remote remove origin
   ```
   Se quiser guardar seu próprio histórico depois, crie um repositório
   seu (`gh repo create` ou github.com/new) e aponte pra ele.
3. Rode `/instalar` — é uma entrevista curta (5-7 minutos): quem você
   é, o que vende, como fala, onde está o gargalo. No final, o sistema
   já sabe seu negócio e o `CLAUDE.md` fica configurado pro seu perfil.
4. Rode `/abrir` no início de cada sessão de trabalho — carrega o
   contexto que o `/instalar` configurou.

## O que vem pronto

- **`.claude/skills/`** — skills nativas pra carrossel/post, campanha de
  Google Ads, SEO, análise de dados, email profissional, relatório de
  Ads, resposta a avaliação, e mais
- **`templates/`** — moldes de perfil de negócio (solopreneur,
  freelancer, agência, empresa), catálogo de skills/ferramentas de
  referência
- **`scripts/gerar-imagem.js`** — gera foto via IA com fallback
  automático (Gemini → OpenAI → grátis), sem travar se faltar chave
- **`skills-lock.json`** — manifesto de ~35 skills de terceiro
  (animação/interface, Vercel/React, geração de site/3D, geração de
  mídia via Higgsfield). Instalar com:
  ```bash
  npx skills add
  ```

## Atualizar o sistema

Quando sair melhoria (skill nova, correção, regra nova), você puxa por
cima do que já tem, sem perder o que configurou:

```bash
git pull https://github.com/eubrunopedroso/pedrosos-sistema.git main
```

O endereço vai escrito no comando de propósito: você removeu o `origin`
na instalação, então não existe mais um atalho apontando pra cá — e é
assim que o seu conteúdo de negócio fica protegido de subir de volta.

O que o `/instalar` escreveu (seu `obsidian-vault/` e o bloco do seu
negócio no fim do `CLAUDE.md`) não é sobrescrito. Se o Git acusar
conflito em algum arquivo que você editou à mão, ele mostra qual é e
você escolhe o que fica.

## Extras (fora deste repositório)

Se você comprou algum produto complementar (pack de carrossel, cofre de
abordagens, kit vertical, etc.), ele chega separado — não faz parte
deste pacote base.

## Regra de ouro

Seu negócio (clientes, preço, contrato) nunca deveria subir de volta pra
um repositório compartilhado. `clientes/`, `meus-projetos/` e `dados/`
já vêm no `.gitignore` por esse motivo — mantenha assim.
