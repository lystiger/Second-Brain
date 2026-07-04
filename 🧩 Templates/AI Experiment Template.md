---
title: "<% tp.file.title %>"
type: experiment
status: planning
priority: medium
project:
hypothesis:
metric:
baseline:
result:
decision:
dataset:
model:
code_commit:
environment:
seed:
owner: Lystiger
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
tags: [experiment, ai]
---

# <% tp.file.title %>

## Hypothesis

If **change**, then **metric** will improve from **baseline** to **target**, because **reason**.

## Decision This Enables


## Configuration

| Dimension | Value |
|---|---|
| Dataset/version |  |
| Split |  |
| Model/checkpoint |  |
| Features/augmentation |  |
| Hyperparameters |  |
| Seed |  |
| Hardware |  |
| Code commit |  |

## Evaluation Protocol

- Primary metric:
- Guardrail metrics:
- Comparison/baseline:
- Acceptance threshold:

## Results

| Run | Change | Metric | Cost/Latency | Notes |
|---|---|---:|---:|---|
|  |  |  |  |  |

## Analysis

- What changed?
- What surprised me?
- What could invalidate the result?

## Decision

**Adopt / iterate / reject / inconclusive:**

## Reproduction

```bash
# exact command
```
