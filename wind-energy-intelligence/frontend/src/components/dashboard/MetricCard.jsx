import React from "react";

export default function MetricCard({ title, value, icon: Icon, unit, loading }) {
  const displayValue = loading
    ? "..."
    : value == null
    ? "—"
    : typeof value === "number"
    ? value.toLocaleString()
    : value;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
          <Icon size={20} />
        </div>
      </div>
      <h3 className="mt-4 text-3xl font-bold text-gray-900">{displayValue}</h3>
      <p className="mt-1 text-xs text-gray-400 font-medium">{unit}</p>
    </div>
  );
}
