---
title: "<% tp.file.title %>"
type: project
status: planning
priority: medium
progress: 0
deadline:
github:
tech_stack: []
area:
owner: Lystiger
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
tags: [project]
---

# <% tp.file.title %>

> [!abstract] Project charter
> **User/problem:**
> **Expected outcome:**
> **Why now:**
> **Non-goals:**

## Success Metrics

| Metric | Baseline | Target | Measurement |
|---|---:|---:|---|
|  |  |  |  |

## Scope

### In

-

### Out

-

## Architecture

- Context:
- Constraints:
- Components:
- Data flow:
- Failure modes:
- Key decisions:

## Milestones

- [ ] Milestone 1
- [ ] Milestone 2
- [ ] Milestone 3

## Tasks

- [ ] Define the next measurable outcome

## Risks

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
|  |  |  |  |

## Experiments

```dataview
TABLE WITHOUT ID file.link AS Experiment, status, hypothesis, metric, result
WHERE type = "experiment" AND project = this.file.link
SORT created DESC
```

## Meetings

```dataview
TABLE WITHOUT ID file.link AS Meeting, date, attendees
WHERE type = "meeting" AND project = this.file.link
SORT date DESC
```

## Decision Log

| Date | Decision | Why | Consequence |
|---|---|---|---|
