---
name: abrir
description: >
  Abre uma sessão de trabalho carregando a memória do negócio (empresa, preferências, estratégia, identidade)
  e devolve um resumo curto pro usuário.
  Use quando o usuário disser "abrir", "começar o dia", "/abrir" ou no primeiro turno de uma sessão depois do /instalar.
---

# /abrir — Abertura de sessão

Curto e direto. O objetivo é carregar contexto e devolver uma síntese enxuta pra o usuário começar a trabalhar.

## Workflow

1. Ler, em ordem:
   - `obsidian-vault/00 - Visão Geral.md` — índice do vault, mostra o que existe
   - `obsidian-vault/Negocio - Base de Conhecimento.md` — se existir,
     traz o que o usuário já registrou sobre ferramentas conectadas,
     nicho, tom de voz e foco atual. Se algum desses assuntos não
     estiver registrado ainda, perguntar direto ao usuário quando
     precisar desse contexto durante a sessão, em vez de assumir

   `obsidian-vault/` é a única fonte de contexto do negócio — não deve
   existir arquivo paralelo de memória pra conferir divergência.

2. Se `obsidian-vault/00 - Visão Geral.md` não existir, responder:
   > "Não encontrei o vault (`obsidian-vault/`) com o contexto do negócio ainda. Quer rodar `/instalar` agora?"
   E parar.

3. Devolver UMA mensagem curta no formato:

```
Contexto carregado.

Pronto. O que vamos fazer?
```

4. Não listar quais arquivos foram lidos. Não confirmar leitura. Só usar o contexto.

## Regras

- O bloco de memória (nome, foco, tom) tem que caber em 5 linhas no terminal
- Não fazer perguntas além de "o que vamos fazer?"
- Identidade visual (`identidade/design-guide.md`) só é assunto quando
  alguma skill visual for chamada — não mencionar aqui se não existir
- Checagem de campanhas de Ads não faz parte do `/abrir` — não puxar
  dado de Ads nessa skill; só se o usuário pedir explicitamente em outro
  momento
