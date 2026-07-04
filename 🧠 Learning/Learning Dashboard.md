---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [dashboard, learning]
---

# Learning Dashboard

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

- [[🧠 Learning/AI/What is AI|Artificial Intelligence]]
- [[🧠 Learning/AI/ML/ML Fundamentals|Machine Learning]]
- [[🧠 Learning/AI/DL/Deep Learning Chapter 1|Deep Learning]]
- [[🧠 Learning/AI/GenAI/Transformer/What is Transformer|Transformers]]
- [[🧠 Learning/Roadmaps/MLOps Roadmap|MLOps]]
- [[🧠 Learning/Roadmaps/System Design Roadmap|System Design]]
