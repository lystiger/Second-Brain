---
type: standard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [os, plugins]
---

# Plugin Configuration

## Essential Workflow Stack

| Plugin | Purpose | Policy |
|---|---|---|
| Dataview | Metadata dashboards and indexes | Prefer DQL; avoid DataviewJS unless necessary |
| Tasks | Due dates, recurring tasks, global task queries | Tasks stay in their project/context note |
| Templater | Metadata-safe note creation | Templates live in `🧩 Templates` |
| Kanban | Visual project flow | Markdown remains source of truth |

Installed versions at architecture time: Dataview 0.5.68, Tasks 8.2.2, Templater 2.20.6, Kanban 2.0.51. Templater 2.20.6 is the newest compatible release line for Obsidian 1.12.x; upgrade it after upgrading Obsidian to 1.13 or newer.

## Supporting Plugins

- **Homepage:** set `📥 Inbox/Home.md` as the desktop homepage, Reading view, replace open notes on startup, refresh Dataview enabled.
- **Minimal Theme Settings:** visual polish only; business logic must not depend on the theme.
- **Git:** version control and recovery. Exclude workspaces, plugin binaries, caches, and secrets.
- **Local REST API:** reserve for Elysia integration; never commit its API key or certificate material.
- **Excalidraw:** architecture sketches when text or Mermaid is insufficient.
- **Iconize:** navigation cosmetics only.

## Core Settings

- New notes default to `📥 Inbox`.
- Attachments default to `🗂️ Resources/Attachments`.
- Daily notes use `📓 Journal/Daily/YYYY-MM-DD.md`.
- Both core Templates and Templater point to `🧩 Templates`.
- Automatic link updates remain enabled.

## Security

- Keep Dataview JavaScript disabled unless a specific dashboard requires it.
- Keep Tasks JavaScript query features disabled unless reviewed.
- Do not place secrets, access tokens, private keys, or production credentials in YAML or notes.
- Review every automation that writes outside the vault.
