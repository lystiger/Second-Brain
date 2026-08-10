---
title: "K3 Day 02 - Core Concepts"
tags:
  - k3
  - kubernetes
  - workloads
  - helm
  - orchestration
type: learning
status: completed
created: 2026-08-08
updated: 2026-08-08
---

# K3 Day 02 — Core Kubernetes Concepts & Workload Orchestration

## Overview & Objectives
Day 02 focuses on mastering fundamental **[[Kubernetes]]** primitive resources within the **[[K3s]]** environment. Orchestrating containerized workloads requires understanding Pod lifecycle, Deployments, ReplicaSets, StatefulSets, Services, and environment packaging using **[[Helm]]**. In AI infrastructure, workloads range from stateless inference APIs (Deployments) to stateful database/vector stores (StatefulSets).

Key Learning Goals:
- Master Core Primitives: Pods, Services, Deployments, StatefulSets, ConfigMaps, and Secrets.
- Understand declarative workload specs vs imperative commands.
- Package and deploy applications using **[[Helm]]**.
- Prepare for complex storage and networking configurations in [[K3-Lab-02 - Container Storage & Ingress]].

---

## Kubernetes Workload Hierarchy

```
+-------------------------------------------------------------------------------+
|                                  Deployment                                   |
|  (Manages updates, rollouts, and target state for stateless workloads)        |
|                                                                               |
|   +-----------------------------------------------------------------------+   |
|   |                               ReplicaSet                              |   |
|   |  (Ensures desired number of identical Pod replicas are running)       |   |
|   |                                                                       |   |
|   |   +--------------------+  +--------------------+  +-------------------+   |   |
|   |   |        Pod 1       |  |        Pod 2       |  |       Pod 3       |   |   |
|   |   | +----------------+ |  | +----------------+ |  | +---------------+ |   |   |
|   |   | | Container(s)   | |  | | Container(s)   | |  | | Container(s)  | |   |   |
|   |   | +----------------+ |  | +----------------+ |  | +---------------+ |   |   |
|   |   +--------------------+  +--------------------+  +-------------------+   |   |
|   +-----------------------------------------------------------------------+   |
+-------------------------------------------------------------------------------+
                                        ^
                                        |  (Exposed via)
+---------------------------------------+---------------------------------------+
|                                    Service                                    |
|     (ClusterIP / NodePort / LoadBalancer - Provides Stable IP & DNS)          |
+-------------------------------------------------------------------------------+
```

---

## Key Workload Configurations & Manifests

### 1. Production Deployment Manifest (`web-inference-app.yaml`)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-web-api
  namespace: default
  labels:
    app: ai-web-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ai-web-api
  template:
    metadata:
      labels:
        app: ai-web-api
    spec:
      containers:
      - name: api-container
        image: nginx:alpine
        ports:
        - containerPort: 80
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 5
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
```

### 2. Service Definition Manifest (`service.yaml`)
```yaml
apiVersion: v1
kind: Service
metadata:
  name: ai-web-service
  namespace: default
spec:
  type: ClusterIP
  selector:
    app: ai-web-api
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
```

---

## Helm Package Management in K3s

Package management with **[[Helm]]** simplifies deploying standard cloud-native components.

### Essential Helm Commands
```bash
# Add popular Helm repository
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Search for charts
helm search repo ingress-nginx

# Install an Ingress Controller via Helm
helm install custom-ingress ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.replicaCount=2

# List release status
helm list -A

# Upgrade release configuration
helm upgrade custom-ingress ingress-nginx/ingress-nginx -n ingress-nginx
```

---

## Hands-On Verification

```bash
# Apply workload manifests
kubectl apply -f web-inference-app.yaml
kubectl apply -f service.yaml

# Verify pod status and labels
kubectl get pods -l app=ai-web-api -o wide

# Check endpoints registered under the Service
kubectl get endpoints ai-web-service

# Port-forward service locally to verify HTTP response
kubectl port-forward svc/ai-web-service 8080:80 &
curl http://localhost:8080
```

---

## Summary & Cross-References
- **Stateful vs Stateless**: Deployments handle stateless microservices, while StatefulSets provide stable identities for data nodes.
- **Package Automation**: Helm charts manage complex multi-resource deployments cleanly.
- **Lab Integration**: Practice applying these concepts in [[K3-Lab-02 - Container Storage & Ingress]].
- **Next Day**: Move on to [[K3 Day 03 - Advanced Storage & Networking]] to configure Longhorn persistent volumes and Traefik ingress routing.
