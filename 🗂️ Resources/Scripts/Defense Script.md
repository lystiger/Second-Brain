# Opening:

Good morning, respected members of the committee, lecturers, and everyone attending my bachelor's thesis defense.

First of all, I would like to express my sincere gratitude for your time and the opportunity to present my research today.

My thesis is titled "Design and Implementation of an AI-powered Monitoring and Observability Platform for Automated Optical Inspection Systems."

*slide 1: thesis title*

Today, I will first introduce the manufacturing background, explain the problem this research addresses, present my proposed solution, demonstrate the implemented system, and finally discuss the evaluation results and future work.

*slide 2: presentation structure*

---

## Step 1: Problem

*slide 3: PCB board and electrical devices like GPU, wifi, router, ...*

Printed Circuit Boards, or PCBs, are fundamental components in almost every modern electronic device. As demand for AI hardware, consumer electronics, and automotive systems continues to grow, PCB manufacturing has become increasingly important.

One of the most widely used manufacturing processes is Surface Mount Technology, or SMT.

*slide 4: SMT images*

*point at the SMT image*

As shown in this production line, the PCB first passes through solder paste printing, followed by component placement using Pick-and-Place machines.

To ensure product quality, the boards are then inspected by Automated Optical Inspection, or AOI, systems.

*slides 5: AOI machines*

*Now point*

In this production line, two AOI machines are deployed.

The first AOI performs inspection before the reflow process to detect component placement errors.

The second AOI performs the final quality inspection after soldering has been completed.

---

## Step 2: Why Current Solutions Are Not Enough

**Now transition.**

> "So what kinds of defects can occur during PCB manufacturing?"

*slide 6: images of defections*

*(show images)*

> "Examples include missing components, misalignment, polarity errors, tombstoning, solder bridges, and insufficient solder joints."

> "Detecting these defects accurately is critical because even a single faulty component may lead to product failure."

**Then transition.**

*slide 7: table of comparision between AI-AOI and rule-based AOI in terms of efficiency*

> "Traditionally, AOI systems relied on rule-based image processing."

> "While effective in many cases, these systems often generated false positives and false negatives under complex production conditions."

**Then**

> "To improve inspection accuracy, modern production lines increasingly integrate deep learning models into AOI systems."

**Then**

> "However, introducing AI creates a new challenge."

**Pause.**

> "AI models can experience degraded confidence, abnormal prediction behavior, unexpected failures, or performance changes over time."

*slide 8: AI failure dashbooard or example of an AI problem*

**Another pause.**

> "Despite these risks, many AOI deployments primarily focus on inference accuracy while providing limited visibility into the behavior of the AI system itself."

> "Engineers often lack a centralized platform to monitor inference results, analyze abnormal events, trace prediction history, and diagnose system failures efficiently."

**Then conclude.**

> "This observation motivated the research presented in this thesis."

---

## Step 3: My proposed idea

*slide 9: architecture of the system*

> "Based on the previous problem, my proposed idea is to make the AI inference process observable without directly interrupting the AOI application."

> "Instead of only showing the final prediction result, the AOI application also produces structured inference events in JSON format."

**Then point to AOI app.**

> "Each event contains important information such as timestamp, prediction result, confidence score, latency, status, and possible error message."

**Point to log file.**

> "These events are written as append-only logs. This design keeps the inference application simple and avoids tightly coupling it to the monitoring system."

**Point to Promtail.**

> "Promtail acts as a lightweight log collector. It continuously reads the log file, attaches labels such as service name or environment, and forwards the logs to Loki."

**Point to Loki.**

> "Loki stores and indexes the logs using labels instead of indexing the full message content. This makes it lightweight and suitable for log-based monitoring."

**Point to Grafana.**

> "Finally, Grafana queries Loki and transforms these logs into operational dashboards, such as total inference events, recent failures, confidence distribution, and latency trends."

**Then conclude:**

> "In other words, the proposed system turns raw AI predictions into observable engineering signals."

*slide 10: tables of comparision between Loki, ELK, , answering question why Loki ?*

> "After designing the architecture, the next question was selecting a monitoring stack."

> "I compared three popular logging platforms."

### Loki

> "Loki was selected because it indexes labels instead of the entire log content."

> "This significantly reduces storage requirements while remaining fast for structured monitoring queries."

### ELK

> "ELK provides powerful full-text search but requires significantly more storage and operational resources."

### OpenSearch

> "OpenSearch offers capabilities similar to Elasticsearch and is fully open source, but its deployment complexity is still higher than what this project requires."

**Then finish with**

> "Since this thesis focuses on monitoring an AI inference service rather than building a large enterprise logging platform, Loki provides the best balance between simplicity, performance, and maintainability."

