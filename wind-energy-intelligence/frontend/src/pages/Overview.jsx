import React from "react";
import { Activity, Wind, Gauge, TrendingUp } from "lucide-react";
import MetricCard from "../components/dashboard/MetricCard";
import GenerationChart from "../components/dashboard/GenerationChart";
import DataStatus from "../components/dashboard/DataStatus";
import ErrorMessage from "../components/common/ErrorMessage";

export default function Overview({ actuals, forecasts, loading, error, chartData, lastUpdated }) {
  const latestForecast = forecasts.length ? forecasts[forecasts.length - 1].generation : null;
  const latestActual = actuals.length ? actuals[actuals.length - 1].generation : null;

  const cards = [
    {
      title: "Latest Wind Forecast",
      value: latestForecast,
      icon: Wind,
      unit: "MW",
    },
    {
      title: "Latest Actual Generation",
      value: latestActual,
      icon: Activity,
      unit: "MW",
    },
    {
      title: "Forecast Records",
      value: forecasts.length,
      icon: Gauge,
      unit: "records",
    },
    {
      title: "Actual Records",
      value: actuals.length,
      icon: TrendingUp,
      unit: "records",
    },
  ];

  return (
    <section className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Wind Generation Intelligence</h2>
          <p className="mt-1 text-sm text-gray-500">
            Monitor real-time forecasts and evaluate generation accuracy across the UK National Grid.
          </p>
        </div>
      </div>

      <ErrorMessage message={error} />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <MetricCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            unit={card.unit}
            loading={loading}
          />
        ))}
      </div>

      <GenerationChart data={chartData} loading={loading} />

      <DataStatus
        lastUpdated={lastUpdated}
        actualCount={actuals.length}
        forecastCount={forecasts.length}
      />
    </section>
  );
}
