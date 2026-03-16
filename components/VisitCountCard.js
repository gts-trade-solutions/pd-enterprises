"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  CalendarDays,
  RefreshCw,
  MousePointerClick,
  ArrowUpRight,
} from "lucide-react";

export default function VisitCountCard() {
  const [stats, setStats] = useState({
    totalVisits: 0,
    todayVisits: 0,
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadStats = async () => {
    try {
      const res = await fetch(`/api/visit-stats?t=${Date.now()}`, {
        method: "GET",
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setStats(data.data);
        setLastUpdated(new Date());
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to load visit stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div className="xl:col-span-4 rounded-[30px] border border-gray-200 bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Visits</p>
            <h2 className="mt-4 text-5xl font-bold tracking-tight text-gray-900">
              {loading ? "..." : stats.totalVisits}
            </h2>
          </div>

          <div className="rounded-2xl bg-rose-50 p-3 text-rose-500">
            <MousePointerClick className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600">
            <ArrowUpRight className="h-4 w-4" />
            Overall website hit count
          </p>
        </div>
      </div>

      <div className="xl:col-span-4 rounded-[30px] border border-gray-200 bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Today Visits</p>
            <h2 className="mt-4 text-5xl font-bold tracking-tight text-gray-900">
              {loading ? "..." : stats.todayVisits}
            </h2>
          </div>

          <div className="rounded-2xl bg-sky-50 p-3 text-sky-500">
            <CalendarDays className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3">
          <p className="text-sm font-medium text-sky-600">
            {stats.todayVisits > 0
              ? `${stats.todayVisits} hits recorded today`
              : "No activity today yet"}
          </p>
        </div>
      </div>

      <div className="xl:col-span-4 rounded-[30px] border border-gray-200 bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Dashboard Status</p>
            <h3 className="mt-4 text-3xl font-bold text-gray-900">Live Tracking</h3>
            <p className="mt-4 text-sm leading-7 text-gray-600">
              Visit counts sync automatically and refresh every second for a near
              real-time dashboard view.
            </p>
          </div>

          <div className="rounded-2xl bg-rose-50 p-3 text-rose-500">
            <Activity className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <RefreshCw className="h-4 w-4" />
            <span>Last updated:</span>
            <span className="font-semibold text-gray-900">
              {lastUpdated ? lastUpdated.toLocaleTimeString() : "Loading..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}