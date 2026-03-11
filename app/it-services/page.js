'use client';

import {
    Globe,
    Users,
    Megaphone,
    Database,
    ArrowRight,
    CheckCircle2,
} from 'lucide-react';

export default function CustomizedITSolutionsPage() {
    const services = [
        {
            id: 'website',
            icon: Globe,
            title: 'Website, TTL, and Mass Communication Solutions',
            subtitle:
                'AI-powered, SEO-optimized websites and digital communication systems designed to grow your business.',
            description:
                'We build high-performance websites tailored to your business goals. From SEO-enabled content strategy and modern UI/UX design to scalable web development, our solutions are built to improve visibility, user experience, and online performance.',
            points: [
                'Custom website development tailored to your brand and business requirements',
                'SEO-optimized content structure for better search ranking and discoverability',
                'Responsive, mobile-friendly design for seamless browsing across devices',
                'Mass communication and TTL-ready digital experiences for stronger outreach',
            ],
        },
        {
            id: 'crm',
            icon: Users,
            title: 'Customized CRM Solutions & App Development',
            subtitle:
                'Transform customer engagement with AI-driven CRM, ML, and LLM-powered automation.',
            description:
                'Our CRM and app development solutions are built to streamline business operations, improve customer interactions, and create intelligent digital workflows for sales, support, and operations teams.',
            points: [
                'Custom AI-integrated CRM tailored to automate workflows and customer interactions',
                'Lead and sales pipeline management with predictive insights and smart tracking',
                'Intelligent follow-ups, reminders, and reporting with real-time analytics',
                'Seamless integration with marketing, finance, and operations systems',
            ],
        },
        {
            id: 'marketing',
            icon: Megaphone,
            title: 'Digital Marketing & AI-Powered Lead Generation',
            subtitle:
                'Drive stronger visibility, better engagement, and qualified business leads with data-backed marketing.',
            description:
                'We combine performance marketing, content strategy, AI tools, and automation to help businesses attract, engage, and convert the right audience across digital channels.',
            points: [
                'AI-assisted lead generation campaigns for better targeting and conversion',
                'Digital marketing strategy across search, social, content, and paid channels',
                'Conversion-focused landing pages and campaign assets',
                'Analytics-driven optimization to improve ROI and customer acquisition',
            ],
        },
        {
            id: 'data',
            icon: Database,
            title: 'Data Mining & Business Intelligence',
            subtitle:
                'Leverage AI-powered insights for smarter decision-making and competitive advantage.',
            description:
                'We help businesses turn raw data into meaningful insights through intelligent data mining, market analysis, and business intelligence solutions that support better strategy and operational planning.',
            points: [
                'Market research and competitor analysis to uncover trends and opportunities',
                'Automated data mining for extraction, analysis, and trend prediction',
                'Web scraping for real-time data collection and monitoring',
                'Business intelligence dashboards and reporting for actionable decisions',
            ],
        },
    ];

    return (
        <main className="bg-white text-slate-900">
            {/* Professional top hero only */}
            <section className="relative overflow-hidden bg-gradient-to-r from-black via-[#120003] to-[#7a0012]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,40,80,0.14),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(180,15,40,0.12),transparent_22%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
                    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        {/* Left */}
                        <div className="max-w-3xl">
                            <p className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                                Customized IT Solutions
                            </p>

                            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                                Intelligent Technology
                                <span className="block text-white/90">Built Around Your Business</span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-8 text-white/80">
                                We deliver modern digital solutions that combine custom web development,
                                AI-powered CRM systems, digital marketing automation, and business
                                intelligence to help organizations scale with confidence.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-[#7a0012] transition hover:bg-slate-100"
                                >
                                    Talk to Our Team
                                </a>

                                <a
                                    href="#solutions"
                                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/15"
                                >
                                    Explore Solutions
                                </a>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="lg:justify-self-end">
                            <div className="rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-sm p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                                    What We Deliver
                                </h2>

                                <div className="space-y-4">
                                    {services.map((service) => {
                                        const Icon = service.icon;
                                        return (
                                            <a
                                                key={service.id}
                                                href={`#${service.id}`}
                                                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/15 px-4 py-4 text-white transition hover:bg-white/10 hover:border-white/20"
                                            >
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                                                    <Icon className="h-6 w-6 text-white" />
                                                </div>

                                                <div className="flex-1">
                                                    <p className="text-sm sm:text-base font-semibold leading-snug">
                                                        {service.title}
                                                    </p>
                                                </div>

                                                <ArrowRight className="h-5 w-5 text-white/60 transition group-hover:translate-x-1 group-hover:text-white" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* White background starts here */}
            <section id="solutions" className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                    <div className="max-w-3xl mx-auto text-center mb-14">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-700">
                            Our Solutions
                        </p>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
                            Customized IT Services for Modern Businesses
                        </h2>
                        <p className="mt-5 text-base sm:text-lg leading-8 text-slate-600">
                            We create scalable, intelligent, and performance-driven solutions
                            that help businesses improve operations, communication, customer
                            engagement, and strategic decision-making.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {services.map((service) => {
                            const Icon = service.icon;

                            return (
                                <section
                                    key={service.id}
                                    id={service.id}
                                    className="rounded-[2rem] border border-slate-200 bg-white shadow-sm overflow-hidden"
                                >
                                    <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                                        <div className="p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/60">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 border border-red-100">
                                                <Icon className="h-8 w-8 text-red-600" />
                                            </div>

                                            <h3 className="mt-6 text-3xl sm:text-4xl font-bold leading-tight text-[#243db6]">
                                                {service.title}
                                            </h3>

                                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                                {service.subtitle}
                                            </p>

                                            <p className="mt-6 text-base leading-8 text-slate-700">
                                                {service.description}
                                            </p>
                                        </div>

                                        <div className="p-8 sm:p-10 lg:p-12 bg-white">
                                            <h4 className="text-xl font-bold text-slate-900 mb-5">
                                                Key Features
                                            </h4>

                                            <div className="space-y-4">
                                                {service.points.map((point, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                                    >
                                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                                                        <p className="text-base leading-7 text-slate-700">{point}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Bottom CTA on white */}
            <section className="pb-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-black via-[#120003] to-[#7a0012] px-8 py-12 sm:px-12 text-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,40,80,0.14),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(180,15,40,0.12),transparent_22%)]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

                        <div className="relative">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white">
                                Need a Tailored Digital Solution?
                            </h2>

                            <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg leading-8 text-white/80">
                                From websites and CRM systems to AI-powered marketing and business
                                intelligence, we build custom solutions aligned with your growth strategy.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-[#7a0012] transition hover:bg-slate-100"
                                >
                                    Get In Touch
                                </a>

                                <a
                                    href="/services"
                                    className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/15"
                                >
                                    View More Services
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}