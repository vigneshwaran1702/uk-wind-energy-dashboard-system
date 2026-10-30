import React from "react";
import { RefreshCw, Wind } from "lucide-react";

export default function Header({ onRefresh, loading }) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-5">
      <div className="flex items-center gap-3">
        <div className="lg:hidden rounded-lg bg-emerald-600 p-2 text-white">
          <Wind size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="mt-0.5 text-xs text-gray-500">Renewable generation monitoring & analytics</p>
        </div>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-emerald-700 disabled:opacity-60 shadow-sm"
      >
        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        <span>{loading ? "Refreshing..." : "Refresh data"}</span>
      </button>
    </header>
  );
}
