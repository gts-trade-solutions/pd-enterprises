// app/about/page.jsx
import AboutClient from "./AboutClient";

/** Page-level SEO (your layout applies "%s | PD Enterprises") */
export const metadata = {
  title: "About PD Enterprise — Leadership, Values & Approach",
  description:
    "Learn about PD Enterprise: our story, leadership, values, and partnership-driven approach to infrastructure development, business analysis and project planning in South Africa.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About PD Enterprise — Leadership, Values & Approach",
    description:
      "Our story, leadership team, values and how we deliver infrastructure development, business analysis and planning.",
    url: "/about",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "PD Enterprise" }],
    locale: "en_ZA",
    siteName: "PD Enterprise",
  },
  twitter: {
    card: "summary_large_image",
    title: "About PD Enterprise — Leadership, Values & Approach",
    description:
      "Our story, leadership team, values and approach to infrastructure development.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  // Optional JSON-LD for the About page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About PD Enterprise",
    url: "https://www.pdenterprise.co.za/about",
    description:
      "Our story, leadership, values and approach to infrastructure development, business analysis and planning.",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://www.pdenterprise.co.za/og.jpg",
    },
    about: {
      "@type": "Organization",
      name: "PD Enterprise",
      url: "https://www.pdenterprise.co.za",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify with no extra spaces to keep HTML lean
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
