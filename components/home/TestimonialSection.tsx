'use client';

import Image from 'next/image';
import { testimonials } from '@/lib/data';

const heightClasses = {
  tall: 'h-[200px] sm:h-[260px] lg:h-[302px]',
  medium: 'h-[170px] sm:h-[220px] lg:h-[277px]',
  short: 'h-[145px] sm:h-[190px] lg:h-[240px]',
};

// Offset classes — stagger only on desktop
const offsetClasses = {
  top: 'lg:mt-0',
  middle: 'lg:mt-16',
  bottom: 'lg:mt-24',
};

function InstagramBadge({ username }: { username: string }) {
  return (
    <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 flex items-center gap-2 px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-full">
      <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
      <span className="text-white text-xs md:text-sm font-medium">{username}</span>
    </div>
  );
}

export default function TestimonialSection() {
  const col1 = [testimonials[0], testimonials[2], testimonials[4]];
  const col2 = [testimonials[1], testimonials[3]];

  return (
    <section className="w-full bg-[#f2f2f2] py-8 md:py-16 lg:py-20 px-4 overflow-hidden">
      <div className="relative max-w-[1346px] mx-auto bg-white rounded-[20px] md:rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-6 md:p-10 lg:p-12">

        {/* Mobile: 2-column masonry grid */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {/* Column 1 — starts at top */}
          <div className="flex flex-col gap-3">
            {col1.map((card) => (
              <div
                key={card.id}
                className={`relative w-full rounded-[20px] overflow-hidden bg-[#d9d9d9] ${heightClasses[card.height]}`}
              >
                <Image
                  src={card.image}
                  alt={`Testimonial from ${card.username}`}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <InstagramBadge username={card.username} />
              </div>
            ))}
          </div>

          {/* Column 2 — offset down for stagger */}
          <div className="flex flex-col gap-3 mt-5 sm:mt-8">
            {col2.map((card) => (
              <div
                key={card.id}
                className={`relative w-full rounded-[20px] overflow-hidden bg-[#d9d9d9] ${heightClasses[card.height]}`}
              >
                <Image
                  src={card.image}
                  alt={`Testimonial from ${card.username}`}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <InstagramBadge username={card.username} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: staggered flex row */}
        <div className="hidden lg:flex gap-5 justify-center">
          {testimonials.map((card) => (
            <div
              key={card.id}
              className={`
                relative shrink-0 rounded-[30px] overflow-hidden bg-[#d9d9d9]
                w-59.5
                ${heightClasses[card.height]}
                ${offsetClasses[card.offsetY]}
              `}
            >
              <Image
                src={card.image}
                alt={`Testimonial from ${card.username}`}
                fill
                className="object-cover"
                sizes="238px"
              />
              <InstagramBadge username={card.username} />
            </div>
          ))}
        </div>

        {/* Text Content */}
        <div className="text-center mt-8 md:mt-12 lg:mt-16 px-4">
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
