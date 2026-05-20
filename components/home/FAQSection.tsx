'use client';

import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  videoLink?: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: '¿Tienen servicio de instalación?',
    answer: 'Sí, iShkel maneja instalación en todas las ciudades de Colombia, con sedes virtuales 100% directas de la marca en ciudades como Bogotá, Medellín, Pereira, Manizales y Armenia.',
  },
  {
    id: 2,
    question: '¿Cómo sé si me sirve la serie Fx en mi puerta?',
    answer: 'Si estás en Bogotá puedes agendar una visita previa y evaluaremos tu puerta a fondo, llevando la chapa digital para que puedas ver cómo se vería antes de instalar. Si estás fuera de Bogotá, analizaremos tu puerta a través de nuestros sistemas digitales.',
  },
  {
    id: 3,
    question: '¿Son seguras?',
    answer: 'No lo respondemos nosotros — nuestros sistemas de encriptación, materiales y pruebas que la marca ha hecho y documentado lo comprueban.',
    videoLink: '#',
  },
  {
    id: 4,
    question: '¿La visita tiene costo?',
    answer: 'La visita previa es sin costo. Solo disponible en Bogotá y alrededores.',
  },
  {
    id: 5,
    question: '¿Cuántas huellas reconoce?',
    answer: 'iShkel piensa en familias y contextos masivos. Si tu puerta tiene que pasar más de 150 personas, las reconoce sin problema.',
  },
];

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-5 h-5 text-black transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const QuestionIcon = () => (
  <svg className="w-4 h-4 text-black" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6 6C6 4.89543 6.89543 4 8 4C9.10457 4 10 4.89543 10 6C10 6.83333 9.5 7.5 8.5 8C8 8.25 8 8.5 8 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
  </svg>
);

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-[#F2F2F2] py-16 md:py-20 lg:py-24 px-4">
      {/* Main Container - Centered */}
      <div className="flex flex-col items-center justify-center w-full">
        
        {/* Header - Centered */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
          {/* FAQS Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] rounded-full shadow-[0px_1px_2px_rgba(0,0,0,0.1),0px_4px_8px_rgba(0,0,0,0.05)] mb-6">
            <QuestionIcon />
            <span className="text-[12px] font-medium text-black tracking-wide">FAQS</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-[50px] font-medium text-black leading-tight tracking-tight mb-4">
            Preguntas? Respuestas
          </h2>

          {/* Subtitle */}
          <p className="text-base text-black/80">
            Encuentra y resuelves tus dudas aqui.
          </p>
        </div>

        {/* FAQ Accordion - Centered with fixed width */}
        <div className="w-full max-w-[668px] space-y-4 mb-12">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#F3F2F0] rounded-[15px] overflow-hidden transition-all duration-300"
                style={{
                  boxShadow: 'inset 0px 3px 1px 0px white, 0px 1px 2px rgba(0,0,0,0.08), 0px 4px 8px rgba(0,0,0,0.05)',
                }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between px-4 md:px-6 py-4 md:py-5 text-left"
                >
                  <span className="text-black text-base md:text-[16px] font-normal pr-4">
                    {faq.question}
                  </span>
                  <ChevronIcon isOpen={isOpen} />
                </button>

                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="px-4 md:px-6 pb-5 pt-0">
                    <p className="text-black/80 text-sm md:text-[14px] leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.videoLink && (
                      <a
                        href={faq.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
                      >
                        Ver video de pruebas →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA - Centered */}
        <div className="flex flex-col items-center text-center">
          <p className="text-black text-base mb-4">
            No encontraste tu pregunta aqui? Click abajo
          </p>
          <button className="px-12 md:px-16 py-3 md:py-4 border-2 border-[#191817] rounded-[15px] text-[#191817] text-sm md:text-[16px] font-medium hover:bg-[#191817] hover:text-white transition-colors duration-300">
            Soporte 24/7
          </button>
        </div>
      </div>
    </section>
  );
}