'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Clock,
  Star,
  Search,
  AlertTriangle,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Image as ImageIcon,
  Video as VideoIcon,
  MessageCircle,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState('');
  const [loadError, setLoadError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

  const [selectedId, setSelectedId] = useState(null);

  /* ------------------------- COMMENTS ------------------------- */
  const [comments, setComments] = useState([]);
  const [cLoading, setCLoading] = useState(false);
  const [cErr, setCErr] = useState('');
  const [cOk, setCOk] = useState('');
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const [files, setFiles] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editBusy, setEditBusy] = useState(false);

  const safeText = (v) => (v == null ? '' : String(v));

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const readTime = (text = '') => {
    const words = safeText(text).trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  };

  const getPostDate = (p) => p?.post_date || p?.created_at || null;

  const linkify = (text) => {
    const s = safeText(text);
    if (!s) return null;

    const re = /((?:https?:\/\/|www\.|linkedin\.com\/)[^\s<]+)/gi;
    const nodes = [];
    let last = 0;
    let k = 0;

    for (const m of s.matchAll(re)) {
      const start = m.index ?? 0;
      const raw = m[1];

      if (start > last) nodes.push(s.slice(last, start));

      let url = raw;
      let trail = '';
      while (url && /[)\],.!;:]/.test(url.slice(-1))) {
        trail = url.slice(-1) + trail;
        url = url.slice(0, -1);
      }

      let href = url;
      if (/^www\./i.test(href)) href = `https://${href}`;
      if (/^linkedin\.com\//i.test(href)) href = `https://${href}`;

      nodes.push(
        <a
          key={`lnk-${k++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-blue-600 hover:underline break-all"
          onClick={(e) => e.stopPropagation()}
        >
          {url}
        </a>
      );

      if (trail) nodes.push(trail);

      last = start + raw.length;
    }

    if (last < s.length) nodes.push(s.slice(last));
    return nodes;
  };

  const getFirstUrl = (text) => {
    const s = safeText(text);
    const m = s.match(/(?:https?:\/\/|www\.|linkedin\.com\/)[^\s<]+/i);
    if (!m) return '';

    let url = m[0];
    url = url.replace(/[)\],.!;:]+$/g, '');

    if (/^www\./i.test(url)) url = `https://${url}`;
    if (/^linkedin\.com\//i.test(url)) url = `https://${url}`;

    return url;
  };

  const getFirstLinkedInUrl = (text) => {
    const url = getFirstUrl(text);
    return /linkedin\.com/i.test(url) ? url : '';
  };

  const onKeyOpen = (e, cb) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cb();
    }
  };

  const parseMediaArray = (raw) => {
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const inferType = (m) => {
    const t = String(m?.type || '').toLowerCase();
    if (t === 'image' || t === 'video') return t;

    const mime = String(m?.mime || '').toLowerCase();
    if (mime.startsWith('image/')) return 'image';
    if (mime.startsWith('video/')) return 'video';

    const url = String(m?.url || '').toLowerCase();
    if (url.match(/\.(png|jpg|jpeg|webp|gif)(\?|$)/)) return 'image';
    if (url.match(/\.(mp4|mov|webm|mkv)(\?|$)/)) return 'video';

    return '';
  };

  const normalizeMedia = (post) => {
    const raw = parseMediaArray(post?.media);

    return raw
      .map((m) => {
        const type = inferType(m);
        const url = m?.url ? String(m.url) : '';
        const posterUrl =
          (m?.posterUrl ? String(m.posterUrl) : '') ||
          (m?.poster_url ? String(m.poster_url) : '') ||
          '';

        if (!type || !url) return null;

        return {
          type,
          url,
          posterUrl,
          caption: m?.caption ? String(m.caption) : '',
          path: m?.path ? String(m.path) : '',
          name: m?.name ? String(m.name) : '',
          mime: m?.mime ? String(m.mime) : '',
          size: Number(m?.size || 0),
        };
      })
      .filter(Boolean);
  };

  const loadPosts = async () => {
    setLoading(true);
    setLoadError('');

    try {
      const res = await fetch('/api/admin/blog', {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      });

      const json = await res.json();

      if (!res.ok) {
        setPosts([]);
        setLoadError(json?.error || 'Failed to load posts');
        return;
      }

      const rows = Array.isArray(json.data) ? json.data : [];
      const withMedia = rows.map((p) => ({ ...p, _media: normalizeMedia(p) }));
      setPosts(withMedia);
    } catch {
      setPosts([]);
      setLoadError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      const c = safeText(p.category).trim();
      if (c) set.add(c);
    });
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const processed = useMemo(() => {
    const query = q.trim().toLowerCase();
    let arr = posts.slice();

    if (activeCategory !== 'All') {
      arr = arr.filter((p) => safeText(p.category).trim() === activeCategory);
    }

    if (query) {
      arr = arr.filter((p) => {
        const hay = `${safeText(p.title)} ${safeText(p.category)} ${safeText(
          p.excerpt
        )} ${safeText(p.content)}`.toLowerCase();
        return hay.includes(query);
      });
    }

    arr.sort((a, b) => {
      if (sortBy === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
      const ad = new Date(getPostDate(a) || 0).getTime();
      const bd = new Date(getPostDate(b) || 0).getTime();
      return sortBy === 'oldest' ? ad - bd : bd - ad;
    });

    return arr;
  }, [posts, q, activeCategory, sortBy]);

  const featured = useMemo(() => {
    if (!processed.length) return null;
    const best = processed.slice().sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))[0];
    return best || processed[0];
  }, [processed]);

  useEffect(() => {
    if (!selectedId) return;
    const stillExists = processed.some((p) => p.id === selectedId);
    if (!stillExists) setSelectedId(null);
  }, [processed, selectedId]);

  const selected = useMemo(() => {
    if (!selectedId) return null;
    return processed.find((p) => p.id === selectedId) || null;
  }, [processed, selectedId]);

  const selectedIndex = useMemo(() => {
    if (!selectedId) return -1;
    return processed.findIndex((p) => p.id === selectedId);
  }, [processed, selectedId]);

  const goPrev = () => {
    if (selectedIndex <= 0) return;
    setSelectedId(processed[selectedIndex - 1].id);
  };

  const goNext = () => {
    if (selectedIndex < 0 || selectedIndex >= processed.length - 1) return;
    setSelectedId(processed[selectedIndex + 1].id);
  };

  const openPost = (post) => {
    setSelectedId(post.id);
    setTimeout(() => {
      const el = document.getElementById('blog-reader');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const getThumb = (post) => {
    const media = Array.isArray(post?._media) ? post._media : [];
    const img = media.find((m) => m.type === 'image' && m.url);
    if (img) return { type: 'image', url: img.url };

    const vid = media.find((m) => m.type === 'video' && (m.posterUrl || m.url));
    if (vid) return { type: 'video', url: vid.posterUrl || '' };

    return null;
  };

  /* ------------------------- COMMENTS ------------------------- */

  const onPickFiles = (e) => setFiles(e.target.files || null);

  const loadComments = async (postId) => {
    if (!postId) return;
    setCLoading(true);
    setCErr('');
    try {
      const res = await fetch(`/api/blog/comments?post_id=${encodeURIComponent(postId)}`, {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      });
      const json = await res.json();
      if (!res.ok) {
        setComments([]);
        setCErr(json?.error || 'Failed to load comments');
        return;
      }
      setComments(Array.isArray(json.data) ? json.data : []);
    } catch {
      setComments([]);
      setCErr('Failed to load comments');
    } finally {
      setCLoading(false);
    }
  };

  useEffect(() => {
    if (selected?.id) {
      setComments([]);
      setCErr('');
      setCOk('');
      setEditId(null);
      setEditText('');
      loadComments(selected.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!selected?.id) return;

    const message = String(commentForm.comment || '').trim();
    if (!message) return setCErr('Message is required');

    setCErr('');
    setCOk('');

    const payload = {
      post_id: selected.id,
      name: commentForm.name || null,
      email: commentForm.email || null,
      message,
    };

    try {
      const res = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        setCErr(json?.error || 'Failed to submit comment');
        return;
      }

      setCOk('Posted ✅');
      setCommentForm((p) => ({ ...p, comment: '' }));
      setFiles(null);

      loadComments(selected.id);
    } catch {
      setCErr('Failed to submit comment');
    }
  };

  const deleteComment = async (id) => {
    if (!id) return;
    if (!confirm('Delete this comment?')) return;

    setCErr('');
    setCOk('');

    try {
      const res = await fetch('/api/blog/comments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();
      if (!res.ok) {
        setCErr(json?.error || 'Failed to delete');
        return;
      }

      setComments((prev) => prev.filter((c) => c.id !== id));
      setCOk('Deleted ✅');
    } catch {
      setCErr('Failed to delete');
    }
  };

  const startEdit = (c) => {
    setCErr('');
    setCOk('');
    setEditId(c.id);
    setEditText(String(c?.message || c?.comment || '').trim());
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  const saveEdit = async () => {
    if (!editId) return;

    const message = String(editText || '').trim();
    if (!message) return setCErr('Message is required');

    setEditBusy(true);
    setCErr('');
    setCOk('');

    try {
      const res = await fetch('/api/blog/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: editId, message }),
      });

      const json = await res.json();
      if (!res.ok) {
        setCErr(json?.error || 'Failed to update');
        return;
      }

      setComments((prev) =>
        prev.map((c) => (c.id === editId ? { ...c, message: json.data?.message ?? message } : c))
      );
      setCOk('Updated ✅');
      cancelEdit();
    } catch {
      setCErr('Failed to update');
    } finally {
      setEditBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc_0%,#ffffff_32%,#f8fafc_100%)] text-slate-900 pt-0 pb-16">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-[#0f0f14] to-[#6a0b14]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,40,80,0.25),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(180,20,40,0.18),transparent_22%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/45" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl pt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                Blog
              </div>

              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Insights & Updates
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                Explore the latest posts, industry observations, and project updates. Open any card
                to read the full article with photos, videos, and discussion threads.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white">
                  Total: <span className="font-semibold text-white">{posts.length}</span>
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white">
                  Showing: <span className="font-semibold text-white">{processed.length}</span>
                </span>
                {activeCategory !== 'All' && (
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="rounded-full border border-white bg-white/10 px-4 py-2 text-white hover:bg-white/15"
                    type="button"
                  >
                    Clear filter ✕
                  </button>
                )}
              </div>
            </div>

            <div className="lg:justify-self-end w-full max-w-xl">
              <div className="rounded-[28px] border border-white/15 bg-white/8 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-md">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search posts by title, excerpt, or content..."
                      className="w-full rounded-2xl border border-white/15 bg-black/20 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/45 outline-none focus:border-[#ff2a3a]/40 focus:ring-2 focus:ring-[#ff2a3a]/25"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={loadPosts}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/15"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </button>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr]">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-black/20 px-4 py-3">
                    <SlidersHorizontal className="h-4 w-4 text-white" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none"
                    >
                      <option className="text-slate-900" value="latest">
                        Latest
                      </option>
                      <option className="text-slate-900" value="oldest">
                        Oldest
                      </option>
                      <option className="text-slate-900" value="rating">
                        Top rated
                      </option>
                    </select>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-black/20 px-4 py-3">
                    <MessageCircle className="h-4 w-4 text-white" />
                    <select
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c} className="text-slate-900">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.slice(0, 6).map((c) => {
                    const active = c === activeCategory;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setActiveCategory(c)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${active
                            ? 'border border-[#ff2a3a] bg-[#ff2a3a]/20 text-white shadow-[0_0_0_3px_rgba(255,42,58,0.15)]'
                            : 'border border-white/15 bg-white/8 text-white hover:bg-white/12'
                          }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {loadError ? (
          <div className="flex gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <AlertTriangle className="mt-0.5 h-5 w-5" />
            <div>
              <div className="font-semibold">Could not load posts</div>
              <div className="mt-1 text-xs opacity-90">{loadError}</div>
            </div>
          </div>
        ) : loading ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 h-40 w-full rounded-2xl bg-slate-100" />
                <div className="mb-3 h-4 w-24 rounded bg-slate-100" />
                <div className="mb-2 h-6 w-4/5 rounded bg-slate-100" />
                <div className="mb-2 h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-5/6 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : processed.length === 0 ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
            No posts found.
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
            <section className="space-y-8">
              {featured && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">
                      Featured
                    </h2>
                    <span className="text-xs text-slate-500">Open to read</span>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => openPost(featured)}
                    onKeyDown={(e) => onKeyOpen(e, () => openPost(featured))}
                    className={`group overflow-hidden rounded-[32px] border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl cursor-pointer ${selectedId === featured.id
                        ? 'border-slate-900 ring-2 ring-slate-200'
                        : 'border-slate-200'
                      }`}
                  >
                    <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                      <div className="relative min-h-[260px] bg-slate-900">
                        {(() => {
                          const t = getThumb(featured);
                          if (t?.type === 'image' && t.url) {
                            return (
                              <img
                                src={t.url}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                                loading="lazy"
                              />
                            );
                          }
                          if (t?.type === 'video') {
                            return (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white">
                                  <Play className="h-4 w-4" />
                                  Featured video
                                </div>
                              </div>
                            );
                          }
                          return (
                            <div className="absolute inset-0 flex items-center justify-center text-white/80">
                              <div className="inline-flex items-center gap-2 text-sm">
                                <ImageIcon className="h-4 w-4" />
                                No cover media
                              </div>
                            </div>
                          );
                        })()}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      </div>

                      <div className="p-6 sm:p-7">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                          {featured.category || 'General'}
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold leading-snug text-slate-900">
                          {featured.title || 'Untitled'}
                        </h3>

                        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(getPostDate(featured))}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {readTime(featured.content || featured.excerpt || '')} min read
                          </span>
                          {Number(featured.rating || 0) > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <Star className="h-3 w-3 fill-[#fbbc04] text-[#fbbc04]" />
                              {Number(featured.rating || 0).toFixed(1)}
                            </span>
                          )}
                        </div>

                        <p className="mt-5 line-clamp-4 text-sm leading-7 text-slate-700">
                          {linkify(featured.excerpt || featured.content || 'No description available.')}
                        </p>

                        {(() => {
                          const li = getFirstLinkedInUrl(
                            `${featured.excerpt || ''}\n${featured.content || ''}`
                          );
                          if (!li) return null;

                          return (
                            <div className="mt-3 text-xs">
                              <a
                                href={li}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="break-all text-blue-600 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {li}
                              </a>
                            </div>
                          );
                        })()}

                        <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                            <ImageIcon className="h-3.5 w-3.5" />
                            {(featured._media || []).filter((m) => m.type === 'image').length}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                            <VideoIcon className="h-3.5 w-3.5" />
                            {(featured._media || []).filter((m) => m.type === 'video').length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">
                    All posts
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {processed.map((post) => {
                    const dt = getPostDate(post);
                    const minutes = readTime(post.content || post.excerpt || '');
                    const rating = Number(post.rating || 0);
                    const active = selectedId === post.id;
                    const thumb = getThumb(post);

                    const imgCount = (post._media || []).filter((m) => m.type === 'image').length;
                    const vidCount = (post._media || []).filter((m) => m.type === 'video').length;

                    return (
                      <div
                        key={post.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => openPost(post)}
                        onKeyDown={(e) => onKeyOpen(e, () => openPost(post))}
                        className={`group overflow-hidden rounded-[28px] border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl cursor-pointer ${active ? 'border-slate-900 ring-2 ring-slate-200' : 'border-slate-200'
                          }`}
                      >
                        <div className="relative aspect-[16/9] bg-slate-100">
                          {thumb?.type === 'image' && thumb.url ? (
                            <img
                              src={thumb.url}
                              alt=""
                              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                              loading="lazy"
                            />
                          ) : thumb?.type === 'video' ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white">
                                <Play className="h-4 w-4" />
                                Video
                              </div>
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-500">
                              No media
                            </div>
                          )}

                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-3">
                            <div className="flex gap-2">
                              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/90 px-2.5 py-1 text-[11px] text-slate-700">
                                <ImageIcon className="h-3.5 w-3.5" />
                                {imgCount}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/90 px-2.5 py-1 text-[11px] text-slate-700">
                                <VideoIcon className="h-3.5 w-3.5" />
                                {vidCount}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(dt)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {minutes} min
                            </span>
                          </div>

                          {post.category && (
                            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-slate-600">
                              {post.category}
                            </p>
                          )}

                          <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
                            {post.title || 'Untitled'}
                          </h3>

                          {rating > 0 && (
                            <div className="mt-2 flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((v) => (
                                <Star
                                  key={v}
                                  className={`h-3.5 w-3.5 ${v <= rating ? 'fill-[#fbbc04] text-[#fbbc04]' : 'text-slate-300'
                                    }`}
                                />
                              ))}
                              <span className="ml-1 text-[11px] text-slate-600">
                                {rating.toFixed(1)}
                              </span>
                            </div>
                          )}

                          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-700">
                            {linkify(post.excerpt || post.content || 'No short description.')}
                          </p>

                          <div className="mt-4 text-xs font-medium text-slate-500">
                            {active ? 'Reading now' : 'Open in reader'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <aside id="blog-reader" className="self-start lg:sticky lg:top-24">
              {!selected ? (
                <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                    Reader
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">Select a post</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Choose any post card to open the article here. Images, videos, and discussion
                    threads will appear in this panel.
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
                  <div className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          {selected.category || 'General'}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold leading-snug text-slate-900">
                          {selected.title || 'Untitled'}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(getPostDate(selected))}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {readTime(selected.content || selected.excerpt || '')} min read
                          </span>
                          {Number(selected.rating || 0) > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <Star className="h-3 w-3 fill-[#fbbc04] text-[#fbbc04]" />
                              {Number(selected.rating || 0).toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedId(null)}
                        className="rounded-full border border-slate-200 p-2 hover:bg-white"
                        title="Close reader"
                      >
                        <X className="h-4 w-4 text-slate-700" />
                      </button>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={goPrev}
                        disabled={selectedIndex <= 0}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Prev
                      </button>

                      <div className="text-xs text-slate-500">
                        {selectedIndex + 1} / {processed.length}
                      </div>

                      <button
                        type="button"
                        onClick={goNext}
                        disabled={selectedIndex < 0 || selectedIndex >= processed.length - 1}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-[72vh] overflow-auto p-5">
                    {Array.isArray(selected._media) && selected._media.length > 0 && (
                      <div className="mb-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Media
                        </div>

                        {selected._media.some((m) => m.type === 'image') && (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {selected._media
                              .filter((m) => m.type === 'image')
                              .slice(0, 6)
                              .map((m, idx) => (
                                <div
                                  key={idx}
                                  className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
                                >
                                  <img
                                    src={m.url}
                                    alt={m.caption || `Image ${idx + 1}`}
                                    className="h-40 w-full object-cover"
                                    loading="lazy"
                                  />
                                </div>
                              ))}
                          </div>
                        )}

                        {selected._media.some((m) => m.type === 'video') && (
                          <div className="mt-3 space-y-3">
                            {selected._media
                              .filter((m) => m.type === 'video')
                              .slice(0, 3)
                              .map((m, idx) => (
                                <div
                                  key={idx}
                                  className="overflow-hidden rounded-2xl border border-slate-200 bg-black"
                                >
                                  <video
                                    src={m.url}
                                    poster={m.posterUrl || undefined}
                                    controls
                                    className="h-56 w-full bg-black object-contain"
                                    preload="metadata"
                                  />
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    )}

                    {selected.excerpt && (
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                        {linkify(selected.excerpt)}
                      </div>
                    )}

                    <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-800">
                      {linkify(selected.content || 'No content.')}
                    </div>

                    {/* COMMENTS */}
                    <div className="mt-8">
                      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 px-5 py-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-slate-900">Discussion</h4>
                            <button
                              type="button"
                              onClick={() => loadComments(selected.id)}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              View Threads
                            </button>
                          </div>
                        </div>

                        <div className="p-5">
                          {cErr && (
                            <div className="mb-3 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                              {cErr}
                            </div>
                          )}
                          {cOk && (
                            <div className="mb-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                              {cOk}
                            </div>
                          )}

                          <form onSubmit={submitComment} className="space-y-3">
                            <textarea
                              value={commentForm.comment}
                              onChange={(e) =>
                                setCommentForm((p) => ({ ...p, comment: e.target.value }))
                              }
                              placeholder="Write your thoughts..."
                              className="min-h-[110px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                            />

                            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                              <div className="flex flex-col sm:flex-row gap-3 w-full">
                                <input
                                  value={commentForm.name}
                                  onChange={(e) =>
                                    setCommentForm((p) => ({ ...p, name: e.target.value }))
                                  }
                                  placeholder="Name (optional)"
                                  className="w-full sm:w-56 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none"
                                />
                                <input
                                  value={commentForm.email}
                                  onChange={(e) =>
                                    setCommentForm((p) => ({ ...p, email: e.target.value }))
                                  }
                                  placeholder="Email (optional)"
                                  className="w-full sm:w-64 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none"
                                />
                              </div>

                              <div className="flex items-center gap-3">
                                <input type="file" onChange={onPickFiles} className="text-sm" />
                                <button
                                  type="submit"
                                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white px-5 py-2 text-sm font-medium hover:bg-blue-700"
                                >
                                  Post
                                </button>
                              </div>
                            </div>

                            {files?.length ? (
                              <div className="text-xs text-slate-500">
                                {files.length} file(s) selected (upload not implemented)
                              </div>
                            ) : null}
                          </form>
                        </div>

                        <div className="border-t border-slate-100">
                          <div className="p-5">
                            {cLoading ? (
                              <div className="text-sm text-slate-500">Loading...</div>
                            ) : comments.length === 0 ? (
                              <div className="text-sm text-slate-500">No discussions yet.</div>
                            ) : (
                              <div className="space-y-4">
                                {comments.map((c) => {
                                  const email = String(c?.email || '').trim();
                                  const name = String(c?.name || '').trim();
                                  const msg = String(c?.message || c?.comment || '').trim();
                                  const header = email || name || 'Anonymous';

                                  return (
                                    <div
                                      key={c.id}
                                      className="rounded-2xl border border-slate-200 bg-white p-4"
                                    >
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                          <div className="font-medium">
                                            {email ? (
                                              <a
                                                href={`mailto:${email}`}
                                                className="break-all text-blue-600 hover:underline"
                                              >
                                                {email}
                                              </a>
                                            ) : (
                                              <span className="text-slate-900">{header}</span>
                                            )}
                                          </div>
                                          <div className="mt-1 text-xs text-slate-500">
                                            {formatDate(c.created_at)}
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm">
                                          <button
                                            type="button"
                                            onClick={() => startEdit(c)}
                                            className="text-amber-500 hover:underline"
                                          >
                                            Edit
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => deleteComment(c.id)}
                                            className="text-rose-500 hover:underline"
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>

                                      {editId === c.id ? (
                                        <div className="mt-3 space-y-2">
                                          <textarea
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="min-h-[90px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                                          />
                                          <div className="flex items-center justify-end gap-2">
                                            <button
                                              type="button"
                                              onClick={cancelEdit}
                                              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              type="button"
                                              onClick={saveEdit}
                                              disabled={editBusy}
                                              className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-60"
                                            >
                                              {editBusy ? 'Saving...' : 'Save'}
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
                                          {linkify(msg)}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-4">
                          <div className="inline-flex items-center gap-2 text-xs text-slate-500">
                            <MessageCircle className="h-4 w-4" />
                            {comments.length} comment(s)
                          </div>
                          <button
                            type="button"
                            onClick={() => loadComments(selected.id)}
                            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"
                          >
                            Refresh
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 p-4">
                    <div className="text-xs text-slate-500">Reader</div>
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}