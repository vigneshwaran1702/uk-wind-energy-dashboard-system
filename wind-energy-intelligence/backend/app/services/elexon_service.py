import httpx
import os

BASE_URL = os.getenv("ELEXON_BASE_URL", "https://data.elexon.co.uk/bmrs/api/v1")

async def fetch_elexon(endpoint: str, params: dict = None):
    url = f"{BASE_URL}/{endpoint}"
    async with httpx.AsyncClient(timeout=45) as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        return response.json()

async def get_wind_actuals(start: str, end: str):
    return await fetch_elexon(
        "datasets/FUELHH/stream",
        {
            "from": start,
            "to": end,
            "fuelType": "WIND"
        }
    )

async def get_wind_forecasts(start: str, end: str):
    return await fetch_elexon(
        "forecast/generation/wind/latest",
        {
            "from": start,
            "to": end
        }
    )
