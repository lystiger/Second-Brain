---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [dashboard, reading]
---

# Reading Dashboard

## Currently Reading

```dataview
TABLE WITHOUT ID file.link AS Book, author AS Author, progress + "%" AS Progress, started AS Started
FROM "📚 Books"
WHERE type = "book" AND status = "reading"
SORT started ASC
```

## Queue

```dataview
TABLE WITHOUT ID file.link AS Book, author AS Author, priority AS Priority, area AS Area
FROM "📚 Books"
WHERE type = "book" AND status = "queued"
SORT priority ASC
```

## Completed

```dataview
TABLE WITHOUT ID file.link AS Book, author AS Author, rating AS Rating, finished AS Finished
FROM "📚 Books"
WHERE type = "book" AND status = "completed"
SORT finished DESC
```
