import Image from "next/image";
import Link from "next/link";
import {
    Factory,
    Building2,
    Hospital,
    BatteryCharging,
    SunMedium,
    Network,
    BadgeCheck,
    ChevronRight,
    LineChart,
    Cog,
    ShieldCheck,
    Zap,
} from "lucide-react";

const commercialHighlights = [
    {
        icon: <Factory className="h-5 w-5" />,
        title: "Factories & Industries",
        text: "Energy supply assessment and reconfiguration for manufacturing and process-intensive operations.",
        image: "/images/factory-industry.jpg",
    },
    {
        icon: <Building2 className="h-5 w-5" />,
        title: "Commercial Centres",
        text: "Optimized energy strategies for large buildings, campuses, and high-demand commercial facilities.",
        image: "/images/commercial.jpg",
    },
    {
        icon: <Hospital className="h-5 w-5" />,
        title: "Hospitals & Large Establishments",
        text: "Reliable and efficient hybrid energy systems to support continuous operations and cost control.",
        image: "/images/hospital.jpg",
    },
];

const commercialSolutions = [
    {
        icon: <SunMedium className="h-5 w-5" />,
        title: "Solar Rooftop PV Systems",
        text: "We deploy solar rooftop solutions sized to reduce reliance on costly municipal power and improve energy resilience.",
        image: "/images/solar-rooftop.jpeg",
    },
    {
        icon: <BatteryCharging className="h-5 w-5" />,
        title: "Battery Energy Storage (BESS)",
        text: "Strategically sized battery systems help stabilize supply, shift peak loads, and improve overall operational efficiency.",
        image: "/images/bess.jpg",
    },
    {
        icon: <Cog className="h-5 w-5" />,
        title: "Standby Plant Integration",
        text: "Existing backup generation systems are integrated intelligently so they work efficiently alongside solar and storage.",
        image: "/images/img.webp",
    },
    {
        icon: <LineChart className="h-5 w-5" />,
        title: "Fuel & Cost Optimization",
        text: "We carefully balance all available sources to lower fuel consumption and support better financial outcomes.",
        image: "/images/fuel.jpg",
    },
];

const utilityServices = [
    "Site selection for Solar farms and BESS (storage) system installation.",
    "Preliminary and detailed designs of Solar PV and BESS systems.",
    "Bill of Quantities and technology selection.",
    "Detailed feasibility studies and documentation.",
    "Complete integration and management of other relevant scientific and engineering services to deliver complete energy production facilities.",
    "Complete electric power network system studies and integration to large utility networks (Electric Grids).",
];

