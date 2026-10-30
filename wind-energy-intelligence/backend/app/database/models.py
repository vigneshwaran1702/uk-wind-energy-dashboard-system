from sqlalchemy import Column, Integer, String, Float, DateTime
from app.database.connection import Base

class WindActual(Base):
    __tablename__ = "wind_actuals"

    id = Column(Integer, primary_key=True, index=True)
    settlement_date = Column(String, index=True)
    settlement_period = Column(Integer, index=True)
    publish_time = Column(DateTime, nullable=True)
    start_time = Column(DateTime, index=True)
    generation = Column(Float)
    fuel_type = Column(String, default="WIND")

class WindForecast(Base):
    __tablename__ = "wind_forecasts"

    id = Column(Integer, primary_key=True, index=True)
    settlement_date = Column(String, index=True)
    settlement_period = Column(Integer, index=True)
    publish_time = Column(DateTime, index=True)
    start_time = Column(DateTime, index=True)
    generation = Column(Float)
    forecast_type = Column(String, default="WINDFOR")
