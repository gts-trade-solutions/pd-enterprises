'use client';

import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import dynamic from 'next/dynamic';
import {
  Home,
  Hammer,
  Ruler,
  Truck,
  Trees,
  Wrench,
  Leaf,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import ClassicHouses from './classic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function AvramePageClient() {
  const benefits = [
    {
      icon: Leaf,
      title: 'What is Avrame about?',
      desc: "At its heart, Avrame is about empowering individuals to build their own high-quality homes, whether they're nestled close to a bustling city or tucked away in a remote corner of nature.",
    },
    {
      icon: Hammer,
      title: 'Benefits of Avrame houses',
      desc: "The A-frame shape of Avrame's most popular house models offers a spacious indoor area which is fully customizable.",
    },
    {
      icon: ShieldCheck,
      title: 'Main features',
      desc: 'Our A-frame houses are distinguished by their steep metal roof, which comes with 50 years of guarantee. The angle of the roof makes it ideal for installing solar panels.',
    },
    {
      icon: Trees,
      title: 'Off-Grid Ready',
      desc: 'Simple integration for solar, rainwater, composting, and more.',
    },
  ];

  const models = [
    {
      name: 'Trio 57',
      Floorarea: '65.7 m² / 707 ft²',
      Bedrooms: '2',
      Bathrooms: '1',
      Floors: '2',
      ACCOMMODATES: '1-4 People',
      img: '/images/trio-1.jpg',
    },
    {
      name: 'Trio 75',
      Floorarea: '77.6 m² / 835 ft²',
      Bedrooms: '2',
      Bathrooms: '1',
      ACCOMMODATES: '1-5 People',
      img: '/images/trio-2.jpg',
    },
    {
      name: 'Trio 100',
      Floorarea: '101.9 m² / 1097 ft²',
      Bedrooms: '3',
      Bathrooms: '1',
      ACCOMMODATES: '2-6 People',
      img: '/images/trio-3.jpg',
    },
    {
      name: 'Trio 120',
      Floorarea: '118.7 m² / 1278 ft²',
      Bedrooms: '3',
      Bathrooms: '2',
      ACCOMMODATES: '3-7 People',
      img: '/images/trio-4.jpg',
    },
    {
      name: 'Trio 150',
      Floorarea: '140.9 m² / 1517 ft²',
      Bedrooms: '3',
      Bathrooms: '2',
      ACCOMMODATES: '4-8 People',
      img: '/images/trio-5.jpg',
    },
  ];

  const Duo = [
    {
      name: 'Duo 57',
      Floorarea: '30,8 m2 / 331,0 ft2',
      Bedrooms: 'loft',
      Bathrooms: '1',
      Floors: '1+ loft',
      ACCOMMODATES: '1-2 People',
      img: '/images/duo-1.jpg',
    },
    {
      name: 'Duo 75',
      Floorarea: '39,8 m2 / 428,0 ft2',
      Bedrooms: '1 + loft',
      Bathrooms: '1',
      ACCOMMODATES: '1-4 People',
      img: '/images/duo-2.jpg',
    },
    {
      name: 'Duo 100',
      Floorarea: '54,4 m2 / 585,0 ft2',
      Bedrooms: ' 1 + loft',
      Bathrooms: '1',
      ACCOMMODATES: '2-5 People',
      img: '/images/duo-3.jpg',
    },
    {
      name: 'Duo 120',
      Floorarea: ' 67,6 m2 / 727,0 ft2',
      Bedrooms: ' 1 + loft',
      Bathrooms: '1',
      ACCOMMODATES: ' 3-6 People',
      img: '/images/duo-4.jpg',
    },
  ];

  const Solo = [
    {
      name: 'Solo+ 42',
      Floorarea: '17,1 m2 / 184,0 ft2',
      Bedrooms: 'loft',
      Bathrooms: '0',
      Floors: ' 1 + compact loft area',
      ACCOMMODATES: '1-2 People',
      img: '/images/solo-1.jpg',
    },
    {
      name: 'Solo+ 75',
      Floorarea: '33,9 m2 / 365,0 ft2',
      Bedrooms: ' loft',
      Bathrooms: '1',
      ACCOMMODATES: '2-3 People',
      img: '/images/solo-2.jpg',
    },
    {
      name: 'Solo+ 100',
      Floorarea: '38,4 m2 / 413 ft2',
      Bedrooms: ' 1 + loft',
      Bathrooms: '1',
      ACCOMMODATES: '2-4 People',
      img: '/images/solo-3.jpg',
    },
  ];

  const process = [
    { step: '01', title: 'Consult', desc: 'Define goals, budget, site constraints, and timeline.' },
    { step: '02', title: 'Design', desc: 'Tailor a model to your lifestyle and permit requirements.' },
    { step: '03', title: 'Engineer', desc: 'Structural details, energy spec, and documentation.' },
    { step: '04', title: 'Ship', desc: 'Kit fabrication and delivery logistics to your site.' },
    { step: '05', title: 'Assemble', desc: 'Guided assembly with your preferred builder.' },
    { step: '06', title: 'Finish', desc: 'Fit-out, services, and handover.' },
  ];

  const faqs = [
    {
      q: 'How long does an Avrame build take?',
      a: 'Typical timelines range from 8-16 weeks depending on model size, weather, and contractor availability. The shell goes up fast; interior fit-out takes the bulk of the time.',
    },
    {
      q: 'Can I build off-grid?',
      a: 'Yes. We can preconfigure packages for solar power, rainwater capture, greywater, and composting systems.',
    },
    {
      q: 'Do you help with permits?',
      a: 'We provide complete drawings and can liaise with your local authority or your architect/engineer for smooth approvals.',
    },
    {
      q: "What's included in the kit?",
      a: 'Pre-cut structural members, connectors, fasteners, weather barrier, and detailed assembly guide. Finishes and MEP can be specified as add-ons.',
    },
  ];

  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/\+/g, ' plus ')
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  const crimson = '#DC2626';
  const crimsonDark = '#b30f1c';

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: '9rem',
          paddingBottom: '5rem',
          background:
            'linear-gradient(120deg, #0b0f19 0%, #0b0f19 35%, #1a0b0d 55%, #3a0c11 72%, #7a0e17 88%, #b30f1c 100%)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm ring-1 ring-white/15 bg-white/10">
                <Home className="w-4 h-4" /> Modern A-Frame Homes
              </span>

              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
                Avrame — Smart, Fast, Beautiful A-Frame Living
              </h1>

              <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl">
                Choose a prefabricated A-frame kit optimized for South African climates. Efficient to heat, quick to build, and tailored to your site.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="#models"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white"
                  style={{ background: crimson }}
                >
                  Explore Models <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white/90 ring-1 ring-white/20"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  Get a Quote
                </Link>
              </div>
            </div>

            <div className="relative h-[360px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden ring-1 ring-white/10">
              <Image src="/images/bg.jpg" alt="Avrame A-frame house exterior" fill className="object-cover" priority />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* BENEFITS */}
      <AnimatedSection className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl p-6 border shadow-sm hover:shadow-md transition bg-gradient-to-b from-white to-gray-50">
              <div
                className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white"
                style={{ background: `linear-gradient(135deg, ${crimson} 0%, ${crimsonDark} 100%)` }}
              >
                <b.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{b.title}</h3>
              <p className="mt-2 text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* MODELS */}
      <AnimatedSection id="models" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              TRIO A-frame House Kits
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              TRIO A-frame house kits are the go-to choice for modern, eco-conscious living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {models.map((m) => (
              <div key={m.name} className="group rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition bg-white">
                <div className="relative aspect-[4/3]">
                  <Image src={m.img} alt={m.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{m.name}</h3>
                  <ul className="mt-3 space-y-1 text-gray-700">
                    <li><strong>Floor area:</strong> {m.Floorarea}</li>
                    <li><strong>Bedrooms:</strong> {m.Bedrooms}</li>
                    <li><strong>Bathrooms:</strong> {m.Bathrooms}</li>
                    {m.Floors && <li><strong>Floors:</strong> {m.Floors}</li>}
                    <li><strong>Accommodates:</strong> {m.ACCOMMODATES}</li>
                  </ul>
                  <div className="mt-6 flex items-center justify-between">
                    <Link href={`/models/${slugify(m.name)}`} className="inline-flex items-center gap-2 font-semibold" style={{ color: crimson }}>
                      Get pricing <ChevronRight className="w-4 h-4" />
                    </Link>
                    <span className="inline-flex items-center gap-2 text-gray-500">
                      <Ruler className="w-4 h-4" /> Customizable
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* DUO Series */}
      <AnimatedSection id="duo" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              DUO A-frame House Kits
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Explore our range of Duo A-frame house kits today and start your journey to a simpler, greener lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Duo.map((m) => (
              <div key={m.name} className="group rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition bg-white">
                <div className="relative aspect-[4/3]">
                  <Image src={m.img} alt={m.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{m.name}</h3>
                  <ul className="mt-3 space-y-1 text-gray-700">
                    <li><strong>Floor area:</strong> {m.Floorarea}</li>
                    <li><strong>Bedrooms:</strong> {m.Bedrooms}</li>
                    <li><strong>Bathrooms:</strong> {m.Bathrooms}</li>
                    {m.Floors && <li><strong>Floors:</strong> {m.Floors}</li>}
                    <li><strong>Accommodates:</strong> {m.ACCOMMODATES}</li>
                  </ul>
                  <div className="mt-6 flex items-center justify-between">
                    <Link href={`/models/${slugify(m.name)}`} className="inline-flex items-center gap-2 font-semibold" style={{ color: crimson }}>
                      Get pricing <ChevronRight className="w-4 h-4" />
                    </Link>
                    <span className="inline-flex items-center gap-2 text-gray-500">
                      <Ruler className="w-4 h-4" /> Customizable
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* SOLO+ Series */}
      <AnimatedSection id="solo" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              SOLO+ A-frame House Kits
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Explore our SOLO+ A-frame house kits and start building your dream A-frame home today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Solo.map((m) => (
              <div key={m.name} className="group rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition bg-white">
                <div className="relative aspect-[4/3]">
                  <Image src={m.img} alt={m.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{m.name}</h3>
                  <ul className="mt-3 space-y-1 text-gray-700">
                    <li><strong>Floor area:</strong> {m.Floorarea}</li>
                    <li><strong>Bedrooms:</strong> {m.Bedrooms}</li>
                    <li><strong>Bathrooms:</strong> {m.Bathrooms}</li>
                    {m.Floors && <li><strong>Floors:</strong> {m.Floors}</li>}
                    <li><strong>Accommodates:</strong> {m.ACCOMMODATES}</li>
                  </ul>
                  <div className="mt-6 flex items-center justify-between">
                    <Link href={`/models/${slugify(m.name)}`} className="inline-flex items-center gap-2 font-semibold" style={{ color: crimson }}>
                      Get pricing <ChevronRight className="w-4 h-4" />
                    </Link>
                    <span className="inline-flex items-center gap-2 text-gray-500">
                      <Ruler className="w-4 h-4" /> Customizable
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CLASSIC HOUSES */}
      <ClassicHouses />
    </div>
  );
}