---

## Step 4: How it works

Let me show you one event travelling through the system by zooming into that backend and follow one inference event through the pipeline,

### Start

> "Now let us follow one PCB inspection through the system."

### Step 1

*(point to AOI)*

> "The operator uploads a PCB image."

### Step 2

> "The AI model performs defect detection."

### Step 3

> "The backend converts the prediction into a structured inference event."

**Pause.**

This is your most important sentence.

**Not**

> "The backend logs data."

**Instead**

> "The prediction becomes an operational event."

Huge difference.

### Step 4

> "The event is written into a JSON log."

### Step 5

> "Promtail automatically detects the new log entry and forwards it to Loki."

### Step 6

> "Loki stores and indexes the event."

### Step 7

> "Grafana continuously queries Loki."

### Step 8

> "The dashboard is updated almost immediately."

### Step 9

> "If abnormal behavior is detected, predefined alert rules notify engineers."

> "In other words, instead of only knowing what the AI predicted, engineers can also understand how the AI system behaves during operation."

---

## Step 5: Implementation

**Transition.**

*slide 13: Implementation section divider*

> "Having covered the design, let me now walk you through what was actually built."

**Point to the three pills on screen.**

> "This section covers three parts: an overview of what was built, the internal software structure, and a walkthrough of one event moving through the real running system."

*slide 14: Implementation overview — four cards*

**Point to each card in turn as you name it.**

> "The implementation consists of four layers."

> "The AI slash API layer is a FastAPI service that validates every inference event."

> "The AOI workstation is a React review interface operators use for real board runs."

> "The deployment layer uses Docker Compose to run the API, the web interface, Loki, Promtail, and Grafana together as one reproducible stack."

> "And the engineer view is the set of Grafana dashboards and alert rules the engineer actually looks at."

**Pause.**

> "This is not only a pipeline diagram — it includes backend code, frontend UI, Docker deployment, and live monitoring dashboards."

*slide 15: GitHub repository structure*

> "The repository is organized so each layer has a clear home."

**Point to the tree on the left.**

> "The backend folder holds the FastAPI routes, the event schema, the database layer, and the JSONL writer."

> "The frontend folder holds the React review workstation."

> "The monitoring folder holds the Promtail, Loki, and Grafana provisioning."

> "And the experiments folder holds the nine scenario cases and the scripts used to measure freshness, query performance, and resource usage — which I will show shortly."

*slide 16: Implemented software structure*

> "On the backend side, the InferenceEvent schema is the contract that ties everything together."

**Point to the diagram on the left.**

> "The FastAPI backend validates incoming predictions against this schema, the inference runner produces predictions, SQLite persists a queryable copy, and the JSONL writer appends that same event as a durable log line."

**Point to the right column.**

> "And this isn't only a diagram either — on the right you can see the actual Promtail tailer output, the actual Loki indexed event, and the actual Grafana dashboard, all produced from one real inference event."

**Transition.**

> "Let me now walk through that one event end to end, using real evidence at every step."

*slide 17: Implementation 1 — AOI to AI prediction*

**Point to the board image on the left.**

> "This is a real captured PCB image from the AOI workstation."

**Point to the panel on the right.**

> "And this is the actual model output for that image: an open-circuit defect, with a confidence score of zero point ninety-one, and an inference latency of thirty-seven milliseconds."

**Pause.**

> "This is the exact JSON payload the model hands off to the API — not a mockup, this is what the running system actually produced."

*slide 18: Implementation 2 — API to JSONL evidence*

**Point left.**

> "FastAPI receives this prediction at the events endpoint and returns a two-oh-two accepted response with a run ID."

**Point right.**

> "That same event is then written as one JSON line into the shared log volume that Promtail is watching."

**Pause. This is your most important sentence.**

> "This is the key move in the whole architecture: a raw prediction becomes a durable, append-only operational event."

*slide 19: Implementation 3 — log collection to indexing*

**Point left.**

> "Promtail tails that file and forwards the parsed record to Loki — you can see it picking up the target and starting to tail the log."

**Point right.**

> "And here is the same event, now indexed in Loki. A LogQL range query on the pcb_id label returns exactly this record."

> "This shows the collector and the indexer actually working, not just described on a slide."

*slide 20: Implementation 4 — Grafana to alerting*

**Point left.**

> "This is the live Grafana AOI dashboard: events in the last five minutes, failures, boards seen, and average latency, with the raw event stream underneath."

**Point right.**

> "And these are the provisioned alert rules — high defect rate, latency spikes, and low-confidence storms — all currently healthy and evaluating every minute."

