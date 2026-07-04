---
type: dashboard
status: active
created: 2026-07-04
updated: 2026-07-04
tags: [dashboard, projects]
---

# Projects Dashboard

## Project Analytics

```dataviewjs
(async () => {
// ──────────────────────────────────────────────────────────────
// 1. Load live project metadata from YAML frontmatter.
// Dataview automatically reruns this block when indexed metadata changes.
// ──────────────────────────────────────────────────────────────
async function loadChartJs() {
  if (window.Chart) return window.Chart;

  // Reuse one in-flight loader when the dashboard is open in multiple panes.
  if (!window.__secondBrainChartPromise) {
    window.__secondBrainChartPromise = (async () => {
      // Preferred path: execute the tracked local UMD bundle through Dataview IO.
      try {
        const source = await dv.io.load("🗂️ Resources/Scripts/chart.umd.min.js");
        if (!source) throw new Error("The local Chart.js bundle is empty.");

        // Shadow CommonJS/AMD variables so the UMD build attaches to globalThis.Chart.
        const executeUmd = new Function("module", "exports", "define", source);
        executeUmd.call(window, undefined, undefined, undefined);
      } catch (localError) {
        console.warn("Local Chart.js load failed; trying CDN fallback.", localError);
      }

      if (window.Chart) return window.Chart;

      // Fallback path: useful if a platform blocks JavaScript vault assets.
      await new Promise((resolve, reject) => {
        const previous = document.querySelector("script[data-second-brain-chartjs]");
        if (previous) previous.remove();

        const script = document.createElement("script");
        script.dataset.secondBrainChartjs = "true";
        script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js";
        script.onload = resolve;
        script.onerror = () => reject(new Error("Chart.js CDN request failed."));
        document.head.appendChild(script);
      });

      if (!window.Chart) throw new Error("Chart.js loaded without exposing window.Chart.");
      return window.Chart;
    })().catch((error) => {
      delete window.__secondBrainChartPromise;
      throw error;
    });
  }

  return window.__secondBrainChartPromise;
}

let Chart;
try {
  Chart = await loadChartJs();
} catch (error) {
  console.error("Project dashboard Chart.js error", error);
  dv.paragraph(`Chart.js could not load: ${error.message}`);
  return;
}

const projects = dv.pages('"🚀 Projects"')
  .where((page) => page.type === "project")
  .map((page) => ({
    name: page.file.name,
    status: String(page.status ?? "planning").toLowerCase(),
    priority: String(page.priority ?? "medium").toLowerCase(),
    progress: Math.max(0, Math.min(100, Number(page.progress ?? 0))),
    deadline: page.deadline?.toFormat
      ? page.deadline.toFormat("yyyy-LL-dd")
      : (page.deadline ? String(page.deadline) : "No deadline")
  }))
  .array()
  .sort((a, b) => a.name.localeCompare(b.name));

if (!projects.length) {
  dv.paragraph("No project notes with `type: project` were found.");
  return;
}

// ──────────────────────────────────────────────────────────────
// 2. Normalize metadata into the dashboard's canonical buckets.
// ──────────────────────────────────────────────────────────────
function normalizeStatus(value) {
  if (["blocked", "on-hold", "on hold"].includes(value)) return "blocked";
  if (["completed", "done", "archived"].includes(value)) return "completed";
  if (["doing", "testing"].includes(value)) return "doing";
  return "planning"; // Includes idea, planning, and missing/unknown states.
}

function normalizePriority(value) {
  if (["critical", "high"].includes(value)) return "high";
  if (value === "low") return "low";
  return "medium";
}

function countBy(items, keys, selector) {
  const counts = Object.fromEntries(keys.map((key) => [key, 0]));
  items.forEach((item) => counts[selector(item)] += 1);
  return keys.map((key) => counts[key]);
}

const statusKeys = ["planning", "doing", "completed", "blocked"];
const priorityKeys = ["high", "medium", "low"];

// ──────────────────────────────────────────────────────────────
// 3. Read Minimal/Obsidian CSS variables for a native dark theme.
// ──────────────────────────────────────────────────────────────
const theme = getComputedStyle(document.body);
const cssVar = (name, fallback) => theme.getPropertyValue(name).trim() || fallback;
const textColor = cssVar("--text-normal", "#dcddde");
const mutedColor = cssVar("--text-muted", "#9b9fa8");
const gridColor = cssVar("--background-modifier-border", "#343842");

Chart.defaults.color = mutedColor;
Chart.defaults.font.family = cssVar("--font-interface", "Inter, sans-serif");

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 350 },
  plugins: {
    legend: {
      position: "bottom",
      labels: { color: textColor, usePointStyle: true, padding: 16 }
    },
    tooltip: {
      backgroundColor: "#111318",
      titleColor: "#ffffff",
      bodyColor: "#d8dbe2",
      borderColor: gridColor,
      borderWidth: 1,
      padding: 12
    }
  }
};

// ──────────────────────────────────────────────────────────────
// 4. Reusable card/chart renderer used by all three visualizations.
// ──────────────────────────────────────────────────────────────
const grid = dv.container.createDiv({ cls: "project-chart-grid" });
grid.style.setProperty("--project-progress-height", `${Math.max(300, projects.length * 34)}px`);
const activeCharts = [];

function renderChart({ title, subtitle, wide = false, config }) {
  const card = grid.createDiv({ cls: `project-chart-card${wide ? " project-chart-wide" : ""}` });
  card.createDiv({ cls: "project-chart-title", text: title });
  card.createDiv({ cls: "project-chart-subtitle", text: subtitle });
  const stage = card.createDiv({ cls: "project-chart-stage" });
  const canvas = stage.createEl("canvas", { attr: { "aria-label": title, role: "img" } });
  const chart = new Chart(canvas, config);
  activeCharts.push(chart);
  return chart;
}

// ──────────────────────────────────────────────────────────────
// 5. Project status pie chart.
// ──────────────────────────────────────────────────────────────
renderChart({
  title: "Project Status",
  subtitle: `${projects.length} projects across the delivery pipeline`,
  config: {
    type: "pie",
    data: {
      labels: ["Planning", "Doing", "Completed", "Blocked"],
      datasets: [{
        data: countBy(projects, statusKeys, (project) => normalizeStatus(project.status)),
        backgroundColor: ["#7c83fd", "#36c5a3", "#5b8def", "#ef6a78"],
        borderColor: cssVar("--background-primary", "#1e1e1e"),
        borderWidth: 3
      }]
    },
    options: commonOptions
  }
});

// ──────────────────────────────────────────────────────────────
// 6. Project priority doughnut chart.
// ──────────────────────────────────────────────────────────────
renderChart({
  title: "Project Priority",
  subtitle: "Portfolio attention by priority",
  config: {
    type: "doughnut",
    data: {
      labels: ["High", "Medium", "Low"],
      datasets: [{
        data: countBy(projects, priorityKeys, (project) => normalizePriority(project.priority)),
        backgroundColor: ["#ff6b81", "#f3b95f", "#63c7b2"],
        borderColor: cssVar("--background-primary", "#1e1e1e"),
        borderWidth: 3,
        hoverOffset: 6
      }]
    },
    options: { ...commonOptions, cutout: "62%" }
  }
});

// ──────────────────────────────────────────────────────────────
// 7. Per-project progress bar chart with deadline tooltips.
// ──────────────────────────────────────────────────────────────
renderChart({
  title: "Project Progress",
  subtitle: "YAML progress values, constrained to 0–100%",
  wide: true,
  config: {
    type: "bar",
    data: {
      labels: projects.map((project) => project.name),
      datasets: [{
        label: "Progress",
        data: projects.map((project) => project.progress),
        backgroundColor: "#6c9cff",
        borderColor: "#8db2ff",
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 18
      }]
    },
    options: {
      ...commonOptions,
      indexAxis: "y",
      plugins: {
        ...commonOptions.plugins,
        legend: { display: false },
        tooltip: {
          ...commonOptions.plugins.tooltip,
          callbacks: {
            label: (context) => `${context.raw}% · Deadline: ${projects[context.dataIndex].deadline}`
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          grid: { color: gridColor },
          ticks: { color: mutedColor, callback: (value) => `${value}%` }
        },
        y: {
          grid: { display: false },
          ticks: { color: textColor }
        }
      }
    }
  }
});

// Destroy Chart.js instances when Dataview replaces this rendered block.
const cleanupObserver = new MutationObserver(() => {
  if (grid.isConnected) return;
  activeCharts.forEach((chart) => chart.destroy());
  cleanupObserver.disconnect();
});
cleanupObserver.observe(document.body, { childList: true, subtree: true });
})();
```

## Current Projects

```dataview
TABLE WITHOUT ID file.link AS Project, status AS Status, priority AS Priority, progress + "%" AS Progress, deadline AS Deadline, github AS GitHub
FROM "🚀 Projects"
WHERE type = "project" AND status != "completed" AND status != "archived"
SORT priority ASC, deadline ASC
```

## Pipeline

![[🚀 Projects/Project Pipeline]]

## Recently Active

```dataview
TABLE WITHOUT ID file.link AS Note, project AS Project, type AS Type, file.mtime AS Modified
FROM "🚀 Projects"
WHERE file.name != this.file.name AND type != "project"
SORT file.mtime DESC
LIMIT 15
```

## Completed Projects

```dataview
TABLE WITHOUT ID file.link AS Project, updated AS Completed, github AS GitHub
FROM "🚀 Projects"
WHERE type = "project" AND status = "completed"
SORT updated DESC
```
