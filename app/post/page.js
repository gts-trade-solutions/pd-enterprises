'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Search,
  RefreshCw,
  Calendar,
  Clock,
  Star,
  Image as ImageIcon,
  Video as VideoIcon,
  AlertTriangle,
  SlidersHorizontal,
} from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [q, setQ] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

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
        };
      })
      .filter(Boolean);
  };

  const getThumb = (post) => {
    const media = Array.isArray(post?._media) ? post._media : [];
    const img = media.find((m) => m.type === 'image' && m.url);
    if (img) return { type: 'image', url: img.url };

    const vid = media.find((m) => m.type === 'video' && (m.posterUrl || m.url));
    if (vid) return { type: 'video', url: vid.posterUrl || '' };

    return null;
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
    const best = processed
      .slice()
      .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))[0];
    return best || processed[0];
  }, [processed]);

  return (
    <main className="min-h-screen bg-[#eef3f9] pt-24 text-slate-900">
      <section className="bg-[#eef3f9]">
        <div className="mx-auto max-w-[1700px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-[30px] border border-slate-200 bg-white/60 px-6 py-10 shadow-sm">
            <div className="mx-auto max-w-5xl text-center">
              <h1 className="text-4xl font-bold leading-tight text-[#081538] sm:text-5xl lg:text-6xl">
                Insights & Updates
              </h1>
              <p className="mx-auto mt-4 max-w-4xl text-base leading-8 text-slate-600 sm:text-lg">
                Explore our latest articles, market insights, industry updates, and detailed visual stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1700px] px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_180px_72px]">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search blogs..."
                className="w-full rounded-full border border-slate-200 bg-white py-4 pl-14 pr-4 text-lg outline-none"
              />
            </div>

            <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4">
              <SlidersHorizontal className="h-5 w-5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-transparent text-base text-slate-700 outline-none"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="rating">Top rated</option>
              </select>
            </div>

            <button
              type="button"
              onClick={loadPosts}
              className="inline-flex items-center justify-center rounded-3xl bg-[#7d416e] text-white shadow-sm hover:opacity-95"
            >
              <RefreshCw className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-3xl font-medium text-slate-700">Blogs:</span>
            {categories.map((c) => {
              const active = c === activeCategory;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCategory(c)}
                  className={`rounded-full border px-6 py-3 text-base transition ${
                    active
                      ? 'border-[#081538] bg-[#081538] text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {loadError ? (
          <div className="mt-8 flex gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <AlertTriangle className="mt-0.5 h-5 w-5" />
            <div>
              <div className="font-semibold">Could not load posts</div>
              <div className="mt-1 text-xs opacity-90">{loadError}</div>
            </div>
          </div>
        ) : loading ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                <div className="aspect-[16/9] bg-slate-100" />
                <div className="p-5">
                  <div className="mb-3 h-4 w-24 rounded bg-slate-100" />
                  <div className="mb-2 h-6 w-4/5 rounded bg-slate-100" />
                  <div className="mb-2 h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-5/6 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : processed.length === 0 ? (
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
            No posts found.
          </div>
        ) : (
          <>
            {featured && (
              <div className="mt-10">
                <div className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#395377]">
                  Featured
                </div>

                <Link
                  href={`/post/${featured.id}`}
                  className="group block overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="relative min-h-[320px] bg-slate-900">
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
                                <VideoIcon className="h-4 w-4" />
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
                    </div>

                    <div className="p-6 sm:p-8">
                      <p className="text-[12px] uppercase tracking-[0.22em] text-slate-500">
                        {featured.category || 'General'}
                      </p>

                      <h3 className="mt-3 text-4xl font-semibold leading-snug text-[#081538]">
                        {featured.title || 'Untitled'}
                      </h3>

                      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(getPostDate(featured))}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {readTime(featured.content || featured.excerpt || '')} min read
                        </span>
                        {Number(featured.rating || 0) > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <Star className="h-4 w-4 fill-[#fbbc04] text-[#fbbc04]" />
                            {Number(featured.rating || 0).toFixed(1)}
                          </span>
                        )}
                      </div>

                      <p className="mt-6 line-clamp-5 text-lg leading-8 text-slate-700">
                        {featured.excerpt || featured.content || 'No description available.'}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-600">
                  All posts
                </h2>
                <span className="text-xs text-slate-500">{processed.length} post(s)</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {processed.map((post) => {
                  const dt = getPostDate(post);
                  const minutes = readTime(post.content || post.excerpt || '');
                  const rating = Number(post.rating || 0);
                  const thumb = getThumb(post);

                  const imgCount = (post._media || []).filter((m) => m.type === 'image').length;
                  const vidCount = (post._media || []).filter((m) => m.type === 'video').length;

                  return (
                    <Link
                      key={post.id}
                      href={`/post/${post.id}`}
                      className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl"
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
                              <VideoIcon className="h-4 w-4" />
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
                                className={`h-3.5 w-3.5 ${
                                  v <= rating ? 'fill-[#fbbc04] text-[#fbbc04]' : 'text-slate-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-[11px] text-slate-600">
                              {rating.toFixed(1)}
                            </span>
                          </div>
                        )}

                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-700">
                          {post.excerpt || post.content || 'No short description.'}
                        </p>

                        <div className="mt-4 text-xs font-medium text-slate-500">
                          Open detailed page
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}