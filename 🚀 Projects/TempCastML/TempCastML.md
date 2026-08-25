---
type: project
status: complete
priority: high
created: 2026-08-08
updated: 2026-08-08
owner: Lystiger
tags: [project, tempcastml, tinyml, esp32, lstm, edge-ml, forecasting, time-series]
tech_stack: [Python, ESP32-S3, TensorFlow, Keras, FastAPI, SQLModel, SQLite, React, Vite, Recharts, MLflow]
---

# TempCastML - Edge-ML Telemetry & Time-Series Temperature Forecasting Platform

## Overview
**TempCastML** is an end-to-end Edge-ML research system designed for real-time indoor environmental telemetry collection, short-term temperature time-series forecasting, and live telemetry visualization. The platform spans hardware sensing on an [[ESP32]] microcontroller, Python ingestion services, [[TensorFlow]] / [[Keras]] LSTM model research pipelines, [[MLflow]] experiment tracking, and a bespoke [[React]] telemetry command center dashboard.

The overarching objective is deployment of lightweight **TinyML / TFLite** models onto edge devices. TempCastML strictly enforces **quality gate engineering**: model export and edge compilation are intentionally blocked until trained neural network models demonstrably beat simple persistence baselines across chronological test windows.

---

## System Architecture

The project bridges hardware sensing with cloud/local machine learning research and real-time visualization.

```mermaid
graph TD
    subgraph Hardware Edge Layer
        ESP["ESP32-S3 Microcontroller"]
        DHT["DHT Temperature / Humidity Sensor"]
        ESP -->|Reads Environment| DHT
    end

    subgraph Data Ingestion & Storage
        Serial["Python Serial Collector & Cleaner"]
        SQLite[("SQLite Database (.sentinel / SQLModel)")]
        ESP -->|USB/Serial Telemetry Stream| Serial
        Serial -->|Cleaned Readings| SQLite
    end

    subgraph API & Backend Layer
        FastAPI["FastAPI App (backend/main.py)"]
        SlowAPI["SlowAPI Rate Limiter"]
        FastAPI --- SlowAPI
        SQLite -->|SQLModel Engine| FastAPI
    end

    subgraph ML Research & Pipeline Layer
        DataPrep["Chronological Split & Normalization"]
        LSTM["LSTM Model (train_lstm.py)"]
        ResidualLSTM["Multivariate Residual LSTM (train_residual_lstm.py)"]
        MLflowStore[("MLflow Tracking DB (sqlite:///mlflow.db)")]
        QualityGate{"Quality Gate: Beats Persistence?"}

        SQLite --> DataPrep
        DataPrep --> LSTM
        DataPrep --> ResidualLSTM
        LSTM --> MLflowStore
        ResidualLSTM --> MLflowStore
        ResidualLSTM --> QualityGate
        QualityGate -.->|Passed: Export TFLite| ESP
        QualityGate -.->|Failed: Refine Architecture| ResidualLSTM
    end

    subgraph Frontend Command Center
        ReactUI["React 19 + Vite 7 Telemetry Dashboard"]
        Recharts["Recharts Thermal Gradient Charts"]
        ReactUI --- Recharts
        FastAPI -->|REST API & Forecast Stream| ReactUI
    end
```

---

## Component Details

### 1. Hardware & Ingestion Layer
- **Microcontroller**: [[ESP32]]-S3 board with DHT environmental sensor executing C++ / Arduino firmware (`low-level code/`).
- **Serial Ingestion Pipeline**: Python collector script reads serial streams (`/dev/ttyUSB0` or `COM4`), cleans raw readings, rejects outlier sensor glitches, and enriches telemetry with OpenWeatherMap outdoor API context before persisting into [[SQLite]].

### 2. API & Database Engine
- **ORM & Database**: Built using [[SQLModel]] (combining [[Pipedream/FastAPI]] pydantic models with [[SQLAlchemy]] ORM) over an [[SQLite]] database.
- **REST Endpoints**:
  - `GET /sensor/latest`: Fetches the latest timestamped telemetry reading.
  - `GET /sensor/history`: Query parameter `limit=N` returns historical time-series sequences.
  - `GET /predict/`: Executes model inference for target horizon (`horizon=24`).
  - `POST /sensor/`: Manual endpoint for ingesting `{ device_id, temperature_c }` payloads.
