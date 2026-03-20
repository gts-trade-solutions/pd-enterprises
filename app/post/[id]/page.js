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
  Play,
  Video as VideoIcon,
  MessageCircle,
  RefreshCw,
  ExternalLink,
  Share2,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState('');
  const [loadError, setLoadError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

  const [selectedId, setSelectedId] = useState(null);

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
      month: '2-digit',
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
          className="break-all text-blue-600 hover:underline"
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

  useEffect(() => {
    if (!selectedId && processed.length > 0) {
      setSelectedId(processed[0].id);
    }
  }, [processed, selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    const stillExists = processed.some((p) => p.id === selectedId);
    if (!stillExists) {
      setSelectedId(processed[0]?.id || null);
    }
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
      const el = document.getElementById('blog-detail-panel');
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

  const handleShare = async () => {
    if (!selected) return;

    const shareUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/blog/${selected.id}`
        : '';

    const shareTitle = selected?.title || 'Blog post';
    const shareText = selected?.excerpt || selected?.title || 'Check out this blog post';

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCOk('Link copied ✅');
        return;
      }

      setCErr('Share not supported on this browser');
    } catch (err) {
      if (err?.name !== 'AbortError') {
        setCErr('Share failed');
      }
    }
  };

  const selectedLinkedin = selected
    ? getFirstLinkedInUrl(`${selected.excerpt || ''}\n${selected.content || ''}`)
    : '';

  return (
    <main className="min-h-screen bg-[#eef2f7] text-slate-900 mt-20">
      <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
        {loadError ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5" />
              <div>
                <div className="font-semibold">Could not load posts</div>
                <div className="mt-1 text-xs opacity-90">{loadError}</div>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)_420px]">
            <div className="rounded-[28px] bg-white p-6 shadow-sm">Loading...</div>
            <div className="rounded-[28px] bg-white p-6 shadow-sm">Loading...</div>
            <div className="rounded-[28px] bg-white p-6 shadow-sm">Loading...</div>
          </div>
        ) : processed.length === 0 ? (
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
            No posts found.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)_420px]">
            <aside className="h-fit rounded-[28px] border border-slate-200 bg-[#dfe7f2] p-4 shadow-sm lg:sticky lg:top-6">
              <div className="rounded-[24px] bg-white/40 p-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search types..."
                    className="w-full rounded-full border border-slate-200 bg-white px-11 py-3 text-sm outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={loadPosts}
                  className="mt-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">Blogs</h3>
                  <span className="text-sm text-slate-500">Select a type</span>
                </div>

                <div className="space-y-2">
                  {categories.map((c) => {
                    const active = c === activeCategory;
                    return (
                      <button
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                          active
                            ? 'bg-slate-900 text-white'
                            : 'bg-white/60 text-slate-700 hover:bg-white'
                        }`}
                        type="button"
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedLinkedin && (
                <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a66c2] text-white">
                      <Linkedin className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-semibold text-slate-900">View LinkedIn post</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Open the original LinkedIn post in a new tab.
                      </p>
                    </div>
                  </div>

                  <a
                    href={selectedLinkedin}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-5 inline-flex items-center gap-2 text-xl font-semibold text-blue-600 hover:underline"
                  >
                    Open on LinkedIn
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              )}

              <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2 text-sm text-slate-600">
                  <SlidersHorizontal className="h-4 w-4" />
                  Sort
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="rating">Top rated</option>
                </select>
              </div>

              <div className="mt-6 space-y-3">
                {processed.map((post) => {
                  const active = selectedId === post.id;
                  return (
                    <button
                      key={post.id}
                      type="button"
                      onClick={() => openPost(post)}
                      className={`w-full rounded-[22px] border p-4 text-left transition ${
                        active
                          ? 'border-slate-900 bg-white shadow-md'
                          : 'border-slate-200 bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        {post.category || 'General'}
                      </div>
                      <div className="mt-2 line-clamp-2 text-base font-semibold text-slate-900">
                        {post.title || 'Untitled'}
                      </div>
                      <div className="mt-2 text-xs text-slate-500">{formatDate(getPostDate(post))}</div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <section
              id="blog-detail-panel"
              className="rounded-[32px] border border-slate-200 bg-[#f7f9fc] p-6 shadow-sm"
            >
              {!selected ? (
                <div className="rounded-[28px] bg-white p-8 text-sm text-slate-600">
                  Select a post
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                      <h1 className="text-4xl font-extrabold leading-tight text-[#0b1636] md:text-5xl">
                        {selected.title || 'Untitled'}
                      </h1>

                      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(getPostDate(selected))}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {readTime(selected.content || selected.excerpt || '')} min read
                        </span>
                        {Number(selected.rating || 0) > 0 && (
                          <span className="inline-flex items-center gap-2">
                            <Star className="h-4 w-4 fill-[#fbbc04] text-[#fbbc04]" />
                            {Number(selected.rating || 0).toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        className="rounded-2xl bg-white p-4 shadow-sm hover:bg-slate-50"
                        type="button"
                        title="Share"
                        onClick={handleShare}
                      >
                        <Share2 className="h-5 w-5 text-blue-600" />
                      </button>

                      <a
                        href="https://www.instagram.com/pd_enterprises_01"
                        aria-label="Instagram"
                        title="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white p-3 shadow-sm transition hover:bg-slate-50"
                      >
                        <Instagram className="h-5 w-5 text-pink-500" />
                      </a>

                      <a
                        href="#"
                        aria-label="Facebook"
                        title="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white p-3 shadow-sm transition hover:bg-slate-50"
                      >
                        <Facebook className="h-5 w-5 text-blue-600" />
                      </a>

                      <a
                        href="https://www.youtube.com/@pdenterprise-c6m"
                        aria-label="YouTube"
                        title="YouTube"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white p-3 shadow-sm transition hover:bg-slate-50"
                      >
                        <Youtube className="h-5 w-5 text-slate-900" />
                      </a>

                      <a
                        href="https://www.linkedin.com/company/pdenterprises"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white p-3 shadow-sm transition hover:bg-slate-50"
                      >
                        <Linkedin className="h-5 w-5 text-blue-700" />
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-[#dbe5fb] px-5 py-3 text-lg font-semibold text-blue-700">
                      <MessageCircle className="h-5 w-5" />
                      {comments.length} Comments
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={goPrev}
                        disabled={selectedIndex <= 0}
                        className="rounded-full border border-slate-200 bg-white p-3 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={selectedIndex < 0 || selectedIndex >= processed.length - 1}
                        className="rounded-full border border-slate-200 bg-white p-3 disabled:opacity-50"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {selected._media?.length > 0 && (
                    <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                      {selected._media.some((m) => m.type === 'image') && (
                        <div className="grid gap-4 md:grid-cols-1">
                          {selected._media
                            .filter((m) => m.type === 'image')
                            .slice(0, 1)
                            .map((m, idx) => (
                              <div
                                key={idx}
                                className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100"
                              >
                                <img
                                  src={m.url}
                                  alt={m.caption || `Image ${idx + 1}`}
                                  className="max-h-[700px] w-full object-contain bg-white"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                        </div>
                      )}

                      {selected._media.some((m) => m.type === 'video') && (
                        <div className="mt-4 space-y-3">
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
                                  className="h-[420px] w-full bg-black object-contain"
                                  preload="metadata"
                                />
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}

                  {selected.excerpt && (
                    <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5 text-base leading-8 text-slate-700 shadow-sm">
                      {linkify(selected.excerpt)}
                    </div>
                  )}

                  <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-6 text-base leading-8 text-slate-800 shadow-sm whitespace-pre-line">
                    {linkify(selected.content || 'No content.')}
                  </div>
                </>
              )}
            </section>

            <aside className="h-fit rounded-[28px] border border-slate-200 bg-[#dfe7f2] p-4 shadow-sm lg:sticky lg:top-6">
              <div className="rounded-[24px] bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-bold text-slate-900">Discussions</h3>
                <p className="mt-3 text-lg text-slate-700">
                  On: <span className="font-semibold">{selected?.title || 'No post selected'}</span>
                </p>

                <form onSubmit={submitComment} className="mt-5 space-y-4">
                  <textarea
                    value={commentForm.comment}
                    onChange={(e) =>
                      setCommentForm((p) => ({ ...p, comment: e.target.value }))
                    }
                    placeholder="Add a comment..."
                    className="min-h-[130px] w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />

                  <input
                    value={commentForm.name}
                    onChange={(e) =>
                      setCommentForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Name (optional)"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />

                  <input
                    value={commentForm.email}
                    onChange={(e) =>
                      setCommentForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="Email (optional)"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  />

                  <input type="file" onChange={onPickFiles} className="text-sm" />

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-slate-500 px-5 py-4 text-lg font-semibold text-white hover:bg-slate-600"
                  >
                    Post
                  </button>

                  {files?.length ? (
                    <div className="text-xs text-slate-500">
                      {files.length} file(s) selected (upload not implemented)
                    </div>
                  ) : null}
                </form>

                {cErr && (
                  <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                    {cErr}
                  </div>
                )}
                {cOk && (
                  <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                    {cOk}
                  </div>
                )}

                <div className="mt-6">
                  {cLoading ? (
                    <div className="text-sm text-slate-500">Loading...</div>
                  ) : comments.length === 0 ? (
                    <div className="text-lg text-slate-500">No comments yet.</div>
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
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
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
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}