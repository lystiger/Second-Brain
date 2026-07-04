---
title: Skills Assessment Matrix
aliases: [Skill Matrix, Skills Matrix]
tags: [career, skills, assessment]
status: active
created: 2026-07-01
updated: 2026-07-02
area: career
review: monthly
---

# Skills Assessment Matrix

This matrix tracks your technical competence levels. It serves to identify gaps, prioritize study, and define completion criteria.

## Related Notes
* **Roadmap**: [[AI Systems Architect Roadmap]]
* **Execution Plan**: [[2026 Execution Plan]]
* **Project Specifications**: [[Project Strategy]]
* **Review Cycle**: [[Weekly Review]]

---

## Skill Levels Definition

* **Level 0**: No knowledge.
* **Level 1**: Basic familiarity (knows the terminology, can explain the concept).
* **Level 2**: Tutorial competent (can build a simple app following a tutorial or documentation).
* **Level 3**: Independent builder (can build, deploy, and debug applications independently).
* **Level 4**: Production architect (can design, scale, secure, and debug systems in production).
* **Level 5**: Leader/Teacher (can make critical architectural trade-off decisions and mentor others).

*Note: All current levels are conservative estimates based on existing projects (`AOI`, `SilentVoix`, `TempCastML`, `HASC`).*

---

## Technical Skills Matrix

