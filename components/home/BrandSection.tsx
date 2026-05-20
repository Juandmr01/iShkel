'use client';

import Image from 'next/image';
import { brands } from '@/lib/data';

// Duplicate so the loop is seamless — second copy fills the gap as first scrolls out
const marqueeItems = [...brands, ...brands];

export default function BrandSection() {
  return (
    <section className="bg-[#070707] w-full py-10 overflow-hidden">
      <p className="text-center text-[#888] text-sm md:text-[18px] font-neue font-medium mb-6 px-4">
        Expertos en instalación digital en puertas de seguridad y puertas blindadas como:
      </p>
      <div className="relative flex">
        <div className="animate-marquee flex items-center gap-24 whitespace-nowrap will-change-transform">
          {marqueeItems.map((brand, i) => (
            <div
              key={i}
              className={`flex-shrink-0 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 ${brand.extra ?? ''}`}
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className="object-contain max-h-36 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
