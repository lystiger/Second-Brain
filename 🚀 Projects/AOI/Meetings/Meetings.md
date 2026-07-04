---
type: index
project: "[[AOI]]"
---
# AOI Meetings
```dataview
TABLE WITHOUT ID file.link AS Meeting, date, attendees, status
FROM "🚀 Projects/AOI/Meetings"
WHERE type = "meeting"
SORT date DESC
```
