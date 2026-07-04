---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [dashboard, ideas]
---

# Ideas Dashboard

```dataview
TABLE WITHOUT ID file.link AS Idea, area AS Area, priority AS Priority, created AS Created
FROM "🧭 OS/Ideas"
WHERE type = "idea" AND status = "open"
SORT priority ASC, created DESC
```

Promote an idea to a project only when it has a user/problem, expected value, and a small validation step.
