'use client';

import Image from 'next/image';
import { BedDouble, ShowerHead, Home } from 'lucide-react';

export default function ClassicHouses() {
  const houses = [
    {
      name: 'G118',
      size: '121.2 SQM / 1,304 SQFT',
      desc: 'Easily convertible into 2 apartments',
      info: 'It’s not an empty nest if you divide it in two and gain a whole extra apartment.',
      features: [
        { label: '4x', icon: BedDouble, desc: 'Bedrooms' },
        { label: '2x', icon: ShowerHead, desc: 'Bathrooms' },
        { label: '2x', icon: Home, desc: 'Large Decks' },
      ],
      images: ['/images/classic-1.jpeg'],
    },
    {
      name: 'G105',
      size: '98,4 sqm / 1059 sqft',
      desc: 'Outperforms most "regular family homes".',
    //   info: 'A modern classic design with open living areas and large panoramic windows.',
      features: [
        { label: '5x', icon: BedDouble, desc: 'Bedrooms' },
        { label: '3x', icon: ShowerHead, desc: 'Bathrooms' },
        { label: '2x', icon: Home, desc: 'Balconies' },
      ],
      images: ['/images/classic-2.jpeg'],
    },
    {
      name: 'G98',
      size: '102 sqm / 1097 sqft',
      desc: 'Classic model closest to an a-frame.',
    //   info: 'It’s not an empty nest if you divide it in two and gain a whole extra apartment.',
      features: [
        { label: '4x', icon: BedDouble, desc: 'Bedrooms' },
        { label: '2x', icon: ShowerHead, desc: 'Bathrooms' },
        { label: '2x', icon: Home, desc: 'Large Decks' },
      ],
      images: ['/images/classic-3.jpeg'],
    },
     {
      name: 'G70',
      size: '70,5 sqm / 758,8 sqft',
      desc: 'Build with 2 people without a crane',
      info: 'Great, warm and affordable houses come in small packages.',
      features: [
        { label: '2x', icon: BedDouble, desc: 'Bedrooms' },
        { label: '1x', icon: ShowerHead, desc: 'Bathrooms' },
        // { label: '2x', icon: Home, desc: 'Balconies' },
      ],
      images: ['/images/classic-4.jpeg'],
    },
     {
      name: 'G49',
      size: '37,3 sqm / 404,4 sqft',
      desc: 'Move it to another location on a trailer.',
      info: 'It’s often best to begin from the beginning here’s the perfect starter home or downsize.',
      features: [
        { label: '2x', icon: BedDouble, desc: 'Bedrooms' },
        { label: '1x', icon: ShowerHead, desc: 'Bathrooms' },
        // { label: '2x', icon: Home, desc: 'Large Decks' },
      ],
      images: ['/images/classic-5.jpeg'],
    },
  ];

  return (
    <section className="bg-[#FAFAF2] py-16">
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
          <HouseCard key={house.name} house={house} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

/* --- SUBCOMPONENT --- */
function HouseCard({ house, reverse }) {
  return (
    <div
      className={`flex flex-col lg:flex-row ${
        reverse ? 'lg:flex-row-reverse' : ''
      } bg-white rounded-2xl shadow-md overflow-hidden`}
    >
      {/* IMAGE SIDE */}
      <div className="lg:w-1/2 w-full h-[400px] relative">
        <Image
          src={house.images[0]}
          alt={house.name}
          fill
          className="object-cover"
        />
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

        <p className="mt-6 text-gray-600 text-base max-w-md bg-white/60 p-3 rounded-md shadow-sm">
          {house.info}
        </p>

        <button className="mt-6 inline-block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-md shadow-md w-fit">
          PLANS & PRICES
        </button>
      </div>
    </div>
  );
}
