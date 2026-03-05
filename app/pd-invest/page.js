// app/pd-invest/page.jsx
import React from "react";

export default function PDInvestPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-zinc-200">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-950 to-[#6a0b14]" />
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#b10f23]/30 blur-3xl" />
          <div className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-[#7a0c18]/25 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        </div>

        <div className="relative w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
          

          <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-white mt-5">
            PD INVEST
          </h1>

          <p className="mt-4 max-w-4xl text-sm sm:text-base text-white/80 leading-relaxed">
            PD Invest (on behalf of PD Enterprises) is an entrepreneurial
            infrastructure investor in the broader energy and food sectors. We
            deploy early-stage capital to permit, structure, and transform
            projects into contracted inflation-linked assets suitable for
            long-term institutional investment.
          </p>

          {/* Index pills */}
          <nav className="mt-7 flex flex-wrap gap-3 text-xs sm:text-sm">
            <a
              href="#overview"
              className="rounded-full border border-white/30 bg-black/25 px-4 py-2 text-white font-semibold
                         hover:border-[#ff2a3a]/70 hover:bg-[#ff2a3a]/15 transition"
            >
              Overview
            </a>
            <a
              href="#mindset"
              className="rounded-full border border-white/30 bg-black/25 px-4 py-2 text-white font-semibold
                         hover:border-[#ff2a3a]/70 hover:bg-[#ff2a3a]/15 transition"
            >
              Investment Mindset
            </a>
            <a
              href="#passive"
              className="rounded-full border border-white/30 bg-black/25 px-4 py-2 text-white font-semibold
                         hover:border-[#ff2a3a]/70 hover:bg-[#ff2a3a]/15 transition"
            >
              Passive Sectors
            </a>
            <a
              href="#developments"
              className="rounded-full border border-white/30 bg-black/25 px-4 py-2 text-white font-semibold
                         hover:border-[#ff2a3a]/70 hover:bg-[#ff2a3a]/15 transition"
            >
              Latest Developments
            </a>
          </nav>

          {/* Quick stats chips */}
          <div className="mt-7 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white/85">
              Focus: <span className="font-semibold text-white">Energy + Food</span>
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white/85">
              Stage:{" "}
              <span className="font-semibold text-white">Early-stage de-risking</span>
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white/85">
              Outcome: <span className="font-semibold text-white">Contracted assets</span>
            </span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-12">
        {/* OVERVIEW */}
        <section
          id="overview"
          className="rounded-2xl bg-white shadow-sm border border-zinc-100 px-6 py-8"
        >
          <header className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b10f23]">
              Profile
            </p>
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold">Overview</h2>
          </header>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700">
            <p>
              PD Invest deploys early-stage capital to permit, structure and
              transform projects into contracted inflation-linked assets for
              long-term institutional investment.
            </p>
            <p className="text-zinc-600">
              Our investment in infrastructure is informed by a repeatable
              platform approach with phased expansion plans—especially within
              energy projects where contracted revenues and pre-validated demand
              are key.
            </p>
          </div>
        </section>

        {/* INVESTMENT MINDSET */}
        <section
          id="mindset"
          className="rounded-2xl bg-white shadow-sm border border-zinc-100 px-6 py-8"
        >
          <header className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b10f23]">
              Strategy
            </p>
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold">
              Investment Mindset
            </h2>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              title="Active early-stage investors"
              text="We collaborate with others to initiate projects within dedicated economic sectors."
            />
            <InfoCard
              title="De-risk, shape, and scale"
              text="We actively de-risk projects and help shape and scale them."
            />
            <InfoCard
              title="Enter at highest risk, exit after value crystallizes"
              text="We get involved at the highest risk stage, with a view to exiting when value has been crystalized."
            />
            <InfoCard
              title="Contracted revenues in energy"
              text="We aim to introduce contracted revenues via relational off takers with set energy demand."
            />
            <InfoCard
              title="Pre-validation of energy demand"
              text="Demand pre-validation helps produce real economic influence rather than speculative asset building."
            />
            <InfoCard
              title="Repeatable infrastructure platforms"
              text="Our approach is repetitive, creating platforms with phased expansion plans."
            />
          </div>

          <div className="mt-6 rounded-xl border border-zinc-100 bg-zinc-50 px-5 py-4 text-sm text-zinc-700 leading-relaxed">
            This strategic approach applies to the bulk of the investment portfolio.
          </div>
        </section>

        {/* PASSIVE SECTORS */}
        <section
          id="passive"
          className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-50 px-6 py-8"
        >
          <header className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb3bb]">
              Community upliftment
            </p>
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold">
              Passive / Arm’s-Length Investments
            </h2>
          </header>

          <p className="text-sm sm:text-base leading-relaxed text-zinc-200 max-w-4xl">
            PD Invest also invests in other sectors using a more passive,
            arm’s-length approach—smaller developments aimed at stimulating
            economic activity in marginalized communities.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <DarkPillCard title="Textiles & dress making" />
            <DarkPillCard title="Food distribution service" />
            <DarkPillCard title="Entrepreneurial township businesses" />
          </div>
        </section>

        {/* LATEST DEVELOPMENTS */}
        <section
          id="developments"
          className="rounded-2xl bg-white shadow-sm border border-zinc-100 px-6 py-8"
        >
          <header className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b10f23]">
              Portfolio
            </p>
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold">
              Latest Developments (Active Investment)
            </h2>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <ProjectCardLight
              title="Amersfoort (Mpumalanga) Solar PV (& BESS)"
              client="Ndawebanzi (developer)"
              phase="EPC initiation phase"
              bullets={[
                "Solar PV: (120 – 180 MW): ~1800 kWh/kWp",
                "BESS (initial): 25 MW / 55 MWh",
                "Initial capital: USD 185m",
                "Utility scale (multi offtake)",
              ]}
            />

            <ProjectCardLight
              title="Dundee (KZN) Solar PV (& BESS)"
              client="Ndawebanzi (developer)"
              phase="EPC initiation phase"
              bullets={[
                "Solar PV: (~100 MW): ~1700 kWh/kWp",
                "BESS (initial): 25 MW / 55 MWh",
                "Initial capital: USD 100m",
                "Utility scale (multi offtake)",
              ]}
            />

            <ProjectCardLight
              title="Indoor Atlantic Salmon Production (Aquaculture)"
              client="ENIDC (eSwatini)"
              phase="Post feasibility phase (investment stage)"
              bullets={[
                "Capacity: 5000 ton p.a. (fillet & HOG)",
                "Ancillary products: Edible oils, Animal feeds & Fertilizers",
                "Initial capital: ZAR 2bn",
                "Industrial scale (multi offtake)",
              ]}
            />

            <ProjectCardLight
              title="Coal Bed Methane Extraction (CBM)"
              client="Twala Mnyamande Minerals"
              phase="Exploration phase"
              bullets={[
                "CBM: Amersfoort (Mpumalanga) – Ermelo Coalfield",
                "Initial capital: ZAR 15m",
                "Utility scale gas and/or electricity supply",
              ]}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------------- PRESENTATIONAL COMPONENTS ---------------- */

function InfoCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-zinc-50 px-5 py-4 hover:bg-white hover:border-[#ff2a3a]/30 transition">
      <div className="flex items-start gap-3">
        <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#b10f23]" />
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-zinc-900">
            {title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-zinc-700 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function DarkPillCard({ title }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm hover:bg-white/10 hover:border-white/25 transition">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs text-zinc-200">Community-oriented development focus</p>
    </div>
  );
}

function ProjectCardLight({ title, client, phase, bullets }) {
  return (
    <article className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative h-44 bg-gradient-to-r from-zinc-900 to-[#6a0b14]">
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute left-5 bottom-4">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white">
            Project
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
          {title}
        </h3>

        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-zinc-700">
            Client: <span className="font-semibold">{client}</span>
          </span>
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-zinc-700">
            Phase: <span className="font-semibold">{phase}</span>
          </span>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-zinc-700">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b10f23]" />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}