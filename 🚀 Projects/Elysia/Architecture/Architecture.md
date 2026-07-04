---
type: architecture
status: planning
project: "[[Elysia]]"
created: 2026-07-04
updated: 2026-07-04
tags: [elysia, architecture]
---
# Elysia Architecture
## Context
Elysia is a personal assistant that uses the vault as durable, inspectable memory while keeping actions explicit and reversible.
## Quality Attributes
- Privacy and user control
- Correctness and provenance
- Observability and debuggability
- Low latency and controlled cost
- Graceful degradation
## Components
| Component | Responsibility |
|---|---|
| Interface | Conversation, commands, notifications |
| Orchestrator | Plans, state machine, retries, policy |
| Memory service | Working, episodic, semantic, preference memory |
| Retriever | Hybrid retrieval, ranking, citations |
| Tool registry | Typed schemas, permissions, execution |
| Trace store | Inputs, decisions, tool calls, outputs, cost |
| Evaluator | Golden tasks, regressions, quality metrics |
## Memory Contract
Every stored memory needs content, type, source, timestamp, confidence, sensitivity, and retention policy.
## Threat Model
- Prompt injection through retrieved content
- Tool misuse or excessive permissions
- Sensitive-memory leakage
- Hallucinated state or completed actions
- Unbounded loops, cost, and latency
## ADRs
Record consequential choices in this folder as `ADR-### - Decision.md`.