export default function EnergyAdvisoryPage() {
    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* TOP BANNER */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#02060b_0%,#09040a_35%,#300008_70%,#7f0012_100%)]" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
                <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-red-500/20 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-24">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.22em] text-white/90 backdrop-blur">
                                <Zap className="h-4 w-4 text-red-400" />
                                Energy Advisory Service
                            </div>

                            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                                Energy Advisory
                                <span className="block text-red-400">
                                    for Industrial & Utility Projects
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                                Strategic energy planning for commercial, industrial, and
                                utility-scale clients through solar PV, BESS, standby plant
                                integration, and grid-focused engineering support.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
                                >
                                    Contact Us
                                    <ChevronRight className="h-4 w-4" />
                                </Link>

                                <a
                                    href="#commercial-industrial"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                                >
                                    Explore Services
                                </a>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                                    <Image
                                        src="/images/energy.jpg"
                                        alt="Energy Advisory"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMERCIAL & INDUSTRIAL */}
            <section
                id="commercial-industrial"
                className="bg-white px-6 py-16 md:px-10 lg:py-24"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 max-w-3xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
                            <BadgeCheck className="h-4 w-4" />
                            Commercial & Industrial
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                            Smarter energy systems for operational efficiency
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-600">
                            We assist clients including factories, industries, commercial
                            centres, hospitals, and large establishments with the assessment
                            and configuration of their energy supplies. These systems are
                            reconfigured for cost savings from escalating municipal tariff
                            regimes and for better reliability where traditional electricity
                            supply is inconsistent.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {commercialHighlights.map((item) => (
                            <div
                                key={item.title}
                                className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="relative h-56 w-full">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-6">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-500 text-white">
                                        {item.icon}
                                    </div>

                                    <h3 className="text-xl font-semibold text-slate-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-3xl sm:text-4xl font-bold text-slate-900 mt-10">
                        Integrated Solar Solutions
                    </p>
                    <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-2">

                        <div className="h-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
                            <div className="relative aspect-[4/3] h-full min-h-[420px] overflow-hidden rounded-[1.5rem]">
                                <Image
                                    src="/images/solar.jpg"
                                    alt="Commercial and industrial energy systems"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="grid h-full gap-5 sm:grid-cols-2">
                            {commercialSolutions.map((item) => (
                                <div
                                    key={item.title}
                                    className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"
                                >
                                    <div className="relative h-44 w-full">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                            {item.icon}
                                        </div>

                                        <h3 className="text-lg font-semibold text-slate-900">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-slate-600">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* UTILITY SCALE */}
            <section className="bg-slate-50 px-6 py-16 md:px-10 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                        {/* LEFT CONTENT */}
                        <div>
                            <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
                                <Network className="h-4 w-4" />
                                Utility Scale
                            </div>

                            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:max-w-4xl">
                                Utility-scale energy planning, grid integration, and power system
                                support
                            </h2>

                            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
                                We support utilities, IPPs, co-generation operators, EPCs, and
                                municipal power entities with technical advisory for large-scale
                                energy projects. Our services cover solar farm and BESS planning,
                                electrical studies, technical documentation, system design, and
                                integration into HV/MV utility networks for reliable long-term
                                operation.
                            </p>

                            <div className="mt-8 grid gap-4">
                                {utilityServices.map((service, index) => (
                                    <div
                                        key={service}
                                        className="flex items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-500 text-sm font-bold text-white shadow-sm">
                                            {index + 1}
                                        </div>

                                        <p className="text-[15px] leading-7 text-slate-600">
                                            {service}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT CARD */}
                        <div className="lg:sticky lg:top-28">
                            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        HV / MV Grid Infrastructure
                                    </h3>
                                    <span className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                                        Grid Integration
                                    </span>
                                </div>

                                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                                    <Image
                                        src="/images/pv.avif"
                                        alt="HV and MV utility substation infrastructure"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="mt-5 rounded-[1.5rem] bg-slate-50 p-5">
                                    <h4 className="text-base font-semibold text-slate-900">
                                        Technical support for utility power networks
                                    </h4>
                                    <p className="mt-2 text-sm leading-7 text-slate-600">
                                        From substation-oriented planning and system studies to solar farm,
                                        BESS, and network integration support, we help develop utility
                                        infrastructure that is practical, scalable, and aligned with
                                        large-grid performance requirements.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE */}
            <section className="bg-white px-6 py-16 md:px-10 lg:py-24">
                <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10 xl:p-12">
                    <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="flex h-full flex-col">
                            <div>
                                <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                                    Why choose PD Enterprises
                                </h2>

                                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                                    Our approach combines practical engineering, energy efficiency,
                                    renewable integration, and utility-focused technical advisory to
                                    help clients move toward reliable and financially sound energy
                                    systems.
                                </p>

                                {/* FILL EMPTY SPACE */}
                                <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                                    {/* <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <div className="text-2xl font-bold text-slate-900">Practical</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Engineering-led advisory focused on workable and efficient
                  project execution.
                </p>
              </div>

              <div>
                <div className="text-2xl font-bold text-slate-900">Integrated</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Smart alignment of solar, storage, standby systems, and grid
                  infrastructure.
                </p>
              </div>

              <div>
                <div className="text-2xl font-bold text-slate-900">Scalable</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Solutions designed for industrial sites, utilities, and
                  large-energy environments.
                </p>
              </div>
            </div> */}

                                    <div className="mt-6 h-px w-full bg-slate-200" />

                                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-2xl bg-white p-4">
                                            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                                                Advisory focus
                                            </h3>
                                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                                Energy planning, technical studies, system optimization, and
                                                utility integration support.
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-white p-4">
                                            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
                                                Client value
                                            </h3>
                                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                                Better reliability, lower operating risk, and stronger
                                                long-term financial performance.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02]"
                                >
                                    Request Consultation
                                    <ChevronRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                                >
                                    View All Services
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                                <ShieldCheck className="h-6 w-6 text-red-500" />
                                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                                    Reliable Systems
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600">
                                    Better continuity through balanced energy source planning.
                                </p>
                            </div>

                            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                                <LineChart className="h-6 w-6 text-red-500" />
                                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                                    Cost Savings
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600">
                                    Lower exposure to escalating tariffs and inefficient fuel use.
                                </p>
                            </div>

                            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                                <SunMedium className="h-6 w-6 text-red-500" />
                                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                                    Clean Energy Mix
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600">
                                    Smart integration of solar, storage, and standby solutions.
                                </p>
                            </div>

                            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                                <Network className="h-6 w-6 text-red-500" />
                                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                                    Grid Expertise
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600">
                                    Strong support for network studies and large-scale integration.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}