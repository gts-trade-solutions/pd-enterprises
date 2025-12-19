'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Calendar,
  Clock,
  ArrowRight,
  Star,
  Image as ImageIcon,
  Video,
  Pencil,
  Trash2,
  RefreshCw,
  Search,
  Tag,
  X,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Hash,
} from 'lucide-react';

export default function AdminBlogPage() {
  const fileRef = useRef(null);

  const [editingId, setEditingId] = useState(null);

  // form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  // ✅ media
  const [media, setMedia] = useState([]); // [{type,url,path,name,mime,size}]
  const [uploading, setUploading] = useState(false);

  // list + ui
  const [savedPosts, setSavedPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // filters
  const [q, setQ] = useState('');
  const [catFilter, setCatFilter] = useState('all');

  // toast
  const [toast, setToast] = useState(null); // { type, message }

  // delete modal
  const [deleteId, setDeleteId] = useState(null);

  const computedSlug = useMemo(() => {
    if (!title) return '';
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }, [title]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const showToast = (type, message) => {
    setToast({ type, message });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2600);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('');
    setExcerpt('');
    setDate(new Date().toISOString().slice(0, 10));
    setContent('');
    setRating(0);
    setMedia([]);
  };

  const loadDrafts = async ({ soft = false } = {}) => {
    if (!soft) setLoadingPosts(true);
    setRefreshing(true);

    try {
      const res = await fetch('/api/admin/blog?status=draft', { cache: 'no-store' });
      const json = await res.json();

      if (!res.ok) {
        console.error(json.error);
        showToast('error', json.error || 'Failed to load drafts');
        setSavedPosts([]);
        return;
      }

      setSavedPosts(Array.isArray(json.data) ? json.data : []);
    } catch (e) {
      console.error('Load drafts failed:', e);
      showToast('error', 'Failed to load drafts');
    } finally {
      setLoadingPosts(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDrafts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setDeleteId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const readingMins = useMemo(() => {
    const words = (content || '').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }, [content]);

  const categories = useMemo(() => {
    const set = new Set();
    for (const p of savedPosts) {
      if (p?.category) set.add(p.category);
    }
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [savedPosts]);

  const filteredPosts = useMemo(() => {
    const query = q.trim().toLowerCase();
    return savedPosts.filter((p) => {
      const okCat = catFilter === 'all' ? true : (p.category || '') === catFilter;
      const hay = `${p.title || ''} ${p.excerpt || ''} ${p.category || ''}`.toLowerCase();
      const okQ = !query ? true : hay.includes(query);
      return okCat && okQ;
    });
  }, [savedPosts, q, catFilter]);

  // ✅ upload (photos + videos)
  const uploadSelectedFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const fd = new FormData();
      for (const f of files) fd.append('files', f);
      fd.append('prefix', computedSlug || (editingId ? `draft-${editingId}` : `draft-${Date.now()}`));

      const res = await fetch('/api/admin/blog-media', { method: 'POST', body: fd });
      const json = await res.json();

      if (!res.ok) {
        console.error(json.error);
        showToast('error', json.error || 'Upload failed');
        return;
      }

      const items = Array.isArray(json.items) ? json.items : [];
      setMedia((prev) => [...prev, ...items]);
      showToast('success', `Uploaded ${items.length} file(s)`);
    } catch (e) {
      console.error(e);
      showToast('error', 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const removeMedia = async (item) => {
    setMedia((prev) => prev.filter((m) => m.path !== item.path));
    try {
      await fetch('/api/admin/blog-media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paths: [item.path] }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/blog', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingId ? { id: editingId } : {}),
          title: title.trim(),
          slug: computedSlug || null,
          category: category?.trim() || null,
          excerpt: excerpt?.trim() || null,
          content: content || null,
          rating,
          status: 'draft',
          post_date: date,
          media, // ✅ save media list
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        console.error(json.error);
        showToast('error', json.error || 'Failed to save');
        return;
      }

      showToast('success', editingId ? 'Draft updated' : 'Draft saved');

      if (editingId) {
        setSavedPosts((prev) => prev.map((p) => (p.id === editingId ? json.data : p)));
      } else {
        setSavedPosts((prev) => [json.data, ...prev]);
      }

      resetForm();
    } catch (err) {
      console.error('Save failed:', err);
      showToast('error', 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title || '');
    setCategory(post.category || '');
    setExcerpt(post.excerpt || '');
    setContent(post.content || '');
    setRating(post.rating || 0);
    setMedia(Array.isArray(post.media) ? post.media : []);

    const d = post.post_date
      ? String(post.post_date)
      : (post.created_at ? String(post.created_at).slice(0, 10) : new Date().toISOString().slice(0, 10));
    setDate(d);

    showToast('success', 'Loaded into editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const requestDelete = (id) => setDeleteId(id);

  const confirmDelete = async () => {
    const id = deleteId;
    if (!id) return;

    const post = savedPosts.find((p) => p.id === id);
    const paths = (post?.media || []).map((m) => m?.path).filter(Boolean);

    try {
      if (paths.length) {
        await fetch('/api/admin/blog-media', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paths }),
        });
      }

      const res = await fetch('/api/admin/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();
      if (!res.ok) {
        console.error(json.error);
        showToast('error', json.error || 'Delete failed');
        return;
      }

      setSavedPosts((prev) => prev.filter((p) => p.id !== id));
      if (editingId === id) resetForm();

      showToast('success', 'Draft deleted');
      setDeleteId(null);
    } catch (e) {
      console.error(e);
      showToast('error', 'Delete failed');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3">
          <div className="flex items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-slate-400">
                Admin Studio
              </p>
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
                Blog Posts
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex text-xs px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                Drafts: {savedPosts.length}
              </span>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  showToast('success', 'New draft');
                }}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800"
              >
                <FileText className="w-4 h-4" />
                New Draft
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="grid gap-2 sm:grid-cols-[1fr_220px_auto] items-center">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search drafts by title, excerpt, category..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </div>

            <div className="relative">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'all' ? 'All categories' : c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                ▾
              </div>
            </div>

            <button
              type="button"
              onClick={() => loadDrafts({ soft: true })}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"
              disabled={refreshing}
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{refreshing ? 'Refreshing' : 'Refresh'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed right-4 top-20 z-50">
          <div
            className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg bg-white ${
              toast.type === 'success' ? 'border-emerald-200' : 'border-rose-200'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5" />
            )}
            <div className="min-w-[220px]">
              <p className="text-sm font-semibold text-slate-900">
                {toast.type === 'success' ? 'Done' : 'Error'}
              </p>
              <p className="text-xs text-slate-600">{toast.message}</p>
            </div>
            <button
              className="ml-2 text-slate-400 hover:text-slate-600"
              onClick={() => setToast(null)}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        {/* Left: editor */}
        <section className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  {editingId ? 'Update draft' : 'Create draft'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Saved to Supabase as <span className="font-semibold">Draft</span>.
                </p>
              </div>

              {editingId && (
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                  Editing #{String(editingId).slice(0, 6)}
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., 2025 Market Outlook for CV Segment"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                  required
                />
              </div>

              {/* Settings row */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Analytics"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Post date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Rating</label>
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 bg-white">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setRating(v)}
                          className="p-0.5"
                          aria-label={`Set rating ${v}`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              v <= rating ? 'fill-[#fbbc04] text-[#fbbc04]' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-slate-600">{rating ? `${rating}.0` : '—'}</span>
                  </div>
                </div>
              </div>

              {/* Slug + Excerpt */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Slug (auto)</label>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 bg-slate-50">
                    <Hash className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-700 break-all">{computedSlug || '—'}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Excerpt</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={2}
                    placeholder="Short 1–2 line summary…"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  placeholder="Write your blog content..."
                  className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              {/* ✅ Media upload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-600">Media (Photos / Videos)</p>
                  <span className="text-xs text-slate-500">{media.length} file(s)</span>
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => uploadSelectedFiles(e.target.files)}
                />

                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-60"
                  >
                    <ImageIcon className="w-4 h-4" />
                    {uploading ? 'Uploading...' : 'Upload Photos / Videos'}
                  </button>

                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 flex items-center gap-2">
                    <Video className="w-4 h-4 text-slate-400" />
                    Accepts: JPG/PNG/WEBP + MP4/MOV/WEBM
                  </div>
                </div>

                {/* preview grid */}
                {media.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {media.map((m) => (
                      <div key={m.path} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                        <div className="relative">
                          {m.type === 'video' ? (
                            <video src={m.url} controls className="w-full h-40 object-cover bg-black" />
                          ) : (
                            <img src={m.url} alt={m.name} className="w-full h-40 object-cover" />
                          )}

                          <button
                            type="button"
                            onClick={() => removeMedia(m)}
                            className="absolute top-2 right-2 rounded-full bg-white/90 border border-slate-200 p-2 hover:bg-white"
                            title="Remove"
                          >
                            <X className="w-4 h-4 text-slate-700" />
                          </button>
                        </div>

                        <div className="p-3">
                          <div className="text-xs font-semibold text-slate-900 line-clamp-1">{m.name}</div>
                          <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{m.mime}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    showToast('success', 'Reset editor');
                  }}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {editingId ? 'New draft' : 'Reset'}
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editingId ? 'Update Draft' : 'Save Draft'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Right: preview + list */}
        <section className="space-y-6 lg:sticky lg:top-28 self-start">
          {/* Preview */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">Preview</p>
                <h3 className="text-sm font-semibold text-slate-900">How it will look</h3>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                {readingMins} min read
              </span>
            </div>

            <div className="px-6 py-5">
              <div className="flex items-center justify-between gap-3 text-xs text-slate-500 mb-3">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {date ? formatDate(date) : 'DD Mon YYYY'}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Draft
                </span>
              </div>

              {rating > 0 && (
                <div className="mb-2 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Star
                      key={v}
                      className={`w-3.5 h-3.5 ${v <= rating ? 'fill-[#fbbc04] text-[#fbbc04]' : 'text-slate-300'}`}
                    />
                  ))}
                  <span className="text-[11px] text-slate-600 ml-2">{rating}.0</span>
                </div>
              )}

              {category && (
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-700 mb-1">{category}</p>
              )}

              <h4 className="text-xl font-semibold text-slate-900 mb-2">
                {title || 'Your blog title will appear here'}
              </h4>

              <p className="text-sm text-slate-700 mb-4">{excerpt || 'Short description preview…'}</p>

              {media.length > 0 && (
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {media.slice(0, 6).map((m) => (
                    <div key={m.path} className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      {m.type === 'video' ? (
                        <video src={m.url} className="w-full h-20 object-cover bg-black" />
                      ) : (
                        <img src={m.url} alt={m.name} className="w-full h-20 object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-slate-200 pt-4">
                <div className="text-sm text-slate-800 whitespace-pre-line">
                  {content ? content : <p className="text-slate-500">Start typing your blog content to see how it will look.</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Drafts list */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">Drafts</p>
                <h3 className="text-sm font-semibold text-slate-900">{filteredPosts.length} showing</h3>
              </div>

              <button
                type="button"
                onClick={() => loadDrafts({ soft: true })}
                className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 inline-flex items-center gap-2"
                disabled={refreshing}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            <div className="px-3 py-3">
              {loadingPosts ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-2xl border border-slate-200 p-3">
                      <div className="h-3 w-2/3 bg-slate-100 rounded" />
                      <div className="mt-2 h-3 w-1/2 bg-slate-100 rounded" />
                    </div>
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center">
                  <p className="text-sm font-semibold text-slate-900">No drafts found</p>
                  <p className="text-xs text-slate-500 mt-1">Try changing search or category filter.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
                  {filteredPosts.map((post) => {
                    const initial = (post.title?.[0]?.toUpperCase()) || 'P';
                    const postRating = post.rating || 0;

                    return (
                      <article
                        key={post.id}
                        className={`rounded-2xl border p-3 text-xs transition ${
                          editingId === post.id
                            ? 'border-slate-300 bg-slate-50'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center text-[13px] font-bold text-slate-700">
                            {initial}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <span className="block text-[13px] font-semibold text-slate-900 line-clamp-1">
                                  {post.title || 'Untitled post'}
                                </span>
                                <span className="block text-[10px] text-slate-500">
                                  {post.created_at ? formatDate(post.created_at) : ''}
                                </span>
                              </div>

                              <div className="flex gap-1">
                                <button
                                  type="button"
                                  onClick={() => onEdit(post)}
                                  className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50"
                                  title="Edit"
                                >
                                  <Pencil className="w-3.5 h-3.5 text-slate-700" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => requestDelete(post.id)}
                                  className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-slate-700" />
                                </button>
                              </div>
                            </div>

                            <div className="mt-1 flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((v) => (
                                <Star
                                  key={v}
                                  className={`w-3 h-3 ${
                                    v <= postRating ? 'fill-[#fbbc04] text-[#fbbc04]' : 'text-slate-300'
                                  }`}
                                />
                              ))}
                              {postRating > 0 && (
                                <span className="text-[10px] text-slate-600 ml-1">{postRating}.0</span>
                              )}
                            </div>

                            {post.category && (
                              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-700">
                                {post.category}
                              </p>
                            )}

                            <p className="mt-1 text-[11px] text-slate-700 line-clamp-2">
                              {post.excerpt || 'No short description yet.'}
                            </p>

                            {Array.isArray(post.media) && post.media.length > 0 && (
                              <div className="mt-2 text-[10px] text-slate-500">
                                Media: <span className="font-semibold text-slate-700">{post.media.length}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Delete draft?</h3>
                <p className="text-xs text-slate-500 mt-1">This action cannot be undone.</p>
              </div>
              <button onClick={() => setDeleteId(null)} className="text-slate-400 hover:text-slate-600" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
