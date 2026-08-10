---
type: project
status: complete
priority: high
created: 2026-08-08
updated: 2026-08-08
owner: Lystiger
tags: [project, hasc, industrial-catalog, async-task-queue, image-processing, fastapi, postgresql]
tech_stack: [FastAPI, PostgreSQL, SQLAlchemy, Alembic, Pillow, WebP, React, Vite, TypeScript, Docker, Python]
---

# HASC - Industrial Product Catalog & Asynchronous Image Processing Platform

## Overview
**HASC** is an industrial product catalog platform designed for managing high-specification machinery catalogs with complex polymorphic technical attributes, multi-language localization (Vietnamese and English), and asynchronous media processing.

For full architectural details, code deep dives, database schema designs, and worker implementation code, refer to the primary project workspace note:

👉 **[[🚀 Projects/HASC/HASC|HASC Master Workspace Note]]**

---

## Technical Highlights
- **Backend Architecture**: Built with [[FastAPI]] (Python 3.11+), utilizing [[PostgreSQL]] as the relational store and [[SQLAlchemy]] async ORM with [[Alembic]] migrations.
- **Asynchronous Image Processing**: In-house DB-backed task queue (`tasks` table) managed by background worker (`worker.py`) using [[Pillow]] Lanczos resampling and WebP conversion (1200x1200 max web, 300x300 thumbnail).
- **State-Driven Workflow**: Products transition automatically from `DRAFT` to `PUBLISHED` upon successful background media processing.
- **Frontend Command Center**: Developed with [[React]] and [[Vite]] for both Admin portal management and Public catalog browsing.
- **Production Readiness**: Features multi-tier health probes (`/health/live`, `/health/ready` checking DB connectivity and upload mount write permissions).

```mermaid
graph LR
    A[Admin Multipart Upload] --> B[FastAPI Ingestion]
    B --> C[PostgreSQL Task Queue]
    C --> D[Async Pillow Worker]
    D --> E[Lanczos Resample & WebP Export]
    E --> F[Product Status: PUBLISHED]
```

---

## Key References & Related Notes
- Workspace Note: [[🚀 Projects/HASC/HASC|HASC Documentation]]
- Tech Stack: [[FastAPI]], [[PostgreSQL]], [[SQLAlchemy]], [[Alembic]], [[Pillow]], [[React]], [[Vite]], [[TypeScript]], [[Docker]]
- Learning References: [[K3 AI Program]]
