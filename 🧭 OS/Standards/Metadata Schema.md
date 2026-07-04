---
type: standard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [os, metadata]
---

# Metadata Schema

## Required on Every Structured Note

| Property | Values |
|---|---|
| `type` | `project`, `experiment`, `research-paper`, `knowledge`, `meeting`, `book`, `roadmap`, `goal`, `idea`, `review`, `daily`, `dashboard`, `standard` |
| `status` | `idea`, `planning`, `doing`, `testing`, `completed`, `on-hold`, `archived`, plus domain states such as `reading` |
| `priority` | `critical`, `high`, `medium`, `low` |
| `created` | ISO date: `YYYY-MM-DD` |
| `updated` | ISO date: `YYYY-MM-DD` |
| `owner` | `Lystiger` unless shared |
| `tags` | Small, stable taxonomy; do not repeat every property as a tag |

## Project Contract

Every project adds: `progress` (0–100), `deadline`, `github`, `tech_stack`, and `area`.

## Relationship Properties

- `project: "[[Project]]"` connects meetings, experiments, and notes to delivery.
- `source` connects knowledge to a paper, book, course, or URL.
- `related` is a list of explicit semantic neighbors.
- `horizon` on goals is `weekly`, `monthly`, `quarterly`, `yearly`, or `long-term`.

## Naming

- Projects: product name (`Elysia`).
- Experiments: `EXP-YYYYMMDD-short-hypothesis`.
- Meetings: `YYYY-MM-DD - Topic`.
- Daily notes: `YYYY-MM-DD`.
- Weekly reviews: `YYYY-Www`.
- Monthly reviews: `YYYY-MM`.
