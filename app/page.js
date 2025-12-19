// app/page.js
import dynamic from "next/dynamic";
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

// Hero slider (client-side only)
const HeroSwiper = dynamic(() => import("@/components/HeroSwiper"), { ssr: false });

export const metadata = {
  title: "Infrastructure Development Company in South Africa | PD Enterprise",
  description:
    "PD Enterprise is an infrastructure development company in South Africa providing infrastructure development consulting, business planning, feasibility studies, engineering design, and project & construction management for bankable infrastructure projects.",
  keywords: [
    "infrastructure development company in South Africa",
    "infrastructure development company",
    "infrastructure development consultants",
    "infrastructure development and business planning",
    "infrastructure development services",
    "infrastructure consulting firm",
    "infrastructure project development",
    "feasibility studies for infrastructure projects",
    "due diligence for infrastructure projects",
    "engineering design and construction management",
    "project and construction management services",
  ],
};

const slides = ["/images/1.png", "/images/2.png", "/images/3.png", "/images/4.png"];

const services = [
  {
    icon: FileSearch,
    title: "Due Diligence",
    points: [
      "Verification of technical condition of systems and products for infrastructure projects.",
      "In-depth analysis of strengths and weaknesses of systems, services, and products.",
      "Reliability analysis of systems and services for investors and project sponsors.",
      "Risk assessments and reporting for infrastructure assets and products.",
    ],
    color: "from-crimson to-primary-700",
  },
  {
    icon: TrendingUp,
    title: "Business Planning",
    points: [
      "Strategic formulation to advance and execute bankable, feasible infrastructure developments.",
      "Business forecasts (financial and other resources) for infrastructure projects.",
      "Business resource strategic planning for public and private sector clients.",
      "Development funding principles and investor mapping/analysis for infrastructure development.",
    ],
    color: "from-primary-600 to-primary-800",
  },
  {
    icon: ClipboardCheck,
    title: "Feasibility Studies",
    points: [
      "Technical viability analysis for infrastructure projects.",
      "Commercial viability analysis for new developments and expansions.",
      "Financial viability analysis and modelling for bankable projects.",
      "Bankability review and related analysis for infrastructure investments.",
    ],
    color: "from-crimson-dark to-primary-900",
  },
  {
    icon: Wrench,
    title: "Infrastructure Engineering",
    points: [
      "Engineering research, audits, planning, and design across infrastructure disciplines.",
      "Design documentation, material, and system specifications for infrastructure systems.",
      "Project contract documentation for engineering and construction projects.",
      "Construction control documentation for infrastructure development and upgrades.",
    ],
    color: "from-primary-700 to-crimson",
  },
  {
    icon: PenTool,
    title: "Architectural System Design",
    points: [
      "Development conceptual plans for infrastructure and building projects.",
      "Masterplans and spatial analysis for precincts and developments.",
      "Urban design for residential, commercial, and mixed-use environments.",
      "Built environment discipline integration for holistic infrastructure solutions.",
      "Interior design and related analysis aligned with project objectives.",
      "Documentation and reporting for stakeholders and approvals.",
    ],
    color: "from-crimson-light to-crimson",
  },
  {
    icon: Building2,
    title: "Project & Construction Management",
    points: [
      "Construction scheduling and planning for infrastructure projects.",
      "Budgeting and activity management from concept to completion.",
      "Works certification and contractor management for quality assurance.",
      "Site activity management and coordination of project stakeholders.",
    ],
    color: "from-primary-800 to-primary-900",
  },
];

const sectors = [
  {
    icon: Zap,
    title: "Energy Infrastructure",
    description:
      "Renewable energy and oil & gas infrastructure development, feasibility studies, and engineering solutions for power and energy projects in South Africa.",
    color: "bg-gradient-to-br from-crimson/20 to-primary-900/20",
  },
  {
    icon: Factory,
    title: "Food Production & Agro-Processing",
    description:
      "Agricultural and food processing facility planning, agro-processing infrastructure development, and plant design for scalable food production projects.",
    color: "bg-gradient-to-br from-primary-800/20 to-crimson/20",
  },
  {
    icon: HomeIcon,
    title: "Buildings & Housing",
    description:
      "Residential, commercial, and mixed-use building projects, housing development planning, and built environment infrastructure across all scales.",
    color: "bg-gradient-to-br from-crimson-dark/20 to-primary-700/20",
  },
];

const values = [
  { icon: Lightbulb, name: "Novelty", description: "Innovative infrastructure solutions" },
  { icon: Heart, name: "Dedication", description: "Committed excellence on every project" },
  { icon: Target, name: "Goals", description: "Clear objectives and measurable outcomes" },
  { icon: HandshakeIcon, name: "Collaboration", description: "Partnership approach with clients and stakeholders" },
  { icon: Users, name: "Inclusivity", description: "Diverse perspectives in infrastructure development" },
  { icon: Leaf, name: "Commitment", description: "Sustainable, long-term infrastructure impact" },
];

// Allows using <h1> or <h2> while keeping styles
function SectionHeader({ title, subtitle, invert = false, as = "h2" }) {
  const HeadingTag = as; // 'h1' or 'h2'

  return (
    <div className={invert ? "text-center mb-16 text-white" : "text-center mb-16"}>
      <HeadingTag
        className={
          invert
            ? "text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            : "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
        }
      >
        {title}
      </HeadingTag>
      {subtitle && (
        <p
          className={
            invert ? "text-xl text-gray-200 max-w-3xl mx-auto" : "text-xl text-gray-600 max-w-3xl mx-auto"
          }
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Swiper (client-side) */}
      <HeroSwiper slides={slides} />

      {/* Services */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main H1 for SEO */}
          <SectionHeader
            as="h1"
            title="Infrastructure Development Company in South Africa"
            subtitle="Infrastructure development services, business planning, feasibility studies, engineering design, and project & construction management delivered by experienced infrastructure development consultants."
          />

          {/* Intro paragraph with targeted keywords */}
          <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-10 text-center">
            PD Enterprise is an infrastructure development company and consulting firm based in South Africa.
            We provide end-to-end infrastructure development and business planning support, including due diligence,
            feasibility studies for infrastructure projects, infrastructure business planning and funding strategies,
            infrastructure engineering and architectural system design, and project and construction management
            for bankable, sustainable infrastructure developments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 100}>
                <article className="bg-white rounded-2xl p-8 shadow-md card-hover h-full border border-gray-100">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6`}
                  >
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
          <SectionHeader
            title="Key Sectors in Infrastructure Development"
            subtitle="Specialized infrastructure development across energy, food production, and buildings & housing sectors in South Africa."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <AnimatedSection key={sector.title} delay={index * 150}>
                <article
                  className={`${sector.color} rounded-2xl p-8 shadow-md card-hover h-full border border-crimson/10`}
                >
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
          <SectionHeader
            title="Our Core Values"
            subtitle="Principles that guide our approach to infrastructure development consulting, project delivery, and long-term client partnerships."
            invert
          />
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
    </div>
  );
}
