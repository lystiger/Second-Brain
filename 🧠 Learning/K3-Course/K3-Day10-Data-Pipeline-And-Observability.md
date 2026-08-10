---
title: "K3 Day 10: Data Pipeline & Data Observability"
type: course_note
course: K3 AI Engineering
day: 10
tags:
  - k3-course
  - ai-engineering
  - data-pipeline
  - data-observability
  - rag
  - chromadb
  - evaluation
  - crossref
created: 2026-08-10
last_modified: 2026-08-10
status: complete
---

# K3 Day 10: Data Pipeline & Data Observability

## Executive Summary

Data quality is the foundational determinant of performance for Retrieval-Augmented Generation (RAG) and LLM agent systems. Day 10 focuses on building an end-to-end data pipeline for academic paper retrieval via the Crossref API, establishing automated data observability, simulating synthetic data corruption, quantifying RAG quality degradation, and executing zero-data-loss repairs from raw storage artifacts.

By enforcing raw artifact traceability, vector embedding normalization, and continuous observability across a 3-state pipeline (Baseline $\rightarrow$ Corrupted $\rightarrow$ Repaired), engineers can diagnose silent data drift, prevent bad context ingestion, and guarantee high RAG retrieval hit rates and response accuracy.

---

## Theoretical Foundations

### 1. Data Lifecycle & Raw Artifact Traceability
Production RAG systems frequently suffer from upstream API drift, missing metadata fields, or malformed text payloads. To ensure complete auditability and idempotent pipeline recovery:
- **Raw Storage Layer (`data/raw/`)**: All external HTTP API payloads (e.g. JSON responses from Crossref) are immutably persisted prior to processing.
- **Idempotent Repair Guarantee**: If downstream data cleaning rules fail or incoming records become corrupted, the clean dataset can be fully restored by re-running normalization functions against the raw storage snapshots without re-fetching from rate-limited external APIs.

$$\text{Data}_{\text{Clean}} = \mathcal{N}(\text{Data}_{\text{Raw}})$$

Where $\mathcal{N}$ represents the deterministic normalization transformation.

```
+------------------+      +-------------------+      +--------------------+
|  External API    | ---> |  Raw Payload Store| ---> | Cleaned Dataset    |
| (Crossref API)   |      | (data/raw/*.json) |      | (data/clean/*.csv) |
+------------------+      +-------------------+      +--------------------+
                                    |                           ^
                                    +-- (Replay / Repair Path) -+
```

### 2. Vector Embedding & Semantic Indexing
To perform semantic search across academic papers, text contents must be transformed into dense vector representations:
- **Text Formulation**: Abstract text, author lists, DOI metadata, and title are consolidated into a standardized string field `text_for_embedding`.
- **Dense Representation**: Using `SentenceTransformers` (`all-MiniLM-L6-v2`), textual sequences are mapped to $384$-dimensional embedding vectors.
- **Vector Database Storage**: Vectors are indexed inside ChromaDB with HNSW (Hierarchical Navigable Small World) indexing for fast cosine similarity search.

$$\text{Cosine Similarity}(u, v) = \frac{u \cdot v}{\|u\| \|v\|}$$

### 3. RAG Evaluation Triad & Metrics
Evaluating RAG performance requires multi-dimensional quality metrics measured across ground-truth question-answer evaluation pairs:
- **Retrieval Hit Rate**: Measures whether the ground-truth target paper is present within the top-$k$ retrieved vector contexts.

$$\text{Hit Rate} = \frac{\mathbb{I}(\text{Target Paper} \in \text{Top-}k \text{ Results})}{N}$$

- **Mean Token F1**: Precision and recall overlay between the generated answer tokens and ground-truth reference tokens.

$$\text{Precision} = \frac{|T_{\text{gen}} \cap T_{\text{ref}}|}{|T_{\text{gen}}|}, \quad \text{Recall} = \frac{|T_{\text{gen}} \cap T_{\text{ref}}|}{|T_{\text{ref}}|}, \quad \text{F1} = \frac{2 \cdot P \cdot R}{P + R}$$

- **LLM Judge Score (1–5 Scale)**: Automated grading by a judge model assessing semantic correctness, factual alignment, and hallucinations.

