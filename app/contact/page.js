// app/contact/page.jsx
import ContactClient from "./ContactClient";

/** Page-level SEO (your layout applies "%s | PD Enterprises") */
export const metadata = {
  title: "Contact PD Enterprise — Johannesburg Offices & Enquiries",
  description:
    "Contact PD Enterprise for infrastructure development, business analysis, feasibility studies and project planning. Call +27-79-289-2609 or email info@pdenterprise.co.za.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact PD Enterprise — Johannesburg Offices & Enquiries",
    description:
      "Get in touch about infrastructure development, business analysis, planning and engineering. Offices in Edenburg and Sandton, Johannesburg.",
    url: "/contact",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "PD Enterprise" }],
    locale: "en_ZA",
    siteName: "PD Enterprise",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact PD Enterprise — Johannesburg Offices & Enquiries",
    description:
      "Speak to our team about analysis, planning, feasibility and engineering for infrastructure projects.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  // Optional JSON-LD for richer context in SERPs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact PD Enterprise",
    url: "https://www.pdenterprise.co.za/contact",
    description:
      "Contact PD Enterprise for infrastructure development, business analysis, feasibility studies and project planning.",
    about: {
      "@type": "Organization",
      name: "PD Enterprise",
      url: "https://www.pdenterprise.co.za",
      contactPoint: [{
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+27-79-289-2609",
        email: "info@pdenterprise.co.za",
        areaServed: "ZA",
        availableLanguage: ["en"]
      }],
      address: [{
        "@type": "PostalAddress",
        streetAddress: "356 Rivonia Boulevard, Edenburg",
        addressLocality: "Johannesburg",
        addressCountry: "ZA"
      }, {
        "@type": "PostalAddress",
        streetAddress: "14 Howick Street, Paulshof, Sandton",
        addressLocality: "Johannesburg",
        addressCountry: "ZA"
      }]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
