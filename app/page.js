"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Building2,
  FileSearch,
  TrendingUp,
  Wrench,
  PenTool,
  ClipboardCheck,
  Zap,
  Users,
  Target,
  Heart,
  Lightbulb,
  Handshake as HandshakeIcon,
  Factory,
  Home as HomeIcon,
  Leaf,
} from "lucide-react";

// -----------------------------
// Data (moved to arrays for clean rendering)
// -----------------------------

const services = [
  {
    icon: FileSearch,
    title: "Due Diligence",
    points: [
      "Verification of technical condition of systems and products.",
      "In-depth analysis of strengths and weaknesses of systems, services, and products.",
      "Reliability analysis of systems and services.",
      "Risk assessments and reporting for systems or products.",
    ],
    color: "from-crimson to-primary-700",
  },
  {
    icon: TrendingUp,
    title: "Business Planning",
    points: [
      "Strategic formulation to advance and execute bankable, feasible infrastructure developments.",
      "Business forecasts (financial and other resources).",
      "Business resource strategic planning.",
      "Development funding principles and investor mapping/analysis.",
    ],
    color: "from-primary-600 to-primary-800",
  },
  {
    icon: ClipboardCheck,
    title: "Feasibility Studies",
    points: [
      "Technical viability analysis.",
      "Commercial viability analysis.",
      "Financial viability analysis.",
      "Bankability review and related analysis.",
    ],
    color: "from-crimson-dark to-primary-900",
  },
  {
    icon: Wrench,
    title: "Infrastructure Engineering",
    points: [
      "Engineering research, audits, planning, and design across disciplines.",
      "Design documentation, material, and system specifications.",
      "Project contract documentation.",
      "Construction control documentation.",
    ],
    color: "from-primary-700 to-crimson",
  },
  {
    icon: PenTool,
    title: "Architectural System Design",
    points: [
      "Development conceptual plans.",
      "Masterplans and spatial analysis.",
      "Urban design.",
      "Built environment discipline integration.",
      "Interior design and related analysis.",
      "Documentation and reporting.",
    ],
    color: "from-crimson-light to-crimson",
  },
  {
    icon: Building2,
    title: "Project & Construction Management",
    points: [
      "Construction scheduling and planning.",
      "Budgeting and activity management.",
      "Works certification and contractor management.",
      "Site activity management.",
    ],
    color: "from-primary-800 to-primary-900",
  },
];

const sectors = [
  {
    icon: Zap,
    title: "Energy",
    description:
      "Renewables and oil & gas infrastructure development and engineering solutions.",
    color: "bg-gradient-to-br from-crimson/20 to-primary-900/20",
  },
  {
    icon: Factory,
    title: "Food Production",
    description: "Agricultural and food processing facility planning and development.",
    color: "bg-gradient-to-br from-primary-800/20 to-crimson/20",
  },
  {
    icon: HomeIcon,
    title: "Buildings & Housing",
    description: "Residential and commercial building projects across all scales.",
    color: "bg-gradient-to-br from-crimson-dark/20 to-primary-700/20",
  },
];

const values = [
  { icon: Lightbulb, name: "Novelty", description: "Innovative solutions" },
  { icon: Heart, name: "Dedication", description: "Committed excellence" },
  { icon: Target, name: "Goals", description: "Clear objectives" },
  { icon: HandshakeIcon, name: "Collaboration", description: "Partnership approach" },
  { icon: Users, name: "Inclusivity", description: "Diverse perspectives" },
  { icon: Leaf, name: "Commitment", description: "Sustainable impact" },
];

// const stats = [
//   { number: "2016", label: "Founded" },
//   { number: "100+", label: "Projects Completed" },
//   { number: "3", label: "Key Sectors" },
//   { number: "6", label: "Core Services" },
// ];

// -----------------------------
// Small presentational helpers
// -----------------------------

