// app/about/AboutClient.jsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import {
  Building2,
  Users,
  Target,
  Award,
  Handshake,
  TrendingUp,
  Lightbulb,
  Heart,
  Goal,
  UserCheck,
  Briefcase,
} from 'lucide-react';

export default function AboutClient() {
  const leadership = [
    {
      name: 'Nomonde Patience Keswa',
      role: 'International Mediator',
      description:
        'An internationally accredited mediator bringing expertise in conflict resolution and strategic negotiation to infrastructure project development.',
      icon: UserCheck,
      image: '/images/50.jpg',
      imageAlt: 'Portrait of Nomonde Patience Keswa',
    },
    {
      name: 'Mziwandile Eric Tshwele',
      role: 'Managing Principal & Electric Power Engineer',
      description:
        'Experienced electric power engineer leading technical strategy and project execution with comprehensive engineering expertise.',
      icon: Briefcase,
      image: '/images/49.jpg',
      imageAlt: 'Portrait of Mziwandile Eric Tshwele',
    },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Novelty',
      description:
        'We bring fresh perspectives and innovative approaches to infrastructure development challenges.',
    },
    {
      icon: Heart,
      title: 'Dedication',
      description:
        'Committed to excellence in every project, ensuring the highest standards of quality and integrity.',
    },
    {
      icon: Target,
      title: 'Commitment',
      description:
        'Steadfast in our promise to deliver sustainable and impactful infrastructure solutions.',
    },
    {
      icon: Goal,
      title: 'Goals',
      description:
        'Clear, measurable objectives guide our approach to every infrastructure development initiative.',
    },
    {
      icon: Handshake,
      title: 'Collaboration',
      description:
        'Partnership-driven approach, working closely with stakeholders to achieve shared success.',
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description:
        'Embracing diverse perspectives and fostering an environment where all voices contribute to solutions.',
    },
  ];

  const groupEntities = [
    {
      name: 'PD Hub',
      description:
        'Central coordination and resource management for infrastructure project development',
      icon: Building2,
    },
    {
      name: 'PD Invest',
      description:
        'Investment facilitation and financial structuring for large-scale infrastructure projects',
      icon: TrendingUp,
    },
    {
      name: 'Khulisa',
      description:
        'Upcoming initiative focused on growth and expansion in emerging infrastructure sectors',
      status: 'Coming Soon',
      icon: Award,
    },
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[60vh] flex items-center justify-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              About PD Enterprise
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Building infrastructure for a sustainable future since 2016
            </p>
          </div>
        </div>
      </section>

      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Hello dear readers, and welcome to our webpage. Whether you are a first-time visitor or a returning friend, we are delighted to share our development enthusiasm with you. Our webpage seeks to give a snippet of our activities, and it remains your esteemed prerogative to engage us further should you need more information to advance your business.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Private Development Enterprises is a group of companies aimed at providing a one stop shop for clients who wish to conduct a full-scale test on the viability of large infrastructure projects. The group was formed in 2016 by experienced engineering professionals with the vision of creating a combined skills platform for the delivery of the project services mentioned and caters to international and local clients in both the public and private sectors. Two group entities have been established with a third ‘supplementary service’ leg to be incorporated in the very near future. PD Hub is the group entity where the project development work is conducted. All professional resources are arranged and managed through this entity. PD Invest is used merely to hold the group's investment interest in the developments. It will also be used later for Development Finance purposes.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Projects often require careful selection and verification ability (due diligence) to safeguard investment and competing financial resources. When the selection process succeeds, projects often need assessment for feasibility to direct the business planning exercise, hence capital raising for the venture in question. After the commercial aspects of infrastructure investment are successfully tested, it is normal to seek services of qualified and experienced engineering and related skills to design such infrastructure. Further, construction management is crucial to safeguard design standards, and preserve integrity of materials and products used in realising such infrastructure.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proactive identification and collaborative development
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <AnimatedSection delay={100}>
              <div className="bg-white rounded-2xl p-8 shadow-md border border-crimson/10 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-crimson to-primary-700 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Proactive Project Identification
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We proactively identify economically viable infrastructure projects and organize the initial resources required to make them attractive for investment. Our team conducts comprehensive market research and feasibility analysis to uncover opportunities that create real value.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="bg-white rounded-2xl p-8 shadow-md border border-crimson/10 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-700 to-crimson rounded-xl flex items-center justify-center mb-6">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Partnership & Risk Sharing
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  After completing comprehensive due diligence and planning, we actively seek suitable partners willing to share the development risk. This collaborative approach ensures projects benefit from diverse expertise while distributing investment responsibility among committed stakeholders.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Leadership */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals guiding our vision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {leadership.map((leader, index) => (
              <AnimatedSection key={leader.name} delay={index * 150}>
                <article className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-8 shadow-md card-hover border border-gray-100 h-full">
                  <div className="relative w-full rounded-xl overflow-hidden mb-6 bg-white">
                    <div className="relative w-full aspect-[3/4] md:aspect-[3/4]">
                      <Image
                        src={leader.image}
                        alt={leader.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-contain"
                        priority={index < 2}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{leader.name}</h3>
                      <p className="text-crimson font-semibold">{leader.role}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-crimson to-primary-700 rounded-xl flex items-center justify-center">
                      <leader.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">{leader.description}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 gradient-red-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Principles that define who we are and how we work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 100}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 card-hover border border-white/20 h-full">
                  <div className="w-16 h-16 bg-crimson rounded-xl flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-200 leading-relaxed">{value.description}</p>
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
              Group Entities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized divisions serving different aspects of infrastructure development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {groupEntities.map((entity, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="bg-white rounded-2xl p-8 shadow-md card-hover border border-crimson/10 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-crimson to-primary-700 rounded-xl flex items-center justify-center mb-6">
                    <entity.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{entity.name}</h3>
                    {entity.status && (
                      <span className="ml-3 px-3 py-1 bg-crimson/10 text-crimson text-xs font-semibold rounded-full">
                        {entity.status}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed">{entity.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-50 rounded-3xl shadow-xl p-12 border border-crimson/10">
              <div className="text-6xl text-crimson mb-6">&ldquo;</div>
              <p className="text-2xl md:text-3xl font-serif text-gray-800 mb-6 italic">
                Failure is the condiment that gives success its flavour
              </p>
              <p className="text-lg text-gray-600 font-semibold mb-8">- Truman Capote</p>
              <p className="text-lg text-gray-600 leading-relaxed">
                This philosophy guides our approach to infrastructure development, where we embrace calculated risks and learn from every challenge to deliver exceptional results.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 gradient-black-red">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Our Approach
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
            As a group we are proactive in identifying economically viable projects in the following key sectors:
            Energy (Including renewables and Oil & Gas)
            Food Production (Including primary agriculture, aquaculture & agro-processing)
            Buildings & Housing (Including low cost residential, factories and industry works)
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-block bg-white text-crimson px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Explore Our Services
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-crimson transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
