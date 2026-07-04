---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [dashboard, research]
---

# Research Dashboard

## Reading Queue

```dataview
TABLE WITHOUT ID file.link AS Paper, authors AS Authors, year AS Year, status AS Status, relevance AS Relevance
FROM "📄 Research Papers"
WHERE type = "research-paper" AND status != "completed"
SORT relevance DESC, year DESC
```

## Completed Papers

```dataview
TABLE WITHOUT ID file.link AS Paper, year AS Year, project AS Project, rating AS Rating
FROM "📄 Research Papers"
WHERE type = "research-paper" AND status = "completed"
SORT updated DESC
```

## Research Questions

- What decision will this paper inform?
- What is genuinely new compared with the baseline?
- Which assumptions fail in a production environment?
- Can one experiment reproduce the central claim?
