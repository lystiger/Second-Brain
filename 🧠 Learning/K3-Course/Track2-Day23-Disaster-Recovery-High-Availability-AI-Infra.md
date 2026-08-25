---
title: "Track 2 Day 23: Disaster Recovery, High Availability & Chaos Engineering for AI Infrastructure"
type: knowledge
status: complete
created: 2026-08-25
updated: 2026-08-25
tags:
  - k3-course
  - track2-mlops
  - disaster-recovery
  - high-availability
  - chaos-engineering
  - rto-rpo
---

# Track 2 Day 23: Disaster Recovery, High Availability & Chaos Engineering for AI Infrastructure

## 1. Executive Overview

Deploying mission-critical AI systems requires resilient disaster recovery (DR) and high availability (HA) architectures. If a cloud region suffers a network partition, hardware failure, or database corruption, inference and retrieval endpoints must failover with minimal disruption.

Day 23 covers **multi-region AI serving architectures**, cross-region model weight and vector database replication, automated health checking, DNS/edge failover, and quantitative measurement of **Recovery Time Objective (RTO)** and **Recovery Point Objective (RPO)** under active chaos fault injections.

---

## 2. Multi-Region Active-Passive AI Serving & Failover Architecture

The diagram below illustrates the two-region AI infrastructure architecture featuring cross-region replication, continuous edge health checking, and automated traffic redirection upon primary region failure.

```mermaid
flowchart TB
    Client["Client / User Ingress"] --> EdgeProxy["Edge Load Balancer / DNS (Route53 Stand-in)"]
    
    subgraph RegionA["Region A (Primary - Active)"]
        APIA["Inference Serving API (Port 8001)"]
        VectorA["Vector Database (Qdrant / SQLite)"]
        WeightA["Model Weights Cache (vLLM / llama.cpp)"]
        
        APIA --> VectorA
        APIA --> WeightA
    end

    subgraph RegionB["Region B (Secondary - Hot Standby)"]
        APIB["Inference Serving API (Port 8002)"]
        VectorB["Vector Database Replica"]
        WeightB["Replicated Model Weights"]
        
        APIB --> VectorB
        APIB --> WeightB
    end

    subgraph ChaosReplication["Replication & Chaos Engine"]
        CrossRepl["Cross-Region Replication Sync (state/_replica/)"]
        Chaos["Chaos Engine: kill_region.py (SIGSTOP / SIGKILL)"]
        VectorA -.->|Async Snapshot Replication| CrossRepl
        CrossRepl -.->|Materialize Replica| VectorB
    end

    subgraph DRAgent["Automated Disaster Recovery (dr/)"]
        Health["Health Checker (Readiness Probes)"]
        Failover["Failover Controller (edge/active_region)"]
        Runbook["Automated Runbook Executor"]
        
        Health --> Failover
        Failover --> Runbook
    end

    EdgeProxy -->|Default Traffic (99%)| RegionA
    DRAgent -.->|Detect Outage & Flip Pointer| EdgeProxy
    EdgeProxy -.->|Failover Reroute| RegionB

    classDef client fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef regA fill:#1e293b,stroke:#34d399,stroke-width:2px,color:#fff;
    classDef regB fill:#1e293b,stroke:#fbbf24,stroke-width:2px,color:#fff;
    classDef chaos fill:#1e293b,stroke:#ec4899,stroke-width:2px,color:#fff;
    classDef dr fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#fff;

    class Client,EdgeProxy client;
    class RegionA regA;
    class RegionB regB;
    class ChaosReplication chaos;
    class DRAgent dr;
```

---

## 3. Quantitative Resiliency Metrics: RTO & RPO

In production AI systems, reliability is proven through empirical log analysis rather than theoretical estimations.

### 3.1 Recovery Time Objective (RTO)
The elapsed duration from the moment the primary region fails until the secondary region successfully serves healthy inference traffic:
$$	ext{RTO} = t_{	ext{first\_healthy\_response\_region\_B}} - t_{	ext{region\_A\_failure}}$$
- **Target SLO**: Measured $	ext{RTO} \le 15.0	ext{ seconds}$.

### 3.2 Recovery Point Objective (RPO)
The maximum allowable data loss measured in time or missing entity records due to replication lag during a disaster:
$$	ext{RPO} = N_{	ext{committed\_records\_region\_A}} - N_{	ext{recovered\_records\_region\_B}}$$
- **Target SLO**: Measured $	ext{RPO} \le 10	ext{ documents / embeddings}$.

---

## 4. Disaster Recovery Automation & Runbook Design

A production DR implementation consists of three automated modules:
1. **`health_checker.py`**: Executes deep multi-tier readiness probes:
   - Validates process liveness (`/health`).
   - Verifies model weight integrity and GPU memory pool initialization.
   - Asserts vector index document count matches expected thresholds.
2. **`failover.py`**: Implements deterministic traffic shifting:
   - Atomically updates the active region pointer file (`edge/active_region`).
   - Invalidates local DNS caching TTLs to accelerate edge convergence.
3. **`runbook.py`**: Coordinates post-incident containment and failback:
   - Restores missing vector snapshot deltas from primary write-ahead logs (WAL).
   - Re-warms model weight caches on standby nodes before restoring primary traffic.

---

## 5. Related Notes & Master Index
- [[K3-Course-Overview|K3 Course Master Map of Content]]
- [[K3-Day12-Cloud-Services-And-Deployment|K3 Day 12: Cloud Services & Deployment]]
- [[Track2-Day16-Cloud-AI-Infrastructure-Ray|Track 2 Day 16: Cloud AI Infrastructure]]
- [[Track2-Day20-Model-Serving-Inference-Optimization|Track 2 Day 20: Model Serving Optimization]]
- [[Track2-Day21-CICD-for-AI-Systems-DVC-MLflow|Track 2 Day 21: CI/CD for AI Systems]]
- [[VinUni-AI20k-Curriculum-Schedule|VinUni-AI20k Master Schedule]]
