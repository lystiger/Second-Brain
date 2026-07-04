---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [dashboard, weekly-review]
---

# Weekly Reviews

```dataview
TABLE WITHOUT ID file.link AS Review, week AS Week, energy AS Energy, score AS Score, file.mtime AS Updated
FROM "📓 Journal/Weekly"
WHERE type = "review" AND cadence = "weekly"
SORT week DESC
```

Create each review from [[🧩 Templates/Weekly Review Template]].
