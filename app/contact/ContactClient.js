// app/contact/ContactClient.jsx
'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { Mail, Phone, MapPin, Send, Building2 } from 'lucide-react';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  const offices = [
    {
      name: 'Edenburg Office',
      address: ['356 Rivonia Boulevard', 'Edenburg', 'Johannesburg'],
      icon: Building2
    },
    {
      name: 'Sandton Office',
      address: ['14 Howick Street', 'Paulshof', 'Sandton'],
      icon: Building2
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      details: ['079 289 2609'],
      color: 'from-crimson to-primary-700'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@pdenterprise.co.za', 'eric@pdserve.co.za'],
      color: 'from-primary-700 to-crimson'
    }
  ];

  const services = [
    'Due Diligence',
    'Business Planning',
    'Feasibility Studies',
    'Infrastructure Engineering',
    'Architectural System Design',
    'Project & Construction Management',
    'General Inquiry'
  ];

  return (
    <div>
      <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-crimson rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-700 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              Let's discuss how we can help bring your infrastructure project to life
            </p>
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {offices.map((office, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-crimson/10 rounded-2xl p-8 card-hover h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-crimson to-primary-700 rounded-xl flex items-center justify-center mb-4">
                    <office.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {office.name}
                  </h3>
                  <div className="space-y-1">
                    {office.address.map((line, lineIndex) => (
                      <p key={lineIndex} className="text-gray-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 text-center card-hover h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {method.title}
                  </h3>
                  <div className="space-y-1">
                    {method.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="bg-gray-50 rounded-2xl p-8 border border-crimson/10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Send Us a Message
                  </h2>

                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                      Thank you for your message! We'll get back to you within 24 hours.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-transparent transition-all"
                          placeholder="Email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-transparent transition-all"
                          placeholder="Your Company"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-transparent transition-all"
                          placeholder="+27 XX XXX XXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                        Service of Interest *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-transparent transition-all"
                      >
                        <option value="">Select a service</option>
                        {[
                          'Due Diligence',
                          'Business Planning',
                          'Feasibility Studies',
                          'Infrastructure Engineering',
                          'Architectural System Design',
                          'Project & Construction Management',
                          'General Inquiry'
                        ].map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-transparent transition-all resize-none"
                        placeholder="Tell us about your infrastructure project or requirements..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-crimson text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-crimson-light transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 glow-red"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-2">
              <AnimatedSection delay={200}>
                <div className="sticky top-24 space-y-8">
                  <div className="gradient-red-black rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="ml-3">Free initial consultation and feasibility assessment</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="ml-3">Comprehensive one-stop shop for infrastructure development</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="ml-3">Response within 24-48 hours</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="ml-3">Expert team with engineering and project management expertise</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="ml-3">Partnership-based approach with risk-sharing model</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border-2 border-crimson/20 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Consultation</h3>
                    <p className="text-gray-700 mb-4">
                      Ready to explore the viability of your infrastructure project? Let us help you conduct a full-scale assessment.
                    </p>
                    <a
                      href="tel:0792892609"
                      className="inline-block bg-crimson text-white px-6 py-3 rounded-lg font-semibold hover:bg-crimson-light transition-colors"
                    >
                      Call 079 289 2609
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Visit Our Offices
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We have two convenient locations in Johannesburg to serve you better
            </p>
            <div className="bg-gray-300 rounded-2xl overflow-hidden h-96">
              <div className="w-full h-full flex items-center justify-center gradient-red-black">
                <div className="text-white text-center">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-2xl font-bold mb-2">356 Rivonia Boulevard, Edenburg</p>
                  <p className="text-xl mb-4">14 Howick Street, Paulshof, Sandton</p>
                  <p className="text-gray-200">Johannesburg, South Africa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
