'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const SUPPORT_LINKS = [
  { id: 'instalar', label: 'Cómo instalar', shortLabel: 'Instalar' },
  { id: 'ordenar', label: 'Cómo ordenar', shortLabel: 'Ordenar' },
  { id: 'contraentrega', label: 'Pago contraentrega', shortLabel: 'Contraentrega' },
  { id: 'visitas', label: 'Visitas gratis', shortLabel: 'Visitas' },
  { id: 'compatible', label: 'Compatibilidad', shortLabel: 'Compatible' },
  { id: 'internet', label: 'Sin internet', shortLabel: 'Internet' },
];

const FAQS = [
  {
    id: 'instalar',
    question: 'Cómo instalo iShkel en mi puerta',
    answer: (
      <>
        <p className="mb-4">
          La instalación es completamente sin obras. iShkel se adapta a cerraduras estándar
          colombianas y no necesitas herramientas especiales.
        </p>
        <ol className="list-decimal pl-5 space-y-2 marker:text-[#070707] marker:font-medium">
          <li>Retira tu cerradura actual (tornillo y placa trasera)</li>
          <li>Coloca el módulo iShkel en el mismo espacio</li>
          <li>Conecta la app y empareja en menos de 2 minutos</li>
        </ol>
      </>
    ),
  },
  {
    id: 'ordenar',
    question: '¿Cómo ordenar mi cerradura?',
    answer: (
      <p>
        Puedes comprar directamente desde nuestra tienda online. Selecciona tu modelo,
        agrega al carrito y elige entre pago en línea o contra entrega. Envío gratis a
        todo Colombia.
      </p>
    ),
  },
  {
    id: 'contraentrega',
    question: '¿Puedo pagar contra entrega?',
    answer: (
      <p>
        Sí. Ofrecemos pago contraentrega en las principales ciudades de Colombia:
        Bogotá, Medellín, Cali, Barranquilla y más. Solo pagas cuando recibes tu iShkel
        en casa.
      </p>
    ),
  },
  {
    id: 'visitas',
    question: '¿Visitas gratis?',
    answer: (
      <p>
        Sí. Ofrecemos visitas técnicas gratuitas en Bogotá, Medellín y Cali para
        ayudarte con la instalación. Agenda la tuya después de tu compra. Llámanos al{' '}
        <a
          href="tel:+573134348706"
          className="text-[#070707] font-medium underline underline-offset-4 decoration-[#070707]/30 hover:decoration-[#070707] transition-colors"
        >
          313 434 8706
        </a>
        .
      </p>
    ),
  },
  {
    id: 'compatible',
    question: '¿Es compatible con mi puerta?',
    answer: (
      <p>
        iShkel es compatible con la gran mayoría de puertas residenciales y comerciales
        en Colombia. Funciona con cerraduras de mortaja y embutidas estándar. Si tienes
        dudas, escríbenos y te ayudamos.
      </p>
    ),
  },
  {
    id: 'internet',
    question: '¿Puedo usarla sin internet?',
    answer: (
      <p>
        Sí. iShkel funciona sin internet para acceso por huella dactilar y código PIN.
        La app y las notificaciones en tiempo real requieren conexión, pero tu puerta
        siempre responde.
      </p>
    ),
  },
];

