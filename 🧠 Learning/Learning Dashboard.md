---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-08-25
tags: [dashboard, learning]
---

# Learning Dashboard

## Course & Curriculum Trackers

- [[VinUni-AI20k-Curriculum-Schedule|VinUni-AI20k Curriculum & Repository Schedule]]
- [[K3-Course-Overview|K3 AI Engineering Master MOC]]

## Roadmaps

```dataview
TABLE WITHOUT ID file.link AS Roadmap, status AS Status, progress + "%" AS Progress, target_date AS Target
FROM "🧠 Learning/Roadmaps"
WHERE type = "roadmap"
SORT priority ASC
```

## Recently Updated Knowledge

```dataview
TABLE WITHOUT ID file.link AS Note, area AS Area, file.mtime AS Updated
FROM "🧠 Learning"
WHERE file.name != this.file.name AND type = "knowledge"
SORT file.mtime DESC
LIMIT 12
```

## Learning Tasks

```tasks
not done
tag includes #learning
sort by priority
sort by due
```

## Domain Maps

- [[What is AI|Artificial Intelligence]]
- [[ML Fundamentals|Machine Learning]]
- [[What is Transformer|Transformers]]
- [[MLOps Roadmap|MLOps]]
- [[System Design Roadmap|System Design]]