function SectionHeader({ title, subtitle, invert = false }) {
  return (
    <div className={invert ? "text-center mb-16 text-white" : "text-center mb-16"}>
      <h2
        className={
          invert
            ? "text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            : "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
        }
      >
        {title}
      </h2>
      {subtitle && (
        <p className={invert ? "text-xl text-gray-200 max-w-3xl mx-auto" : "text-xl text-gray-600 max-w-3xl mx-auto"}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// -----------------------------
// Page
// -----------------------------

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden"
        aria-label="PD Enterprises hero"
      >
        <div className="absolute inset-0 bg-black/40" />

        {/* Floating blobs */}
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute top-20 left-10 w-72 h-72 bg-crimson rounded-full mix-blend-multiply blur-xl opacity-20 animate-float" />
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply blur-xl opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-20 left-1/2 w-72 h-72 bg-crimson-dark rounded-full mix-blend-multiply blur-xl opacity-20 animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to PD Enterprises
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
              We strive to promote economic growth through a wider stakeholder development platform
            </p>
            <nav aria-label="Primary">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href=""
                  className="bg-crimson text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-crimson-light transition-all duration-300 hover:scale-105 shadow-lg glow-red"
                >
                  PD Hub
                </Link>
                <Link
                  href=""
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
                >
                 PD Invest
                </Link>
                 <Link
                  href=""
                  className="bg-crimson text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-crimson-light transition-all duration-300 hover:scale-105 shadow-lg glow-red"
                >
                 Khulisa
                </Link>
              </div>
            </nav>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-8" aria-label="Company stats">
            {stats.map((stat) => (
              <li key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-crimson mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection> */}

      {/* Services */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="What We Offer"
            subtitle="Due Diligence | Business Planning | Feasibility Studies | Infrastructure Engineering | Architectural System Design | Project & Construction Management"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 100}>
                <article className="bg-white rounded-2xl p-8 shadow-md card-hover h-full border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <ol className="space-y-2 list-decimal list-inside text-gray-600 leading-relaxed">
                    {service.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ol>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Sectors */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Key Sectors" subtitle="Specialized infrastructure development across three critical sectors" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <AnimatedSection key={sector.title} delay={index * 150}>
                <article className={`${sector.color} rounded-2xl p-8 shadow-md card-hover h-full border border-crimson/10`}>
                  <div className="w-16 h-16 bg-crimson rounded-xl flex items-center justify-center mb-6">
                    <sector.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{sector.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{sector.description}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Values */}
      <AnimatedSection className="py-20 gradient-red-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Core Values" subtitle="Principles that guide our approach to infrastructure development" invert />

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" aria-label="Core values">
            {values.map((value, index) => (
              <AnimatedSection key={value.name} delay={index * 100}>
                <li className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center card-hover border border-white/20">
                  <div className="w-12 h-12 bg-crimson rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{value.name}</h3>
                  <p className="text-sm text-gray-200">{value.description}</p>
                </li>
              </AnimatedSection>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* Quote */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <figure className="max-w-4xl mx-auto text-center">
            <blockquote className="bg-white rounded-3xl shadow-xl p-12 border border-crimson/10">
              <div className="text-6xl text-crimson mb-6" aria-hidden>&ldquo;</div>
              <p className="text-2xl md:text-3xl font-serif text-gray-800 mb-6 italic">
                Failure is the condiment that gives success its flavour
              </p>
              <figcaption className="text-lg text-gray-600 font-semibold">— Truman Capote</figcaption>
            </blockquote>
          </figure>
        </div>
      </AnimatedSection>

      {/* Approach */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Why Choose Us?
</h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                We are passionate about economic development, and its emphasis on infrastructure as its chief enabler. We believe that with proper development extended meaningfully into the rural environment, a lot of ills plaguing nations worldwide can be alleviated. With our delivery method, we place the success of our stakeholders’ business ahead of anything else. Our delivery method provides the added benefit of empowering our stakeholders, particularly those whose livelihood relies on the success of the venture, by encouraging their involvement in the process and placing emphasis on partnerships. When you choose us you will observe that we uphold and work by the following principles (core values):
Novelty: We operate in an environment that is constantly experiencing change, therefore we understand that the needs of our stakeholders can differ and we are prepared to adapt and be innovative in tailoring our services to advance your cause.


              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Collaboration: As developments are often quite complex in nature, we rely on collaborative efforts with other professionals to safeguard your success.
Inclusivity: one of our key strengths is the ability to bring marginalized parties (sometimes considered to be on the fringes of mainstream economic participation) to participate in what we do.
              </p>
              <Link
                href="/about"
                className="inline-block bg-crimson text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-crimson-light transition-all duration-300 hover:scale-105 glow-red"
              >
                Learn More About Us
              </Link>
            </div>

            <div className="relative" aria-hidden>
              <div className="aspect-square gradient-red-black rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 gap-4 p-8 place-content-center">
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 flex items-center justify-center card-hover">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 flex items-center justify-center card-hover">
                    <Factory className="w-12 h-12 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 flex items-center justify-center card-hover">
                    <Building2 className="w-12 h-12 text-white" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 flex items-center justify-center card-hover">
                    <HomeIcon className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-20 gradient-black-red">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
           Have a Project in mind?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
          We can help you bring your ideas to life. Let’s talk about what we can build and raise together.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-crimson px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
