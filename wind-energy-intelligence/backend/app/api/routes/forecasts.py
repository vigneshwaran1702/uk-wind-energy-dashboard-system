from fastapi import APIRouter, HTTPException
from app.services.elexon_service import get_wind_forecasts

router = APIRouter(prefix="/api/forecasts", tags=["Forecasts"])

@router.get("/wind/latest")
async def latest_wind_forecast(start: str, end: str):
    try:
        data = await get_wind_forecasts(start, end)
        if isinstance(data, dict):
            data = data.get("data", [])
        return {
            "forecast_type": "WINDFOR",
            "count": len(data),
            "records": data
        }
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Elexon forecast request failed: {str(e)}"
        )
