"use client";

import { useState } from "react";
import Image from "next/image";
import { BedDouble, ShowerHead, Home, X, Mail, Phone, MessageSquare, Loader2 } from "lucide-react";

// ✅ Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClassicHouses() {
  const houses = [
    {
      name: "G118",
      size: "121.2 SQM / 1,304 SQFT",
      desc: "Easily convertible into 2 apartments",
      info: "It's not an empty nest if you divide it in two and gain a whole extra apartment.",
      features: [
        { label: "4x", icon: BedDouble, desc: "Bedrooms" },
        { label: "2x", icon: ShowerHead, desc: "Bathrooms" },
        { label: "2x", icon: Home, desc: "Large Decks" },
      ],
      images: ["/images/classic-1.jpeg"],
    },
    {
      name: "G105",
      size: "98,4 sqm / 1059 sqft",
      desc: 'Outperforms most "regular family homes".',
      features: [
        { label: "5x", icon: BedDouble, desc: "Bedrooms" },
        { label: "3x", icon: ShowerHead, desc: "Bathrooms" },
        { label: "2x", icon: Home, desc: "Balconies" },
      ],
      images: ["/images/classic-2.jpeg"],
    },
    {
      name: "G98",
      size: "102 sqm / 1097 sqft",
      desc: "Classic model closest to an a-frame.",
      features: [
        { label: "4x", icon: BedDouble, desc: "Bedrooms" },
        { label: "2x", icon: ShowerHead, desc: "Bathrooms" },
        { label: "2x", icon: Home, desc: "Large Decks" },
      ],
      images: ["/images/classic-3.jpeg"],
    },
    {
      name: "G70",
      size: "70,5 sqm / 758,8 sqft",
      desc: "Build with 2 people without a crane",
      info: "Great, warm and affordable houses come in small packages.",
      features: [
        { label: "2x", icon: BedDouble, desc: "Bedrooms" },
        { label: "1x", icon: ShowerHead, desc: "Bathrooms" },
      ],
      images: ["/images/classic-4.jpeg"],
    },
    {
      name: "G49",
      size: "37,3 sqm / 404,4 sqft",
      desc: "Move it to another location on a trailer.",
      info: "It's often best to begin from the beginning—here's the perfect starter home or downsize.",
      features: [
        { label: "2x", icon: BedDouble, desc: "Bedrooms" },
        { label: "1x", icon: ShowerHead, desc: "Bathrooms" },
      ],
      images: ["/images/classic-5.jpeg"],
    },
  ];

  const crimson = "#DC2626";

  // ✅ Same popup state + inputs
  const [leadOpen, setLeadOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);

  function openLeadModal(houseName) {
    setSelectedHouse(houseName);
    setLeadOpen(true);
    setEmail("");
    setPhone("");
    setMessage("");
  }

  function closeLeadModal() {
    if (submitting) return;
    setLeadOpen(false);
  }

  // ✅ Same simplest email send: mailto + toast
  async function submitLead(e) {
    e.preventDefault();

    if (!selectedHouse) return toast.error("House not selected.");
    if (!email.trim()) return toast.error("Please enter your email.");
    if (!phone.trim()) return toast.error("Please enter your phone number.");
    if (!message.trim()) return toast.error("Please enter a description.");

    setSubmitting(true);
    try {
      const subject = `Avrame Classic Series - Plans & Prices - ${selectedHouse}`;
      const body = [
        `House: ${selectedHouse}`,
        `Customer Email: ${email.trim()}`,
        `Phone: ${phone.trim()}`,
        ``,
        `Description:`,
        message.trim(),
      ].join("\n");

      const mailto = `mailto:info@pdenterprise.co.za?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;

      toast.success("Email draft opened. Please click Send in your mail app.");
      setTimeout(() => setLeadOpen(false), 800);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-[#FAFAF2] py-16">
      {/* ✅ Toastify container */}
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />

      <div className="container mx-auto px-6 lg:px-12 space-y-20">
        {/* Title shown once */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Avrame Classic Series
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            We love A-frames, but we love people living their dream even more.
          </p>
        </div>

        {/* Houses */}
        {houses.map((house, i) => (
          <HouseCard
            key={house.name}
            house={house}
            reverse={i % 2 === 1}
            onPlansPrices={() => openLeadModal(house.name)}
          />
        ))}
      </div>

      {/* ✅ SAME MODAL POPUP */}
      {leadOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
          {/* backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={closeLeadModal}
            aria-label="Close"
          />

          {/* dialog */}
          <div className="relative w-[92vw] max-w-[720px] rounded-2xl bg-white shadow-2xl border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <div className="text-sm text-gray-500">Plans & Prices Request</div>
                <div className="text-xl font-extrabold text-gray-900">{selectedHouse}</div>
              </div>

              <button
                type="button"
                onClick={closeLeadModal}
                className="p-2 rounded-lg hover:bg-gray-100"
                disabled={submitting}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitLead} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-red-200"
                    placeholder="you@example.com"
                    type="email"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-red-200"
                    placeholder="+27 …"
                    type="tel"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Description
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full min-h-[140px] rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-red-200"
                  placeholder="Tell us what you want (plans, pricing, finishes, site details, timeline, etc.)"
                />
              </label>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeLeadModal}
                  className="rounded-xl px-5 py-3 font-semibold border hover:bg-gray-50"
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl px-5 py-3 font-semibold text-white inline-flex items-center gap-2"
                  style={{ background: crimson }}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Opening…
                    </>
                  ) : (
                    "Send Email"
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500">
                This will open your email app with a pre-filled message to PD Enterprise.
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

/* --- SUBCOMPONENT --- */
function HouseCard({ house, reverse, onPlansPrices }) {
  return (
    <div
      className={`flex flex-col lg:flex-row ${
        reverse ? "lg:flex-row-reverse" : ""
      } bg-white rounded-2xl shadow-md overflow-hidden`}
    >
      {/* IMAGE SIDE */}
      <div className="lg:w-1/2 w-full h-[400px] relative">
        <Image src={house.images[0]} alt={house.name} fill className="object-cover" />
      </div>

      {/* CONTENT SIDE */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center p-8 bg-[#FAFAF2]">
        <h2 className="text-4xl font-extrabold text-gray-900">{house.name}</h2>
        <p className="text-lg text-gray-700 mt-1">{house.size}</p>
        <p className="text-gray-600 mt-3 text-lg">{house.desc}</p>

        {/* FEATURES */}
        <div className="flex flex-wrap gap-3 mt-6">
          {house.features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-md"
            >
              <f.icon className="w-5 h-5" />
              <span>
                {f.label} {f.desc}
              </span>
            </div>
          ))}
        </div>

        {house.info && (
          <p className="mt-6 text-gray-600 text-base max-w-md bg-white/60 p-3 rounded-md shadow-sm">
            {house.info}
          </p>
        )}

        {/* ✅ Same popup trigger */}
        <button
          type="button"
          onClick={onPlansPrices}
          className="mt-6 inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-md shadow-md w-fit"
        >
          PLANS & PRICES
        </button>
      </div>
    </div>
  );
}
