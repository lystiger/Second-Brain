---
title: "K3-AI-Labs Main Project Index"
tags:
  - k3
  - kubernetes
  - labs
  - project-index
  - mlops
  - edge-ai
type: project
status: completed
created: 2026-08-08
updated: 2026-08-08
---

# K3 AI Labs — Master Project Index

## Executive Overview
The **K3 AI Labs Project Series** is a hands-on technical initiative designed to build, deploy, optimize, and observe containerized Machine Learning and Artificial Intelligence workloads on lightweight **[[K3s]]** Kubernetes clusters. This repository serves as the central index and entry point for all 5 hands-on lab modules, bridging theoretical concepts from the **[[K3-Day01-LLM-API-Exploration|K3 Learning Notes]]** with production-grade infra implementation.

---

## Lab Architecture & Workflow

```
+---------------------------------------------------------------------------------+
|                           K3 AI Labs Ecosystem                                  |
|                                                                                 |
|  +---------------------------------------------------------------------------+  |
|  | K3-Lab-01: Cluster Provisioning                                           |  |
|  | - Single/Multi-node K3s setup with Flannel CNI & system optimizations.    |  |
|  +-------------------------------------+-------------------------------------+  |
|                                        |                                        |
|                                        v                                        |
|  +---------------------------------------------------------------------------+  |
|  | K3-Lab-02: Container Storage & Ingress                                    |  |
|  | - Local Path Provisioner, PersistentVolumeClaims, Traefik/NGINX Ingress.  |  |
|  +-------------------------------------+-------------------------------------+  |
|                                        |                                        |
|                                        v                                        |
|  +---------------------------------------------------------------------------+  |
|  | K3-Lab-03: GPU Acceleration & Drivers                                     |  |
|  | - Host NVIDIA drivers, Container Toolkit, K8s Device Plugin DaemonSet.     |  |
|  +-------------------------------------+-------------------------------------+  |
|                                        |                                        |
|                                        v                                        |
|  +---------------------------------------------------------------------------+  |
|  | K3-Lab-04: Model Serving & Inference Pipelines                            |  |
|  | - LLM serving with vLLM & Triton Server; pipelines with Argo & Ray.       |  |
|  +-------------------------------------+-------------------------------------+  |
|                                        |                                        |
|                                        v                                        |
|  +---------------------------------------------------------------------------+  |
|  | K3-Lab-05: Monitoring, Logging & Scaling                                  |  |
|  | - Prometheus/Grafana stack, DCGM exporter, MLflow tracking, HPA scaling.   |  |
|  +---------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------+
```

---

## Detailed Lab Module Index

| Lab ID | Module Name | Primary Technologies | Associated Learning Note | Status |
| :--- | :--- | :--- | :--- | :--- |
| **[[K3-Lab-01 - Cluster Provisioning\|Lab 01]]** | Cluster Provisioning | **[[K3s]]**, **[[Docker]]**, **[[Kubernetes]]** | [[K3-Day01-LLM-API-Exploration]] | Complete |
| **[[K3-Lab-02 - Container Storage & Ingress\|Lab 02]]** | Storage & Ingress | **[[K3s]]**, **[[Helm]]**, StorageClass, Ingress | [[K3-Day02-AI-Product-Labs]], [[K3-Day03-Chatbot-vs-ReAct-Agent]] | Complete |
| **[[K3-Lab-03 - GPU Acceleration & Drivers\|Lab 03]]** | GPU Drivers & Passthrough | NVIDIA Drivers, Container Toolkit, CUDA | [[K3-Day04-Research-Agent-Tool-Eval]] | Complete |
| **[[K3-Lab-04 - Model Serving & Inference Pipelines\|Lab 04]]** | Model Serving & Pipelines | **[[vLLM]]**, **[[Triton Inference Server]]**, **[[Ray]]**, **[[Argo Workflows]]** | [[K3-Day04-Research-Agent-Tool-Eval]] | Complete |
| **[[K3-Lab-05 - Monitoring, Logging & Scaling\|Lab 05]]** | Monitoring & Auto-scaling | **[[Prometheus]]**, **[[Grafana]]**, **[[MLflow]]**, HPA | [[K3-Day06-Production-Hardening-Advanced-Prompting]] | Complete |

---

## Core Infrastructure & Tech Stack Matrix

- **Orchestration**: **[[Kubernetes]]**, **[[K3s]]**
- **Container Engine**: **[[Docker]]**, containerd
- **Package Management**: **[[Helm]]**
- **Model Inference**: **[[vLLM]]**, **[[Triton Inference Server]]**
- **Pipeline & Distributed Computing**: **[[Argo Workflows]]**, **[[Ray]]**, **[[Kubeflow]]**
- **ML Lifecycle & Tracking**: **[[MLflow]]**
- **Observability & Dashboards**: **[[Prometheus]]**, **[[Grafana]]**

---

## Quick Navigation & Execution Order
1. Execute **[[K3-Lab-01 - Cluster Provisioning]]** to launch your lightweight K3s cluster.
2. Setup volume mounts and ingress rules in **[[K3-Lab-02 - Container Storage & Ingress]]**.
3. Enable GPU acceleration using **[[K3-Lab-03 - GPU Acceleration & Drivers]]**.
4. Serve LLMs and run ML pipelines with **[[K3-Lab-04 - Model Serving & Inference Pipelines]]**.
5. Harden and monitor your deployment via **[[K3-Lab-05 - Monitoring, Logging & Scaling]]**.
