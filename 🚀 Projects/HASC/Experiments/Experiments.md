---
type: index
project: "[[HASC]]"
---
# HASC Experiments
```dataview
TABLE WITHOUT ID file.link AS Experiment, status, hypothesis, metric, result
FROM "🚀 Projects/HASC/Experiments"
WHERE type = "experiment"
SORT created DESC
```
