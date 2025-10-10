'use client';

import { useState } from 'react';
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

export default function Trio75Page() {
  // ---------- content you can tweak ----------
  const hero = '/images/hero.jpg'; 
  const floor1 = '/images/trio-floor.webp';
  const floor2 = '/images/trio-floor-2.webp';

  const stats = [
    { label: 'TOTAL FLOOR AREA', value: '77,6 m2 / 835,2 sq.ft', icon: Ruler },
    { label: 'ACCOMMODATES', value: '1 - 5 people', icon: Users },
    { label: 'BEDROOMS', value: '2', icon: BedDouble },
    { label: 'BATHROOMS', value: '1', icon: ShowerHead },
  ];

  const [tab, setTab] = useState('nonusa'); // 'nonusa' | 'usa'
  // -------------------------------------------

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative w-full h-[52vh] sm:h-[60vh] lg:h-[64vh]">
        <Image src={hero} alt="TRIO 75 hero" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute left-6 sm:left-10 bottom-8">
          <h1 className="text-white font-serif font-extrabold leading-none"
              style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)' }}>
            TRIO 75
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
          <ChevronRight className="w-5 h-5 text-yellow-500" />
          <li className="text-gray-700">Series</li>
          <ChevronRight className="w-5 h-5 text-yellow-500" />
          <li className="text-gray-700">Trio</li>
          <ChevronRight className="w-5 h-5 text-yellow-500" />
          <li className="font-medium">Trio 75</li>
        </ol>
      </nav>

      {/* INTRO BLOCK */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-[40px] leading-tight">
          The Best Compact Solution
        </h2>
        <p className="mt-4 text-[17px] text-gray-700 max-w-4xl">
          For those who dream of a quiet escape or a manageable primary home, the Trio 75
          seamlessly blends compact design with functionality.
        </p>

        {/* STAT BAR */}
        <div className="mt-8 border-t pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex items-start gap-3">
                <s.icon className="w-6 h-6 text-green-600 mt-0.5" />
                <div>
                  <div className="uppercase tracking-wide text-gray-800 font-semibold">
                    {s.label}
                  </div>
                  <div className="text-gray-700">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FLOOR PLANS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <figure className="w-full">
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden border">
              <Image src={floor1} alt="Trio 75 Floor I" fill className="object-contain bg-white" />
            </div>
            <figcaption className="mt-3 text-sm text-gray-600">I FLOOR</figcaption>
          </figure>
          <figure className="w-full">
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden border">
              <Image src={floor2} alt="Trio 75 Floor II" fill className="object-contain bg-white" />
            </div>
            <figcaption className="mt-3 text-sm text-gray-600">II FLOOR</figcaption>
          </figure>
        </div>
      </section>

      {/* CHECK SECTIONS */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        <ChecklistBlock
          title="Size and space"
          lines={[
            'The Trio 75 stands as a mid-sized offering in our lineup, with a length of 7.5 meters (24.6 ft).',
            'It offers a harmonious balance between space and simplicity.',
          ]}
        />
        <ChecklistBlock
          title="Key features"
          lines={[
            <span key="1"><strong>Ground Floor:</strong> while compact, the entrance is designed to usher guests into the home efficiently. An option to have an open ceiling in the living area, bringing an airy spaciousness.</span>,
            <span key="2"><strong>First Floor:</strong> the model features two main bedrooms. Additionally, a smaller room downstairs can be adapted to various needs.</span>,
            'Despite its modest size, the upstairs does not compromise on functionality or comfort.',
          ]}
        />
        <ChecklistBlock
          title="Recommended use"
          lines={[
            'The Trio 75 boasts a unique compactness making it perfect as a summer home or for a small family.',
            "Yet, its design ensures that it doesn't feel restrictive.",
            'The Trio 75 is a testament to the fact that a smaller footprint doesn’t mean sacrificing comfort. It’s an excellent pick for those who value both simplicity and practicality.',
          ]}
        />
      </section>

      {/* COST SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="relative">
          {/* slanted green banner */}
          <div
            className="absolute -top-6 right-0 left-0 h-10 bg-green-600"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 72% 100%)' }}
          />
          <h3 className="relative font-serif font-extrabold text-3xl sm:text-4xl mb-6">
            How much does it cost?
          </h3>
        </div>

        <div className="max-w-4xl text-[17px] text-gray-800 space-y-4">
          <p>
            Avrame provides the fastest and most affordable way of building your home.
            Our house kits will allow you to get the structure of the house up in about 2 weeks (with just 2 men).
          </p>
          <p>
            The cost of the finished project depends on many variables and we recommend to use our{' '}
            <a className="text-green-700 underline" href="#">Budgeting Guide</a> to
            calculate it in detail before ordering the house.
          </p>
          <p>
            When thinking about the price, you shall take into account that{' '}
            <a className="text-green-700 underline" href="#">Avrame provides only the house kit</a>{' '}
            and that all the material for finishing the house must be sourced locally.
          </p>
          <p>
            The house kits are available in 2 different standards (for the USA or for locations
            outside the USA) and come at different price points.
          </p>
        </div>

        {/* tabs + panel */}
        {/* <div className="mt-8 border rounded-md">
          <div className="flex">
            <button
              className={`px-6 py-3 font-serif text-xl border-r ${
                tab === 'nonusa' ? 'bg-green-100 text-green-700 font-extrabold' : 'bg-gray-50'
              }`}
              onClick={() => setTab('nonusa')}
            >
              Non-USA
            </button>
            <button
              className={`px-6 py-3 font-serif text-xl ${
                tab === 'usa' ? 'bg-green-100 text-green-700 font-extrabold' : 'bg-gray-50'
              }`}
              onClick={() => setTab('usa')}
            >
              USA
            </button>
          </div>

          {tab === 'nonusa' ? (
            <div className="p-6 bg-gray-50">
              <p className="mb-4">
                Price of the Trio 75 A-frame house kit (for use anywhere except the USA):
              </p>
              <p className="mb-4">
                The house kit is made up of three parts. The structural kit must be ordered from Avrame
                while the other two parts can also be sourced locally.
              </p>
              <ul className="list-disc ml-6 space-y-1 text-gray-900">
                <li><strong>Structural Kit:</strong> from € 23,900</li>
                <li><strong>Exterior Kit:</strong> from € 23,575</li>
                <li><strong>Interior Kit:</strong> from € 9,895</li>
              </ul>
            </div>
          ) : (
            <div className="p-6 bg-gray-50">
              <p className="mb-4">
                US-standard pricing varies by code requirements and local logistics.
              </p>
              <ul className="list-disc ml-6 space-y-1 text-gray-900">
                <li>Structural, exterior and interior kits available.</li>
                <li>Engineered drawings to US code on request.</li>
                <li>Get an exact quote for your state and site.</li>
              </ul>
            </div>
          )}
        </div> */}
      </section>

      {/* bottom spacing */}
      <div className="h-16" />
    </main>
  );
}

/* ---------- small helper ---------- */
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
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
    </div>
  );
}
