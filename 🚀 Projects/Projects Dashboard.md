---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [dashboard, projects]
---

# Projects Dashboard

## Current Projects

```dataview
TABLE WITHOUT ID file.link AS Project, status AS Status, priority AS Priority, progress + "%" AS Progress, deadline AS Deadline, github AS GitHub
FROM "🚀 Projects"
WHERE type = "project" AND status != "completed" AND status != "archived"
SORT priority ASC, deadline ASC
```

## Pipeline

![[🚀 Projects/Project Pipeline]]

## Recently Active

```dataview
TABLE WITHOUT ID file.link AS Note, project AS Project, type AS Type, file.mtime AS Modified
FROM "🚀 Projects"
WHERE file.name != this.file.name AND type != "project"
SORT file.mtime DESC
LIMIT 15
```

## Completed Projects

```dataview
TABLE WITHOUT ID file.link AS Project, updated AS Completed, github AS GitHub
FROM "🚀 Projects"
WHERE type = "project" AND status = "completed"
SORT updated DESC
```
