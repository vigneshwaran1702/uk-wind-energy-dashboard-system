import React from "react";
import { Clock, Calendar } from "lucide-react";

export default function Historical() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Historical Comparison</h2>
        <p className="mt-1 text-sm text-gray-500">
          Query historical generation evolution and compare multi-day forecast horizons.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <Clock className="mx-auto text-gray-300" size={48} />
        <h3 className="mt-4 font-semibold text-gray-800">Historical Evolution Archives</h3>
        <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
          Connected to Elexon /history and /evolution endpoints for deep forecast evaluation and backtesting.
        </p>
      </div>
    </section>
  );
}
