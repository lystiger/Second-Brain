---
type: index
project: "[[HASC]]"
---
# HASC Meetings
```dataview
TABLE WITHOUT ID file.link AS Meeting, date, attendees, status
FROM "🚀 Projects/HASC/Meetings"
WHERE type = "meeting"
SORT date DESC
```
