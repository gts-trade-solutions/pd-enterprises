import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PD Enterprises - Infrastructure Development & Project Management',
  description: 'Leading infrastructure development company in South Africa. Providing comprehensive project development services including due diligence, business planning, feasibility studies, and construction management since 2016.',
  keywords: 'infrastructure development, project management, due diligence, feasibility studies, engineering, construction management, South Africa, energy infrastructure, buildings, housing',
  authors: [{ name: 'PD Enterprises' }],
  openGraph: {
    title: 'PD Enterprises - Infrastructure Development & Project Management',
    description: 'Comprehensive infrastructure development services from initial concept to project completion. Energy, Food Production, and Buildings sectors.',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'PD Enterprises',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
