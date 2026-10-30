import React from "react";
import { CheckCircle2, Clock, Database } from "lucide-react";

export default function DataStatus({ lastUpdated, actualCount, forecastCount }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm text-xs text-gray-500">
      <div className="flex items-center gap-2">
        <Database size={16} className="text-emerald-600" />
        <span>Elexon BMRS Live Integration</span>
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
          <CheckCircle2 size={12} className="mr-1" /> Connected
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span>Actuals Stream: <strong>{actualCount}</strong> records</span>
        <span>Forecasts Stream: <strong>{forecastCount}</strong> records</span>
        {lastUpdated && (
          <div className="flex items-center gap-1 text-gray-400">
            <Clock size={14} />
            <span>Last fetched: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
