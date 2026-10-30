from fastapi import APIRouter, HTTPException
from app.services.elexon_service import get_wind_actuals

router = APIRouter(prefix="/api/actuals", tags=["Actuals"])

@router.get("/wind")
async def wind_actuals(start: str, end: str):
    try:
        data = await get_wind_actuals(start, end)
        if isinstance(data, dict):
            data = data.get("data", [])
        return {
            "fuel_type": "WIND",
            "count": len(data),
            "records": data
        }
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Elexon actual generation request failed: {str(e)}"
        )
