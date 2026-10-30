import React from "react";
import { Wind, Clock, ArrowUpRight } from "lucide-react";

export default function Forecasts({ forecasts, loading }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Wind Forecast Monitoring</h2>
        <p className="mt-1 text-sm text-gray-500">
          WINDFOR stream data from Elexon BMRS including publication and delivery timestamps.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h3 className="font-semibold text-gray-900">Latest WINDFOR Feed</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-3">Settlement Date</th>
                <th className="px-6 py-3">Period</th>
                <th className="px-6 py-3">Forecast (MW)</th>
                <th className="px-6 py-3">Start Time</th>
                <th className="px-6 py-3">Publish Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">Loading forecasts...</td>
                </tr>
              ) : forecasts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">No forecast data loaded.</td>
                </tr>
              ) : (
                forecasts.slice(0, 15).map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-gray-900">{row.settlementDate}</td>
                    <td className="px-6 py-3.5">{row.settlementPeriod}</td>
                    <td className="px-6 py-3.5 font-semibold text-emerald-600">
                      {row.generation?.toLocaleString()} MW
                    </td>
                    <td className="px-6 py-3.5 text-xs text-gray-500">{row.startTime || "—"}</td>
                    <td className="px-6 py-3.5 text-xs text-gray-500">{row.publishTime || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
