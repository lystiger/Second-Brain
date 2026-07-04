---
type: project
status: doing
priority: high
progress: 0
deadline:
github:
tech_stack: [Python, FastAPI, LLM, RAG, MCP, PostgreSQL]
area: ai-assistant
owner: Lystiger
created: 2026-07-04
updated: 2026-07-04
tags: [project, elysia, agent, memory]
---

# Elysia

Personal AI assistant with durable memory, trustworthy tool use, planning, and deep integration with this vault.

## Product Principles

- User-owned memory with provenance and reversible actions.
- Evidence before confidence; explicit uncertainty when needed.
- Small observable tools instead of opaque autonomy.
- Evaluation-driven development for memory, retrieval, and task completion.
- Local-first where privacy or resilience matters.

## Architecture Domains

1. **Interface:** chat, voice, notifications, command center.
2. **Orchestration:** planning, tool selection, execution state, retries.
3. **Memory:** episodic, semantic, project, preference, and working memory.
4. **Knowledge:** vault ingestion, retrieval, provenance, graph relationships.
5. **Tools:** filesystem, GitHub, calendar, research, code, home automation.
6. **Evaluation:** golden tasks, traces, regressions, safety and cost metrics.

## Workspace

- [[🚀 Projects/Elysia/Board|Board]]
- [[🚀 Projects/Elysia/Architecture/Architecture|Architecture]]
- [[🚀 Projects/Elysia/Experiments/Experiments|Experiments]]
- [[🚀 Projects/Elysia/Meetings/Meetings|Meetings]]
- [[🚀 Projects/Elysia/Documentation/Documentation|Documentation]]

## Milestones

- [ ] Define Elysia v0 use cases and non-goals #project/elysia ⏫
- [ ] Build traceable vault retrieval baseline #project/elysia
- [ ] Implement safe tool registry and execution log #project/elysia
- [ ] Create memory evaluation suite #project/elysia
- [ ] Ship one daily workflow end to end #project/elysia

## Open Tasks

```tasks
not done
tag includes #project/elysia
sort by priority
sort by due
```

## Experiments

```dataview
TABLE WITHOUT ID file.link AS Experiment, status AS Status, hypothesis AS Hypothesis, metric AS Metric, result AS Result
FROM "🚀 Projects/Elysia/Experiments"
WHERE type = "experiment"
SORT created DESC
```

## Recent Notes

```dataview
TABLE WITHOUT ID file.link AS Note, type AS Type, status AS Status, file.mtime AS Modified
FROM "🚀 Projects/Elysia"
WHERE file.name != this.file.name
SORT file.mtime DESC
LIMIT 12
```
