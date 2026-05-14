// components/products/SeguridadDisenoSplit.tsx
import Image from 'next/image';

export default function SeguridadDisenoSplit() {
  return (
    <section id="seguridad"  className="bg-[#f2f2f2] py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-20">
        {/* Row 1: Square image + heading top-right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Square image */}
          <div className="relative aspect-square w-full max-w-[555px] rounded-[15px] bg-[#d9d9d9] overflow-hidden">
            <Image
              src="/Images_Icons/seguridad-diseno.jpg"
              alt="Seguridad y diseño iShkel"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Heading + paragraph (top-aligned, sits at top of row) */}
          <div className="lg:pt-12">
            <h2
              className="text-[#070707] text-[26px] sm:text-[30px] lg:text-[34px] font-normal font-neue tracking-tight leading-[1.15]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Seguridad, y diseño
            </h2>
            <p
              className="mt-4 lg:mt-5 text-[#070707] text-[15px] sm:text-[16px] lg:text-[17px] font-medium font-neue leading-[1.45] max-w-[420px]"
              style={{ textWrap: 'pretty' } as React.CSSProperties}
            >
              Protección inteligente que complementa tu hogar. Nuestras cerraduras
              combinan tecnología de punta con acabados premium para una seguridad
              que se ve tan bien como funciona.
            </p>
          </div>
        </div>

        {/* Row 2: Two vertical images, second one has caption below */}
        <div className="mt-10 sm:mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-[1.33fr_1fr] gap-8 lg:gap-10 items-start">
          {/* Left: tall image */}
          <div className="relative aspect-[680/810] w-full rounded-[15px] bg-[#d9d9d9] overflow-hidden">
            <Image
              src="/Images_Icons/material-detail-1.jpg"
              alt="Detalle de materiales iShkel"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 56vw"
            />
          </div>

          {/* Right: image + caption below */}
          <div className="flex flex-col gap-5 lg:gap-6">
            <div className="relative aspect-[510/672] w-full rounded-[15px] bg-[#d9d9d9] overflow-hidden">
              <Image
                src="/Images_Icons/material-detail-2.jpg"
                alt="Acabados premium iShkel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>

            <p
              className="text-black text-[15px] sm:text-[16px] lg:text-[17px] font-medium font-neue leading-[1.45] max-w-[460px]"
              style={{ textWrap: 'pretty' } as React.CSSProperties}
            >
              &ldquo;Fabricadas con aleación de zinc de grado aeronáutico y acabados
              en acero inoxidable 304. Resistentes a la corrosión, impactos y
              temperaturas extremas. Diseño que perdura.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}