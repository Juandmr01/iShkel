'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const gradientGold = 'linear-gradient(180deg, #8C857E 0%, #C4B6A6 25%, #F2F2F2 50%, #C4B6A6 75%, #8C857E 100%)';
// Reusable component for animating numbers counting up when they scroll into view
function StatNumber({
  value,
  duration = 2000,
  className,
  style,
}: {
  value: number;
  duration?: number;
  className: string;
  style?: React.CSSProperties;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only start the animation the first time it scrolls into view
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(value);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {count}
    </span>
  );
}

export default function AutoridadSection() {
  return (
    <section className="w-full bg-[#070707] overflow-hidden relative">

      {/* Wave Shape Divider */}
      <div className="absolute top-0 right-0 w-[40%] sm:w-[45%] md:w-[50%] lg:w-[572px] h-[40px] sm:h-[50px] md:h-[60px] lg:h-[67px]">
        <svg
          className="w-full h-full"
          viewBox="0 0 572 67"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <mask id="mask0_autoridad" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="576" height="67">
            <path d="M0 66.92H575.939V0H0V66.92Z" fill="white" />
          </mask>
          <g mask="url(#mask0_autoridad)">
            <path d="M837.746 -497.13C837.746 -497.13 929.811 -400.642 860.912 -289.541C792.013 -178.441 827.957 -86.2627 827.957 -86.2627C827.957 -86.2627 771.823 -64.098 753.84 -96.95C753.84 -96.95 731.557 -20.7338 668.042 -52.5856C668.042 -52.5856 642.567 45.863 530.345 10.7699C418.124 -24.3232 386.303 65.6428 386.303 65.6428C386.303 65.6428 357.04 44.2149 350.516 17.837C350.516 17.837 255.09 87.3406 180.644 42.1845C106.198 -2.97083 -23.167 -0.530334 -23.167 -0.530334L696.794 -720.757C696.793 -720.757 922.528 -613.503 837.746 -497.13Z" fill="#F2F2F2" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24">

        {/* Header */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium mb-10 md:mb-16">
          <span className="text-white">Soluciones Inteligentes a </span>
          <span
            className="bg-clip-text text-transparent font-bold"
            style={{ backgroundImage: gradientGold }}
          >
            tu medida
          </span>
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 mb-16 md:mb-24">

          {/* Large Image - Left */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[928px] rounded-[20px] overflow-hidden group">
            <Image
              src="/Images_Icons/Autoridad-InicioSeguro.png"
              alt="iShkel smart locks - Máxima Seguridad"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <p className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight tracking-tight">
                <span className="font-bold">Máxima</span>
                <br />
                <span className="font-medium">Seguridad</span>
              </p>
            </div>
          </div>

          {/* Right Column - 2 stacked images */}
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">

            {/* Top Right */}
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[384px] rounded-[20px] overflow-hidden group">
              <Image
                src="/Images_Icons/Autoridad-InicioSeguro.png"
                alt="iShkel smart lock - Inicio Seguro"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight">
                  <span className="font-medium">Inicio</span>
                  <br />
                  <span className="font-bold">Seguro</span>
                </p>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-130 rounded-[20px] overflow-hidden group">
              <Image
                src="/Images_Icons/PorblemasTecnicos.png"
                alt="iShkel support - Soporte 24/7"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight">
                  <span className="font-medium">Soporte</span>
                  <br />
                  <span className="font-bold">24/7</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Stats Section */}
        <div className="pt-20 md:pt-20 lg:pt-26 pb-6 md:pb-12 lg:pb-16">

          <h3 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-[42px] font-medium mb-12 md:mb-16">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: gradientGold }}
            >
              La confianza{' '}
            </span>
            <span className="text-white">se mide en resultados</span>
          </h3>

          <div className="grid grid-cols-3 gap-4 md:gap-12 lg:gap-16 max-w-5xl mx-auto">

            {/* Stat 1 */}
            <div className="text-center flex flex-col items-center">
              <div className="flex items-baseline justify-center">
                <span className="text-[#888] text-2xl sm:text-4xl md:text-5xl lg:text-[58px] font-bold">+</span>
                <StatNumber
                  value={1000}
                  className="text-[#888] text-3xl sm:text-5xl md:text-7xl lg:text-[128px] font-bold leading-none"
                />
              </div>
              <p className="text-[#f2f2f2] text-xs sm:text-base md:text-xl lg:text-[24px] font-medium mt-2 md:mt-4">
                Instalaciones Exitosas
              </p>
            </div>

            {/* Stat 2 — center, gradient treatment */}
            <div className="text-center flex flex-col items-center border-x border-white/10 px-2">
              <div className="flex flex-col items-center">
                <StatNumber
                  value={20}
                  className="bg-clip-text text-transparent text-4xl sm:text-6xl md:text-8xl lg:text-[120px] font-bold leading-none"
                  style={{ backgroundImage: 'linear-gradient(-1deg, #8C857E 23%, #C4B6A6 36%, #F2F2F2 55%, #C4B6A6 80%, #8C857E 98%)' }}
                />
                <span
                  className="bg-clip-text text-transparent text-2xl sm:text-4xl md:text-6xl lg:text-[80px] font-bold leading-none -mt-1 sm:-mt-3 lg:-mt-6"
                  style={{ backgroundImage: gradientGold }}
                >
                  Meses
                </span>
              </div>
              <p className="text-[#f2f2f2] text-xs sm:text-base md:text-xl lg:text-[24px] font-medium mt-2 md:mt-4">
                Garantía Extendida
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center flex flex-col items-center">
              <div className="flex items-baseline justify-center">
                <StatNumber
                  value={98}
                  className="text-[#888] text-3xl sm:text-5xl md:text-7xl lg:text-[128px] font-bold leading-none"
                />
                <span className="text-[#888] text-xl sm:text-3xl md:text-4xl lg:text-[58px] font-bold">%</span>
              </div>
              <p className="text-[#f2f2f2] text-xs sm:text-base md:text-xl lg:text-[24px] font-medium mt-2 md:mt-4">
                Clientes Satisfechos
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
