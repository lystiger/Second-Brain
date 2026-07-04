---
type: standard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [os, architecture]
---

# Vault Architecture

## Folder Tree

```text
📥 Inbox/
├── Home.md
└── Quick Capture.md
🚀 Projects/
├── Projects Dashboard.md
├── Project Pipeline.md
└── <Project>/
    ├── <Project>.md
    ├── Board.md
    ├── Architecture/
    ├── Experiments/
    ├── Meetings/
    └── Documentation/
🧠 Learning/
├── Learning Dashboard.md
├── Roadmaps/
└── AI/
📄 Research Papers/
└── Research Dashboard.md
💼 Career/
├── Career Dashboard.md
└── Japan/
📚 Books/
└── Reading Dashboard.md
📓 Journal/
├── Daily/
├── Weekly/
└── Monthly/
🧩 Templates/
🗂️ Resources/
└── Attachments/
🧭 OS/
├── Dashboards/
├── Goals/
├── Ideas/
└── Standards/
```

| Folder | Responsibility | Retention |
|---|---|---|
| `📥 Inbox` | Frictionless capture and command center | Process daily |
| `🚀 Projects` | Outcome-driven work with deadlines | Archive after completion |
| `🧠 Learning` | Skills, concepts, roadmaps, evergreen knowledge | Permanent |
| `📄 Research Papers` | Papers, literature notes, evidence | Permanent |
| `💼 Career` | Career execution, portfolio, Japan planning | Permanent |
| `📚 Books` | Reading pipeline and book notes | Permanent |
| `📓 Journal` | Daily, weekly, and monthly reviews | Permanent |
| `🧩 Templates` | Schemas for repeatable notes | Versioned |
| `🗂️ Resources` | Attachments and reference material | Prune annually |
| `🧭 OS` | Dashboards, goals, ideas, and operating standards | Permanent |

## Scale Rules

- Prefer metadata and queries over deep folder nesting.
- Keep folder depth below four levels except domain knowledge and project evidence.
- One canonical note per concept; use aliases instead of duplicates.
- Archive, never delete, completed project context that may inform Elysia.
- Attach decisions, experiments, and meetings to a project with the `project` property.

## Ten-Year Maintenance

- Use yearly archive folders only for high-volume chronological material, not knowledge.
- Archive completed projects under `🚀 Projects/_Archive/YYYY/` after the retrospective.
- Keep templates backward-compatible; add properties instead of casually renaming them.
- Run a quarterly orphan-note review and an annual attachment/duplicate audit.
- Export critical indexes and project retrospectives to plain Markdown/PDF when a major tool changes.
- Keep the vault portable: Markdown is canonical; dashboards and plugins are replaceable views.
