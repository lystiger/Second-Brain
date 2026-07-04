---
type: project
status: doing
priority: high
progress: 0
deadline:
github:
tech_stack: [Python, PyTorch, OpenCV, Docker]
area: computer-vision
owner: Lystiger
created: 2026-07-04
updated: 2026-07-04
tags: [project, computer-vision, monitoring]
---

# AOI

Computer-vision inspection and monitoring system.

## Project Standard

| Field | Value |
|---|---|
| Status | `doing` |
| Priority | `high` |
| Progress | `0%` |
| GitHub | Add repository URL |
| Deadline | Set when committed |
| Tech stack | Python, PyTorch, OpenCV, Docker |

## Success Metrics

- Define defect-detection quality, false-call rate, latency, and uptime targets.
- Reproduce training and deployment from versioned data/configuration.
- Monitor inference health, drift, and operational failures.

## Workspace

- [[🚀 Projects/AOI/Board|Board]]
- [[🚀 Projects/AOI/Architecture/Architecture|Architecture]]
- [[🚀 Projects/AOI/Experiments/Experiments|Experiments]]
- [[🚀 Projects/AOI/Meetings/Meetings|Meetings]]
- [[🚀 Projects/AOI/Documentation/Documentation|Documentation]]

## Milestones

- [ ] Define dataset and defect taxonomy #project/aoi
- [ ] Establish baseline and evaluation protocol #project/aoi
- [ ] Build monitored inference service #project/aoi
- [ ] Validate under production-like conditions #project/aoi

## Open Tasks

```tasks
not done
tag includes #project/aoi
sort by priority
sort by due
```

## Recent Notes

```dataview
TABLE WITHOUT ID file.link AS Note, type AS Type, status AS Status, file.mtime AS Modified
FROM "🚀 Projects/AOI"
WHERE file.name != this.file.name
SORT file.mtime DESC
LIMIT 10
```
