import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Loader from "../common/Loader";

export default function GenerationChart({ data, loading }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">Forecast vs Actual Generation</h3>
          <p className="mt-1 text-sm text-gray-500">Comparison by settlement period (30-min intervals)</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-emerald-600"></span>
            <span className="text-gray-600">WINDFOR (Forecast)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-blue-600"></span>
            <span className="text-gray-600">FUELHH (Actual)</span>
          </div>
        </div>
      </div>
      <div className="h-80 w-full">
        {loading ? (
          <Loader message="Loading generation time series..." />
        ) : !data || data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No forecast records available for this period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="period"
                label={{ value: "Settlement Period", position: "insideBottom", offset: -5 }}
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                unit=" MW"
                stroke="#94a3b8"
                tick={{ fontSize: 12 }}
                tickFormatter={(val) => `${val.toLocaleString()}`}
              />
              <Tooltip
                formatter={(value, name) => [`${Number(value).toLocaleString()} MW`, name]}
                labelFormatter={(label) => `Settlement Period ${label}`}
                contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="forecast"
                name="Forecast MW"
                stroke="#059669"
                strokeWidth={2.5}
                dot={{ r: 2 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual MW"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ r: 2 }}
                connectNulls={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
