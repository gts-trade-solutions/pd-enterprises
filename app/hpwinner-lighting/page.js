import Link from "next/link";
import {
    ArrowRight,
    Lightbulb,
    ShieldCheck,
    Building2,
    SunMedium,
    RadioTower,
    MapPinned,
    BadgeCheck,
    Zap,
} from "lucide-react";

const categories = [
    {
        title: "Outdoor Area & Floodlighting Systems",
        description:
            "High-performance LED floodlighting solutions for open areas, logistics yards, sports facilities, public spaces, stadiums, airports, and industrial environments.",
        icon: Lightbulb,
        image: "/images/flood-light.webp",
        tag: "High Output",
    },
    {
        title: "Streetlighting Luminaires",
        description:
            "Energy-efficient street and roadway luminaires designed for municipalities, roads, urban corridors, and residential developments.",
        icon: RadioTower,
        image: "/images/street-light.jpg",
        tag: "Roadway Ready",
    },
    {
        title: "Intelligent Urban Lighting Systems",
        description:
            "Smart, controlled lighting systems for commercial and residential urban spaces with modern aesthetics, reliable performance, and scalable deployment.",
        icon: Building2,
        image: "/images/intelligent-lighting.webp",
        tag: "Smart Control",
    },
    {
        title: "Emergency & Solar Outdoor Lighting",
        description:
            "Reliable solar and emergency outdoor lighting solutions for resilient public infrastructure, safety-focused sites, and low-maintenance installations.",
        icon: SunMedium,
        image: "/images/solar-light.jpg",
        tag: "Resilient Lighting",
    },
];

const markets = [
    "Municipalities",
    "Towns & Public Infrastructure",
    "Stadiums & Sports Facilities",
    "Urban Residential Establishments",
    "Electrical Contractors",
    "Commercial Developments",
];

const strengths = [
    "Application-specific lighting design support",
    "High-quality energy-efficient LED luminaires",
    "Contractor-friendly delivery model",
    "Regional and partner-based enquiry handling",
];

