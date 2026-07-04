---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [dashboard, activity]
---

# Activity Dashboard

## Recently Created Notes

```dataview
TABLE WITHOUT ID file.link AS Note, type AS Type, file.ctime AS Created
FROM ""
WHERE file.name != this.file.name AND !startswith(file.path, "🧩 Templates/")
SORT file.ctime DESC
LIMIT 15
```

## Recently Modified Notes

```dataview
TABLE WITHOUT ID file.link AS Note, type AS Type, file.mtime AS Modified
FROM ""
WHERE file.name != this.file.name AND !startswith(file.path, "🧩 Templates/")
SORT file.mtime DESC
LIMIT 15
```

## AI Experiments

```dataview
TABLE WITHOUT ID file.link AS Experiment, project AS Project, status AS Status, hypothesis AS Hypothesis, metric AS Metric, result AS Result
FROM "🚀 Projects"
WHERE type = "experiment"
SORT created DESC
LIMIT 20
```

## Research Papers

```dataview
TABLE WITHOUT ID file.link AS Paper, status AS Status, year AS Year, relevance AS Relevance, project AS Project
FROM "📄 Research Papers"
WHERE type = "research-paper"
SORT updated DESC
LIMIT 20
```

## Books Currently Reading

```dataview
TABLE WITHOUT ID file.link AS Book, author AS Author, progress + "%" AS Progress
FROM "📚 Books"
WHERE type = "book" AND status = "reading"
SORT started ASC
```