- **Security & Performance**: [[SlowAPI]] middleware prevents endpoint abuse.

### 3. ML Research & Evaluation Engine
- **Architecture**: Implemented in [[TensorFlow]] / [[Keras]] with reproducible seed initialization:
  - `train_lstm`: One-step temperature-only baseline.
  - `train_residual_lstm`: Direct multivariate residual forecasting using indoor/outdoor conditions and cyclical time features (`sin`/`cos` hour encodings).
- **Experiment Tracking**: Integrated with [[MLflow]] (`sqlite:///backend/AI/mlflow.db`), tracking loss curves, hyperparameter configs, residual distribution plots, and predictions CSV artifacts.
- **Benchmarking Results**:
  - 30-minute horizon: Residual LSTM MAE 0.177°C vs Persistence MAE 0.104°C.
  - 60-minute horizon: Residual LSTM MAE 0.354°C vs Persistence MAE 0.173°C.
  - Evaluation proves persistence is extremely strong in stationary indoor environments, driving the requirement for event-triggered residual forecasting.

### 4. Telemetry Command Center Frontend
- **Tech Stack**: Built with [[React]] 19, [[Vite]] 7, [[Recharts]], and Tailwind CSS design tokens.
- **UI Features**: Bespoke dark command center aesthetic with live animated pulse readouts, thermal-gradient forecast visualization, unit conversion toggles (°C / °F / K), 12/24h time format switches, and connection health indicators.

---

## Data Flow

```mermaid
sequenceDiagram
    autonumber
    actor Edge as ESP32-S3 Sensor
    participant PyIngest as Python Ingestion
    participant DB as SQLite DB
    participant API as FastAPI Backend
    participant ML as Keras Inference Engine
    actor User as React Dashboard

    Edge->>PyIngest: Serial Stream (Temperature / Humidity)
    PyIngest->>PyIngest: Clean & Reject Outliers
    PyIngest->>DB: Insert SQLModel Reading Record
    
    User->>API: GET /sensor/latest
    API->>DB: Query newest record
    DB-->>API: Reading Model
    API-->>User: JSON Response (200 OK)

    User->>API: GET /predict/?horizon=24
    API->>DB: Fetch historical window (sequence_length=12)
    API->>ML: Pass normalized sequence to LSTM model
    ML-->>API: Return forecasted temperature values
    API-->>User: JSON Forecast Payload with visual bounds
```

---

## Key Code Snippets

### Keras LSTM Architecture Builder (`backend/AI/lstm_model.py`)
```python
import tensorflow as tf
from backend.AI.training_config import TrainingConfig

def configure_tensorflow(seed: int):
    tf.keras.utils.set_random_seed(seed)
    try:
        tf.config.experimental.enable_op_determinism()
    except Exception:
        pass
    return tf

def build_lstm_model(config: TrainingConfig):
    tf = configure_tensorflow(config.seed)
    model = tf.keras.Sequential(
        [
            tf.keras.layers.Input(
                shape=(config.sequence_length, len(config.feature_columns))
            ),
            tf.keras.layers.LSTM(config.lstm_units),
            tf.keras.layers.Dropout(config.dropout),
            tf.keras.layers.Dense(1),
        ],
        name="tempcast_lstm",
    )
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=config.learning_rate),
        loss="mse",
        metrics=["mae"],
    )
    return model
```

---

## Learnings & Architectural Takeaways

1. **The Persistence Baseline Paradox**: In stationary indoor temperature forecasting, simple persistence ($y_{t+h} = y_t$) often outperforms deep learning models across full datasets due to long unchanged intervals. Models must be evaluated specifically during **change events**.
2. **Strict Chronological Data Splitting**: Random k-fold cross-validation causes severe temporal data leakage in time-series forecasting. Training splits must maintain strict chronological boundaries with sequence gap rejection.
3. **Quality-Gated Edge Deployment**: Blocking [[TinyML]] / TFLite micro-compilation until a model passes rigorous benchmark quality gates prevents deploying unvalidated models to constrained microcontrollers.
4. **Integration Ecosystem**: Related to [[TensorFlow]], [[Keras]], [[ESP32]], [[FastAPI]], [[SQLModel]], [[SQLite]], [[React]], [[MLflow]], and [[K3-Course-Overview|K3 AI Course]].
