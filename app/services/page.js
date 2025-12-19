// app/services/page.jsx
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import {
  FileSearch, TrendingUp, ClipboardCheck, Wrench, PenTool, Building2,
  Zap, Factory, Chrome as HomeIcon, CircleCheck as CheckCircle2,
  ArrowRight, ChartLine as LineChart, Users
} from 'lucide-react';

/** Page-level SEO (your layout applies "%s | PD Enterprises") */
export const metadata = {
  title: "Infrastructure Development Services – Due Diligence, Business Planning, Engineering",
  description:
    "Explore PD Enterprise' core services: due diligence, business planning, feasibility studies, infrastructure engineering, architectural system design, and project & construction management in South Africa.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Infrastructure Development Services – Due Diligence, Business Planning, Engineering",
    description:
      "End-to-end solutions for large-scale infrastructure projects: analysis, planning, design and construction management.",
    url: "/services",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "PD Enterprise" }],
    locale: "en_ZA",
    siteName: "PD Enterprise",
  },
  twitter: {
    card: "summary_large_image",
    title: "Infrastructure Development Services – Due Diligence, Business Planning, Engineering",
    description:
      "Comprehensive services across analysis, planning, design and delivery.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Services() {
  const services = [
    {
      icon: FileSearch,
      title: 'Due Diligence',
      description: 'Comprehensive investigation and analysis to assess project viability, risks, and opportunities.',
      features: [
        'Technical feasibility assessment',
        'Financial viability analysis',
        'Risk identification and mitigation',
        'Market opportunity evaluation',
        'Regulatory compliance review',
        'Site assessment and analysis'
      ],
      color: 'from-crimson to-primary-700'
    },
    {
      icon: TrendingUp,
      title: 'Business Planning',
      description: 'Strategic planning services to develop robust business models and operational frameworks.',
      features: [
        'Business model development',
        'Financial projections and modeling',
        'Operational framework design',
        'Strategic partnership identification',
        'Investment structuring',
        'Revenue optimization strategies'
      ],
      color: 'from-primary-600 to-primary-800'
    },
    {
      icon: ClipboardCheck,
      title: 'Feasibility Studies',
      description: 'In-depth technical and economic analysis to determine project practicality and profitability.',
      features: [
        'Technical viability assessment',
        'Economic impact analysis',
        'Environmental impact studies',
        'Resource availability evaluation',
        'Cost-benefit analysis',
        'Implementation timeline planning'
      ],
      color: 'from-crimson-dark to-primary-900'
    },
    {
      icon: Wrench,
      title: 'Infrastructure Engineering',
      description: 'Expert engineering design for energy, buildings, and industrial infrastructure systems.',
      features: [
        'Electrical power systems design',
        'Energy infrastructure planning',
        'Industrial facility engineering',
        'System integration design',
        'Performance optimization',
        'Technical specifications development'
      ],
      color: 'from-primary-700 to-crimson'
    },
    {
      icon: PenTool,
      title: 'Architectural System Design',
      description: 'Innovative architectural design integrating functionality, aesthetics, and sustainability.',
      features: [
        'Conceptual design development',
        'Sustainable design integration',
        'Building systems coordination',
        'Space planning and optimization',
        'Material selection guidance',
        'Construction documentation'
      ],
      color: 'from-crimson-light to-crimson'
    },
    {
      icon: Building2,
      title: 'Project & Construction Management',
      description: 'Complete project oversight ensuring timely delivery, quality control, and budget management.',
      features: [
        'Project planning and scheduling',
        'Budget management and control',
        'Quality assurance and control',
        'Contractor coordination',
        'Risk management',
        'Stakeholder communication'
      ],
      color: 'from-primary-800 to-primary-900'
    }
  ];

  const sectors = [
    { icon: Zap,     title: 'Energy Sector',       description: 'Renewable energy, oil & gas, and power generation infrastructure' },
    { icon: Factory, title: 'Food Production',     description: 'Agricultural facilities and food processing infrastructure' },
    { icon: HomeIcon,title: 'Buildings & Housing', description: 'Residential, commercial, and mixed-use developments' },
  ];

  return (
    <div>
      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-crimson rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-700 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              Comprehensive infrastructure development services from initial concept to project completion
            </p>
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End-to-end solutions for large-scale infrastructure project development
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-xl text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center text-crimson font-semibold text-lg hover:text-crimson-light transition-colors"
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="bg-gray-50 rounded-2xl p-8 border border-crimson/10">
                      <h4 className="text-xl font-bold text-gray-900 mb-6">Key Deliverables:</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle2 className="w-6 h-6 text-crimson flex-shrink-0 mr-3 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Sectors We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized expertise across three critical infrastructure sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-white rounded-2xl p-8 shadow-md card-hover h-full text-center border border-crimson/10">
                  <div className="w-16 h-16 bg-gradient-to-br from-crimson to-primary-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <sector.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {sector.title}
                  </h3>
                  <p className="text-gray-600">
                    {sector.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="gradient-red-black rounded-3xl p-12 text-center shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Comprehensive Approach
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6">
                  <LineChart className="w-12 h-12 text-white mx-auto mb-4" />
                  <div className="text-lg font-bold text-white mb-2">Full-Scale Analysis</div>
                  <div className="text-gray-200 text-sm">Complete viability testing</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6">
                  <Users className="w-12 h-12 text-white mx-auto mb-4" />
                  <div className="text-lg font-bold text-white mb-2">Partnership Model</div>
                  <div className="text-gray-200 text-sm">Risk-sharing collaboration</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6">
                  <Building2 className="w-12 h-12 text-white mx-auto mb-4" />
                  <div className="text-lg font-bold text-white mb-2">End-to-End Delivery</div>
                  <div className="text-gray-200 text-sm">From concept to completion</div>
                </div>
              </div>
              <p className="text-xl text-gray-200 mb-8">
                A comprehensive one-stop shop for infrastructure project development
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-crimson px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 gradient-black-red">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Develop Your Infrastructure Project?
            </h2>
            <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
              Let us help you assess viability, plan strategically, and execute successfully
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-crimson px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Schedule Consultation
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-crimson transition-all duration-300 hover:scale-105"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
