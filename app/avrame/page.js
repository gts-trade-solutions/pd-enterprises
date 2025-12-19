// app/avrame/page.jsx
import AvramePageClient from "./AvramePageClient";

export const metadata = {
  title:
    "Avrame A-Frame Homes | Prefab, Off-Grid & Eco-Friendly House Kits South Africa",
  description:
    "Explore Avrame A-Frame homes — modern, affordable, and sustainable prefab house kits built for South Africa. Perfect for off-grid cabins, family homes, and eco retreats. Energy-efficient, customizable, and delivered nationwide.",
  keywords:
    "A-frame homes, A-frame house kits, prefab homes South Africa, off-grid cabins, eco homes, affordable housing, modular houses, sustainable living, tiny houses, cabin kits, modern design homes, DIY house kits, glamping units, backyard studios, energy efficient homes",
  alternates: { canonical: "/avrame" },
  openGraph: {
    title: "Avrame A-Frame Homes | Prefab & Off-Grid Living in South Africa",
    description:
      "Avrame offers modern A-Frame homes — quick to build, affordable, and designed for off-grid or eco-friendly living across South Africa.",
    url: "/avrame",
    images: [
      {
        url: "/images/og-avrame.jpg",
        width: 1200,
        height: 630,
        alt: "Avrame A-Frame Home South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avrame A-Frame Homes | Prefab, Off-Grid, Eco-Friendly Kits",
    description:
      "Build your dream A-Frame home with Avrame — prefab kits made for modern, sustainable, and affordable living in South Africa.",
    images: ["/images/og-avrame.jpg"],
  },
};

export default function Page() {
  // Use absolute URLs and include a name for EACH ListItem
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.pdenterprise.co.za/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Avrame", // <- this was missing
        item: "https://www.pdenterprise.co.za/avrame/",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <AvramePageClient />
    </>
  );
}