### 4. Data Observability & Assertion Framework
Data observability monitors data quality in real-time before bad data compromises downstream LLM outputs. Core assertion checks include:
- **Schema & Completeness**: Assert zero null values in critical fields (`doi`, `title`, `text_for_embedding`).
- **Uniqueness**: Assert zero duplicate DOIs.
- **Text Length Thresholds**: Assert minimum word counts (e.g. `len(text) >= 50`) to prevent indexing truncated or empty summaries.
- **Freshness Monitoring**: Calculate document age in days ($\text{Age}_{\text{days}} = \text{Date}_{\text{now}} - \text{Date}_{\text{published}}$) to detect stale knowledge base entries.

---

## Architecture & System Breakdown

The system comprises five core modules operating across ingestion, vector storage, synthetic corruption, evaluation, and web dashboard visualization.

```mermaid
flowchart LR
    subgraph Ingestion ["1. Ingestion & Storage"]
        API["Crossref REST API"] -->|Fetch Raw Metadata| RawStore[("Raw Storage\ndata/raw/crossref.json")]
        RawStore -->|Normalize & Clean| Cleaner["Data Cleaner Module"]
        Cleaner -->|Clean Dataset| CleanStore[("Clean Storage\ndata/clean/papers.csv")]
    end

    subgraph VectorDB ["2. Vector Indexing & Retrieval"]
        CleanStore --> Embedder["SentenceTransformers\n(all-MiniLM-L6-v2)"]
        Embedder --> ChromaDB[("ChromaDB Vector Store\n(384-dim HNSW Index)")]
        ChromaDB --> RAGAgent["RAG QA Agent\n(Gemini / OpenAI API)"]
    end

    subgraph Evaluation ["3. Observability & Evaluation"]
        CleanStore --> QualCheck["Data Quality & Freshness Engine"]
        RAGAgent --> EvalEngine["Evaluation Suite\n(Hit Rate, F1, LLM Judge)"]
        QualCheck --> Dash["7-Tab Observability Web App"]
        EvalEngine --> Dash
    end

    subgraph Reliability ["4. Corruption & Repair Cycle"]
        CorruptEngine["Synthetic Corruption Engine"] -. Inject Noise & Nulls .-> CleanStore
        RawStore -. Replay & Restore .-> CleanStore
    end

    classDef primary fill:#1e3a8a,stroke:#3b82f6,color:#fff
    classDef secondary fill:#065f46,stroke:#10b981,color:#fff
    classDef alert fill:#991b1b,stroke:#ef4444,color:#fff
    class Ingestion,VectorDB primary
    class Evaluation secondary
    class Reliability alert
```

### Component Roles & Responsibilities

1. **Ingestion Module (`src/ingestion/crossref.py`)**: Handles pagination, rate-limiting HTTP headers, JSON parsing, author concatenation, and date standardization.
2. **Dataclass Configuration (`src/core/config.py`)**: Immutable, centralized path configuration maintaining 30 directory attributes to enforce zero hardcoded paths across environments.
3. **Synthetic Corruption Engine (`src/ingestion/corruption.py`)**: Introduces realistic data bugs (null DOIs, empty abstracts, garbage text strings, duplicate records, outdated timestamps).
4. **Data Repair Engine (`src/ingestion/corruption.py`)**: Re-reads raw JSON payloads from `data/raw/` to rebuild clean datasets without external HTTP requests.
5. **RAG QA Agent (`src/retrieval/agent.py`)**: Interfaces ChromaDB similarity search with LLM generation models, executing grounded academic QA.
6. **Observability Dashboard (`src/dashboard/`)**: Lightweight 7-tab HTTP application visualizing data health, freshness, RAG degradation curves, and live query testing.

---

## Code Patterns & Production Snippets

### 1. Centralized Configuration Dataclass Pattern

```python
from dataclasses import dataclass
from pathlib import Path

@dataclass(frozen=True)
class Paths:
    """Centralized immutable path configuration for data pipeline & observability."""
    root_dir: Path = Path(__file__).resolve().parent.parent.parent
    data_dir: Path = root_dir / "data"
    raw_dir: Path = data_dir / "raw"
    clean_dir: Path = data_dir / "clean"
    corrupted_dir: Path = data_dir / "corrupted"
    repaired_dir: Path = data_dir / "repaired"
    chroma_dir: Path = data_dir / "chroma"
    quality_dir: Path = root_dir / "reports" / "quality"
    results_dir: Path = root_dir / "reports" / "results"

    def ensure_directories(self) -> None:
        """Create all required pipeline directories on startup."""
        for field_name in self.__dataclass_fields__:
            path_val = getattr(self, field_name)
            if isinstance(path_val, Path) and not path_val.suffix:
                path_val.mkdir(parents=True, exist_ok=True)

paths = Paths()
paths.ensure_directories()
```

