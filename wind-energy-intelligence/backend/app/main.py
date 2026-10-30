from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from app.api.routes import actuals, forecasts, accuracy

app = FastAPI(
    title="Wind Energy Intelligence API",
    description="UK wind generation monitoring and forecast accuracy",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL", "http://localhost:5173"),
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(actuals.router)
app.include_router(forecasts.router)
app.include_router(accuracy.router)

@app.get("/")
def home():
    return {
        "status": "running",
        "application": "Wind Energy Intelligence"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
