// app/admin/enquiries/EnquiriesPageClient.jsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Mail,
  Phone,
  User,
  CalendarDays,
  Search,
  RefreshCw,
  MessageSquare,
  Tag,
  CheckCircle2,
  Clock3,
} from 'lucide-react';

function formatDate(value) {
  if (!value) return '-';
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function EnquiriesPageClient() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchEnquiries = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      setError('');

      const res = await fetch('/api/enquiries', {
        method: 'GET',
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Failed to fetch enquiries');
      }

      setRows(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Fetch enquiries error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((item) => {
      return [
        item.name,
        item.email,
        item.phone,
        item.subject,
        item.message,
        item.status,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q));
    });
  }, [rows, search]);

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <section className="relative overflow-hidden bg-gradient-to-r from-[#4b0014] via-[#7b001f] to-[#c8102e] text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_30%),radial-gradient(circle_at_bottom_left,white,transparent_25%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-white/80 text-sm font-medium uppercase tracking-[0.2em]">
                Admin Dashboard
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mt-2">
                Enquiries Tracking
              </h1>
              <p className="text-white/85 mt-3 text-base md:text-lg max-w-3xl">
                View all enquiry submissions stored in your database.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-w-[280px]">
              <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-4">
                <p className="text-sm text-white/80">Total Enquiries</p>
                <p className="text-2xl font-bold mt-1">{rows.length}</p>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-4">
                <p className="text-sm text-white/80">Filtered</p>
                <p className="text-2xl font-bold mt-1">{filteredRows.length}</p>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-4">
                <p className="text-sm text-white/80">New Status</p>
                <p className="text-2xl font-bold mt-1">
                  {rows.filter((r) => String(r.status || '').toLowerCase() === 'new').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, email, phone, subject, message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              onClick={() => fetchEnquiries(true)}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#c8102e] text-white font-semibold hover:opacity-90 disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading enquiries...</div>
          ) : error ? (
            <div className="p-10 text-center text-red-600">{error}</div>
          ) : filteredRows.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No enquiries found.</div>
          ) : (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr className="text-left text-sm text-gray-700">
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold">Phone</th>
                      <th className="px-6 py-4 font-semibold">Subject</th>
                      <th className="px-6 py-4 font-semibold">Message</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((item) => (
                      <tr key={item.id} className="border-t border-gray-200 align-top hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900 font-medium">{item.name || '-'}</td>
                        <td className="px-6 py-4 text-gray-700 break-all">{item.email || '-'}</td>
                        <td className="px-6 py-4 text-gray-700">{item.phone || '-'}</td>
                        <td className="px-6 py-4 text-gray-700">{item.subject || '-'}</td>
                        <td className="px-6 py-4 text-gray-700 max-w-md whitespace-pre-wrap">
                          {item.message || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                            {item.status || 'new'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                          {formatDate(item.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden p-4 space-y-4">
                {filteredRows.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <User className="w-4 h-4 text-red-600" />
                          {item.name || '-'}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 flex items-center gap-2 break-all">
                          <Mail className="w-4 h-4 text-red-600" />
                          {item.email || '-'}
                        </p>
                        <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-red-600" />
                          {item.phone || '-'}
                        </p>
                      </div>

                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                        {item.status || 'new'}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <p className="text-sm text-gray-700 flex items-start gap-2">
                        <Tag className="w-4 h-4 text-red-600 mt-0.5" />
                        <span><strong>Subject:</strong> {item.subject || '-'}</span>
                      </p>

                      <p className="text-sm text-gray-700 flex items-start gap-2 whitespace-pre-wrap">
                        <MessageSquare className="w-4 h-4 text-red-600 mt-0.5" />
                        <span><strong>Message:</strong> {item.message || '-'}</span>
                      </p>

                      <p className="text-sm text-gray-700 flex items-start gap-2">
                        <CalendarDays className="w-4 h-4 text-red-600 mt-0.5" />
                        <span><strong>Created:</strong> {formatDate(item.created_at)}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-gray-900">Email Count</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{rows.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total enquiry records</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-gray-900">New Enquiries</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {rows.filter((r) => String(r.status || '').toLowerCase() === 'new').length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Pending follow-up</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Clock3 className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-gray-900">Latest Entry</h3>
            </div>
            <p className="text-base font-semibold text-gray-900">
              {rows[0]?.name || '-'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {rows[0]?.created_at ? formatDate(rows[0].created_at) : 'No data'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}