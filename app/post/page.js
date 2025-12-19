// app/blog/page.js
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
} from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState('');
  const [loadError, setLoadError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest'); // latest | oldest | rating

  const [selectedId, setSelectedId] = useState(null);

  const safeText = (v) => (v == null ? '' : String(v));

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const readTime = (text = '') => {
    const words = safeText(text).trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  };

  const getPostDate = (p) => p?.post_date || p?.created_at || null;

  // ✅ FIX 1: media can be array OR json string (depending on DB column type)
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

  // ✅ FIX 2: infer type if "type" missing (from mime / extension)
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

  // ✅ FIX 3: fetch ALL posts (no status filter)
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
    } catch (e) {
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
        const hay = `${safeText(p.title)} ${safeText(p.category)} ${safeText(p.excerpt)} ${safeText(
          p.content
        )}`.toLowerCase();
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

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16">
      <div className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-slate-400">Blog</p>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-2">
                Insights & Updates
              </h1>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                Click any post to read it inside this page (reader shows photos/videos too).
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600">
                  Total: <span className="font-semibold text-slate-900">{posts.length}</span>
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600">
                  Showing: <span className="font-semibold text-slate-900">{processed.length}</span>
                </span>
                {activeCategory !== 'All' && (
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 hover:bg-slate-50"
                    type="button"
                  >
                    Clear category ✕
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search posts..."
                  className="w-full sm:w-80 max-w-[85vw] rounded-full border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                  <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-sm outline-none"
                  >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="rating">Top rated</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={loadPosts}
                  className="text-sm px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50"
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => {
              const active = c === activeCategory;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCategory(c)}
                  className={`rounded-full px-4 py-2 text-xs border transition ${
                    active
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loadError ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 flex gap-3">
            <AlertTriangle className="w-5 h-5 mt-0.5" />
            <div>
              <div className="font-semibold">Could not load posts</div>
              <div className="mt-1 text-xs opacity-90">{loadError}</div>
            </div>
          </div>
        ) : loading ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="h-32 w-full bg-slate-100 rounded-2xl mb-4" />
                <div className="h-4 w-24 bg-slate-100 rounded mb-3" />
                <div className="h-6 w-4/5 bg-slate-100 rounded mb-2" />
                <div className="h-4 w-full bg-slate-100 rounded mb-2" />
                <div className="h-4 w-5/6 bg-slate-100 rounded" />
              </div>
            ))}
          </div>
        ) : processed.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            No posts found.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
            <section className="space-y-6">
              {featured && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-[0.2em]">
                      Featured
                    </h2>
                    <span className="text-xs text-slate-500">Click to open</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => openPost(featured)}
                    className={`w-full text-left rounded-3xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden ${
                      selectedId === featured.id
                        ? 'border-slate-900 ring-2 ring-slate-200'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="grid lg:grid-cols-[1fr_1fr]">
                      <div className="relative min-h-[220px] bg-slate-900">
                        {(() => {
                          const t = getThumb(featured);
                          if (t?.type === 'image' && t.url) {
                            return (
                              <img
                                src={t.url}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-90"
                                loading="lazy"
                              />
                            );
                          }
                          if (t?.type === 'video') {
                            return (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="rounded-full bg-white/10 border border-white/15 px-4 py-2 inline-flex items-center gap-2 text-white text-sm">
                                  <Play className="w-4 h-4" />
                                  Featured video
                                </div>
                              </div>
                            );
                          }
                          return (
                            <div className="absolute inset-0 flex items-center justify-center text-white/80">
                              <div className="inline-flex items-center gap-2 text-sm">
                                <ImageIcon className="w-4 h-4" />
                                No cover media
                              </div>
                            </div>
                          );
                        })()}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                      </div>

                      <div className="p-6">
                        <p className="text-xs tracking-[0.22em] uppercase text-slate-500">
                          {featured.category || 'General'}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-slate-900 leading-snug">
                          {featured.title || 'Untitled'}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(getPostDate(featured))}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {readTime(featured.content || featured.excerpt || '')} min read
                          </span>
                          {Number(featured.rating || 0) > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <Star className="w-3 h-3 fill-[#fbbc04] text-[#fbbc04]" />
                              {Number(featured.rating || 0).toFixed(1)}
                            </span>
                          )}
                        </div>

                        <p className="mt-4 text-sm text-slate-700 leading-relaxed line-clamp-4">
                          {featured.excerpt || featured.content || 'No description available.'}
                        </p>

                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 bg-white">
                            <ImageIcon className="w-3.5 h-3.5" />
                            {(featured._media || []).filter((m) => m.type === 'image').length}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 bg-white">
                            <VideoIcon className="w-3.5 h-3.5" />
                            {(featured._media || []).filter((m) => m.type === 'video').length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-[0.2em]">
                    All posts
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {processed.map((post) => {
                    const dt = getPostDate(post);
                    const minutes = readTime(post.content || post.excerpt || '');
                    const rating = Number(post.rating || 0);
                    const active = selectedId === post.id;
                    const thumb = getThumb(post);

                    const imgCount = (post._media || []).filter((m) => m.type === 'image').length;
                    const vidCount = (post._media || []).filter((m) => m.type === 'video').length;

                    return (
                      <button
                        key={post.id}
                        type="button"
                        onClick={() => openPost(post)}
                        className={`text-left rounded-3xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden ${
                          active ? 'border-slate-900 ring-2 ring-slate-200' : 'border-slate-200'
                        }`}
                      >
                        <div className="relative aspect-[16/9] bg-slate-100">
                          {thumb?.type === 'image' && thumb.url ? (
                            <img
                              src={thumb.url}
                              alt=""
                              className="absolute inset-0 h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : thumb?.type === 'video' ? (
                            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                              <div className="rounded-full bg-white/10 border border-white/15 px-4 py-2 inline-flex items-center gap-2 text-white text-sm">
                                <Play className="w-4 h-4" />
                                Video
                              </div>
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                              No media
                            </div>
                          )}

                          <div className="absolute left-3 bottom-3 flex gap-2">
                            <span className="rounded-full bg-white/90 border border-slate-200 px-2.5 py-1 text-[11px] text-slate-700 inline-flex items-center gap-1">
                              <ImageIcon className="w-3.5 h-3.5" />
                              {imgCount}
                            </span>
                            <span className="rounded-full bg-white/90 border border-slate-200 px-2.5 py-1 text-[11px] text-slate-700 inline-flex items-center gap-1">
                              <VideoIcon className="w-3.5 h-3.5" />
                              {vidCount}
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(dt)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {minutes} min
                            </span>
                          </div>

                          {post.category && (
                            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-600 mb-1">
                              {post.category}
                            </p>
                          )}

                          <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
                            {post.title || 'Untitled'}
                          </h3>

                          {rating > 0 && (
                            <div className="mt-2 flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((v) => (
                                <Star
                                  key={v}
                                  className={`w-3.5 h-3.5 ${
                                    v <= rating ? 'fill-[#fbbc04] text-[#fbbc04]' : 'text-slate-300'
                                  }`}
                                />
                              ))}
                              <span className="text-[11px] text-slate-600 ml-1">
                                {rating.toFixed(1)}
                              </span>
                            </div>
                          )}

                          <p className="mt-3 text-sm text-slate-700 line-clamp-3">
                            {post.excerpt || 'No short description.'}
                          </p>

                          <div className="mt-4 text-xs text-slate-500">
                            {active ? 'Reading now' : 'Open in reader'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <aside id="blog-reader" className="lg:sticky lg:top-24 self-start">
              {!selected ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-xs font-medium tracking-[0.25em] uppercase text-slate-400">
                    Reader
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">Select a post</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Click any post card to open it here. Media (photos/videos) will show here too.
                  </p>
                </div>
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-100 bg-gradient-to-b from-white to-slate-50">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                          {selected.category || 'General'}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold text-slate-900 leading-snug">
                          {selected.title || 'Untitled'}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(getPostDate(selected))}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {readTime(selected.content || selected.excerpt || '')} min read
                          </span>
                          {Number(selected.rating || 0) > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <Star className="w-3 h-3 fill-[#fbbc04] text-[#fbbc04]" />
                              {Number(selected.rating || 0).toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedId(null)}
                        className="p-2 rounded-full border border-slate-200 hover:bg-white"
                        title="Close reader"
                      >
                        <X className="w-4 h-4 text-slate-700" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={goPrev}
                        disabled={selectedIndex <= 0}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                      >
                        <ChevronLeft className="w-4 h-4" />
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
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 max-h-[70vh] overflow-auto">
                    {Array.isArray(selected._media) && selected._media.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">
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
                                  className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100"
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
                                  className="rounded-2xl overflow-hidden border border-slate-200 bg-black"
                                >
                                  <video
                                    src={m.url}
                                    poster={m.posterUrl || undefined}
                                    controls
                                    className="w-full h-56 object-contain bg-black"
                                    preload="metadata"
                                  />
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    )}

                    {selected.excerpt && (
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                        {selected.excerpt}
                      </div>
                    )}

                    <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-800">
                      {selected.content || 'No content.'}
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      Status:{' '}
                      <span className="font-medium text-slate-700">{selected.status || '—'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      className="rounded-full bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800"
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
