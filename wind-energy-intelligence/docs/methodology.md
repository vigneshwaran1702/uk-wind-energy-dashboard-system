# Forecast Evaluation Methodology

## 1. Settlement Period Alignment
The UK Electricity Balancing and Settlement Code (BSC) operates on half-hourly settlement periods:
- **48 periods** per standard day (46 on short clock change day, 50 on long clock change day).
- Settlement Period 1 spans `00:00 - 00:30 UTC`.
- Forecasts (`WINDFOR`) and actual generation (`FUELHH`) are joined on the composite key `(settlementDate, settlementPeriod)`.

## 2. Statistical Metrics

### Mean Absolute Error (MAE)
Measures average magnitude of forecast errors without considering direction:
$$MAE = \frac{1}{N} \sum_{i=1}^N |Forecast_i - Actual_i|$$

### Root Mean Squared Error (RMSE)
Penalizes larger outliers more heavily, which is critical for power trading balancing risks:
$$RMSE = \sqrt{\frac{1}{N} \sum_{i=1}^N (Forecast_i - Actual_i)^2}$$

### Mean Absolute Percentage Error (MAPE)
Evaluates percentage relative error (calculated over non-zero generation periods):
$$MAPE = \frac{100\%}{N} \sum_{i=1}^N \left| \frac{Forecast_i - Actual_i}{Actual_i} \right|$$

### Systematic Bias
Indicates persistent over-forecasting (positive value) or under-forecasting (negative value):
$$Bias = \frac{1}{N} \sum_{i=1}^N (Forecast_i - Actual_i)$$
