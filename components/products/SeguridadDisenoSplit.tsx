// components/products/SeguridadDisenoSplit.tsx
import Image from 'next/image';

export default function SeguridadDisenoSplit() {
  return (
    <section className="bg-[#f2f2f2] pb-16 lg:pb-24">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* First split */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-20 items-center">
          <div className="relative aspect-[555/500] w-full rounded-[15px] bg-[#d9d9d9] overflow-hidden">
            <Image
              src="/Images_Icons/seguridad-diseno.jpg"
              alt="Seguridad y diseño iShkel"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>

          <div>
            <h2
              className="text-[#070707] text-[28px] sm:text-[32px] lg:text-[36px] font-medium font-neue tracking-tight leading-[1.1]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Seguridad y diseño
            </h2>
            <p
              className="mt-5 text-[#070707] text-[16px] sm:text-[18px] lg:text-[20px] font-medium font-neue leading-[1.4]"
              style={{ textWrap: 'pretty' } as React.CSSProperties}
            >
              Protección inteligente que complementa tu hogar. Nuestras cerraduras
              combinan tecnología de punta con acabados premium para una seguridad que
              se ve tan bien como funciona.
            </p>
          </div>
        </div>

        {/* Second split */}
        <div className="mt-12 lg:mt-20 grid grid-cols-1 lg:grid-cols-[1.33fr_1fr] gap-8 lg:gap-12 items-stretch">
          <div className="relative aspect-[680/672] w-full rounded-[15px] bg-[#d9d9d9] overflow-hidden">
            <Image
              src="/Images_Icons/material-detail.jpg"
              alt="Detalle de materiales iShkel"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="bg-[#d9d9d9] rounded-[15px] flex flex-col justify-end p-8 sm:p-10 lg:p-12 min-h-[400px]">
            <p
              className="text-black text-[18px] sm:text-[20px] lg:text-[22px] font-medium font-neue leading-[1.4]"
              style={{ textWrap: 'pretty' } as React.CSSProperties}
            >
              &ldquo;Fabricadas con aleación de zinc de grado aeronáutico y acabados en
              acero inoxidable 304. Resistentes a la corrosión, impactos y temperaturas
              extremas. Diseño que perdura.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}