'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HeroSwiper({ slides = [] }) {
  if (!slides?.length) return null;

  return (
    <section className="relative w-full max-h-[85vh] overflow-hidden">
      {/* ✅ Aspect-ratio wrapper so the image isn't “stretched” */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {slides.map((src, i) => (
            <SwiperSlide key={src}>
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`PD Enterprise infrastructure project ${i + 1}`}
                  fill
                  priority={i === 0}         
                  className="object-cover"     
                  sizes="100vw"
                />
                {/* overlay */}
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
