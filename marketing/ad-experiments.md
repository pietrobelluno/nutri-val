# Ad Experiments Memory

Append-only. Cada bloco = uma rodada de criativo gerada por `/nova-campanha`.

Os sub-agents `headline-agent` e `description-agent` leem este arquivo antes de gerar variações novas, pra evitar repetir o que já foi testado (especialmente o que **não performou**).

## Schema

```markdown
## YYYY-MM-DD — <keyword/tema>
**Hipótese**: <o que essa rodada testa>
**Headlines testados**:
- ...
**Descriptions testados**:
- ...
**Resultado**: <CTR/CVR após 7-14 dias rodando — preencher manualmente quando der pra medir>
**Aprendizado**: <insight pra próxima rodada>
```

---

<!-- Blocos novos vão abaixo daqui (mais recentes no final) -->
