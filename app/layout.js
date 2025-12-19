// // app/layout.js
// import "./globals.css";
// import { Inter } from "next/font/google";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Script from "next/script";
// import { Suspense } from "react";            // ✅ add this
// import GAReporter from "./ga-reporter";

// const inter = Inter({ subsets: ["latin"] });

// const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-HWRH0W93YX";
// const ENABLE_GA = !!GA_ID && process.env.NODE_ENV === "production";

// export const metadata = { /* ...as you have... */ };

// export default function RootLayout({ children }) {
//   const orgLd = { /* ...as you have... */ };

//   return (
//     <html lang="en-ZA">
//       <head>
//         <Script id="org-jsonld" type="application/ld+json" strategy="beforeInteractive">
//           {JSON.stringify(orgLd)}
//         </Script>

//         {ENABLE_GA && (
//           <>
//             <Script
//               src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
//               strategy="beforeInteractive"
//             />
//             <Script id="gtag-init" strategy="beforeInteractive">
//               {`
//                 window.dataLayer = window.dataLayer || [];
//                 function gtag(){dataLayer.push(arguments);}
//                 gtag('js', new Date());
//                 gtag('config', '${GA_ID}', { anonymize_ip: true, send_page_view: false });
//               `}
//             </Script>
//           </>
//         )}
//       </head>
//       <body className={inter.className}>
//         <Navbar />
//         {ENABLE_GA && (
//           <Suspense fallback={null}>
//             <GAReporter gaId={GA_ID} />   {/* ✅ wrapped in Suspense */}
//           </Suspense>
//         )}
//         <main className="min-h-screen">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }


// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { Suspense } from "react";
import GAReporter from "./ga-reporter";

const inter = Inter({ subsets: ["latin"] });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-HWRH0W93YX";
const ENABLE_GA = !!GA_ID && process.env.NODE_ENV === "production";

export const metadata = {
  metadataBase: new URL("https://pdenterprise.co.za"),

  title: {
    default: "PD Enterprise",
    template: "%s | PD Enterprise",
  },

  description: "PD Enterprise — Professional supply and project services in South Africa.",

  // OPEN GRAPH (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "PD Enterprise",
    description: "PD Enterprise — Professional supply and project services in South Africa.",
    url: "https://pdenterprise.co.za",
    siteName: "PD Enterprise",
    type: "website",
    images: [
      {
        url: "/images/og.png", // place this image in /public
        width: 1200,
        height: 630,
        alt: "PD Enterprise",
      },
    ],
  },

  // TWITTER CARD
  twitter: {
    card: "summary_large_image",
    title: "PD Enterprise",
    description: "PD Enterprise — Professional supply and project services in South Africa.",
    images: ["/og-image.jpg"],
  },

  // FAVICONS (optional but good SEO)
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PD Enterprise",
    url: "https://pdenterprise.co.za",
    logo: "https://pdenterprise.co.za/logo.png",
  };

  return (
    <html lang="en-ZA">
      <head>
        <Script id="org-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(orgLd)}
        </Script>

        {ENABLE_GA && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="beforeInteractive"
            />
            <Script id="gtag-init" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true, send_page_view: false });
              `}
            </Script>
          </>
        )}
      </head>

      <body className={inter.className}>
        <Navbar />

        {ENABLE_GA && (
          <Suspense fallback={null}>
            <GAReporter gaId={GA_ID} />
          </Suspense>
        )}

        <main className="min-h-screen">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
