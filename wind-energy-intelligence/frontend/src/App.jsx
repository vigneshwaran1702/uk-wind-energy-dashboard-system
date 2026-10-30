import { useEffect, useState } from "react";
import {
  Activity,
  Wind,
  Gauge,
  TrendingUp,
  RefreshCw,
  LayoutDashboard,
  ChartNoAxesCombined,
  Clock,
  AlertCircle,
} from "lucide-react";
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
import { getActuals, getForecasts } from "./services/api";
import Forecasts from "./pages/Forecasts";
import Accuracy from "./pages/Accuracy";
import Historical from "./pages/Historical";

function App() {
  const [actuals, setActuals] = useState([]);
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const start = "2026-10-28T00:00:00Z";
      const end = "2026-10-30T00:00:00Z";
      const [actualData, forecastData] = await Promise.all([
        getActuals(start, end),
        getForecasts(start, end),
      ]);
      setActuals(actualData.records || []);
      setForecasts(forecastData.records || []);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Unable to retrieve Elexon data."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const latestForecast = forecasts.length ? forecasts[forecasts.length - 1].generation : null;
  const latestActual = actuals.length ? actuals[actuals.length - 1].generation : null;

  const chartData = forecasts.map((forecast) => {
    const matchingActual = actuals.find(
      (actual) =>
        actual.settlementDate === forecast.settlementDate &&
        actual.settlementPeriod === forecast.settlementPeriod
    );
    return {
      period: forecast.settlementPeriod,
      forecast: forecast.generation,
      actual: matchingActual?.generation ?? null,
    };
  });

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
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-200 bg-white p-6 lg:block z-30">
        <div className="mb-10 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-600 p-3 text-white">
            <Wind size={23} />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Wind Intelligence</h1>
            <p className="text-xs text-gray-500">ENERGY ANALYTICS</p>
          </div>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase text-gray-400">Workspace</p>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "overview"
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard size={19} /> Overview
          </button>
          <button
            onClick={() => setActiveTab("forecasts")}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "forecasts"
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Wind size={19} /> Forecast monitoring
          </button>
          <button
            onClick={() => setActiveTab("accuracy")}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "accuracy"
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <ChartNoAxesCombined size={19} /> Accuracy analysis
          </button>
          <button
            onClick={() => setActiveTab("historical")}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "historical"
                ? "bg-emerald-50 text-emerald-700"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Clock size={19} /> Historical data
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 text-xs text-gray-400">
          UK NATIONAL WIND GENERATION
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {activeTab === "overview"
                ? "Dashboard Overview"
                : activeTab === "forecasts"
                ? "Forecast Monitoring"
                : activeTab === "accuracy"
                ? "Accuracy Analysis"
                : "Historical Comparison"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">Renewable generation monitoring</p>
          </div>
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh data
          </button>
        </header>

        <div className="p-8">
          {activeTab === "overview" && (
            <section className="space-y-7">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Wind Generation Intelligence</h2>
                <p className="mt-1 text-gray-500">
                  Monitor forecasts and evaluate generation accuracy.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle size={20} /> {error}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.title}
                      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">{card.title}</p>
                        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                          <Icon size={20} />
                        </div>
                      </div>
                      <h3 className="mt-5 text-3xl font-bold text-gray-900">
                        {loading
                          ? "..."
                          : card.value == null
                          ? "—"
                          : Number(card.value).toLocaleString()}
                      </h3>
                      <p className="mt-2 text-xs text-gray-400">{card.unit}</p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900">Forecast vs Actual Generation</h3>
                  <p className="mt-1 text-sm text-gray-500">Comparison by settlement period</p>
                </div>
                <div className="h-80">
                  {loading ? (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      Loading Elexon data...
                    </div>
                  ) : chartData.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      No forecast records available for this period.
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="forecast"
                          name="Forecast MW"
                          stroke="#059669"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="actual"
                          name="Actual MW"
                          stroke="#2563eb"
                          strokeWidth={2}
                          dot={false}
                          connectNulls={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </section>
          )}

          {activeTab === "forecasts" && (
            <Forecasts forecasts={forecasts} loading={loading} />
          )}

          {activeTab === "accuracy" && (
            <Accuracy />
          )}

          {activeTab === "historical" && (
            <Historical />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
