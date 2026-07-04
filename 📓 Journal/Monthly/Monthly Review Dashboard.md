---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [dashboard, monthly-review]
---

# Monthly Reviews

```dataview
TABLE WITHOUT ID file.link AS Review, month AS Month, score AS Score, file.mtime AS Updated
FROM "📓 Journal/Monthly"
WHERE type = "review" AND cadence = "monthly"
SORT month DESC
```

Create each review from [[🧩 Templates/Monthly Review Template]].
