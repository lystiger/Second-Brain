---
title: <% tp.date.now("YYYY-MM") %>
type: review
cadence: monthly
status: completed
month: <% tp.date.now("YYYY-MM") %>
score:
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
tags: [review/monthly]
---

# Monthly Review · <% tp.date.now("MMMM YYYY") %>

## Executive Summary

- Biggest outcome:
- Biggest lesson:
- Biggest constraint:

## Goals

```dataview
TABLE WITHOUT ID file.link AS Goal, horizon, progress + "%" AS Progress, target_date
FROM "🧭 OS/Goals"
WHERE type = "goal" AND status = "active"
SORT target_date ASC
```

## Portfolio

```dataview
TABLE WITHOUT ID file.link AS Project, status, progress + "%" AS Progress, updated
FROM "🚀 Projects"
WHERE type = "project"
SORT priority ASC
```

## What Shipped

-

## Skills and Knowledge Compounded

-

## Metrics

| Metric | Previous | Current | Interpretation |
|---|---:|---:|---|
|  |  |  |  |

## System Audit

- [ ] Remove stale tasks
- [ ] Archive completed projects
- [ ] Update goal progress
- [ ] Review project risk and capacity
- [ ] Prune attachments and duplicate notes

## Next Month

1.
2.
3.

## What I Will Not Do

-