export default function HPWinnerLightingPage() {
    return (
        <main className="min-h-screen bg-white text-[#111111]">
            {/* HERO SECTION */}
            <section className="relative overflow-hidden border-b border-red-200">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(220,38,38,0.42),_transparent_28%),linear-gradient(90deg,_#03040a_0%,_#05070c_48%,_#3b030d_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.18))]" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                        <div>
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/90 backdrop-blur">
                                <Zap className="h-4 w-4 text-red-400" />
                                Lighting Solutions
                            </div>

                            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                                Intelligent Outdoor Lighting Solutions for
                                <span className="block text-red-200">Southern Africa</span>
                            </h1>

                            <p className="mt-6 max-w-3xl text-base leading-8 text-white md:text-lg">
                                We offer specific lighting designs and supply of high-quality,
                                energy-efficient LED luminaires from the HPWINNER stable across
                                outdoor floodlighting, streetlighting, intelligent urban
                                lighting, and solar or emergency outdoor lighting solutions.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <div className="rounded-full border border-white/25 bg-transparent px-4 py-2 text-sm text-white">
                                    Southern Africa Focus
                                </div>
                                <div className="rounded-full border border-white/25 bg-transparent px-4 py-2 text-sm text-white">
                                    Contractor-Led Delivery
                                </div>
                                <div className="rounded-full border border-white/25 bg-transparent px-4 py-2 text-sm text-white">
                                    Energy-Efficient LED Systems
                                </div>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link
                                    href="#categories"
                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(239,68,68,0.30)] transition hover:scale-[1.02]"
                                >
                                    Explore Lighting Categories
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="#contact"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-[32px] border border-white/25 bg-[linear-gradient(135deg,rgba(120,5,20,0.45),rgba(12,14,24,0.92))] p-5 shadow-[0_30px_80px_rgba(127,29,29,0.30)] backdrop-blur-xl">
                                <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(135deg,rgba(80,5,15,0.55),rgba(8,10,18,0.95))] p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-sm font-medium text-white/75">
                                            Regional Delivery Model
                                        </span>
                                        <span className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-100">
                                            HPWINNER Technology
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                            <div className="flex items-start gap-3">
                                                <MapPinned className="mt-0.5 h-5 w-5 text-red-400" />
                                                <div>
                                                    <h3 className="text-sm font-semibold text-white">
                                                        Southern Africa Market
                                                    </h3>
                                                    <p className="mt-1 text-sm leading-6 text-white/75">
                                                        Solutions tailored for municipalities, towns,
                                                        stadiums, contractors, and urban residential
                                                        developments.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                            <div className="flex items-start gap-3">
                                                <ShieldCheck className="mt-0.5 h-5 w-5 text-red-400" />
                                                <div>
                                                    <h3 className="text-sm font-semibold text-white">
                                                        Project-Based Lighting Support
                                                    </h3>
                                                    <p className="mt-1 text-sm leading-6 text-white/75">
                                                        We work hand in hand with electrical contractors to
                                                        deliver comprehensive, application-specific lighting
                                                        solutions.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                            <div className="flex items-start gap-3">
                                                <BadgeCheck className="mt-0.5 h-5 w-5 text-red-400" />
                                                <div>
                                                    <h3 className="text-sm font-semibold text-white">
                                                        Beyond Southern Africa
                                                    </h3>
                                                    <p className="mt-1 text-sm leading-6 text-white/75">
                                                        Enquiries outside Southern Africa are handled
                                                        through other stable partners using the same
                                                        technology and product platform.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm leading-7 text-white">
                                        Feel free to contact us with your enquiry and we will help
                                        you realize your dream.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section
                id="categories"
                className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20"
            >
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-600">
                            Product Focus
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#111111] md:text-4xl">
                            Lighting Categories We Deliver
                        </h2>
                    </div>
                    <p className="max-w-2xl text-sm leading-7 text-[#5b5b5b] md:text-base">
                        Designed around application-specific outdoor lighting needs, with a
                        strong emphasis on performance, energy efficiency, and dependable
                        deployment support.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {categories.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="group overflow-hidden rounded-[28px] border border-[#e9e9e9] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="relative h-64 overflow-hidden bg-[#f5f5f5]">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#111111] backdrop-blur">
                                        <Icon className="h-4 w-4 text-red-600" />
                                        {item.tag}
                                    </div>
                                </div>

                                <div className="p-6 md:p-7">
                                    <h3 className="text-xl font-semibold tracking-tight text-[#111111]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-[#5f5f5f] md:text-base">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* MARKET POSITIONING */}
            <section className="border-y border-[#eeeeee] bg-[#fafafa]">
                <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
                    <div className="max-w-4xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-600">
                            Market Positioning
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#111111] md:text-4xl">
                            Built for the Southern Africa Lighting Market
                        </h2>
                        <p className="mt-5 text-base leading-8 text-[#5d5d5d] md:text-lg">
                            We specifically target the Southern Africa market, partnering with
                            electrical contractors to provide complete lighting solutions for
                            public and private sector environments. Our approach combines
                            product selection, application fit, and dependable project
                            support.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {markets.map((item) => (
                            <div
                                key={item}
                                className="rounded-[24px] border border-[#ebebeb] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 rounded-xl bg-red-50 p-3">
                                        <BadgeCheck className="h-5 w-5 text-red-600" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold leading-snug text-[#111111]">
                                            {item}
                                        </h3>
                                        <p className="mt-3 text-sm leading-7 text-[#666666] md:text-base">
                                            Application-led LED lighting support with strong emphasis
                                            on performance, efficiency, and long-term reliability.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
                <div className="overflow-hidden rounded-[30px] border border-[#ededed] bg-white p-8 shadow-sm md:p-10">
                    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-600">
                                Why Choose Us
                            </p>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#111111] md:text-4xl">
                                Practical, Energy-Efficient Lighting Backed by Trusted Product
                                Platforms
                            </h2>
                            <p className="mt-5 max-w-3xl text-base leading-8 text-[#5e5e5e]">
                                From roadway lighting to floodlighting and smart urban systems,
                                we help clients identify appropriate luminaires for real project
                                needs. Our goal is to bring dependable, high-quality solutions
                                to every enquiry and support successful implementation through
                                the right technical and supply partnership model.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {strengths.map((point) => (
                                <div
                                    key={point}
                                    className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-[#222222]"
                                >
                                    {point}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="pb-20">
                <div className="mx-auto max-w-7xl px-6 md:px-10">
                    <div className="rounded-[30px] border border-white/20 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.18),transparent_28%),linear-gradient(90deg,#03040a_0%,#05070c_48%,#3b030d_100%)] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)] md:p-12">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">
                                    Enquiries
                                </p>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                                    Start Your Lighting Project Discussion
                                </h2>
                                <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">
                                    Contact us for municipal, stadium, roadway, urban area,
                                    commercial, or residential outdoor lighting requirements in
                                    Southern Africa and aligned partner markets.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(239,68,68,0.22)] transition hover:scale-[1.02]"
                                >
                                    Send Enquiry
                                </Link>

                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}