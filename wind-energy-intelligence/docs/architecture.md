# Wind Energy Intelligence — Architecture

```mermaid
graph TD
    subgraph External Sources
        ELEXON["Elexon BMRS API<br/>(FUELHH & WINDFOR streams)"]
    end

    subgraph Backend Layer
        FASTAPI["FastAPI Application (Port 8000)"]
        ROUTERS["API Routers<br/>(/api/actuals, /api/forecasts, /api/accuracy)"]
        SERVICES["Services Layer<br/>(elexon_service, processing_service, accuracy_service)"]
        DB_LAYER["PostgreSQL Database / SQLAlchemy ORM<br/>(wind_energy_db)"]
    end

    subgraph Frontend Layer
        REACT["React 19 + Vite (Port 5173)"]
        TAILWIND["Tailwind CSS v4 Styling"]
        RECHARTS["Recharts Time Series Visualizations"]
    end

    ELEXON -->|REST / JSON Stream| SERVICES
    SERVICES --> ROUTERS
    SERVICES --> DB_LAYER
    ROUTERS --> FASTAPI
    FASTAPI -->|CORS / REST JSON| REACT
```

## System Components

1. **Elexon BMRS API**
   - **FUELHH stream**: Half-hourly outturn generation by fuel type (filtered for `fuelType=WIND`).
   - **WINDFOR stream**: Wind generation forecasts published by the National Grid ESO.
   - **Endpoints**: `/latest` (near real-time forecasts), `/history` (historical forecast snapshot per publication time), and `/evolution` (forecast trajectory for a target delivery period).

2. **Backend (FastAPI)**
   - High-performance asynchronous Python API using `httpx` and `pydantic`.
   - Data normalization engine via `pandas` and statistical metrics calculation via `numpy`.
   - Database layer configured with PostgreSQL and SQLAlchemy ORM for archiving time series.

3. **Frontend (React + Vite + Tailwind CSS)**
   - Ultra-fast client dashboard built with Vite and React.
   - Recharts for settlement period-level forecast vs. actual visualization.
   - Responsive design with Lucide icons and clean enterprise aesthetic.