*slide 21: End-to-end implementation summary*

**Sweep your hand across the row, left to right.**

> "So to summarize: one board image becomes an AI prediction, becomes a validated event, becomes a collected log, becomes an indexed query, and finally becomes something an engineer can see and act on."

**Pause.**

> "Every one of these five steps is backed by a real screenshot from the running system, and reproducible from the repository."

---

## Step 6: Evaluation

**Transition.**

*slide 22: Evaluation strategy*

> "With the system implemented, the next question is how to evaluate it."

**Point to each of the three cards.**

> "The evaluation has three parts: scenario coverage, operational visibility, and cost and design tradeoffs."

**Pause.**

> "It's important to be precise about scope here. This evaluation validates the observability pipeline and monitoring behavior. Detector accuracy is reported separately, and is not the main claim of this section."

*slide 23: Scenario suite*

> "To test scenario coverage, I designed nine injected scenarios: a normal baseline, high defect rate, latency spike, low confidence, defect flood, board failure, recovery, intermittent faults, and gradual degradation."

**Pause.**

> "All nine are production-inspired failure patterns for an AOI line."

*slide 24: Anomaly evidence in Grafana*

**Point across the 3-by-3 grid.**

> "And here is the evidence: all nine scenarios, each one visible as a distinct signal in Grafana."

> "Spikes, low-confidence storms, board failures, and drift are all easy to isolate once predictions are stored as structured, queryable events instead of plain-text logs."

*slide 25: System performance and resource cost*

> "Next, operational visibility and cost."

**Point to the four stat cards.**

> "Mean freshness — the time from an API event being written to it being visible in Loki — was one point two six seconds across ten trials."

> "A targeted board-isolation query over forty-eight entries took under nineteen milliseconds. Even an anomaly query filtering for latency spikes over a hundred and eighty entries stayed under thirty-five milliseconds."

**Point to the charts below.**

> "On the resource side, the heaviest containers — Loki and Promtail — use under one percent CPU each, and total storage growth is only around three hundred eighty kilobytes per thousand events."

**Pause.**

> "This confirms the whole observability path is lightweight enough to run alongside an actual AOI workstation."

*slide 26: Label and model evaluation*

> "One design decision deserved a closer look: using the PCB ID directly as a Loki label."

**Point to the left chart.**

> "As the number of boards ingested grows, using pcb_id as a label pushes active series past Loki's default stream limit. Parsing it from the JSON payload instead keeps cardinality flat."

**Point to the right chart.**

> "The tradeoff is query latency — label-based lookups are faster, but only if cardinality stays under control."

**Point to the bottom chart.**

> "For completeness, here is the underlying detector's per-class F1 score. Most classes clear the target of zero point seventy-five, though a couple are weaker — a limitation I'll return to shortly."

---

## Step 7: Limitations and Future Work

**Transition.**

*slide 27: Limitations*

> "No system is without limitations, and I want to be upfront about them."

**Point to each card in turn.**

> "This is logs-only observability — there is no distributed tracing across acquisition, inference, persistence, and review yet."

> "The nine anomaly scenarios were deliberately designed and intensified — they validate visibility, not real factory defect rates."

> "The label schema was validated at prototype scale; the cardinality ablation shows it must be redesigned before production scale."

> "And the whole platform has been validated on a local workstation deployment, not yet on a full production line."

**Pause.**

> "In short: this is a monitoring prototype and experimental framework, not a complete production-grade MLOps platform."

*slide 28: Future work*

> "That naturally points to five directions for future work."

**Point down the list, one at a time.**

> "Hardening the detector toward assembled-board, post-placement defects."

> "Enriching each event with model version, runtime, and hardware metadata."

> "Calibrating alert thresholds against real production data."

> "Redesigning the label schema to demote high-cardinality identifiers like pcb_id."

> "And comparing this log-based approach against richer metrics and distributed tracing systems."

---

## Closing

*slide 29: Conclusion*

**Pause. Slow down.**

> "AI-based AOI needs operational visibility, not only prediction accuracy."

**Point to the three pillars.**

> "This thesis delivered a lightweight observability platform that turns AOI model predictions into structured, queryable, and visualized operational events — with every inference carrying traceable identifiers, running on a lightweight stack of FastAPI, JSONL, Promtail, Loki, and Grafana, and validated against nine realistic scenarios."

**Final line. Slow down further.**

> "Useful AI monitoring starts with a disciplined event schema, a reproducible log pipeline, and dashboards that answer concrete engineering questions."

*slide 30: Merci — thank you*

**Pause. Look up at the committee.**

> "Thank you very much for your attention. I'm happy to take your questions."
