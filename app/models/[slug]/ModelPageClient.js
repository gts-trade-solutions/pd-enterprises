'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Home,
  ChevronRight,
  Ruler,
  Users,
  BedDouble,
  ShowerHead,
  CheckSquare,
} from 'lucide-react';

const ICONS = { Ruler, Users, BedDouble, ShowerHead };

export default function ModelPageClient({ model }) {
  const {
    hero,
    breadcrumb,
    intro = { title: '', text: '' },
    stats = [],
    floorPlans = [],
    sections = [],
    name = '',
    series = 'Models',
  } = model || {};

  const crumbs =
    Array.isArray(breadcrumb) && breadcrumb.length
      ? breadcrumb
      : ['Home', 'Series', series, name];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative w-full h-[52vh] sm:h-[60vh] lg:h-[64vh]">
        <Image
          src={hero || '/images/hero.jpg'}
          alt={`${name || 'Model'} hero`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute left-6 sm:left-10 bottom-8">
          <h1
            className="text-white font-serif font-extrabold leading-none"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)' }}
          >
            {(name || 'Model').toUpperCase()}
          </h1>
        </div>
      </section>

      {/* BREADCRUMB */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-gray-800">
          <li className="inline-flex items-center gap-2">
            <Home className="w-5 h-5 text-yellow-500" />
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          {crumbs.slice(1).map((item, i) => (
            <BreadcrumbBit key={`${item}-${i}`} text={item} isLast={i === crumbs.length - 2} />
          ))}
        </ol>
      </nav>

      {/* INTRO */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-[40px] leading-tight">
          {intro.title || name || 'Details'}
        </h2>
        <p className="mt-4 text-[17px] text-gray-700 max-w-4xl">{intro.text || ''}</p>

        {/* STATS */}
        <div className="mt-8 border-t pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(stats || []).map((s) => {
              const Icon = ICONS[s.icon] || Ruler;
              return (
                <div key={s.label} className="flex items-start gap-3">
                  <Icon className="w-6 h-6 text-green-600 mt-0.5" />
                  <div>
                    <div className="uppercase tracking-wide text-gray-800 font-semibold">
                      {s.label}
                    </div>
                    <div className="text-gray-700">{s.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FLOOR PLANS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {(floorPlans || []).slice(0, 2).map((fp, i) => (
            <figure key={fp?.img || i} className="w-full">
              <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden border">
                <Image
                  src={fp?.img || '/images/placeholder.png'}
                  alt={`${name || 'Model'} ${fp?.caption || ''}`.trim()}
                  fill
                  className="object-contain bg-white"
                />
              </div>
              <figcaption className="mt-3 text-sm text-gray-600">
                {fp?.caption || ''}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* SECTIONS */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        {(sections || []).map((block, i) => (
          <ChecklistBlock key={block?.title || i} title={block?.title || ''} lines={block?.lines || []} />
        ))}
      </section>

      <div className="h-16" />
    </main>
  );
}

function BreadcrumbBit({ text, isLast }) {
  return (
    <li className={`inline-flex items-center gap-2 ${isLast ? 'font-medium' : 'text-gray-700'}`}>
      <ChevronRight className="w-5 h-5 text-yellow-500" />
      <span>{text}</span>
    </li>
  );
}

function ChecklistBlock({ title, lines }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-sm bg-green-600">
          <CheckSquare className="w-5 h-5 text-white" />
        </span>
        <h3 className="font-serif font-extrabold text-2xl">{title}</h3>
      </div>
      <div className="mt-3 space-y-2 text-[17px] text-gray-800 leading-relaxed max-w-5xl">
        {(lines || []).map((l, i) =>
          typeof l === 'string' && l.includes('<') ? (
            <p key={i} dangerouslySetInnerHTML={{ __html: l }} />
          ) : (
            <p key={i}>{l}</p>
          )
        )}
      </div>
    </div>
  );
}
