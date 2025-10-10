import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300 border-t border-crimson/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              <span className="text-crimson">PD</span>Enterprises
            </h3>
            <p className="text-sm mb-4">
              Infrastructure development company founded in 2016, providing comprehensive project development and investment solutions across South Africa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-crimson transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-crimson transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-crimson transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-crimson transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-crimson transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-crimson transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-crimson transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-crimson transition-colors">
                  Due Diligence
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-crimson transition-colors">
                  Business Planning
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-crimson transition-colors">
                  Feasibility Studies
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-crimson transition-colors">
                  Project Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-crimson flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div>356 Rivonia Boulevard, Edenburg, Johannesburg</div>
                  <div className="mt-1">14 Howick Street, Paulshof, Sandton</div>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-crimson flex-shrink-0" />
                <span className="text-sm">079 289 2609</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-crimson flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div>info@pdenterprise.co.za</div>
                  <div className="mt-1">eric@pdserve.co.za</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-center md:text-left mb-4 md:mb-0">
              &copy; {currentYear} PD Enterprises. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="hover:text-crimson transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-crimson transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
