---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [dashboard, competition, ai]
---

# AI Competition Dashboard

## Active Competition

![[🚀 Projects/Vietnam AI Challenge/Vietnam AI Challenge]]

## Competition Experiments

```dataview
TABLE WITHOUT ID file.link AS Experiment, status AS Status, hypothesis AS Hypothesis, metric AS Metric, result AS Result
FROM "🚀 Projects/Vietnam AI Challenge/Experiments"
WHERE type = "experiment"
SORT created DESC
```

## Open Tasks

```tasks
not done
tag includes #project/vietnam-ai-challenge
sort by priority
sort by due
```
