---
title: "K3 Day 01 - Intro & Setup"
tags:
  - k3
  - kubernetes
  - devops
  - setup
  - edge-ai
type: learning
status: completed
created: 2026-08-08
updated: 2026-08-08
---

# K3 Day 01 — Introduction & Environment Setup

## Overview & Objectives
Day 01 of the K3 AI Program establishes the foundation for building lightweight, edge-ready Kubernetes infrastructure specifically tailored for machine learning workloads. Standard Kubernetes (k8s) introduces significant resource overhead with etcd, heavy control plane components, and extensive default addons. **[[K3s]]** provides a lightweight, CNCF-certified distribution that strips non-essential cloud-provider drivers while retaining full Kubernetes API compatibility.

Key Learning Goals:
- Understand K3s architecture vs. vanilla [[Kubernetes]].
- Configure container runtimes (**[[Docker]]** vs. containerd).
- Provision a local multi-node or single-node K3s cluster for AI experimentation.
- Verify node status, control plane health, and basic workloads in [[K3-Lab-01 - Cluster Provisioning]].

---

## K3s Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                 K3s Control Plane                                 |
|                                                                                   |
|  +--------------------+  +----------------------+  +---------------------------+  |
|  |  kube-apiserver    |  | kube-controller-mgr  |  |      kube-scheduler       |  |
|  +---------+----------+  +----------+-----------+  +-------------+-------------+  |
|            |                        |                            |                |
|            +------------------------+----------------------------+                |
|                                     |                                             |
|                         +-----------v-----------+                                 |
|                         |    SQLite / KINE       | (Replaces etcd for single node)|
|                         +-----------------------+                                 |
+-------------------------------------+---------------------------------------------+
                                      |
                               (kubelet API / gRPC)
                                      |
+-------------------------------------v---------------------------------------------+
|                                  K3s Worker Node                                  |
|  +---------------------+   +-----------------------+   +-----------------------+  |
|  |       kubelet       |   |       k3s agent       |   |   Flannel CNI Plugin  |  |
|  +----------+----------+   +-----------+-----------+   +-----------+-----------+  |
|             |                          |                           |              |
|             +--------------------------+---------------------------+              |
|                                        |                                          |
|                          +-------------v-------------+                            |
|                          |    containerd / Docker    |                            |
|                          +---------------------------+                            |
+-----------------------------------------------------------------------------------+
```

---

## Technical Setup & Installation

### 1. K3s Control Plane Installation Script
To spin up a lightweight control plane node without default Traefik ingress (allowing custom ingress setup in [[K3-Lab-02 - Container Storage & Ingress]]):

```bash
# Download and install K3s with custom flags
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable=traefik --flannel-backend=vxlan" sh -

# Check k3s service status
sudo systemctl status k3s

# Configure kubeconfig permissions for non-root management
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
export KUBECONFIG=~/.kube/config

# Verify cluster nodes
kubectl get nodes -o wide
```

### 2. Node Joining Command (Worker Nodes)
On the control plane node, retrieve the node token:

```bash
K3S_TOKEN=$(sudo cat /var/lib/rancher/k3s/server/node-token)
K3S_URL="https://<CONTROL_PLANE_IP>:6443"
echo "Token: $K3S_TOKEN"
```

On worker nodes, execute:

```bash
curl -sfL https://get.k3s.io | K3S_URL="https://<CONTROL_PLANE_IP>:6443" K3S_TOKEN="$K3S_TOKEN" sh -
```

---

## Verification & Health Assessment

```bash
# Verify all component statuses
kubectl get componentstatuses

# Inspect cluster info
kubectl cluster-info

# Check system pods running under kube-system namespace
kubectl get pods -n kube-system -o wide
```

Expected Output:
```
NAME                                     READY   STATUS    RESTARTS   AGE
coredns-6799fc88d8-abcde                 1/1     Running   0          5m
local-path-provisioner-84bb864455-xyz12   1/1     Running   0          5m
metrics-server-79975b68-qwert            1/1     Running   0          5m
```

---

## Key Takeaways & Next Steps
- **Resource Efficiency**: K3s memory footprint is under 500MB, making it ideal for local AI testing environments.
- **Modularity**: Disabling default Traefik allows deploying specialized AI ingress tools later.
- **Hands-on Practice**: See [[K3-Lab-01 - Cluster Provisioning]] for script automation and multi-node setup.
- **Next Day**: Proceed to [[K3 Day 02 - Core Concepts]] for Pods, Deployments, and Helm package management.
