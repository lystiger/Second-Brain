---
cssclasses:
  - home-dashboard
aliases: [Home, Command Center]
tags: [dashboard, os]
type: dashboard
created: 2026-07-04
updated: 2026-07-04
---

<div class="home-masthead">
  <div class="home-eyebrow">ELYSIA OS · COMMAND CENTER</div>
  <div class="home-clock">00<span>:</span>00<span>:</span>00</div>
  <div class="home-date">LOCAL TIME</div>
</div>

```dataviewjs
(() => {
  // Keep this renderer invisible; it only drives the masthead clock.
  dv.container.classList.add("home-clock-runtime");

  const view = dv.container.closest(".markdown-preview-view, .markdown-source-view") ?? document;
  const clock = view.querySelector(".home-clock");
  const dateElement = view.querySelector(".home-date");

  if (view instanceof HTMLElement) {
    const imageUrl = app.vault.adapter.getResourcePath("🖼️ Images/hi.webp");
    view.style.setProperty("--home-triptych-image", `url("${imageUrl}")`);
  }

  if (!clock || !dateElement) return;

  const weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const time = `${hours}:${minutes}:${seconds}`;

    if (clock.textContent !== time) {
      const separatorOne = document.createElement("span");
      const separatorTwo = document.createElement("span");
      separatorOne.textContent = ":";
      separatorTwo.textContent = ":";
      clock.replaceChildren(
        document.createTextNode(hours),
        separatorOne,
        document.createTextNode(minutes),
        separatorTwo,
        document.createTextNode(seconds)
      );
      clock.setAttribute("aria-label", `Current local time: ${time}`);
    }

    dateElement.textContent = `${weekdays[now.getDay()]} · ${String(now.getDate()).padStart(2, "0")} ${months[now.getMonth()]} ${now.getFullYear()}`;
  }

  updateClock();
  const timer = window.setInterval(updateClock, 1000);

  // Stop the interval when Dataview unloads or rerenders this note.
  const cleanupObserver = new MutationObserver(() => {
    if (dv.container.isConnected) return;
    window.clearInterval(timer);
    cleanupObserver.disconnect();
  });
  cleanupObserver.observe(document.body, { childList: true, subtree: true });
})();
```

<div class="home-card-grid">
  <a class="home-card home-card-vault internal-link" data-href="🧭 OS/README" href="🧭 OS/README">
    <span class="home-card-kicker">SYSTEM · VAULT</span>
    <strong>Operate the system</strong>
    <span>Goals · Tasks · Reviews</span>
  </a>
  <a class="home-card home-card-work internal-link" data-href="🚀 Projects/Projects Dashboard" href="🚀 Projects/Projects Dashboard">
    <span class="home-card-kicker">PROJECTS · BUILD</span>
    <strong>Ship useful systems</strong>
    <span>Projects · Experiments · Architecture</span>
  </a>
  <a class="home-card home-card-study internal-link" data-href="🧠 Learning/Learning Dashboard" href="🧠 Learning/Learning Dashboard">
    <span class="home-card-kicker">KNOWLEDGE · LEARN</span>
    <strong>Compound knowledge</strong>
    <span>AI · MLOps · System Design</span>
  </a>
</div>

<div class="home-quicklinks">
  <a class="internal-link" data-href="📥 Inbox/Quick Capture" href="📥 Inbox/Quick Capture">＋ Capture</a>
  <a class="internal-link" data-href="🧭 OS/Dashboards/Task Hub" href="🧭 OS/Dashboards/Task Hub">✓ Tasks</a>
  <a class="internal-link" data-href="🚀 Projects/Elysia/Elysia" href="🚀 Projects/Elysia/Elysia">✦ Elysia</a>
  <a class="internal-link" data-href="💼 Career/Career Dashboard" href="💼 Career/Career Dashboard">⌁ Career</a>
  <a class="internal-link" data-href="💼 Career/Japan/Japan Dashboard" href="💼 Career/Japan/Japan Dashboard">◇ Japan</a>
  <a class="internal-link" data-href="📓 Journal/Weekly/Weekly Review Dashboard" href="📓 Journal/Weekly/Weekly Review Dashboard">↻ Review</a>
  <a class="internal-link" data-href="🧭 OS/Dashboards/Activity Dashboard" href="🧭 OS/Dashboards/Activity Dashboard">◷ Activity</a>
</div>

## Today

```tasks
not done
(due today) OR (scheduled today)
sort by priority
sort by due
limit 12
```

## Current Projects

```dataview
TABLE WITHOUT ID
  file.link AS Project,
  status AS Status,
  priority AS Priority,
  progress + "%" AS Progress,
  deadline AS Deadline
FROM "🚀 Projects"
WHERE type = "project" AND status != "completed" AND status != "archived"
SORT deadline ASC
```

## Upcoming Deadlines

```tasks
not done
due after today
due before in 14 days
sort by due
limit 10
```

## Recently Modified

```dataview
LIST
FROM ""
WHERE file.name != this.file.name
SORT file.mtime DESC
LIMIT 8
```

<div class="home-panel-grid">
  <section class="home-panel">
    <div class="home-panel-title"><span>◇</span> Direction</div>
    <a class="internal-link" data-href="🧭 OS/Dashboards/Goals Dashboard" href="🧭 OS/Dashboards/Goals Dashboard">Goals Dashboard</a>
    <a class="internal-link" data-href="💼 Career/AI Systems Architect Roadmap" href="💼 Career/AI Systems Architect Roadmap">Career Roadmap</a>
    <a class="internal-link" data-href="🧠 Learning/Roadmaps/AI Engineering Roadmap" href="🧠 Learning/Roadmaps/AI Engineering Roadmap">Learning Roadmap</a>
  </section>
  <section class="home-panel">
    <div class="home-panel-title"><span>◌</span> Workspaces</div>
    <a class="internal-link" data-href="🚀 Projects/Elysia/Elysia" href="🚀 Projects/Elysia/Elysia">Elysia</a>
    <a class="internal-link" data-href="📄 Research Papers/Research Dashboard" href="📄 Research Papers/Research Dashboard">Research</a>
    <a class="internal-link" data-href="📚 Books/Reading Dashboard" href="📚 Books/Reading Dashboard">Reading</a>
  </section>
  <section class="home-panel">
    <div class="home-panel-title"><span>✦</span> Reviews</div>
    <a class="internal-link" data-href="📓 Journal/Weekly/Weekly Review Dashboard" href="📓 Journal/Weekly/Weekly Review Dashboard">Weekly Review</a>
    <a class="internal-link" data-href="📓 Journal/Monthly/Monthly Review Dashboard" href="📓 Journal/Monthly/Monthly Review Dashboard">Monthly Review</a>
    <a class="internal-link" data-href="🧭 OS/Standards/Workflow" href="🧭 OS/Standards/Workflow">Operating Manual</a>
  </section>
</div>

<div class="home-footer">CAPTURE · CONNECT · BUILD · REVIEW</div>