/* ---------- Desktop Sidebar ---------- */
function DesktopSidebar({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <aside className="hidden lg:block w-[340px] xl:w-[380px] shrink-0">
      <div className="sticky top-28 pt-10 pl-4 xl:pl-12">
        <p className="text-[13px] tracking-wide uppercase text-[#9a9a9a] mb-3 font-neue">
          Centro de ayuda
        </p>
        <h2 className="text-[30px] xl:text-[34px] font-medium text-[#070707] mb-8 font-neue tracking-tight">
          iShkel Soporte
        </h2>

        <nav>
          <ul className="space-y-1">
            {SUPPORT_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className={`relative w-full text-left py-2 pl-4 pr-3 rounded-lg text-[16px] xl:text-[17px] font-neue transition-all duration-300 ease-out ${
                      isActive
                        ? 'text-[#070707] font-medium bg-[#f5f5f5]'
                        : 'text-[#626262] hover:text-[#070707] hover:bg-[#fafafa]'
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full bg-[#070707] transition-all duration-300 ${
                        isActive ? 'h-5 opacity-100' : 'h-0 opacity-0'
                      }`}
                    />
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

/* ---------- Mobile Sticky Tabs ---------- */
function MobileTabs({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const activeTab = tabRefs.current[activeSection];
    const scroller = scrollerRef.current;
    if (!activeTab || !scroller) return;

    const tabRect = activeTab.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    const offset =
      activeTab.offsetLeft - scroller.offsetLeft - (scrollerRect.width - tabRect.width) / 2;

    scroller.scrollTo({ left: offset, behavior: 'smooth' });
  }, [activeSection]);

  return (
    // top-20 == Navbar h-20 (80px). Sits flush under the Navbar.
    <div className="lg:hidden sticky top-20 z-40 bg-white/85 backdrop-blur-xl border-b border-[#ececec]">
      <div
        ref={scrollerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-5 py-3"
        style={{ scrollbarWidth: 'none' }}
      >
        {SUPPORT_LINKS.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              ref={(el) => {
                tabRefs.current[link.id] = el;
              }}
              onClick={() => onNavigate(link.id)}
              className={`shrink-0 px-4 h-10 rounded-full text-[14px] font-neue font-medium transition-all duration-300 ease-out active:scale-95 ${
                isActive
                  ? 'bg-[#070707] text-white shadow-sm'
                  : 'bg-[#f3f3f3] text-[#626262] hover:bg-[#ececec]'
              }`}
            >
              {link.shortLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- FAQ Content ---------- */
function FAQContent() {
  return (
    <main className="flex-1 px-5 sm:px-8 lg:px-16 lg:border-l lg:border-[#ececec] lg:pt-16 lg:pb-24">
      <div className="max-w-[720px] mx-auto lg:mx-0">
        <header className="lg:hidden pt-8 pb-6">
          <p className="text-[12px] tracking-wide uppercase text-[#9a9a9a] mb-2 font-neue">
            Centro de ayuda
          </p>
          <h1
            className="text-[34px] sm:text-[38px] font-medium text-[#070707] font-neue tracking-tight leading-[1.1]"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            iShkel Soporte
          </h1>
          <p
            className="mt-3 text-[15px] text-[#626262] font-neue leading-relaxed"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Todo lo que necesitas saber sobre tu cerradura inteligente.
          </p>
        </header>

        <div className="space-y-4 sm:space-y-5 lg:space-y-6 pb-16 lg:pb-0">
          {FAQS.map((faq, idx) => (
            <article
              key={faq.id}
              id={faq.id}
              className="scroll-mt-36 lg:scroll-mt-28 rounded-2xl bg-[#fafafa] lg:bg-transparent p-6 sm:p-7 lg:p-0 lg:mb-12"
              style={{
                animation: 'fadeUp 0.6s ease-out both',
                animationDelay: `${idx * 60}ms`,
              }}
            >
              <h3
                className="text-[22px] sm:text-[24px] lg:text-[32px] xl:text-[36px] font-medium text-[#070707] mb-3 lg:mb-4 leading-[1.25] lg:leading-[1.3] font-neue tracking-tight"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                {faq.question}
              </h3>
              <div
                className="text-[15px] sm:text-[16px] lg:text-[19px] text-[#626262] leading-[1.65] font-neue"
                style={{ textWrap: 'pretty' } as React.CSSProperties}
              >
                {faq.answer}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        :global(.scrollbar-hide::-webkit-scrollbar) {
          display: none;
        }
      `}</style>
    </main>
  );
}

/* ---------- Page ---------- */
export default function SoportePage() {
  const [activeSection, setActiveSection] = useState<string>('instalar');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const isMobile = window.innerWidth < 1024;
    // mobile: 80 (navbar) + 64 (tabs) + buffer; desktop: 80 (navbar) + buffer
    const offset = isMobile ? 160 : 110;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  useEffect(() => {
    const ids = SUPPORT_LINKS.map((l) => l.id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white font-neue antialiased">
      {/* Shared Navbar — default mode (transparent → white on scroll) works perfectly on this white page */}
      <Navbar />

      {/* Mobile sticky tabs sit just below the fixed Navbar */}
      <MobileTabs activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Push content below fixed Navbar (h-20 = 80px). Extra top padding on desktop. */}
      <div className="pt-20 lg:pt-24 flex max-w-[1440px] mx-auto">
        <DesktopSidebar activeSection={activeSection} onNavigate={scrollToSection} />
        <FAQContent />
      </div>

      <Footer />
    </div>
  );
}