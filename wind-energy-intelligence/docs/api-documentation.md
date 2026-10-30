# API Documentation

## Base URL
Default local backend URL: `http://localhost:8000`

Swagger UI interactive docs: `http://localhost:8000/docs`

---

## Endpoints

### 1. Actual Wind Generation
- **Endpoint**: `GET /api/actuals/wind`
- **Source**: Elexon `datasets/FUELHH/stream`
- **Query Parameters**:
  - `start` (string, ISO-8601, required): e.g. `2026-10-28T00:00:00Z`
  - `end` (string, ISO-8601, required): e.g. `2026-10-29T00:00:00Z`
- **Response**:
```json
{
  "fuel_type": "WIND",
  "count": 48,
  "records": [
    {
      "dataset": "FUELHH",
      "publishTime": "2026-10-28T00:30:00Z",
      "startTime": "2026-10-28T00:00:00Z",
      "settlementDate": "2026-10-28",
      "settlementPeriod": 1,
      "fuelType": "WIND",
      "generation": 18450
    }
  ]
}
```

---

### 2. Latest Wind Forecast
- **Endpoint**: `GET /api/forecasts/wind/latest`
- **Source**: Elexon `forecast/generation/wind/latest`
- **Query Parameters**:
  - `start` (string, ISO-8601, required): e.g. `2026-10-28T00:00:00Z`
  - `end` (string, ISO-8601, required): e.g. `2026-10-29T00:00:00Z`
- **Response**:
```json
{
  "forecast_type": "WINDFOR",
  "count": 48,
  "records": [
    {
      "publishTime": "2026-10-27T23:30:00Z",
      "startTime": "2026-10-28T00:00:00Z",
      "settlementDate": "2026-10-28",
      "settlementPeriod": 1,
      "generation": 19102
    }
  ]
}
```

---

### 3. System Health Check
- **Endpoint**: `GET /health`
- **Response**: `{"status": "healthy"}`
