import React from "react";
import {
  Wind,
  LayoutDashboard,
  Gauge,
  ChartNoAxesCombined,
  Clock,
} from "lucide-react";

export default function Sidebar({ activeTab = "overview", onSelectTab }) {
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "forecasts", label: "Forecast monitoring", icon: Wind },
    { id: "accuracy", label: "Accuracy analysis", icon: ChartNoAxesCombined },
    { id: "historical", label: "Historical data", icon: Clock },
  ];

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-200 bg-white p-6 lg:block z-30">
      <div className="mb-10 flex items-center gap-3">
        <div className="rounded-xl bg-emerald-600 p-3 text-white shadow-sm">
          <Wind size={24} />
        </div>
        <div>
          <h1 className="font-bold text-gray-900 leading-tight">Wind Intelligence</h1>
          <p className="text-[10px] tracking-wider font-semibold text-gray-400">
            ENERGY ANALYTICS
          </p>
        </div>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Workspace
      </p>

      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab && onSelectTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 shadow-xs"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={19} className={isActive ? "text-emerald-600" : "text-gray-400"} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="rounded-lg bg-gray-50 p-3 border border-gray-100">
          <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
            UK National Grid
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Elexon BMRS Settlement Stream
          </p>
        </div>
      </div>
    </aside>
  );
}
