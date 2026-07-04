---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [dashboard, career]
---

# Career Dashboard

## North Star

Become a senior AI engineer who can design, ship, operate, and explain production AI systems.

## Execution

- [[💼 Career/2026 Execution Plan]]
- [[💼 Career/AI Systems Architect Roadmap]]
- [[💼 Career/Skill Matrix]]
- [[💼 Career/Project Strategy]]
- [[💼 Career/Japan/Japan Dashboard|Master's in Japan]]

## Career Goals

```dataview
TABLE WITHOUT ID file.link AS Goal, horizon AS Horizon, progress + "%" AS Progress, target_date AS Target
FROM "🧭 OS/Goals"
WHERE type = "goal" AND status = "active" AND contains(tags, "career")
SORT target_date ASC
```

## Portfolio Projects

```dataview
TABLE WITHOUT ID file.link AS Project, status AS Status, progress + "%" AS Progress, github AS GitHub
FROM "🚀 Projects"
WHERE type = "project"
SORT priority ASC, updated DESC
```

## This Week

```tasks
not done
tag includes #career
sort by priority
sort by due
```
