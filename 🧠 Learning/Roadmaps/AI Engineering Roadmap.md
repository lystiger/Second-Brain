---
type: roadmap
status: doing
priority: high
progress: 20
target_date:
owner: Lystiger
created: 2026-07-04
updated: 2026-07-04
tags: [roadmap, ai-engineering]
---

# AI Engineering Roadmap

## 1. Foundations

- [ ] Linear algebra, probability, optimization #learning
- [ ] Python engineering, testing, packaging #learning
- [ ] Data structures, algorithms, Linux, networking #learning

## 2. Modeling

- [ ] Classical ML and rigorous baselines #learning
- [ ] Deep learning and representation learning #learning
- [ ] Computer vision, NLP, and multimodal systems #learning

## 3. Production

- [ ] Data/version pipelines and experiment tracking #learning
- [ ] Model serving, observability, evaluation, rollback #learning
- [ ] Cost, latency, reliability, and security tradeoffs #learning

## 4. Leadership

- [ ] Architecture decisions and technical writing #learning
- [ ] Scoping, mentoring, estimation, incident review #learning
- [ ] Product thinking and measurable outcomes #learning

## Evidence

```dataview
TABLE WITHOUT ID file.link AS Project, status, progress + "%" AS Progress
FROM "🚀 Projects"
WHERE type = "project"
SORT updated DESC
```
