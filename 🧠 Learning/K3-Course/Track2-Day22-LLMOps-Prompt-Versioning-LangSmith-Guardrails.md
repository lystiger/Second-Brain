---
title: "Track 2 Day 22: LLMOps, Prompt Hub Versioning, RAGAS & Guardrails AI"
type: knowledge
status: complete
created: 2026-08-25
updated: 2026-08-25
tags:
  - k3-course
  - track2-mlops
  - llmops
  - langsmith
  - ragas
  - guardrails-ai
  - prompt-engineering
---

# Track 2 Day 22: LLMOps, Prompt Hub Versioning, RAGAS & Guardrails AI

## 1. Executive Overview

LLMOps expands traditional MLOps to handle non-deterministic foundation models, dynamic prompt management, automated RAG evaluation, and output guardrails.

Day 22 completes the Track 2 curriculum by building a production LLM platform integrating **LangChain LCEL**, **LangSmith Distributed Tracing**, **Prompt Hub Versioning & A/B Routing**, **RAGAS Quantitative Evaluation** (Faithfulness, Answer Relevancy, Context Precision/Recall), and **Guardrails AI** (PII redaction & automated JSON schema correction).

---

## 2. Production LLMOps Lifecycle Architecture

The architecture diagram outlines the runtime flow from client request through Prompt Hub A/B routing, vector retrieval, LangSmith tracing, and Guardrails validation.

```mermaid
flowchart TB
    Client["User Question"] --> Router["Prompt Hub A/B Router (50/50 Split)"]
    
    subgraph PromptHub["LangSmith Prompt Hub Versioning"]
        PromptV1["Prompt Version 1 (Concise / Factual)"]
        PromptV2["Prompt Version 2 (Detailed / CoT Step-by-Step)"]
        Router -->|50% Traffic| PromptV1
        Router -->|50% Traffic| PromptV2
    end

    subgraph RAGPipeline["RAG Retrieval & Generation"]
        FAISS["FAISS Dense Vector Store"]
        LLM["Foundation LLM (OpenAI / Gemini / Claude)"]
        
        PromptV1 --> FAISS
        PromptV2 --> FAISS
        FAISS --> LLM
    end

    subgraph TracingObservability["LangSmith Production Tracing (@traceable)"]
        TraceEngine["LangSmith Trace Collector"]
        TraceOutput["Traced Latency, Context, Tokens & Metadata"]
        
        RAGPipeline --> TraceEngine
        TraceEngine --> TraceOutput
    end

    subgraph OutputGuardrails["Guardrails AI & Output Sanitization"]
        PIIFilter["PII Regex & Sensitive Entity Masking"]
        JSONFixer["Automated JSON Schema Repair Validator"]
        
        LLM --> PIIFilter
        PIIFilter --> JSONFixer
    end

    subgraph QuantitativeEval["RAGAS Evaluation Framework"]
        Faith["Faithfulness (Score >= 0.80)"]
        AnsRel["Answer Relevancy"]
        CtxPrec["Context Precision"]
        CtxRec["Context Recall"]
        
        TraceOutput -.-> Faith
        TraceOutput -.-> AnsRel
        TraceOutput -.-> CtxPrec
        TraceOutput -.-> CtxRec
    end

    JSONFixer --> FinalResponse["Sanitized Response to Client"]

    classDef client fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef hub fill:#1e293b,stroke:#fbbf24,stroke-width:2px,color:#fff;
    classDef pipe fill:#1e293b,stroke:#34d399,stroke-width:2px,color:#fff;
    classDef trace fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef guard fill:#1e293b,stroke:#ec4899,stroke-width:2px,color:#fff;

    class Client,FinalResponse client;
    class PromptHub hub;
    class RAGPipeline pipe;
    class TracingObservability,QuantitativeEval trace;
    class OutputGuardrails guard;
```

---

## 3. LangSmith Tracing with `@traceable`

LangSmith enables granular span-level inspection into every step of complex chains:
```python
from langsmith import traceable

@traceable(name="execute_rag_pipeline", run_type="chain")
def run_rag(question: str, prompt_version: str):
    docs = retriever.invoke(question)
    prompt = prompt_hub.pull(prompt_version)
    response = llm.invoke(prompt.format(context=docs, question=question))
    return response.content
```

---

## 4. Quantitative RAG Evaluation (RAGAS Metrics)

RAGAS provides 4 industry-standard quantitative metrics:
1. **Faithfulness**: Proportion of statements in the answer that can be directly inferred from the retrieved context:
   $$	ext{Faithfulness} = rac{|	ext{Verified Claims from Context}|}{|	ext{Total Claims in Answer}|} \ge 0.80$$
2. **Answer Relevancy**: Semantic cosine similarity between original user question and generated answer.
3. **Context Precision**: Signal-to-noise ratio of relevant chunks ranked at top positions.
4. **Context Recall**: Extent to which retrieved context covers all ground-truth reference points.

---

## 5. Guardrails AI: Automated JSON Repair & PII Masking

- **PII Validator**: Automatically redacts emails, phone numbers, and API keys (`[REDACTED_EMAIL]`).
- **JSON Format Validator**: Catches truncated JSON, missing closing braces, and unquoted keys, automatically self-repairing or triggering schema-constrained re-prompting.

---

## 6. Related Notes & Master Index
- [[K3-Course-Overview|K3 Course Master Map of Content]]
- [[K3-Day06-Production-Hardening-Advanced-Prompting|K3 Day 06: Production Hardening & Prompting]]
- [[K3-Day08-RAG-Pipeline-And-Evaluation|K3 Day 08: Production RAG & Evaluation]]
- [[K3-Day13-Observability-Telemetry-Metrics|K3 Day 13: Observability & Telemetry]]
- [[Track2-Day21-CICD-for-AI-Systems-DVC-MLflow|Track 2 Day 21: CI/CD for AI Systems]]