### 2. Ingestion & Raw Artifact Persistence

```python
import json
import requests
from typing import Dict, Any, List
from pathlib import Path

class CrossrefIngestionEngine:
    def __init__(self, raw_storage_path: Path):
        self.raw_storage_path = raw_storage_path
        self.base_url = "https://api.crossref.org/works"

    def fetch_and_store_raw(self, query: str, rows: int = 50) -> Path:
        """Fetch academic metadata from Crossref and persist raw API response."""
        params = {"query": query, "rows": rows, "sort": "relevance"}
        headers = {"User-Agent": "K3-DataObservability-Course/1.0 (mailto:admin@k3ai.org)"}
        
        response = requests.get(self.base_url, params=params, headers=headers, timeout=15)
        response.raise_for_status()
        raw_data = response.json()

        output_file = self.raw_storage_path / f"crossref_raw_{query.replace(' ', '_')}.json"
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(raw_data, f, indent=2, ensure_ascii=False)
            
        return output_file
```

### 3. Synthetic Corruption & Raw Artifact Repair Engine

```python
import pandas as pd
import json
from pathlib import Path

class DataCorruptionAndRepairEngine:
    def __init__(self, clean_path: Path, raw_json_path: Path):
        self.clean_path = clean_path
        self.raw_json_path = raw_json_path

    def inject_synthetic_corruption(self, corrupted_out_path: Path) -> pd.DataFrame:
        """Inject controlled synthetic corruption to evaluate RAG degradation."""
        df = pd.read_csv(self.clean_path)
        
        # 1. Nullify DOIs for 15% of records
        df.loc[df.sample(frac=0.15).index, "doi"] = None
        
        # 2. Corrupt summary text with garbage noise for 20% of records
        noise_indices = df.sample(frac=0.20).index
        df.loc[noise_indices, "summary"] = "CORRUPTED_TEXT_NOISE_NULL_POINTER_EXCEPTION_#@!$%^"
        
        # 3. Inject duplicate records
        duplicates = df.head(5).copy()
        df = pd.concat([df, duplicates], ignore_index=True)
        
        df.to_csv(corrupted_out_path, index=False)
        return df

    def execute_raw_repair(self, repaired_out_path: Path) -> pd.DataFrame:
        """Idempotently rebuild clean dataset directly from raw storage artifacts."""
        with open(self.raw_json_path, "r", encoding="utf-8") as f:
            raw_payload = json.load(f)
            
        items = raw_payload.get("message", {}).get("items", [])
        repaired_records = []
        
        for item in items:
            doi = item.get("DOI")
            title = item.get("title", ["Untitled"])[0] if item.get("title") else "Untitled"
            abstract = item.get("abstract", "")
            # Remove JATS XML tags from Crossref abstracts
            clean_abstract = abstract.replace("<jats:p>", "").replace("</jats:p>", "").strip()
            
            if doi and clean_abstract:
                repaired_records.append({
                    "doi": doi,
                    "title": title,
                    "summary": clean_abstract,
                    "text_for_embedding": f"Title: {title}\nAbstract: {clean_abstract}"
                })
                
        df_repaired = pd.DataFrame(repaired_records).drop_duplicates(subset=["doi"])
        df_repaired.to_csv(repaired_out_path, index=False)
        return df_repaired
```

---

## Empirical Results: 3-State RAG Quality Evaluation

To quantify the direct operational impact of data quality on AI system output, the pipeline evaluates standard test queries across three distinct pipeline states:

1. **Baseline**: Clean ingestion, zero nulls, verified DOIs.
2. **Corrupted**: 15% missing DOIs, 20% garbage text strings, 5 duplicate records.
3. **Repaired**: Restored dataset generated via raw JSON artifact replay.

### Comparative Metric Performance Table

