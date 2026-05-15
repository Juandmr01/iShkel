// app/pro/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ProFilterPills from '@/components/pro/ProFilterPills';

export const metadata = {
  title: 'iShkel Pro | Para Constructores y Distribuidores',
  description:
    'Cerraduras inteligentes premium para proyectos inmobiliarios, hoteles y Airbnb. Soporte en obra y volumen para constructores en Colombia.',
};

const FILTER_PILLS = [
  { id: 'distribuidor', label: 'Para Distribuidor' },
  { id: 'constructor', label: 'Para Constructor' },
  { id: 'instalador', label: 'Para Instalador' },
  { id: 'airbnb', label: 'Airbnb / Hotel' },
];

type ProCard = {
  id: string;
  sectionId: string;
  eyebrow: string;
  title: string;
  image: string;
  size: 'wide' | 'tall' | 'small' | 'medium';
};

const PRO_CARDS: ProCard[] = [
  {
    id: 'card-1',
    sectionId: 'distribuidor',
    eyebrow: 'Distribuidores',
    title: 'Margen, soporte y respaldo de marca.',
    image: '/ProImages/pro-1.jpg',
    size: 'wide',
  },
  {
    id: 'card-2',
    sectionId: 'constructor',
    eyebrow: 'Constructores',
    title: 'Una cerradura distinta. Por diseño.',
    image: '/ProImages/pro-2.jpg',
    size: 'tall',
  },
  {
    id: 'card-3',
    sectionId: 'instalador',
    eyebrow: 'Instaladores',
    title: 'Instalación sin obras. Soporte 24/7.',
    image: '/ProImages/pro-3.jpg',
    size: 'small',
  },
  {
    id: 'card-4',
    sectionId: 'airbnb',
    eyebrow: 'Airbnb / Hotel',
    title: 'Códigos temporales, sin contacto.',
    image: '/ProImages/pro-4.jpg',
    size: 'wide',
  },
];

const INNOVATION_CARDS: ProCard[] = [
  {
    id: 'innova-1',
    sectionId: '',
    eyebrow: 'Constructores',
    title: 'Una cerradura distinta. Por diseño.',
    image: '/ProImages/innova-1.jpg',
    size: 'medium',
  },
  {
    id: 'innova-2',
    sectionId: '',
    eyebrow: 'Constructores',
    title: 'Una cerradura distinta. Por diseño.',
    image: '/ProImages/innova-2.jpg',
    size: 'medium',
  },
  {
    id: 'innova-3',
    sectionId: '',
    eyebrow: 'Constructores',
    title: 'Una cerradura distinta. Por diseño.',
    image: '/ProImages/innova-3.jpg',
    size: 'medium',
  },
  {
    id: 'innova-4',
    sectionId: '',
    eyebrow: 'Constructores',
    title: 'Una cerradura distinta. Por diseño.',
    image: '/ProImages/innova-4.jpg',
    size: 'medium',
  },
];

function ProCard({ card }: { card: ProCard }) {
  // Aspect ratio per size variant
  const aspectClass = {
    wide: 'aspect-[3/2.5]',
    tall: 'aspect-[3/4.5]',
    small: 'aspect-[4/3.5]',
    medium: 'aspect-[4/4.5]',
  }[card.size];

  return (
    <article id={card.sectionId || undefined} className="scroll-mt-28 group">
      <div
        className={`relative w-full ${aspectClass} rounded-[15px] bg-[#d9d9d9] overflow-hidden`}
      >
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
        />
      </div>

      <div className="mt-4 lg:mt-5">
        <p className="text-[#191817] text-[12px] sm:text-[13px] font-neue uppercase tracking-[0.12em]">
          {card.eyebrow}
        </p>
        <h3
          className="mt-1 text-[#191817] text-[20px] sm:text-[22px] lg:text-[24px] font-neue font-normal leading-[1.3]"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          {card.title}
        </h3>
      </div>
    </article>
  );
}

