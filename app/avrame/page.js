'use client';

import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

// at the top of the file where you render the player
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

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
  CheckCircle2,
  ChevronRight,
  Quote,
} from 'lucide-react';
import ClassicHouses from './classic';

export default function AvramePage() {
  const benefits = [
    {
      icon: Leaf,
      title: 'What is Avrame about?',
      desc: 'At its heart, Avrame is about empowering individuals to build their own high-quality homes, whether they’re nestled close to a bustling city or tucked away in a remote corner of nature.',
    },
    {
      icon: Hammer,
      title: 'Benefits of Avrame houses',
      desc: 'The A-frame shape of Avrame’s most popular house models offers a spacious indoor area which is fully customizable.',
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
      ACCOMMODATES: '1–4 People',
      img: '/images/trio-1.jpg',
    },
    {
      name: 'Trio 75',
      Floorarea: '77.6 m² / 835 ft²',
      Bedrooms: '2',
      Bathrooms: '1',
      ACCOMMODATES: '1–5 People',
      img: '/images/trio-2.jpg',
    },
    {
      name: 'Trio 100',
      Floorarea: '101.9 m² / 1097 ft²',
      Bedrooms: '3',
      Bathrooms: '1',
      ACCOMMODATES: '2–6 People',
      img: '/images/trio-3.jpg',
    },
    {
      name: 'Trio 120',
      Floorarea: '118.7 m² / 1278 ft²',
      Bedrooms: '3',
      Bathrooms: '2',
      ACCOMMODATES: '3–7 People',
      img: '/images/trio-4.jpg',
    },
    {
      name: 'Trio 150',
      Floorarea: '140.9 m² / 1517 ft²',
      Bedrooms: '3',
      Bathrooms: '2',
      ACCOMMODATES: '4–8 People',
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
      a: 'Typical timelines range from 8–16 weeks depending on model size, weather, and contractor availability. The shell goes up fast; interior fit-out takes the bulk of the time.',
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
      q: 'What’s included in the kit?',
      a: 'Pre-cut structural members, connectors, fasteners, weather barrier, and detailed assembly guide. Finishes and MEP can be specified as add-ons.',
    },
  ];

  const testimonials = [
    {
      quote:
        'The A-frame went up in days. Heating bill is a fraction of our old place and the view from the loft is unreal.',
      name: 'Naledi M.',
      detail: 'Avrame A-Frame 30 • Dullstroom',
      img: '/images/avrame/client-1.jpg',
    },
    {
      quote:
        'We wanted a family cabin that could live off-grid on weekends. The kit was precise, and support was excellent.',
      name: 'Grant & Thuli',
      detail: 'Avrame A-Frame 24 • Cederberg',
      img: '/images/avrame/client-2.jpg',
    },
  ];
  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/\+/g, ' plus ')      // Solo+ → solo-plus
      .replace(/&/g, ' and ')        // if any “&”
      .replace(/[^a-z0-9\s-]/g, '')  // drop other punctuation
      .trim()
      .replace(/\s+/g, '-');         // spaces → dashes

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
        <div className="absolute -left-24 -top-24 rounded-full blur-3xl" style={{ width: '34rem', height: '34rem', background: 'rgba(179,15,28,0.28)' }} />
        <div className="absolute -right-24 -bottom-24 rounded-full blur-3xl" style={{ width: '34rem', height: '34rem', background: 'rgba(122,14,23,0.35)' }} />

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

              <div className="mt-8 flex items-center gap-6 text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Passive-leaning envelope
                </span>
                <span className="inline-flex items-center gap-2">
                  <Truck className="w-5 h-5" /> Delivered nationwide
                </span>
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
            <div
              key={b.title}
              className="rounded-2xl p-6 border shadow-sm hover:shadow-md transition bg-gradient-to-b from-white to-gray-50"
            >
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">TRIO A-frame House Kits</h2>
            <p className="text-lg text-gray-600 mt-2">TRIO A-frame house kits are the go-to choice for modern, eco-conscious living.</p>
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
                    <Link
                      href={`/models/${slugify(m.name)}`}
                      className="inline-flex items-center gap-2 font-semibold"
                      style={{ color: '#DC2626' }}
                    >
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

      {/* Duo Series */}
      <AnimatedSection id="models" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              DUO A-frame House Kits
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Explore our range of Duo A-frame house kits today and start your journey to a simpler, greener lifestyle.
            </p>
          </div>

          {/* Model Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Duo.map((m) => (
              <div
                key={m.name}
                className="group rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition bg-white"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={m.img} alt={m.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{m.name}</h3>
                  <ul className="mt-3 space-y-1 text-gray-700">
                    <li>
                      <strong>Floor area:</strong> {m.Floorarea}
                    </li>
                    <li>
                      <strong>Bedrooms:</strong> {m.Bedrooms}
                    </li>
                    <li>
                      <strong>Bathrooms:</strong> {m.Bathrooms}
                    </li>
                    {m.Floors && (
                      <li>
                        <strong>Floors:</strong> {m.Floors}
                      </li>
                    )}
                    <li>
                      <strong>Accommodates:</strong> {m.ACCOMMODATES}
                    </li>
                  </ul>
                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      href={`/models/${slugify(m.name)}`}
                      className="inline-flex items-center gap-2 font-semibold"
                      style={{ color: '#DC2626' }}
                    >
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


      {/* Solo Series */}
      <AnimatedSection id="models" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">SOLO+ A-frame House Kits</h2>
            <p className="text-lg text-gray-600 mt-2">Explore our SOLO+ A-frame house kits and start building your dream A-frame home today.</p>
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
                    <Link
                      href={`/models/${slugify(m.name)}`}
                      className="inline-flex items-center gap-2 font-semibold"
                      style={{ color: '#DC2626' }}
                    >
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


      <ClassicHouses />
      {/* PROCESS */}
      {/* <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">How it Works</h2>
            <p className="text-lg text-gray-600 mt-2">A clear, dependable path from idea to move-in.</p>
          </div>
          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {process.map((p) => (
              <li key={p.step} className="rounded-2xl p-6 border bg-white shadow-sm" style={{ borderColor: '#eef2f7' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${crimsonDark} 0%, ${crimson} 100%)` }}>
                    {p.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
                </div>
                <p className="mt-3 text-gray-600">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </AnimatedSection> */}

      {/* GALLERY */}
      {/* <AnimatedSection className="py-4 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['g1.jpg', 'g2.jpg', 'g3.jpg', 'g4.jpg'].map((g) => (
              <div key={g} className="relative h-40 sm:h-48 rounded-xl overflow-hidden">
                <Image src={`/images/avrame/${g}`} alt="Avrame gallery" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection> */}

      {/* TESTIMONIALS */}
      {/* <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl p-8 border shadow-sm bg-white" style={{ borderColor: '#eef2f7' }}>
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white shadow">
                  <Image src={t.img} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2" style={{ color: crimson }}>
                    <Quote className="w-5 h-5" />
                    <span className="font-semibold">Client Story</span>
                  </div>
                  <p className="mt-3 text-lg text-gray-800 italic">“{t.quote}”</p>
                  <p className="mt-3 text-gray-700 font-semibold">{t.name}</p>
                  <p className="text-gray-500">{t.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection> */}

      {/* FAQ */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">FAQs</h2>
            <p className="text-lg text-gray-600 mt-2">Everything you need to know about Avrame kits.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border bg-white p-5 shadow-sm" style={{ borderColor: '#eef2f7' }}>
                <summary className="flex cursor-pointer items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">{f.q}</h3>
                  <span className="text-gray-400 group-open:rotate-90 transition">
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </summary>
                <p className="mt-3 text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection id="contact" className="py-20">
        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl text-white"
          style={{
            background:
              'radial-gradient(1000px 500px at 10% 10%, rgba(179,15,28,0.22), transparent 60%), radial-gradient(1000px 500px at 90% 90%, rgba(122,14,23,0.28), transparent 60%), linear-gradient(150deg, #0b0f19 0%, #0c1224 100%)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center px-6 py-12 md:px-10 md:py-14">
            <div className="lg:col-span-2">
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">Ready to plan your A-frame?</h3>
              <p className="mt-3 text-white/85">
                Tell us about your site and timeline — we’ll send a tailored model recommendation and budget range.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white"
                  style={{ background: crimson }}
                >
                  Start Consultation <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#models"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white/90 ring-1 ring-white/15"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  See Models
                </Link>
              </div>
            </div>
            <div className="relative h-52 rounded-2xl overflow-hidden ring-1 ring-white/10">
              <Image src="/images/bg-1.jpg" alt="Avrame interior" fill className="object-cover" />
            </div>
          </div>
        </div>
      </AnimatedSection>


      {/* FOOTER */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500">
            <span className="inline-flex items-center gap-2"><Wrench className="w-5 h-5" /> Builder-friendly</span>
            <span className="inline-flex items-center gap-2"><Truck className="w-5 h-5" /> Nationwide shipping</span>
            <span className="inline-flex items-center gap-2"><Hammer className="w-5 h-5" /> Precision kit</span>
          </div>
        </div>
      </section>
    </div>
  );
}