| Domain | Current level (Est.) | Target Level | Priority | Evidence Required | Next Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Python** | 3 | 4 | **P0** | Performance profiling, writing clean object-oriented SDK code. | [[Project Strategy#1. AOI: Automated Optical Inspection (Rank 1 - Flagship)\|Profile API latency of AOI]] |
| **Data Structures & Algorithms** | 2 | 3 | **P0** | Solving medium-difficulty algorithmic problems under time constraints. | [[2026 Execution Plan#September 2026\|Complete 1 LeetCode problem daily]] |
| **Linux & Shell** | 2 | 3 | **P0** | Automated shell scripts for data preparation and system updates. | Write a script to automate Git commits. |
| **Git & Version Control** | 2 | 3 | **P0** | Using rebases, cherry-picking, hooks, and branching strategies. | Standardize Git hooks for styling. |
| **Networking** | 2 | 3 | **P0** | Configuring secure proxy layers, understanding subnets and DNS routing. | [[Project Strategy#3. HASC Website: Industrial Product Catalog (Rank 3 - Backend & Database)\|Secure HASC with SSL/Nginx]] |
| **Operating Systems** | 2 | 3 | **P0** | Managing system processes, understanding memory allocation and system calls. | [[Project Strategy#1. AOI: Automated Optical Inspection (Rank 1 - Flagship)\|Optimize multithreading in AOI]] |
| **SQL & PostgreSQL** | 2 | 3 | **P0** | Designing relational schemas, writing optimized queries, indexing. | [[Project Strategy#3. HASC Website: Industrial Product Catalog (Rank 3 - Backend & Database)\|Optimize HASC product filters]] |
| **FastAPI** | 3 | 4 | **P0** | Asynchronous request processing, structured logging, middleware integration. | [[Project Strategy#1. AOI: Automated Optical Inspection (Rank 1 - Flagship)\|Refactor AOI logging middleware]] |
| **Software Testing** | 2 | 3 | **P0** | Unit, integration, and regression test suites with code coverage >80%. | [[Project Strategy#3. HASC Website: Industrial Product Catalog (Rank 3 - Backend & Database)\|Add pytest to AOI and HASC]] |
| **System Design** | 1 | 3 | **P1** | Drawing high-level architecture designs explaining system boundaries. | [[Project Strategy#1. AOI: Automated Optical Inspection (Rank 1 - Flagship)\|Document AOI system layout]] |
| **Docker** | 2 | 3 | **P0** | Multi-stage builds, volume management, compose coordination. | [[Project Strategy#3. HASC Website: Industrial Product Catalog (Rank 3 - Backend & Database)\|Dockerize all HASC services]] |
| **CI/CD** | 1 | 3 | **P1** | Automated build, test, and release pipelines on GitHub Actions. | [[2026 Execution Plan#March 2027\|Create CI/CD setup for AOI]] |
| **Cloud Fundamentals & AWS** | 1 | 3 | **P1** | Provisioning secure virtual networks (VPC), EC2 instances, and RDS databases. | [[Project Strategy#3. HASC Website: Industrial Product Catalog (Rank 3 - Backend & Database)\|Deploy HASC db to AWS RDS]] |
| **Observability (Logging/Metrics)** | 2 | 3 | **P1** | Aggregated log views, metric alerts, distributed tracing. | [[Project Strategy#1. AOI: Automated Optical Inspection (Rank 1 - Flagship)\|Configure Loki/Grafana in AOI]] |
| **Classical Machine Learning** | 2 | 3 | **P0** | Data preparation, model training, validation, evaluation. | [[Project Strategy#4. TempCastML / Airgility: Room Comfort Forecasting (Rank 4 - TinyML)\|Tune forecasting model in TempCast]] |
| **Deep Learning** | 2 | 3 | **P0** | Neural network architectures (RNN, LSTM) for sequence processing. | [[Project Strategy#2. SilentVoix / SignGlove: Multimodal Translation (Rank 2 - Edge AI & Research)\|Build LSTM for SilentVoix]] |
| **Computer Vision** | 2 | 3 | **P1** | Real-time object detection and classification models. | [[Project Strategy#2. SilentVoix / SignGlove: Multimodal Translation (Rank 2 - Edge AI & Research)\|Integrate MediaPipe in SilentVoix]] |
| **Time-Series Modeling** | 2 | 3 | **P1** | Time-series forecasting models (LSTM, ARIMA). | [[Project Strategy#4. TempCastML / Airgility: Room Comfort Forecasting (Rank 4 - TinyML)\|Evaluate TempCast predictions]] |
| **Multimodal Learning** | 2 | 3 | **P2** | Multi-sensor and vision data fusion architectures. | [[Project Strategy#2. SilentVoix / SignGlove: Multimodal Translation (Rank 2 - Edge AI & Research)\|Document fusion strategy]] |
| **Model Evaluation** | 2 | 3 | **P1** | Benchmarking precision, recall, latency, throughput under load. | [[Project Strategy#1. AOI: Automated Optical Inspection (Rank 1 - Flagship)\|Benchmark AOI inference latency]] |
| **Model Serving** | 2 | 3 | **P1** | Serving models via API, model optimizations (ONNX runtime). | [[Project Strategy#2. SilentVoix / SignGlove: Multimodal Translation (Rank 2 - Edge AI & Research)\|Compile SilentVoix model to ONNX]] |
| **MLOps** | 2 | 3 | **P1** | Data versioning (DVC), model tracking, automated registries. | [[Project Strategy#1. AOI: Automated Optical Inspection (Rank 1 - Flagship)\|Implement DVC pipeline in AOI]] |
| **Kubernetes** | 1 | 3 | **P2** | Deploying microservices to local/cloud Kubernetes clusters. | [[2026 Execution Plan#May 2027\|Deploy local cluster for AOI]] |
| **Terraform** | 0 | 3 | **P2** | Declaring infrastructure deployments as code modules. | [[AI Systems Architect Roadmap#Certification Strategy\|Write basic AWS Terraform config]] |
| **Distributed Systems** | 1 | 3 | **P2** | Managing distributed databases, consensus protocols. | Study distributed storage patterns. |
| **Embedded Systems** | 2 | 3 | **P1** | Microcontroller programming, memory management (TinyML). | [[Project Strategy#4. TempCastML / Airgility: Room Comfort Forecasting (Rank 4 - TinyML)\|Run model on ESP32 for TempCast]] |
| **Technical Communication** | 2 | 3 | **P0** | Writing clean README documentation, architecture plans. | [[Project Strategy#Definition of Portfolio Ready\|Write project setup briefs]] |
| **English** | 3 | 4 | **P0** | Passing Academic IELTS with score >= 7.0 or TOEFL >= 95. | [[2026 Execution Plan#January 2027\|Complete English mock exams]] |
| **Japanese** | 1 | 3 | **P1** | Passing JLPT N3 or N2 to enable professional interactions. | Complete N5 grammar study on Anki. |
| **Research & Academic Writing** | 2 | 3 | **P1** | Drafting a complete 2-page academic research proposal. | [[2026 Execution Plan#January 2027\|Draft Master's Research Proposal]] |
