---
title: <% tp.date.now("GGGG-[W]WW") %>
type: review
cadence: weekly
status: completed
week: <% tp.date.now("GGGG-[W]WW") %>
energy:
score:
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
tags: [review/weekly]
---

# Weekly Review · <% tp.date.now("GGGG-[W]WW") %>

## Scorecard

| Area | Score / 10 | Evidence |
|---|---:|---|
| Projects |  |  |
| Learning |  |  |
| Career |  |  |
| Health/Energy |  |  |
| System |  |  |

## Completed This Week

```tasks
done after <% tp.date.now("YYYY-MM-DD", -7) %>
done before <% tp.date.now("YYYY-MM-DD", 1) %>
sort by done
```

## Project Review

```dataview
TABLE WITHOUT ID file.link AS Project, status, progress + "%" AS Progress, deadline
FROM "🚀 Projects"
WHERE type = "project" AND status != "completed" AND status != "archived"
SORT priority ASC
```

## Wins

-

## Friction and Root Causes

-

## Decisions

- Continue:
- Stop:
- Start:

## Next Week's Three Outcomes

- [ ]
- [ ]
- [ ]

## Inbox and System Hygiene

- [ ] Process inbox
- [ ] Update project status/progress
- [ ] Connect orphan research and knowledge notes
- [ ] Archive completed or irrelevant work
