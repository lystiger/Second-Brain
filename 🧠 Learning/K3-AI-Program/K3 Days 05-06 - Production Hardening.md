---
title: "K3 Days 05-06 - Production Hardening"
tags:
  - k3
  - kubernetes
  - prometheus
  - grafana
  - mlflow
  - monitoring
  - security
  - scaling
  - production
type: learning
status: completed
created: 2026-08-08
updated: 2026-08-08
---

# K3 Days 05-06 — Production Hardening, Observability & Lifecycle Management

## Overview & Objectives
Days 05 and 06 transition the **[[K3s]]** cluster from an experimental environment to a hardened production platform suitable for enterprise AI inference and MLOps. Operating machine learning infrastructure in production demands strict observability across host metrics (CPU, RAM, disk I/O) and GPU metrics (VRAM consumption, CUDA engine utilization, temperature), centralized experiment tracking via **[[MLflow]]**, dynamic horizontal autoscaling (HPA), and RBAC security hardening.

Key Learning Goals:
- Deploy Prometheus-Operator and Grafana dashboards for cluster-wide and GPU monitoring using **[[Prometheus]]** and **[[Grafana]]**.
- Track ML model metrics and artifacts using **[[MLflow]]**.
- Configure Horizontal Pod Autoscaler (HPA) driven by inference request concurrency and GPU usage.
- Secure K3s control plane with NetworkPolicies, RBAC, and Secret management.
- Verify practical implementations in [[K3-Lab-05 - Monitoring, Logging & Scaling]].

---

## Production Observability & Hardening Architecture

```
+-----------------------------------------------------------------------------------+
|                              Kubernetes K3s Cluster                               |
|                                                                                   |
|  +---------------------+   +---------------------+   +-------------------------+  |
|  |  vLLM / Triton Pod  |   | NVIDIA DCGM Exporter|   |   Node Exporter Pod     |  |
|  |  (Inference API)    |   | (GPU Metrics: 9400) |   |   (Host Metrics: 9100)  |  |
|  +----------+----------+   +----------+----------+   +------------+------------+  |
|             |                         |                           |               |
|             | (Scrape Metrics)        | (Scrape GPU)              | (Scrape Host) |
|             +-------------------------+---------------------------+               |
|                                       |                                           |
|                           +-----------v-----------+                               |
|                           |    Prometheus Pod     |                               |
|                           +-----------+-----------+                               |
|                                       |                                           |
|                                (Query PromQL)                                     |
|                                       |                                           |
|                           +-----------v-----------+                               |
|                           |     Grafana Pod       |                               |
|                           +-----------+-----------+                               |
|                                       |                                           |
+---------------------------------------|-------------------------------------------+
                                        v
                       [ Observability Dashboard / Alerts ]
```

---

## Technical Setup & Configurations

### 1. Prometheus Scraping Configuration (`prometheus-gpu-scrape.yaml`)
```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: nvidia-dcgm-exporter
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: nvidia-dcgm-exporter
  endpoints:
  - port: metrics
    interval: 10s
    metricRelabelings:
    - action: keep
      sourceLabels: [__name__]
      regex: "(DCGM_FI_DEV_GPU_UTIL|DCGM_FI_DEV_FB_USED|DCGM_FI_DEV_GPU_TEMP)"
```

### 2. Horizontal Pod Autoscaler (HPA) (`vllm-hpa.yaml`)
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: vllm-inference-hpa
  namespace: default
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: vllm-llama-server
  minReplicas: 1
  maxReplicas: 5
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 75
  - type: External
    external:
      metric:
        name: container_gpu_utilization
      target:
        type: Value
        averageValue: "80"
```

### 3. MLflow Tracking Server Manifest (`mlflow-deployment.yaml`)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mlflow-server
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mlflow-server
  template:
    metadata:
      labels:
        app: mlflow-server
    spec:
      containers:
      - name: mlflow
        image: ghcr.io/mlflow/mlflow:v2.10.0
        command: ["mlflow", "server", "--host", "0.0.0.0", "--port", "5000", "--backend-store-uri", "sqlite:///mlflow.db", "--default-artifact-root", "/mnt/mlflow-artifacts"]
        ports:
        - containerPort: 5000
        volumeMounts:
        - name: mlflow-storage
          mountPath: /mnt/mlflow-artifacts
      volumes:
      - name: mlflow-storage
        persistentVolumeClaim:
          claimName: model-weights-pvc
```

---

## Production Security & Network Hardening

### Restrictive Network Policy (`deny-all-ingress.yaml`)
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all-ingress
  namespace: default
spec:
  podSelector: {}
  policyTypes:
  - Ingress
```

---

## Hands-On Verification Commands

```bash
# Install Prometheus & Grafana stack via Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring --create-namespace

# Check monitoring pods
kubectl get pods -n monitoring

# Apply HPA and NetworkPolicy
kubectl apply -f vllm-hpa.yaml
kubectl apply -f deny-all-ingress.yaml

# Verify HPA status
kubectl get hpa vllm-inference-hpa
```

---

## Summary & Cross-References
- **Complete Lifecycle**: From cluster provisioning in [[K3 Day 01 - Intro & Setup]] to production observability and autoscaling in Days 05-06.
- **Resource Integration**: Detailed resource notes available in [[Prometheus]], [[Grafana]], [[MLflow]], [[K3s]], [[Kubernetes]].
- **Project Lab**: Full execution instructions in [[K3-Lab-05 - Monitoring, Logging & Scaling]].
- **Master Project Index**: Revisit [[K3-AI-Labs]] for a high-level summary of all project labs.