| Evaluation Metric | State 1: Baseline | State 2: Corrupted | State 3: Repaired | Delta (Baseline vs Corrupted) | Recovery (Repaired vs Baseline) |
|---|---|---|---|---|---|
| **Retrieval Hit Rate** | **1.00 (100%)** | **0.80 (80%)** | **1.00 (100%)** | $-0.20$ ( $-20\%$ drop) | $100\%$ Restored |
| **Mean Token F1 Score** | **1.00 (1.00)** | **0.85 (0.85)** | **1.00 (1.00)** | $-0.15$ ( $-15\%$ drop) | $100\%$ Restored |
| **LLM Judge Score (1-5)** | **5.00 / 5.00** | **4.40 / 5.00** | **5.00 / 5.00** | $-0.60$ points | $100\%$ Restored |
| **Data Quality Assertions** | 100% Passed | 4 Failed | 100% Passed | $-4$ Assertions | Full Compliance |
| **Freshness (Avg Age)** | 142 Days | 890 Days (Stale) | 142 Days | $+748$ Days Drift | Restored Baseline |

> **Key Insight**: Synthetic data corruption directly compromises vector search index precision, reducing RAG retrieval hit rate by **20%** and dropping LLM generation accuracy by **0.60 rating points**. Raw artifact replay restores system performance back to 100% baseline with zero manual data entry.

---

## Practical Lab Walkthrough & 7-Tab Observability Dashboard

Students execute the complete observability workflow using the 7-tab web application:

### Dashboard Tab Architecture & Features

1. **Tab 1: Overview**: System health indicators, total ingested paper count, pipeline execution status.
2. **Tab 2: Data Quality**: Real-time assertion checks (null counts, duplicate DOIs, text length threshold checks).
3. **Tab 3: Freshness**: Histogram breakdown of paper publication dates and document age ($\text{Age}_{\text{days}}$).
4. **Tab 4: Baseline vs Corrupted Metrics**: Comparative side-by-side tables measuring quality drops.
5. **Tab 5: RAG Evaluation**: Deep-dive LLM Judge scores, Hit Rate distributions, and token F1 performance.
6. **Tab 6: Raw Repair Traceability**: Line-by-line lineage trace mapping raw JSON keys to cleaned CSV columns.
7. **Tab 7: Live Debug**: Interactive RAG query box displaying retrieved context chunks, cosine distance scores, and LLM responses in real-time.

```bash
# Step 1: Run Ingestion & Clean Data Pipeline
python -m src.pipelines.ingest_flow --query "artificial intelligence" --rows 100

# Step 2: Run Synthetic Corruption & 3-State RAG Evaluation Flow
python -m src.pipelines.corruption_flow

# Step 3: Launch 7-Tab Data Observability Dashboard
python script/run_dashboard.py --port 8050
```

---

## Visual Concept & Architecture Embed

```
+-----------------------------------------------------------------------------------+
|                           AI OBSERVE - DATA DASHBOARD                             |
+-----------------------------------------------------------------------------------+
| [Overview] [Data Quality] [Freshness] [Base vs Corrupt] [RAG Eval] [Trace] [Debug]|
+-----------------------------------------------------------------------------------+
|  RAG HIT RATE        TOKEN F1 SCORE        FRESHNESS INDEX       PIPELINE STATUS  |
|  [92.3%] (+0.5%)     [0.88] (-0.12)        [ACTIVE] (10m ago)    [STABLE]         |
+-----------------------------------------------------------------------------------+
|  RAG Hit Rate (Baseline vs Corrupted)        | Data Freshness Distribution        |
|  100%|---------\                             |  Web  [==== 40% ====]              |
|   80%|          \_______                     |  Docs [=== 35% ===]                |
|   60%|                  \                    |  Logs [== 25% ==]                  |
|      +------------------------               |                                    |
|      Base   Corrupt   Repaired               |                                    |
+----------------------------------------------+------------------------------------+
```

![Data Observability & RAG Pipeline Dashboard Mockup](k3_day10_observability_dashboard_1786339685668.jpg)

---

## Related Notes & Knowledge Graph

- [[K3-Course-Overview]] — Central Map of Content for K3 AI Engineering.
- [[K3-Day09-Multi-Agent-A2A]] — Ingesting clean data inputs into multi-agent dispute resolution pipelines.
- [[K3-Day11-Guardrails-HITL-Responsible-AI]] — Securing RAG document context against indirect prompt injection.
- [[K3-Day12-Cloud-Services-And-Deployment]] — Containerizing the ChromaDB vector store and observability web application.
- [[K3-Day08-RAG-Pipeline-And-Evaluation]] — Advanced RAG retrieval and evaluation strategies.
- [[K3-Day07-Data-Foundations-Embeddings-Vector-Stores]] — Embeddings generation and vector index configuration.
