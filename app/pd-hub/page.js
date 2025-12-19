// app/pd-hub/page.jsx
import React from "react";

export default function PDHubProfilePage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* HERO */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <p className="text-xs uppercase tracking-[0.3em] text-crimson/70">
            Excellence • Creativity • Innovation
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
            PD Hub – Development Profile
          </h1>

          <p className="mt-3 max-w-3xl text-sm sm:text-base text-zinc-600">
            Project Development Hub (PD Hub) is a wholly black-owned development
            consultancy supporting infrastructure, energy, agriculture and
            consumer projects across Africa.
          </p>

          {/* INDEX PILLS */}
          <nav className="mt-6 flex flex-wrap gap-3 text-xs sm:text-sm">
            <a
              href="#company-intro"
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 hover:border-crimson hover:text-crimson transition"
            >
              Company Introduction
            </a>
            <a
              href="#scope-projects"
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 hover:border-crimson hover:text-crimson transition"
            >
              Scope &amp; Projects
            </a>
            <a
              href="#other-services"
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 hover:border-crimson hover:text-crimson transition"
            >
              Consultancy Services
            </a>
            <a
              href="#principals"
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 hover:border-crimson hover:text-crimson transition"
            >
              Principals &amp; Management
            </a>
          </nav>
        </div>
      </section>

      {/* CONTENT – fluid container */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-12">
        {/* COMPANY INTRO */}
        <section
          id="company-intro"
          className="rounded-2xl bg-white shadow-sm border border-zinc-100 px-6 py-8"
        >
          <header className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
              About PD Hub
            </p>
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold">
              Company Introduction
            </h2>
          </header>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700">
            <p>
              Project Development Hub, Pty Ltd (PD Hub) is a wholly black-owned
              development consultancy and part of PD Enterprises, founded by
              Eric Tshwele in 2016. The group supports clients who need
              assistance to develop infrastructure projects with limited
              in-house experience.
            </p>
            <p>
              PD Hub also originates projects in strategic sectors and brings in
              partners at later stages. These initiatives are designed to be
              development-driven, ensuring that resident communities and
              previously marginalised groups benefit directly.
            </p>
            <p>
              Focus sectors include Energy, Food &amp; Beverages, Mining &amp;
              Industry, and Buildings &amp; Settlements. Capability is organised
              into the following specialist divisions:
            </p>
          </div>

          {/* DIVISIONS */}
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <DivisionCard
              title="Infrastructure Project Services (IPS)"
              text="Full spectrum of services for large infrastructure projects: audits, concept design, feasibility, specifications, contract documentation, and construction monitoring."
            />
            <DivisionCard
              title="Buildings, Interiors & Settlements (BIS)"
              text="Integrated architectural, interior and building services for complete, turnkey building and settlement solutions."
            />
            <DivisionCard
              title="Consumer Product Facilitation (CPF)"
              text="Opportunities in consumer goods, food value chains, energy sales and FMCG—from factory build to sales and marketing."
            />
            <DivisionCard
              title="Primary Agriculture Service (PAS)"
              text="Engineering and farm design, soil and environmental surveys, equipment sourcing, business planning and early-stage finance support."
            />
            <DivisionCard
              title="Construction & Maintenance Service (CMS)"
              text="Supports smaller contractors with tendering, maintenance specs, contract management, guarantees, and site/back-office services."
            />
            <DivisionCard
              title="Engineering Professionals Network (EPN)"
              text="Multi-disciplinary engineering resource pool deployed on PD Hub and partner projects globally."
            />
          </div>
        </section>

        {/* SCOPE & PROJECTS */}
        <section
          id="scope-projects"
          className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-50 px-6 py-8"
        >
          <header className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson-200">
              Scope &amp; Footprint
            </p>
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold">
              Scope of Interest and Projects
            </h2>
          </header>

          <p className="text-sm sm:text-base leading-relaxed text-zinc-200 max-w-4xl">
            PD Hub participates across the full project lifecycle—from
            feasibility and bankability to design, capital raise, construction
            and implementation across Africa.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <ProjectCard
              title="Carbonated Soft Drinks (CSD)"
              division="CPF"
              location="Eastern Cape, South Africa"
              text="Soft-drink production facility: PET bottle blowing, mixing, purification, filling and warehousing."
            />
            <ProjectCard
              title="Fuel Storage Facility"
              division="IPS"
              location="Mozambique"
              text="Design & build of petrochemical storage for diesel, petrol, bitumen and future CNG."
            />
            <ProjectCard
              title="Charcoal Production"
              division="CPF"
              location="Eastern Cape, South Africa"
              text="Production of charcoal briquettes using invasive biomass and sawdust."
            />
            <ProjectCard
              title="Addis Ababa Wastewater Works"
              division="EPN"
              location="Ethiopia"
              text="Electro-mechanical audit, supervision & certification for major wastewater works."
            />
            <ProjectCard
              title="Bilene Beach Developments"
              division="BIS"
              location="Mozambique"
              text="Mixed-use beach resort development with villas and holiday suites."
            />
            <ProjectCard
              title="Atlantic Salmon Production"
              division="IPS"
              location="eSwatini"
              text="Indoor aquaculture facility (5000 tpa) for Atlantic Salmon plus by-products."
            />
            <ProjectCard
              title="Coal Bed Methane Extraction (CBM)"
              division="IPS"
              location="Mpumalanga, South Africa"
              text="Community-driven methane extraction with treated water reused for agriculture."
            />
          </div>
        </section>

        {/* OTHER SERVICES */}
        <section
          id="other-services"
          className="rounded-2xl bg-white shadow-sm border border-zinc-100 px-6 py-8"
        >
          <header className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
              Advisory
            </p>
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold">
              Other Consultancy Services
            </h2>
          </header>

          <p className="text-sm sm:text-base text-zinc-700 leading-relaxed max-w-4xl">
            PD Hub provides stand-alone advisory services that strengthen client
            teams—via PD Hub offices or on-site.
          </p>

          <p className="mt-3 text-sm sm:text-base text-zinc-700 leading-relaxed max-w-4xl">
            These include tender administration, project and construction
            management, skills development and mediation.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold">Tender Administration</h3>
              <ul className="mt-3 text-sm text-zinc-700 space-y-1.5">
                <li>Briefing session analysis</li>
                <li>Tender requirement mapping</li>
                <li>Structuring deliverables</li>
                <li>Pricing strategies</li>
                <li>Improving tender hit rate</li>
                <li>Training sales teams</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                Project &amp; Construction Management
              </h3>
              <ul className="mt-3 text-sm text-zinc-700 space-y-1.5">
                <li>Programme planning</li>
                <li>Team coordination</li>
                <li>Technical meetings</li>
                <li>Contract interpretation</li>
                <li>Resident engineer support</li>
                <li>Dispute resolution</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PRINCIPALS */}
        <section
          id="principals"
          className="rounded-2xl bg-white shadow-sm border border-zinc-100 px-6 py-8"
        >
          <header className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson">
              Leadership
            </p>
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold">
              Principals and Management
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-2 text-sm sm:text-base text-zinc-700 leading-relaxed">
            <div>
              <h3 className="text-base font-semibold">Eric Tshwele</h3>
              <p className="mt-2">
                Registered professional engineer and Managing Principal of PD
                Hub. Leads all projects with discipline project managers.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold">Nomonde Keswa</h3>
              <p className="mt-2">
                Registered conflict-resolution mediator with strong Industrial
                Relations and HR expertise.
              </p>
            </div>
          </div>

          <div className="mt-6 border-l-4 border-crimson/70 pl-4 italic text-sm text-zinc-700">
            “…we strive to promote economic growth through a wider stakeholder
            development platform…”
          </div>
        </section>
      </div>
    </main>
  );
}

/* PRESENTATIONAL COMPONENTS */

function DivisionCard({ title, text }) {
  return (
    <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3.5 hover:border-crimson/40 hover:bg-white transition">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1.5 text-xs sm:text-sm text-zinc-700 leading-relaxed">
        {text}
      </p>
    </div>
  );
}

function ProjectCard({ title, division, location, text }) {
  return (
    <article className="rounded-xl border border-zinc-700/60 bg-zinc-900/40 px-4 py-4 hover:border-crimson/60 transition">
      <h3 className="text-sm sm:text-base font-semibold text-zinc-50">
        {title}
      </h3>

      <p className="mt-2 text-xs sm:text-sm text-zinc-200 leading-relaxed">
        {text}
      </p>

      <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs">
        <span className="inline-flex items-center rounded-full border border-zinc-600 px-2 py-1">
          Division: <span className="ml-1 font-medium">{division}</span>
        </span>
        <span className="inline-flex items-center rounded-full border border-zinc-600 px-2 py-1">
          {location}
        </span>
      </div>
    </article>
  );
}
