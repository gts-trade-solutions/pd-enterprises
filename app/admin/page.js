import Link from "next/link";
import VisitCountCard from "../../components/VisitCountCard";
import {
  BarChart3,
  Activity,
  Globe,
  TrendingUp,
  FileText,
  Mail,
  ChevronRight,
} from "lucide-react";

export default function VisitCountPage() {
  const sidebarItems = [
    {
      title: "Blog",
      description: "Manage blog posts and updates",
      href: "/admin/blog/new",
      icon: FileText,
    },
    {
      title: "Email Enquiries",
      description: "Track submitted contact enquiries",
      href: "/admin/enquiries",
      icon: Mail,
    },
    {
      title: "Email Template Builder",
      description: "Create and manage email templates",
      href: "/admin/email-template",
      icon: Mail,
    },
  ];

  return (
    <div className="mt-20 min-h-screen bg-white">
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-500">
                Quick Access
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Admin Sidebar
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Navigate quickly to key sections of your dashboard.
              </p>
            </div>

            <div className="space-y-4">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group block rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-rose-300 hover:bg-rose-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-rose-500 transition-all duration-300 group-hover:bg-rose-100">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-base font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <ChevronRight className="h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-rose-500" />
                        </div>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </aside>

          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.06),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.03),transparent_28%)]" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 shadow-sm">
                    <Activity className="h-4 w-4" />
                    Live Analytics Dashboard
                  </div>

                  <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                    Website Visit Count
                  </h1>

                  <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
                    Monitor website traffic in real time with a clean dashboard
                    built for quick visibility, daily tracking, and live updates.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <Globe className="mb-4 h-6 w-6 text-rose-500" />
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Source
                    </p>
                    <p className="mt-2 text-xl font-semibold text-gray-900">
                      Website
                    </p>
                  </div>

                  <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <BarChart3 className="mb-4 h-6 w-6 text-rose-500" />
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Mode
                    </p>
                    <p className="mt-2 text-xl font-semibold text-gray-900">
                      Live Count
                    </p>
                  </div>

                  <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <TrendingUp className="mb-4 h-6 w-6 text-rose-500" />
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Refresh
                    </p>
                    <p className="mt-2 text-xl font-semibold text-gray-900">
                      Auto Sync
                    </p>
                  </div>

                  <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <Activity className="mb-4 h-6 w-6 text-rose-500" />
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Status
                    </p>
                    <p className="mt-2 text-xl font-semibold text-emerald-500">
                      Active
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <VisitCountCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}