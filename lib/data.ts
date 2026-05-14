export interface Testimonial {
  id: number;
  image: string;
  username: string;
  height: 'tall' | 'medium' | 'short';
  offsetY: 'top' | 'middle' | 'bottom';
  comment?: string;
}

export interface Brand {
  name: string;
  src: string;
  width: number;
  height: number;
  extra?: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const testimonials: Testimonial[] = [
  { id: 1, image: '/Images_Icons/testimonial_1.png', comment: 'Excelente servicio y calidad de los productos.', username: 'alvarojosevera', height: 'tall', offsetY: 'bottom' },
  { id: 2, image: '/Images_Icons/test_2.png', comment: 'Muy satisfecho con la instalación y el soporte.', username: 'Juandmr_01', height: 'tall', offsetY: 'middle' },
  { id: 3, image: '/Images_Icons/test_3.jpg', comment: 'La mejor opción para mi proyecto inmobiliario.', username: 'Pablo_Garcia', height: 'medium', offsetY: 'top' },
  { id: 4, image: '/Images_Icons/Collage_Image_5.png', comment: 'Confianza total en la marca y su equipo.', username: 'Chavez_2', height: 'tall', offsetY: 'middle' },
  { id: 5, image: '/Images_Icons/homePageImg.jpeg', comment: 'Un gran valor agregado para nuestro negocio.', username: 'Pequenin_galactic', height: 'tall', offsetY: 'bottom' },
];

export const brands: Brand[] = [
  { name: 'CISA', src: '/Images_Icons/cisaLogo.png', width: 200, height: 200 },
  { name: 'MOIA', src: '/Images_Icons/moiaLogo.png', width: 200, height: 200 },
  { name: 'SECUREMME', src: '/Images_Icons/securemme.png', width: 274, height: 124, extra: 'pt-[15px]' },
  { name: 'KALE', src: '/Images_Icons/kaleLogo.png', width: 180, height: 180 },
  { name: 'FIAM', src: '/Images_Icons/fiamLogo.png', width: 183, height: 65 },
  { name: 'KALE KILIT', src: '/Images_Icons/KaleLilit.png', width: 200, height: 49 },
];

export const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'Que es iShkel Pro',
    answer: 'iShkel Pro es nuestro programa exclusivo para constructores y desarrolladores inmobiliarios que ofrece precios preferenciales, soporte prioritario y asesoría personalizada para proyectos de gran escala.',
  },
  {
    id: 2,
    question: 'Cuanto se demora la instalacion de mi cerradura',
    answer: 'La instalación típica toma entre 1-2 horas dependiendo del tipo de puerta. Nuestros técnicos certificados se encargan de todo el proceso, incluyendo la configuración inicial de la app.',
  },
  {
    id: 3,
    question: 'Que garantía tienen las cerraduras?',
    answer: 'Todas nuestras cerraduras incluyen garantía extendida de hasta 20 meses que cubre defectos de fabricación y problemas técnicos. Además, ofrecemos soporte técnico 24/7.',
  },
  {
    id: 4,
    question: 'Puedo instalar la cerradura yo mismo?',
    answer: 'Recomendamos la instalación profesional para garantizar el correcto funcionamiento. Sin embargo, ofrecemos guías detalladas y soporte por videollamada si prefieres hacerlo tú mismo.',
  },
  {
    id: 5,
    question: 'Que pasa si se va la luz?',
    answer: 'Nuestras cerraduras cuentan con batería de respaldo que dura hasta 18 meses. Además, todas incluyen una llave mecánica de emergencia para acceso sin batería.',
  },
];
