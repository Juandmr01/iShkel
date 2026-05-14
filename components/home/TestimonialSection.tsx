'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/lib/data';

const heightClasses = {
  tall: 'h-[200px] sm:h-[260px] lg:h-[302px]',
  medium: 'h-[170px] sm:h-[220px] lg:h-[277px]',
  short: 'h-[145px] sm:h-[190px] lg:h-[240px]',
};

const offsetClasses = {
  top: 'lg:mt-0',
  middle: 'lg:mt-16',
  bottom: 'lg:mt-24',
};

type Testimonial = {
  id: string | number;
  username: string;
  image: string;
  comment?: string;
  height: keyof typeof heightClasses;
  offsetY: keyof typeof offsetClasses;
};

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TestimonialCard({
  card,
  rounded = '20px',
}: {
  card: Testimonial;
  rounded?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const hasComment = Boolean(card.comment);

  return (
    <div
      onClick={() => hasComment && setRevealed((v) => !v)}
      onMouseLeave={() => setRevealed(false)}
      className={`group relative w-full h-full overflow-hidden bg-[#d9d9d9] ${
        hasComment ? 'cursor-pointer' : ''
      }`}
      style={{ borderRadius: rounded }}
    >
      <Image
        src={card.image}
        alt={`Testimonio de ${card.username}`}
        fill
        className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 238px"
      />

      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-out bg-gradient-to-t from-black/80 via-black/40 to-transparent ${
          revealed ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />

      <div
        className={`absolute bottom-3 left-3 md:bottom-4 md:left-4 flex items-center gap-2 px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-full transition-opacity duration-300 ease-out ${
          revealed ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
        }`}
      >
        <InstagramIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
        <span className="text-white text-xs md:text-sm font-medium">
          {card.username}
        </span>
      </div>

      {hasComment && (
        <div
          className={`absolute inset-0 flex flex-col justify-end p-4 md:p-5 transition-all duration-500 ease-out ${
            revealed
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
          }`}
        >
          <p
            className="text-white text-[13px] md:text-[14px] leading-[1.45] font-medium mb-2.5 line-clamp-4"
            style={{ textWrap: 'pretty' } as React.CSSProperties}
          >
            &ldquo;{card.comment}&rdquo;
          </p>
          <div className="flex items-center gap-1.5">
            <InstagramIcon className="w-3.5 h-3.5 text-white/90" />
            <span className="text-white text-[12px] font-medium">
              {card.username}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // animate only once
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#f2f2f2] py-8 md:py-16 lg:py-20 px-4 overflow-hidden">
      <div
        ref={sectionRef}
        className="relative max-w-[1346px] mx-auto bg-white rounded-[20px] md:rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 md:p-10 lg:p-12"
      >
        {/* Mobile: Single-column vertical stack */}
        <div className="flex flex-col gap-4 lg:hidden">
          {testimonials.map((card, i) => (
            <div
              key={card.id}
              className={`relative w-full h-[220px] sm:h-[260px] transition-all duration-700 ease-out ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: inView ? `${i * 100}ms` : '0ms' }}
            >
              <TestimonialCard card={card as Testimonial} rounded="20px" />
            </div>
          ))}
        </div>

        {/* Desktop: staggered flex row */}
        <div className="hidden lg:flex gap-5 justify-center">
          {testimonials.map((card, i) => (
            <div
              key={card.id}
              className={`
                relative shrink-0
                w-59.5
                ${heightClasses[card.height as keyof typeof heightClasses]}
                ${offsetClasses[card.offsetY as keyof typeof offsetClasses]}
                transition-all duration-700 ease-out
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{ transitionDelay: inView ? `${i * 120}ms` : '0ms' }}
            >
              <TestimonialCard card={card as Testimonial} rounded="30px" />
            </div>
          ))}
        </div>

        {/* Text Content */}
        <div
          className={`text-center mt-8 md:mt-12 lg:mt-16 px-4 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: inView ? '700ms' : '0ms' }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] font-medium leading-tight tracking-tight">
            <span className="text-black">Unete a miles de clientes</span>
            <br />
            <span className="text-black">que </span>
            <span className="text-[#555]">confian en Shkell</span>
          </h2>
          <p className="mt-4 md:mt-6 text-sm md:text-base lg:text-xl text-black/70 max-w-md mx-auto">
            Lee directamente cleinte que han
            <br className="hidden sm:block" />
            confiado en nosotros
          </p>
        </div>
      </div>
    </section>
  );
}