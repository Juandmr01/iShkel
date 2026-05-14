// components/products/AutoridadSection.tsx
'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const FEATURES = [
  {
    id: '01',
    title: 'Envíos a todo Colombia',
    description:
      'Llevamos seguridad premium a cada rincón del país. Bogotá, Medellín, Cali, Cartagena, y más — con instalación certificada.',
    image: '/Images_Icons/feature-colombia.jpg',
    alt: 'Bandera de Colombia ondeando sobre Cartagena',
  },
  {
    id: '02',
    title: 'Todo el control desde tu bolsillo',
    description:
      'Abre, cierra, monitorea y comparte acceso desde la app iShkel. Notificaciones en tiempo real cada vez que tu puerta se abre.',
    image: '/Images_Icons/feature-app.jpg',
    alt: 'App iShkel en smartphone',
  },
  {
    id: '03',
    title: 'Pensado para cada espacio',
    description:
      'Compatible con puertas de madera, metal y vidrio. Diseño que se adapta a cualquier estilo de hogar u oficina.',
    image: '/Images_Icons/feature-spaces.jpg',
    alt: 'Cerradura iShkel instalada en diferentes puertas',
  },
];

export default function AutoridadSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track which card is currently "on top" — drives left-column indicator
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const idx = cardRefs.current.indexOf(visible[0].target as HTMLDivElement);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-[#0e0e0e] text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-20 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20">
        {/* LEFT — Animates down as user scrolls through the section */}
<div className="lg:sticky lg:top-0 lg:self-start lg:h-screen lg:flex lg:items-start lg:pt-32">
  <div className="scroll-anim-heading">
    <h2
      className="text-[34px] sm:text-[44px] lg:text-[56px] xl:text-[64px] font-medium font-neue tracking-[-0.02em] leading-[1.05]"
      style={{ textWrap: 'balance' } as React.CSSProperties}
    >
      Expertos en seguridad en Colombia
    </h2>
    <p
      className="mt-4 lg:mt-6 text-white/70 text-[16px] sm:text-[20px] lg:text-[24px] font-neue leading-[1.4] max-w-[480px]"
      style={{ textWrap: 'balance' } as React.CSSProperties}
    >
      Expertos en seguridad en Colombia
    </p>

    <div className="hidden lg:flex items-center gap-3 mt-10">
      {FEATURES.map((_, i) => (
        <span
          key={i}
          className={`h-[2px] rounded-full transition-all duration-500 ease-out ${
            i === activeIndex ? 'w-12 bg-white' : 'w-6 bg-white/25'
          }`}
        />
      ))}
    </div>
  </div>

  <style jsx>{`
    @media (min-width: 1024px) {
      .scroll-anim-heading {
        animation: slideDown linear both;
        animation-timeline: scroll(root);
        animation-range: 0 100vh;
      }

      @keyframes slideDown {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(40vh);
        }
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .scroll-anim-heading {
        animation: none !important;
      }
    }
  `}</style>
</div>

          {/* RIGHT — Stacking cards */}
          <div className="flex flex-col">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                // Each card sticks at a slightly LOWER position so they stack
                // top-32 = 128px; each subsequent card adds 24px → peek strip visible
                className="sticky pt-4 lg:pt-6"
                style={{
                  top: `calc(8rem + ${i * 1.5}rem)`, // 128px + (24px × index)
                }}
              >
                <div
                  className="bg-[#191817] rounded-[15px] p-4 lg:p-5 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out"
                  style={{
                    // Slight scale-down on cards below the current one for depth
                    transform:
                      i < activeIndex ? `scale(${1 - (activeIndex - i) * 0.02})` : 'scale(1)',
                  }}
                >
                  <div className="relative aspect-[560/310] w-full rounded-[10px] overflow-hidden bg-[#d9d9d9]">
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div className="mt-4 lg:mt-5 px-1 flex items-baseline gap-3">
                    <span className="text-white text-[18px] sm:text-[20px] lg:text-[22px] font-medium font-neue tabular-nums">
                      {feature.id}
                    </span>
                    <h3 className="text-white text-[18px] sm:text-[20px] lg:text-[24px] font-medium font-neue tracking-tight">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}

            {/* Spacer so the last card has room to "settle" before footer */}
            <div className="h-[60vh] lg:h-[40vh]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}