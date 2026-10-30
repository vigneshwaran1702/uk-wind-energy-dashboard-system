# Wind Energy Intelligence

An enterprise-grade monitoring and forecast accuracy evaluation dashboard for UK National Grid wind power generation, powered by live Elexon BMRS API data.

## Features
- **Live Generation Stream**: Tracks actual wind generation outturn via the Elexon `FUELHH` dataset.
- **Wind Forecast Monitoring**: Pulls latest forecasts via the `WINDFOR` feed with publication vs. delivery time tracking.
- **Interactive Visualizations**: Settlement-period aligned actual vs. forecast charts built with Recharts.
- **Accuracy Analytics**: Statistical error metrics (MAE, RMSE, MAPE, Bias).

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Recharts, Axios
- **Backend**: FastAPI, Uvicorn, HTTPX (async client), Pandas, NumPy, SQLAlchemy, PostgreSQL

## Quick Start

### 1. Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
- API Documentation: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Health Check: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Web Application: [http://localhost:5173](http://localhost:5173)
