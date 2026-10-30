import pandas as pd
from typing import List, Dict, Any

def normalize_generation_records(records: List[Dict[str, Any]]) -> pd.DataFrame:
    """Normalize and format generation data records into a pandas DataFrame."""
    if not records:
        return pd.DataFrame()
    df = pd.DataFrame(records)
    if "generation" in df.columns:
        df["generation"] = pd.to_numeric(df["generation"], errors="coerce")
    return df
