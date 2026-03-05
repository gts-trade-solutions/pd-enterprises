'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HeroSwiper({ slides = [] }) {
  if (!slides?.length) return null;

  const hub = {
    label: 'PD Hub',
    href: '/pd-hub',
    title: 'PD Hub',
    subtitle:
      'Project Development Hub (PD Hub) is a wholly black-owned development consultancy supporting infrastructure, energy, agriculture and consumer projects across Africa.',
  };

  const invest = {
    label: 'PD Invest',
    href: '/pd-invest',
    title: 'PD INVEST',
    subtitle:
      'PD Invest (on behalf of PD Enterprises) is an entrepreneurial infrastructure investor in the broader energy and food sectors, deploying early-stage capital to build contracted inflation-linked assets.',
  };

  return (
    <section className="relative w-full max-h-[85vh] overflow-hidden">
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
          className="h-full heroSwiper"
        >
          {slides.map((src, i) => (
            <SwiperSlide key={`${src}-${i}`}>
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`PD enterprises infrastructure project ${i + 1}`}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="100vw"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/45" />

                {/* ✅ DESKTOP hover cards */}
                <div className="hidden sm:block">
                  <HoverRevealCornerCard
                    side="left"
                    label={hub.label}
                    href={hub.href}
                    title={hub.title}
                    subtitle={hub.subtitle}
                  />
                  <HoverRevealCornerCard
                    side="right"
                    label={invest.label}
                    href={invest.href}
                    title={invest.title}
                    subtitle={invest.subtitle}
                  />
                </div>

                {/* ✅ MOBILE buttons (moved up + higher z-index) */}
                <div className="sm:hidden absolute inset-x-0 bottom-10 z-[80] px-4 pointer-events-none">
                  <div className="relative w-full h-0">
                    <div className="absolute left-0 pointer-events-auto">
                      <MobileCornerLink label="PD Hub" href="/pd-hub" />
                    </div>
                    <div className="absolute right-0 pointer-events-auto">
                      <MobileCornerLink label="PD Invest" href="/pd-invest" />
                    </div>
                  </div>
                </div>

                {/* ✅ stronger bottom fade so buttons blend */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* ✅ Mobile-only CSS to move pagination up */}
                <style jsx global>{`
                  @media (max-width: 640px) {
                    .heroSwiper .swiper-pagination {
                      bottom: 52px !important; /* dots above buttons */
                    }
                  }
                `}</style>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

/* =========================
   DESKTOP: hover card
   ========================= */
function HoverRevealCornerCard({ side = 'left', label, href, title, subtitle }) {
  const isLeft = side === 'left';

  return (
    <div className={['absolute bottom-8 sm:bottom-10 z-20', isLeft ? 'left-0' : 'right-0'].join(' ')}>
      <div className="group relative">
        <div
          className={[
            'relative h-12 sm:h-14 px-5 sm:px-6 flex items-center justify-center gap-2',
            'bg-black/40 backdrop-blur-md border border-white/20',
            'shadow-[0_12px_30px_rgba(0,0,0,0.35)] text-white font-semibold text-sm sm:text-base',
            isLeft ? 'rounded-r-2xl' : 'rounded-l-2xl',
          ].join(' ')}
          style={{
            borderTopLeftRadius: isLeft ? 0 : undefined,
            borderBottomLeftRadius: isLeft ? 0 : undefined,
            borderTopRightRadius: !isLeft ? 0 : undefined,
            borderBottomRightRadius: !isLeft ? 0 : undefined,
          }}
        >
          <span className={['absolute top-0 h-full w-[4px] bg-[#ff2a3a]', isLeft ? 'left-0' : 'right-0'].join(' ')} />
          {label}
          <span className="opacity-80">›</span>
        </div>

        <div
          className={[
            'pointer-events-none absolute bottom-[64px] sm:bottom-[72px]',
            isLeft ? 'left-0' : 'right-0',
            'w-[320px] sm:w-[380px]',
            'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0',
            'transition-all duration-250 ease-out',
          ].join(' ')}
        >
          <div className="pointer-events-auto rounded-3xl overflow-hidden border border-white/20 bg-black/35 backdrop-blur-md shadow-[0_14px_40px_rgba(0,0,0,0.45)]">
            <div className="p-5 sm:p-6">
              <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white leading-tight">{title}</h3>
              <p className="mt-3 text-sm text-white/80 leading-relaxed line-clamp-3">{subtitle}</p>
              <div className="mt-5">
                <Link
                  href={href}
                  className="inline-flex items-center justify-center rounded-full px-5 py-2.5 border border-[#ff2a3a]/70 bg-[#ff2a3a]/15 text-white font-semibold hover:bg-[#ff2a3a]/25 transition"
                >
                  Read more <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-r from-[#ff2a3a]/0 via-[#ff2a3a]/18 to-[#ff2a3a]/0 blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   MOBILE: direct links
   ========================= */
function MobileCornerLink({ label, href }) {
  return (
    <Link
      href={href}
      className="
        relative inline-flex items-center gap-2
        h-11 px-5
        rounded-2xl
        border border-white/15
        bg-black/35 backdrop-blur-md
        text-white font-semibold text-sm
        shadow-[0_12px_30px_rgba(0,0,0,0.35)]
        active:scale-[0.99]
      "
    >
      <span className="absolute left-0 top-0 h-full w-[4px] bg-[#ff2a3a]" />
      {label}
      <span className="opacity-80">›</span>
    </Link>
  );
}