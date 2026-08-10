---
title: "K3 Day 04 - AI Workload Deployment"
tags:
  - k3
  - kubernetes
  - ai
  - mlops
  - triton
  - vllm
  - ray
  - kubeflow
  - argo
  - gpus
type: learning
status: completed
created: 2026-08-08
updated: 2026-08-08
---

# K3 Day 04 — AI Workload Deployment & MLOps Orchestration

## Overview & Objectives
Day 04 covers the core focus of the K3 AI Program: deploying, serving, and orchestrating machine learning models on **[[K3s]]**. High-performance AI workloads require NVIDIA GPU device pass-through, high-throughput inference engines like **[[vLLM]]** and **[[Triton Inference Server]]**, distributed processing with **[[Ray]]**, and workflow automation using **[[Argo Workflows]]** and **[[Kubeflow]]**.

Key Learning Goals:
- Enable NVIDIA GPU pass-through into K3s container runtime via NVIDIA Container Toolkit and K8s Device Plugin.
- Deploy LLM inference engines (**[[vLLM]]** & **[[Triton Inference Server]]**).
- Execute distributed training / hyperparameter tuning via **[[Ray]]**.
- Orchestrate end-to-end ML pipelines with **[[Argo Workflows]]** & **[[Kubeflow]]**.
- Complete practical setups in [[K3-Lab-03 - GPU Acceleration & Drivers]] and [[K3-Lab-04 - Model Serving & Inference Pipelines]].

---

## AI Inference Pipeline Architecture

```
                  +----------------------------------------------+
                  |         Client Request (REST / gRPC)         |
                  +----------------------+-----------------------+
                                         |
                                         v
                  +----------------------------------------------+
                  |          Ingress / Service Mesh             |
                  +----------------------+-----------------------+
                                         |
            +----------------------------+----------------------------+
            | (gRPC / HTTP)                                           | (REST / Open-AI format)
            v                                                         v
+-----------------------+                                 +-----------------------+
| Triton Inference      |                                 | vLLM OpenAI Server    |
| Server Pod            |                                 | Pod                   |
|                       |                                 |                       |
| +-------------------+ |                                 | +-------------------+ |
| | GPU 0 (CUDA Core) | |                                 | | GPU 1 (CUDA Core) | |
| +-------------------+ |                                 | +-------------------+ |
+-----------+-----------+                                 +-----------+-----------+
            |                                                         |
            v                                                         v
+---------------------------------------------------------------------------------+
|               Shared Model Registry / Storage PVC ([[MLflow]])                  |
+---------------------------------------------------------------------------------+
```

---

## Technical Manifests & Configurations

### 1. NVIDIA Device Plugin DaemonSet (`nvidia-device-plugin.yaml`)
To expose GPUs to Kubernetes scheduler:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: nvidia-device-plugin-daemonset
  namespace: kube-system
spec:
  selector:
    matchLabels:
      name: nvidia-device-plugin-ds
  template:
    metadata:
      labels:
        name: nvidia-device-plugin-ds
    spec:
      tolerations:
      - key: nvidia.com/gpu
        operator: Exists
        effect: NoSchedule
      containers:
      - image: nvcr.io/nvidia/k8s-device-plugin:v0.14.1
        name: nvidia-device-plugin-ctr
        securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop: ["ALL"]
        volumeMounts:
          - name: device-plugin
            mountPath: /var/lib/kubelet/device-plugins
      volumes:
        - name: device-plugin
          hostPath:
            path: /var/lib/kubelet/device-plugins
```

### 2. vLLM LLM Serving Deployment (`vllm-deployment.yaml`)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vllm-llama-server
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: vllm-llama
  template:
    metadata:
      labels:
        app: vllm-llama
    spec:
      containers:
      - name: vllm-container
        image: vllm/vllm-openai:latest
        args:
        - "--model"
        - "meta-llama/Llama-2-7b-chat-hf"
        - "--port"
        - "8000"
        resources:
          limits:
            nvidia.com/gpu: 1
            memory: "16Gi"
            cpu: "4"
          requests:
            nvidia.com/gpu: 1
            memory: "8Gi"
            cpu: "2"
        ports:
        - containerPort: 8000
        volumeMounts:
        - mountPath: /root/.cache/huggingface
          name: model-cache
      volumes:
      - name: model-cache
        persistentVolumeClaim:
          claimName: model-weights-pvc
```

---

## MLOps Pipeline Orchestration with Argo Workflows

### Argo Workflow Definition (`ml-pipeline-workflow.yaml`)
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: llm-fine-tune-pipeline-
  namespace: default
spec:
  entrypoint: ml-pipeline
  templates:
  - name: ml-pipeline
    steps:
    - - name: data-preprocessing
        template: prep-data
    - - name: model-training
        template: train-model
  - name: prep-data
    container:
      image: python:3.10-slim
      command: ["python", "-c", "print('Preprocessing dataset...')"]
  - name: train-model
    container:
      image: pytorch/pytorch:2.1.0-cuda11.8-cudnn8-runtime
      command: ["python", "-c", "print('Fine-tuning model on GPU...')"]
      resources:
        limits:
          nvidia.com/gpu: 1
```

---

## Verification & Testing Commands

```bash
# Verify GPU discovery by Kubernetes
kubectl get nodes -o jsonpath='{.items[*].status.allocatable}' | grep nvidia.com/gpu

# Deploy vLLM server
kubectl apply -f vllm-deployment.yaml

# Test LLM completion via curl inside cluster
kubectl exec -it deployment/vllm-llama-server -- curl http://localhost:8000/v1/completions \
  -H "Content-Type: application/json" \
  -d '{"model": "meta-llama/Llama-2-7b-chat-hf", "prompt": "San Francisco is a", "max_tokens": 7}'

# Submit Argo Workflow
argo submit -n default --watch ml-pipeline-workflow.yaml
```

---

## Summary & Cross-References
- **GPU Resource Scheduling**: Requires correct host NVIDIA driver installation and Device Plugin DaemonSet.
- **Inference Optimization**: **[[vLLM]]** utilizes PagedAttention for high throughput, while **[[Triton Inference Server]]** optimizes dynamic batching across multi-model deployments.
- **Related Tech Resources**: Read detailed docs on [[Triton Inference Server]], [[vLLM]], [[Ray]], [[Kubeflow]], [[Argo Workflows]].
- **Lab Guides**: Implemented step-by-step in [[K3-Lab-03 - GPU Acceleration & Drivers]] and [[K3-Lab-04 - Model Serving & Inference Pipelines]].
- **Next Day**: Proceed to [[K3 Days 05-06 - Production Hardening]] for monitoring with Prometheus/Grafana and ML model tracking with MLflow.
