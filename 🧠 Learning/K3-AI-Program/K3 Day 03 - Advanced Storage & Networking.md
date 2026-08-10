---
title: "K3 Day 03 - Advanced Storage & Networking"
tags:
  - k3
  - kubernetes
  - storage
  - networking
  - longhorn
  - traefik
  - persistent-volumes
type: learning
status: completed
created: 2026-08-08
updated: 2026-08-08
---

# K3 Day 03 — Advanced Storage & Networking

## Overview & Objectives
AI and Machine Learning workloads require high-throughput storage (for training datasets, model weights, and checkpoints) and flexible ingress routing for real-time inference APIs. Day 03 explores advanced storage management in **[[K3s]]** using both default `local-path-provisioner` and distributed storage engines like Longhorn, alongside Ingress Controllers (Traefik / NGINX) for Layer 7 traffic management.

Key Learning Goals:
- Understand Kubernetes Storage abstractions: `StorageClass`, `PersistentVolume` (PV), and `PersistentVolumeClaim` (PVC).
- Configure distributed volume replication and snapshots for model weights.
- Configure Traefik / NGINX Ingress rules with SSL/TLS termination and Path-based routing.
- Implement storage and ingress in [[K3-Lab-02 - Container Storage & Ingress]].

---

## Storage & Ingress Architecture

```
                                [ External HTTP/HTTPS Traffic ]
                                               |
                                               v
                             +-----------------------------------+
                             |     Ingress Controller (Traefik)   |
                             +-----------------+-----------------+
                                               |
                          +--------------------+--------------------+
                          | (Route /v1/models)                      | (Route /grafana)
                          v                                         v
               +----------------------+                  +----------------------+
               | Triton Service       |                  | Grafana Service      |
               +----------+-----------+                  +----------+-----------+
                          |                                         |
                          v                                         v
               +----------------------+                  +----------------------+
               | Pod: Model Inference |                  | Pod: Observability   |
               +----------+-----------+                  +----------------------+
                          |
             (Mount /mnt/models)
                          |
                          v
               +----------------------+
               | PVC: model-weights-pvc|
               +----------+-----------+
                          |
             (Provisioner: Longhorn / Local-Path)
                          |
                          v
  +--------------------------------------------------------------------------------+
  | High-Performance Storage Volume (NFS / Local HostPath / Replicated Longhorn)   |
  +--------------------------------------------------------------------------------+
```

---

## Storage Configurations & Manifests

### 1. StorageClass & PersistentVolumeClaim (`storage-setup.yaml`)
```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ai-storage
provisioner: rbd.csi.ceph.com # Or driver.longhorn.io / rancher.io/local-path
reclaimPolicy: Retain
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: model-weights-pvc
  namespace: default
spec:
  accessModes:
    - ReadWriteMany # Allows multiple model pods to mount the weights concurrently
  storageClassName: local-path # Default in K3s
  resources:
    requests:
      storage: 50Gi
```

### 2. Pod Consuming Persistent Storage (`model-downloader-pod.yaml`)
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: model-storage-test
  namespace: default
spec:
  containers:
  - name: downloader
    image: alpine:latest
    command: ["sh", "-c", "echo 'Model Weights Cached' > /mnt/models/weights.bin && sleep 3600"]
    volumeMounts:
    - name: model-volume
      mountPath: /mnt/models
  volumes:
  - name: model-volume
    persistentVolumeClaim:
      claimName: model-weights-pvc
```

---

## Ingress Traffic Management

### Ingress Route Manifest (`ingress-rules.yaml`)
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ai-services-ingress
  namespace: default
  annotations:
    ingress.kubernetes.io/ssl-redirect: "false"
spec:
  rules:
  - host: ai-cluster.local
    http:
      paths:
      - path: /v1/models
        pathType: Prefix
        backend:
          service:
            name: ai-web-service
            port:
              number: 80
```

---

## Hands-On Management Commands

```bash
# Apply PVC and verify binding
kubectl apply -f storage-setup.yaml
kubectl get pvc -w

# Apply test pod and check volume mount
kubectl apply -f model-downloader-pod.yaml
kubectl exec -it model-storage-test -- cat /mnt/models/weights.bin

# Apply Ingress configuration
kubectl apply -f ingress-rules.yaml
kubectl get ingress ai-services-ingress

# Test ingress endpoint resolution locally
curl -H "Host: ai-cluster.local" http://<K3S_NODE_IP>/v1/models
```

---

## Key Takeaways & Cross-References
- **ReadWriteMany (RWX)**: Critical for LLM inference engines (like **[[vLLM]]** and **[[Triton Inference Server]]**) sharing large model checkpoint volumes across worker nodes.
- **Ingress Controller**: Routing external HTTP gRPC/REST inference traffic cleanly into cluster services.
- **Lab Alignment**: Built into [[K3-Lab-02 - Container Storage & Ingress]].
- **Next Day**: Proceed to [[K3 Day 04 - AI Workload Deployment]] for deploying containerized model inference workloads with GPU acceleration.
