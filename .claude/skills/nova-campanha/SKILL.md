---
name: nova-campanha
description: Gera draft de campanha Google Ads em PT-BR pra Valéria Schumann — orquestra os sub-agents headline-agent (≤30 chars) e description-agent (≤90 chars) em paralelo, salva em marketing/campaign-drafts/, e atualiza marketing/ad-experiments.md com a hipótese da rodada. Use quando pedirem "/nova-campanha [keyword]", "criar campanha pra [tema]".
---

# /nova-campanha [keyword]

Replica o padrão da Anthropic Growth Marketing team (PDF p.15): dois sub-agents especializados (headlines + descriptions) com sistema de memória pra não repetir o que não funcionou.

## Passo 1 — Receber input

Argumento esperado: keyword/tema (ex.: "nutricionista online", "primeira consulta nutricional").

Se não veio, perguntar antes de seguir: "Qual keyword/tema dessa campanha?"

## Passo 2 — Definir hipótese da rodada

Antes de invocar os agents, **decida o ângulo principal** dessa rodada (1 frase). Exemplos:
- "Testa angle 'sem dieta restritiva' vs 'comida real' pra ver qual gera mais cliques."
- "Foca atendimento online — público fora de Caxias."
- "Primeira consulta como hook (gratuita ou diagnóstica)."

Pode perguntar pro user se não estiver claro pelo contexto.

## Passo 3 — Invocar sub-agents em paralelo

Use o Agent tool **em uma única mensagem com dois tool calls** pra rodar em paralelo:

```
Agent(subagent_type: "headline-agent", prompt: "
Keyword: <keyword>
Ângulo da rodada: <hipótese>
Leia marketing/ad-experiments.md antes de gerar pra evitar repetir headlines anteriores.
Devolva 10 variações em tabela, todas ≤ 30 chars validadas.
")

Agent(subagent_type: "description-agent", prompt: "
Keyword: <keyword>
Ângulo da rodada: <hipótese>
Leia marketing/ad-experiments.md antes de gerar pra evitar repetir descriptions anteriores.
Devolva 8 variações em tabela, todas ≤ 90 chars validadas.
")
```

## Passo 4 — Combinar em ad groups

Receba as duas tabelas, monte **5 ad groups draft**, cada um com 3 headlines + 2 descriptions agrupados por compatibilidade de ângulo (ex.: ad group "online" pega headlines/descriptions cujo ângulo cobre online).

## Passo 5 — Salvar draft

Slug a keyword (lowercase, espaços → `-`, sem acento) e gravar em `marketing/campaign-drafts/<YYYY-MM-DD>-<slug>.md`:

```markdown
# Campanha draft — <keyword>
**Data**: <YYYY-MM-DD>
**Hipótese**: <hipótese>

## Ad group 1 — <ângulo>
**Headlines** (3, ≤30 chars):
- ...
- ...
- ...
**Descriptions** (2, ≤90 chars):
- ...
- ...

## Ad group 2 — <ângulo>
...

## Ad group 5 — <ângulo>
...

## Próximos passos
- [ ] Val revisa tom de voz
- [ ] Pegar volumes/CPC pra <keyword> (Keyword Planner — quando MCP/SDK Google Ads entrar)
- [ ] Geo-targeting: Caxias do Sul + região; ou Brasil todo se ângulo é online
- [ ] Budget inicial: R$ 20-30/dia
- [ ] Conversão: clique WhatsApp já trackeado como `outbound_click` no GA4
```

## Passo 6 — Append na memória

Adicionar bloco em `marketing/ad-experiments.md` (append-only, no FINAL do arquivo):

```markdown

## <YYYY-MM-DD> — <keyword>
**Hipótese**: <hipótese>
**Headlines testados**:
- (lista, todos os 10)
**Descriptions testados**:
- (lista, todos os 8)
**Resultado**: _a preencher após 7-14 dias rodando_
**Aprendizado**: _a preencher_
```

## Passo 7 — Reportar pro usuário

No chat, mostrar:
- Path do draft criado
- Resumo dos 5 ad groups (1 linha cada)
- Lembrete: "Val precisa aprovar antes de subir no painel; Google Ads ainda não tá conectado via API."

## Notas

- Esse skill **não cria campanha real no Google Ads** — só gera o draft. Quando integrarmos a Google Ads API (próxima iteração, requer Developer Token), aí sim sobe.
- O ângulo + memória é o que faz isso ser útil ao longo do tempo: cada rodada aprende com a anterior.
