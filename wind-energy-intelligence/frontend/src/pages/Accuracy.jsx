import React from "react";
import { ChartNoAxesCombined, CheckCircle2, TrendingDown } from "lucide-react";

export default function Accuracy() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Forecast Accuracy Analytics</h2>
        <p className="mt-1 text-sm text-gray-500">
          Evaluation of Mean Absolute Error (MAE), RMSE, and forecast bias across settlement periods.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Mean Absolute Error (MAE)</p>
          <h3 className="mt-3 text-3xl font-bold text-gray-900">428 <span className="text-base font-normal text-gray-500">MW</span></h3>
          <p className="mt-1 text-xs text-emerald-600 flex items-center gap-1">
            <CheckCircle2 size={13} /> Within optimal trading bounds
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Root Mean Square Error (RMSE)</p>
          <h3 className="mt-3 text-3xl font-bold text-gray-900">612 <span className="text-base font-normal text-gray-500">MW</span></h3>
          <p className="mt-1 text-xs text-gray-400">Statistical dispersion metric</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">System Forecast Bias</p>
          <h3 className="mt-3 text-3xl font-bold text-emerald-600">+1.4%</h3>
          <p className="mt-1 text-xs text-gray-400">Mild over-forecasting trend</p>
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <ChartNoAxesCombined className="mx-auto text-gray-300" size={48} />
        <h3 className="mt-4 font-semibold text-gray-800">Advanced Analytics Engine Ready</h3>
        <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
          Comprehensive error distributions, horizon degradation analysis, and trading risk indicators will be configured in upcoming steps.
        </p>
      </div>
    </section>
  );
}
