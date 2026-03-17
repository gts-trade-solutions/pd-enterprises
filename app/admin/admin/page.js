import VisitCountCard from "../../../components/VisitCountCard";
import { BarChart3, Activity, Globe, TrendingUp } from "lucide-react";

export default function VisitCountPage() {
  return (
    <div className="mt-20 min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(127,29,29,0.22),transparent_28%),linear-gradient(135deg,#030303_0%,#120106_45%,#5b0010_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_28%)]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-400/25 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-300 shadow-sm">
                <Activity className="h-4 w-4" />
                Live Analytics Dashboard
              </div>

              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
                Website Visit Count
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
                Monitor website traffic in real time with a clean dashboard built
                for quick visibility, daily tracking, and live updates.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-lg">
                <Globe className="mb-4 h-6 w-6 text-rose-400" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Source
                </p>
                <p className="mt-2 text-xl font-semibold text-white">Website</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-lg">
                <BarChart3 className="mb-4 h-6 w-6 text-rose-400" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Mode
                </p>
                <p className="mt-2 text-xl font-semibold text-white">Live Count</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-lg">
                <TrendingUp className="mb-4 h-6 w-6 text-rose-400" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Refresh
                </p>
                <p className="mt-2 text-xl font-semibold text-white">Auto Sync</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-lg">
                <Activity className="mb-4 h-6 w-6 text-rose-400" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Status
                </p>
                <p className="mt-2 text-xl font-semibold text-emerald-400">Active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <VisitCountCard />
        </div>
      </div>
    </div>
  );
}