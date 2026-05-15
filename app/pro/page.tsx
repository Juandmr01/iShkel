// app/pro/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import FAQSection from '@/components/home/FAQSection';
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

type CardSize = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'innova';

type ProCard = {
  id: string;
  sectionId: string;
  eyebrow: string;
  title: string;
  image: string;
};

const PRO_CARDS: ProCard[] = [
  {
    id: 'card-1',
    sectionId: 'distribuidor',
    eyebrow: 'Distribuidores',
    title: 'Margen, soporte y respaldo de marca.',
    image: '/ProImages/pro-1.jpg',
  },
  {
    id: 'card-2',
    sectionId: 'constructor',
    eyebrow: 'Constructores',
    title: 'Una cerradura distinta. Por diseño.',
    image: '/ProImages/pro-2.jpg',
  },
  {
    id: 'card-3',
    sectionId: 'instalador',
    eyebrow: 'Instaladores',
    title: 'Instalación sin obras. Soporte 24/7.',
    image: '/ProImages/pro-3.jpg',
  },
  {
    id: 'card-4',
    sectionId: 'airbnb',
    eyebrow: 'Airbnb / Hotel',
    title: 'Códigos temporales, sin contacto.',
    image: '/ProImages/pro-4.jpg',
  },
];

const INNOVATION_CARDS: ProCard[] = [
  {
    id: 'innova-1',
    sectionId: '',
    eyebrow: 'Constructores',
    title: 'Una cerradura distinta. Por diseño.',
    image: '/ProImages/innova-1.jpg',
  },
  {
    id: 'innova-2',
    sectionId: '',
    eyebrow: 'Constructores',
    title: 'Una cerradura distinta. Por diseño.',
    image: '/ProImages/innova-2.jpg',
  },
  {
    id: 'innova-3',
    sectionId: '',
    eyebrow: 'Constructores',
    title: 'Una cerradura distinta. Por diseño.',
    image: '/ProImages/innova-3.jpg',
  },
  {
    id: 'innova-4',
    sectionId: '',
    eyebrow: 'Constructores',
    title: 'Una cerradura distinta. Por diseño.',
    image: '/ProImages/innova-4.jpg',
  },
];

function ProCard({ card, size }: { card: ProCard; size: CardSize }) {
  const aspectClass = {
    topLeft: 'aspect-[741/533]',
    topRight: 'aspect-[490/774]',
    bottomLeft: 'aspect-[500/533]',
    bottomRight: 'aspect-[741/533]',
    innova: 'aspect-[400/392]',
  }[size];

  return (
    <article id={card.sectionId || undefined} className="scroll-mt-18 group">
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
      <Navbar dark />

      {/* HERO */}
      <section className="pt-32 sm:pt-36 lg:pt-40 pb-12 lg:pb-16 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1100px] mx-auto text-center">
          <p className="text-[#191817] text-[20px] sm:text-[20px] font-neue tracking-[0.18em] uppercase mb-4">
            iShkel
          </p>
          <h1
            className="text-[#191817] text-[36px] sm:text-[52px] lg:text-[64px] font-neue font-normal leading-[1.08] tracking-[-0.02em]"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Tu cliente ya la quiere. Solo muéstrasela.
          </h1>
        </div>

        {/* FILTER PILLS */}
        <div className="mt-10 lg:mt-12">
          <ProFilterPills pills={FILTER_PILLS} />
        </div>
      </section>

      {/* BENTO GALLERY */}
<section className="pb-16 lg:pb-28 px-5 sm:px-8 lg:px-14">
  <div className="max-w-[1300px] mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
      
      {/* Row 1, Card 1 — Top left (wide landscape) */}
      <div className="md:col-span-7">
        <ProCard card={PRO_CARDS[0]} size="topLeft" />
      </div>

      {/* Row 1, Card 2 — Top right (tall portrait) */}
      {/* We keep row-span-2 so it creates the height on the right side */}
      <div className="md:col-span-5 md:row-span-2">
        <ProCard card={PRO_CARDS[1]} size="topRight" />
      </div>

      {/* Row 2, Card 3 — Bottom left */}
      <div className="md:col-span-5">
        <ProCard card={PRO_CARDS[2]} size="bottomLeft" />
      </div>

      {/* Row 2, Card 4 — Bottom right (The "Higher" Card) */}
      <div className="md:col-span-7 md:col-start-6 md:-mt-32 lg:-mt-78 z-10">
        <ProCard card={PRO_CARDS[3]} size="bottomRight" />
      </div>
      
    </div>
  </div>
</section>

      {/* INNOVA CON ISHKEL */}
      <section className="pb-16 lg:pb-28 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1300px] mx-auto">
          <h2
            className="text-[#191817] text-[32px] sm:text-[44px] lg:text-[56px] font-neue font-normal leading-[1.1] tracking-[-0.02em] mb-8 lg:mb-12"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Innova con iShkel
          </h2>

          <div
            className="flex gap-4 sm:gap-5 lg:grid lg:grid-cols-4 lg:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none -mx-5 sm:-mx-8 lg:mx-0 px-5 sm:px-8 lg:px-0 pb-4 lg:pb-0 scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {INNOVATION_CARDS.map((card) => (
              <div
                key={card.id}
                className="snap-start shrink-0 w-[78vw] sm:w-[50vw] lg:w-auto"
              >
                <ProCard card={card} size="innova" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELEVA TU PROYECTO — FULL-BLEED CTA */}
      <section className="relative w-full min-h-[800px] sm:min-h-[760px] lg:min-h-[1300px] overflow-hidden">
        <Image
          src="/Images_Icons/proHereImg.png"
          alt="Interior premium con cerradura iShkel"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Gradient overlay — strongest on the left where text sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

        {/* Content — vertically centered, left-aligned */}
        <div className="relative z-10 min-h-[800px] sm:min-h-[760px] lg:min-h-[1300px] flex flex-col justify-left pt-32 pl-[-100px] sm:pt-36 lg:pt-40">
          <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-16">
            <div className="max-w-[600px]">
              <h2
                className="text-white text-[34px] sm:text-[48px] lg:text-[64px] font-neue font-medium leading-[1.08] tracking-[-0.02em]"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                El detalle que hace premium tu proyecto.
              </h2>

              <p
                className="mt-6 lg:mt-8 text-white/90 text-[18px] sm:text-[22px] lg:text-[28px] font-neue font-medium leading-[1.35] max-w-[520px]"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                Soporte en obra, efecto wow en el showroom y capacidad para gran volumen.
              </p>

              <Link
                href="/contact?reason=pro"
                className="inline-flex items-center justify-center mt-10 lg:mt-12 h-12 lg:h-14 px-8 lg:px-10 border-2 border-white rounded-[15px] text-white font-neue text-[17px] lg:text-[20px] hover:bg-white hover:text-[#191817] active:scale-[0.98] transition-all duration-300"
              >
                Eleva tu Proyecto
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FAQSection />      
      <Footer />
    </main>
  );
}