export default function IShkelProPage() {
  return (
    <main className="min-h-screen bg-white font-neue antialiased">
      <Navbar  />

      {/* HERO */}
      <section className="pt-32 sm:pt-36 lg:pt-40 pb-12 lg:pb-16 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1100px] mx-auto text-center">
          <p className="text-[#191817] text-[13px] sm:text-[14px] font-neue tracking-[0.18em] uppercase mb-4">
            iShkel
          </p>
          <h1
            className="text-[#191817] text-[36px] sm:text-[52px] lg:text-[64px] font-neue font-normal leading-[1.08] tracking-[-0.02em]"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Tu cliente ya la quiere. Solo muéstrasela.
          </h1>
        </div>

        {/* FILTER PILLS — client component */}
        <div className="mt-10 lg:mt-12">
          <ProFilterPills pills={FILTER_PILLS} />
        </div>
      </section>

      {/* MASONRY BENTO GALLERY */}
      <section className="pb-16 lg:pb-28 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8">
            {/* Top row */}
            <div className="md:col-span-7">
              <ProCard card={PRO_CARDS[0]} />
            </div>
            <div className="md:col-span-5 md:row-span-2">
              <ProCard card={PRO_CARDS[1]} />
            </div>

            {/* Bottom row */}
            <div className="md:col-span-4">
              <ProCard card={PRO_CARDS[2]} />
            </div>
            <div className="md:col-span-3" aria-hidden="true" />
            <div className="md:col-span-7 md:col-start-6">
              <ProCard card={PRO_CARDS[3]} />
            </div>
          </div>
        </div>
      </section>

      {/* INNOVA CON ISHKEL — horizontal scroll on mobile, grid on desktop */}
      <section className="pb-16 lg:pb-28 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1300px] mx-auto">
          <h2
            className="text-[#191817] text-[32px] sm:text-[44px] lg:text-[56px] font-neue font-normal leading-[1.1] tracking-[-0.02em] mb-8 lg:mb-12"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Innova con iShkel
          </h2>

          {/* Mobile: horizontal scroll. Desktop: 4-column grid */}
          <div
            className="flex gap-4 sm:gap-5 lg:grid lg:grid-cols-4 lg:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none -mx-5 sm:-mx-8 lg:mx-0 px-5 sm:px-8 lg:px-0 pb-4 lg:pb-0 scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {INNOVATION_CARDS.map((card) => (
              <div
                key={card.id}
                className="snap-start shrink-0 w-[78vw] sm:w-[50vw] lg:w-auto"
              >
                <ProCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELEVA TU PROYECTO — CTA banner */}
      <section className="px-5 sm:px-8 lg:px-14 pb-16 lg:pb-24">
        <div className="relative max-w-[1300px] mx-auto rounded-[20px] lg:rounded-[30px] overflow-hidden min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]">
          <Image
            src="/ProImages/eleva-proyecto.jpg"
            alt="Interior premium con cerradura iShkel"
            fill
            className="object-cover"
            sizes="(max-width: 1300px) 100vw, 1300px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

          <div className="relative h-full flex flex-col justify-end p-8 sm:p-12 lg:p-16">
            <div className="max-w-[560px]">
              <h2
                className="text-white text-[32px] sm:text-[44px] lg:text-[55px] font-neue font-medium leading-[1.1] tracking-[-0.02em]"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                El detalle que hace premium tu proyecto.
              </h2>
              <p
                className="mt-5 lg:mt-6 text-white/90 text-[18px] sm:text-[22px] lg:text-[26px] font-neue font-medium leading-[1.35]"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                Soporte en obra, efecto wow en el showroom y capacidad para gran volumen.
              </p>
              <Link
                href="/contact?reason=pro"
                className="inline-flex items-center justify-center mt-8 lg:mt-10 h-12 lg:h-14 px-8 lg:px-10 border-2 border-white rounded-[15px] text-white font-neue text-[16px] lg:text-[18px] hover:bg-white hover:text-[#191817] active:scale-[0.98] transition-all duration-300"
              >
                Eleva tu Proyecto
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}