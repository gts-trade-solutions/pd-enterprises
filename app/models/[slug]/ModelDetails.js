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

// map JSON icon strings -> lucide components
const ICONS = { Ruler, Users, BedDouble, ShowerHead };

export default function ModelDetails({ model }) {
  const {
    name = 'Model',
    series = 'Series',
    hero = '/images/hero.jpg',
    breadcrumb,
    intro = { title: '', text: '' },
    stats = [],
    floorPlans = [],    // <-- two images per model come from here
    sections = [],
  } = model || {};

  const crumbs = Array.isArray(breadcrumb) && breadcrumb.length
    ? breadcrumb
    : ['Home', 'Series', series, name];

  const floors = floorPlans.slice(0, 2); // render exactly two like your design

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative w-full h-[52vh] sm:h-[60vh] lg:h-[64vh]">
        <Image
          src={hero}
          alt={`${name} hero`}
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
            {name.toUpperCase()}
          </h1>
        </div>
      </section>

      {/* BREADCRUMB */}
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ol className="flex items-center gap-2 text-gray-800">
          <li className="inline-flex items-center gap-2">
            <Home className="w-5 h-5 text-yellow-500" />
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          {crumbs.slice(1).map((c, i) => (
            <Fragment key={`${c}-${i}`}>
              <ChevronRight className="w-5 h-5 text-yellow-500" />
              <li className={i === crumbs.length - 2 ? 'font-medium' : 'text-gray-700'}>{c}</li>
            </Fragment>
          ))}
        </ol>
      </nav>

      {/* INTRO */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-[40px] leading-tight">
          {intro.title || name}
        </h2>
        {intro.text && (
          <p className="mt-4 text-[17px] text-gray-700 max-w-4xl">{intro.text}</p>
        )}

        {/* STATS (from JSON) */}
        {!!stats.length && (
          <div className="mt-8 border-t pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(({ label, value, icon }, i) => {
                const Icon = ICONS[icon] || Ruler;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <Icon className="w-6 h-6 text-green-600 mt-0.5" />
                    <div>
                      <div className="uppercase tracking-wide text-gray-800 font-semibold">{label}</div>
                      <div className="text-gray-700">{value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* FLOOR PLANS (two images from JSON) */}
        {!!floors.length && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            {floors.map((fp, i) => (
              <figure key={fp?.img || i} className="w-full">
                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden border">
                  <Image
                    src={fp.img}
                    alt={`${name} ${fp.caption || `Floor ${i + 1}`}`}
                    fill
                    className="object-contain bg-white"
                  />
                </div>
                {fp.caption && (
                  <figcaption className="mt-3 text-sm text-gray-600">{fp.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* SECTIONS (optional blocks from JSON) */}
      {!!sections.length && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
          {sections.map((block, i) => (
            <ChecklistBlock key={block?.title || i} title={block?.title || ''} lines={block?.lines || []} />
          ))}
        </section>
      )}

      {/* COST (kept from your page) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="relative">
          <div
            className="absolute -top-6 right-0 left-0 h-10 bg-green-600"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 72% 100%)' }}
          />
          <h3 className="relative font-serif font-extrabold text-3xl sm:text-4xl mb-6">
            How much does it cost?
          </h3>
        </div>

        <div className="max-w-4xl text-[17px] text-gray-800 space-y-4">
          <p>Avrame provides the fastest and most affordable way of building your home…</p>
          <p>
            Use our <a className="text-green-700 underline" href="#">Budgeting Guide</a> to calculate it before ordering.
          </p>
          <p>
            Remember, <a className="text-green-700 underline" href="#">Avrame provides only the house kit</a>;
            finishes are sourced locally.
          </p>
          <p>Kits are available in USA / non-USA standards at different price points.</p>
        </div>
      </section>

      <div className="h-16" />
    </main>
  );
}

import { Fragment } from 'react';

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
        {lines.map((l, i) =>
          typeof l === 'string' && l.includes('<')
            ? <p key={i} dangerouslySetInnerHTML={{ __html: l }} />
            : <p key={i}>{l}</p>
        )}
      </div>
    </div>
  );
}
