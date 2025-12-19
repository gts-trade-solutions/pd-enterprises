// app/privacy-policy/page.jsx
export const metadata = {
  title: "Privacy Policy",
  description:
    "This Privacy Policy explains what information we collect, how we use it, and the choices you have.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Learn how we collect, use, and protect your information, and how to contact us.",
    url: "/privacy-policy",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy — PD Enterprise",
    description:
      "How we collect, use and protect your information, in simple terms.",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "1 Nov 2025";

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-600 mb-10">Last updated: {lastUpdated}</p>

      <section className="prose prose-lg max-w-none">
        <h2>Who we are</h2>
        <p>
          PD Enterprise (“we”, “us”, “our”) provides infrastructure development
          and related services. This policy explains what information we collect,
          how we use it, and the choices you have.
        </p>
        <ul>
          <li><strong>Website:</strong> pdenterprise.co.za</li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@pdenterprise.co.za">info@pdenterprise.co.za</a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href="tel:+27792892609">079 289 2609</a>
          </li>
          <li>
            <strong>Office:</strong> 356 Rivonia Boulevard, Edenburg, Johannesburg &amp;
            14 Howick Street, Paulshof, Sandton, Johannesburg
          </li>
        </ul>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Details you provide</strong> – for example your name, email,
            phone, company and message when you contact us or complete a form.
          </li>
          <li>
            <strong>Service interest</strong> – the services you select (e.g.
            Due Diligence, Business Planning) so we can respond accurately.
          </li>
          <li>
            <strong>Basic usage data</strong> – pages visited, time on page,
            device and browser type, and general location (city/country).
          </li>
          <li>
            <strong>Business records</strong> – emails, proposals and notes if
            we work together.
          </li>
        </ul>

        <h2>How we use your information</h2>
        <ul>
          <li>To respond to enquiries and provide information you request.</li>
          <li>To prepare proposals and deliver our services.</li>
          <li>To improve our website and understand what content is useful.</li>
          <li>To communicate important updates about our services.</li>
          <li>To protect our website and prevent abuse.</li>
        </ul>

        <h2>Cookies &amp; analytics</h2>
        <p>
          We use cookies to run the site and understand how it’s used (for example,
          via Google Analytics). Cookies are small files stored on your device.
          You can block or delete cookies in your browser settings if you prefer.
        </p>
        <p>
          If you don’t want your visits measured by analytics, you can also use the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Analytics opt-out add-on
          </a>.
        </p>

        <h2>Sharing your information</h2>
        <p>
          We don’t sell your information. We may share it with trusted providers
          who help us operate our website, communicate with you, or deliver our
          services (for example, web hosting, email, and analytics). These
          providers are only allowed to use your information to support us.
        </p>

        <h2>How long we keep information</h2>
        <p>
          We keep information only as long as needed for the purposes described
          above or as required for normal business and record-keeping. If you’d
          like us to delete information you’ve provided, contact us and we’ll
          help if we’re able to do so.
        </p>

        <h2>How we protect information</h2>
        <p>
          We use reasonable technical and organisational measures to protect your
          information. No website or service can guarantee perfect security, but
          we work to keep your information safe.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>You can update or delete information you’ve sent us by contacting us.</li>
          <li>You can opt out of non-essential emails at any time.</li>
          <li>You can control cookies in your browser settings.</li>
        </ul>

        <h2>Children</h2>
        <p>
          Our website and services are intended for adults. We don’t knowingly
          collect information from children.
        </p>

        <h2>Links to other sites</h2>
        <p>
          Our website may link to other websites. Those sites have their own
          privacy policies and practices.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this page from time to time. If the changes are
          significant, we’ll highlight them here. Please check back occasionally.
        </p>

        <h2>Contact us</h2>
        <p>Questions or requests? We’d love to help.</p>
        <ul>
          <li>
            <a href="mailto:info@pdenterprise.co.za">info@pdenterprise.co.za</a>
          </li>
          <li>
            <a href="tel:+27792892609">079 289 2609</a>
          </li>
        </ul>
      </section>
    </main>
  );
}
