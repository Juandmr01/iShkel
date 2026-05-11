// components/products/PDPHero.tsx
import Image from 'next/image';

interface PDPHeroProps {
  title: string;
  heroImage: string;
  formattedPrice: string;
}

export default function PDPHero({ title, heroImage, formattedPrice }: PDPHeroProps) {
  return (
    <section
      id="pdp-hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/45" />
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/30 backdrop-blur-[2px] bg-black/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-white text-[15px] sm:text-[18px] lg:text-[20px] font-neue">
            Descubre más abajo
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
            <p className="text-white text-[15px] sm:text-[18px] lg:text-[20px] font-neue">
              Desde {formattedPrice}
            </p>
            <a
              href="#productos"
              className="bg-white text-[#191817] text-[14px] sm:text-[14.5px] font-medium font-neue px-6 sm:px-8 h-10 inline-flex items-center justify-center rounded-[15px] tracking-[0.1px] hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
            >
              Comprar ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}