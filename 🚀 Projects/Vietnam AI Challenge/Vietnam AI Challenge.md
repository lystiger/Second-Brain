---
type: project
status: doing
priority: high
progress: 0
deadline:
github:
tech_stack: [Python, PyTorch]
area: ai-competition
owner: Lystiger
created: 2026-07-04
updated: 2026-07-04
tags: [project, competition, ai]
---

# Vietnam AI Challenge

Competition workspace for rules, datasets, experiments, submissions, and post-competition learning.

## Competition Contract

| Item | Value |
|---|---|
| Task | Define from official rules |
| Metric | Define from official rules |
| Deadline | Add official deadline |
| Submission limit | Add limit |
| Team | Add members and roles |

## Workspace

- [[🚀 Projects/Vietnam AI Challenge/Board|Board]]
- [[🚀 Projects/Vietnam AI Challenge/Architecture/Architecture|Architecture]]
- [[🚀 Projects/Vietnam AI Challenge/Experiments/Experiments|Experiments]]
- [[🚀 Projects/Vietnam AI Challenge/Meetings/Meetings|Meetings]]
- [[🚀 Projects/Vietnam AI Challenge/Documentation/Documentation|Documentation]]
- [[🧭 OS/Dashboards/AI Competition Dashboard|Competition Dashboard]]

## Milestones

- [ ] Read rules and establish a compliant local validator #project/vietnam-ai-challenge
- [ ] Build reproducible baseline and submission pipeline #project/vietnam-ai-challenge
- [ ] Prioritize experiments by expected information gain #project/vietnam-ai-challenge
- [ ] Ensemble, validate, document, and submit #project/vietnam-ai-challenge

## Open Tasks

```tasks
not done
tag includes #project/vietnam-ai-challenge
sort by priority
sort by due
```

## Experiment Leaderboard

```dataview
TABLE WITHOUT ID file.link AS Experiment, hypothesis AS Hypothesis, metric AS Metric, result AS Result, status AS Status
FROM "🚀 Projects/Vietnam AI Challenge/Experiments"
WHERE type = "experiment"
SORT result DESC
```

## Recent Notes

```dataview
TABLE WITHOUT ID file.link AS Note, type AS Type, status AS Status, file.mtime AS Modified
FROM "🚀 Projects/Vietnam AI Challenge"
WHERE file.name != this.file.name
SORT file.mtime DESC
LIMIT 10
```
