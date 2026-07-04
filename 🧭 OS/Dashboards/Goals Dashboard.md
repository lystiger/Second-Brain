---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [dashboard, goals]
---

# Goals Dashboard

## Weekly Goals

```dataview
TABLE WITHOUT ID file.link AS Goal, progress + "%" AS Progress, target_date AS Target
FROM "🧭 OS/Goals"
WHERE type = "goal" AND horizon = "weekly" AND status = "active"
SORT priority ASC
```

## Monthly Goals

```dataview
TABLE WITHOUT ID file.link AS Goal, progress + "%" AS Progress, target_date AS Target
FROM "🧭 OS/Goals"
WHERE type = "goal" AND horizon = "monthly" AND status = "active"
SORT target_date ASC
```

## Long-Term Direction

```dataview
TABLE WITHOUT ID file.link AS Goal, horizon AS Horizon, progress + "%" AS Progress, target_date AS Target
FROM "🧭 OS/Goals"
WHERE type = "goal" AND status = "active" AND horizon != "weekly" AND horizon != "monthly"
SORT target_date ASC
```

## Completed

```dataview
LIST FROM "🧭 OS/Goals"
WHERE type = "goal" AND status = "completed"
SORT updated DESC
```
