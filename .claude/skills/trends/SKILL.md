---
name: trends
description: >
  Puxa o Google Trends "Trending Now" (últimas 24h) e traz a lista
  completa pro usuário analisar e escolher o que virar conteúdo — criar
  em cima do que já está bombando. Use quando o usuário disser "trends",
  "em alta", "o que está bombando", "trending now", "assunto em alta",
  "tendência do dia", "/trends", ou sempre que for planejar/gravar
  conteúdo (roteiro, vídeo, ideia pro dia) e ainda não tiver puxado
  tendência nenhuma na conversa.
---

# /trends — Trending Now

## Dependências

- **Fonte:** `https://trends.google.com/trending?geo=<GEO>` via WebFetch
  (não existe API pública liberada — o Google Trends API oficial está em
  alpha fechado; isso aqui é o site mesmo, sempre dado real, nunca
  inventado). `<GEO>` é o código do país do usuário (`BR` Brasil, `US`
  Estados Unidos, `PT` Portugal, etc.) — perguntar se não tiver ficado
  claro qual mercado interessa
- **Calibragem de quem sou/tom, se ele pedir ideia de gancho em cima de
  algum item:** perguntar ao usuário direto — nicho, tom de voz e
  público não vivem em nota fixa do vault por padrão neste sistema

## Workflow

1. **Puxar o dado real.** WebFetch em
   `https://trends.google.com/trending?geo=<GEO>`, pedindo a lista completa
   de assuntos em tendência nas últimas 24h, com volume aproximado de
   busca. Nunca inventar tendência — se o fetch vier fraco ou vazio,
   avisar e tentar de novo ou pedir pro usuário checar direto no link.

2. **Trazer tudo, sem descartar.** 🚨 Não filtrar por "tem ponte com o
   personagem/negócio" antes de mostrar — o usuário quer ver a lista
   inteira e decidir sozinho o que é bacana. Só organizar por categoria
   (esporte, entretenimento/famosos, política/economia, saúde, negócios,
   outros) pra ficar fácil de escanear, mantendo o volume aproximado de
   cada item.

3. **Se ele pedir gancho em cima de um item específico** (depois de
   escolher da lista), perguntar o tom de voz e o público na hora, se não
   tiver ficado claro na conversa. Isso é trabalho sob demanda, não parte
   automática do passo 2.

## Output

Lista completa recebida do Trending Now, agrupada por categoria:

> ### [Categoria]
> - **[Assunto]** — [volume aproximado]

Fechar perguntando se algum item chamou atenção pra desenvolver — só nesse
momento entra a calibragem de gancho/formato do passo 3.

## Regras

- Dado de tendência é sempre o puxado agora, nunca de memória — Trending
  Now muda todo dia
- Não cortar item da lista por achar que "não combina" — a curadoria é
  do usuário, não da skill
