import numpy as np
import pandas as pd
from typing import Dict, Any

def compute_forecast_metrics(df_merged: pd.DataFrame) -> Dict[str, Any]:
    """Compute MAE, RMSE, MAPE, and bias between actual and forecast generation."""
    if df_merged.empty or "actual" not in df_merged.columns or "forecast" not in df_merged.columns:
        return {"mae": None, "rmse": None, "mape": None, "bias": None, "count": 0}

    valid = df_merged.dropna(subset=["actual", "forecast"]).copy()
    if valid.empty:
        return {"mae": None, "rmse": None, "mape": None, "bias": None, "count": 0}

    error = valid["forecast"] - valid["actual"]
    mae = float(np.mean(np.abs(error)))
    rmse = float(np.sqrt(np.mean(error ** 2)))
    bias = float(np.mean(error))
    
    # Avoid zero division in MAPE
    non_zero = valid[valid["actual"] > 0]
    mape = float(np.mean(np.abs((non_zero["forecast"] - non_zero["actual"]) / non_zero["actual"])) * 100) if not non_zero.empty else None

    return {
        "mae": round(mae, 2),
        "rmse": round(rmse, 2),
        "mape": round(mape, 2) if mape is not None else None,
        "bias": round(bias, 2),
        "count": len(valid)
    }
