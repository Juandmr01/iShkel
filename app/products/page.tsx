'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';

const products = [
  {
    id: '1',
    handle: 'cerradura-fx-321312',
    title: 'cerradura-fx-321312',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: true,
    isFeatured: true,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '2',
    handle: 'fx-2025',
    title: 'FX 2025',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: true,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '3',
    handle: 'fx-2024',
    title: 'FX 2024',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '4',
    handle: 'fx-2023',
    title: 'FX 2023',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '5',
    handle: 'fx-2022',
    title: 'FX 2022',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '6',
    handle: 'fx-2021',
    title: 'FX 2021',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
  {
    id: '7',
    handle: 'fx-2020',
    title: 'FX 2020',
    price: '2,00,300',
    image: '/ProductsImages/iShkelSampleFX 1.png',
    isNew: false,
    colors: ['#D9D9D9', '#292929'],
  },
];

const ColorSwatches = ({ colors, size = 'small' }: { colors: string[]; size?: 'small' | 'large' }) => {
  const swatchSize = size === 'large' ? 'w-[25px] h-[25px]' : 'w-[20px] h-[20px]';
  const innerSize = size === 'large' ? 'w-[18.75px] h-[18.75px]' : 'w-[15px] h-[15px]';

  return (
    <div className="flex items-center gap-2">
      {colors.map((color, index) => (
        <button
          key={index}
          className={`${swatchSize} rounded-full border border-[#626262] flex items-center justify-center bg-white`}
        >
          <span
            className={`${innerSize} rounded-full`}
            style={{ backgroundColor: color }}
          />
        </button>
      ))}
    </div>
  );
};

const ProductCard = ({ product }: { product: typeof products[0] }) => (
  <Link href={`/products/${product.handle}`} className="group block">
    <div className="bg-[#fafafa] rounded-[15px] p-4 relative h-60 flex flex-col">
      {product.isNew && (
        <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-[14px] text-black font-normal z-10">
          New
        </span>
      )}
      <div className="relative flex-1 w-full flex items-center justify-center py-4">
        <Image
          src={product.image}
          alt={product.title}
          width={155}
          height={157}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex items-center justify-between pt-2">
        <span className="text-[#191817] text-[10px] font-normal">
          COP {product.price}
        </span>
        <ColorSwatches colors={product.colors} size="small" />
      </div>
    </div>
  </Link>
);

const FeaturedProductCard = ({ product }: { product: typeof products[0] }) => (
  <Link href={`/products/${product.handle}`} className="group block h-full">
    <div className="bg-[#fafafa] rounded-[15px] p-6 relative h-full flex flex-col">
      {product.isNew && (
        <span className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-[14px] text-black font-normal z-10">
          New
        </span>
      )}
      <h3 className="text-[#191817] text-[20px] font-normal tracking-[0.1px] mb-4">
        {product.title}
      </h3>
      <div className="relative flex-1 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={339}
          height={339}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-[#191817] text-[11.8px] font-normal">
          COP {product.price}
        </span>
        <ColorSwatches colors={product.colors} size="large" />
      </div>
    </div>
  </Link>
);

function ProductsNavbar() {
  return <Navbar dark />;
}

const NewsletterSection = () => (
  <section className="bg-[#0e0e0e] py-16 md:py-20">
    <div className="max-w-150 mx-auto text-center px-4">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Image
          src="/Images_Icons/iShekelLogo.png"
          alt="iShkel"
          width={55}
          height={55}
        />
        <span className="text-[#f2f2f2] text-[20px] font-normal">iShkel</span>
      </div>
      <h2 className="text-[#f2f2f2] text-[20px] font-medium tracking-[1.7px] uppercase mb-4">
        Join the iShkel newsletter
      </h2>
      <p className="text-[#f2f2f2] text-[16px] tracking-[0.2px] mb-8">
        Se el primer en disfrutar nuestras ofertas especiales y eventos
      </p>
      <button className="px-8 py-3 border-2 border-[#f2f2f2] rounded-[15px] text-[#f2f2f2] text-[14.6px] font-medium hover:bg-[#f2f2f2] hover:text-[#0e0e0e] transition-colors duration-300">
        Regístrate hoy!
      </button>
    </div>
  </section>
);

const ProductsFooter = () => (
  <footer className="bg-black py-12 md:py-16 px-4 md:px-8 lg:px-12">
    <div className="max-w-340 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto] gap-12">
        <div className="max-w-88.25">
          <h3 className="text-white text-[22.6px] font-light tracking-[-1.56px] mb-4">
            iShkel
          </h3>
          <p className="text-white/70 text-[16px] leading-6 tracking-[-0.64px] mb-6">
            Especialistas en cerraduras inteligentes premium con instalación certificada en puertas tradicionales y de alta seguridad. Líder en Colombia desde 2018.
          </p>
          <p className="text-white/70 text-[16px] tracking-[-0.64px]">
            © 2026 iShkel, Created by Diego
          </p>
        </div>
        <div className="flex gap-12 md:gap-16 lg:gap-20">
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">Pages</h4>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/works" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Works</Link></li>
              <li><Link href="/contact" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/404" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">404</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">Info</h4>
            <ul className="space-y-3">
              <li><Link href="/terminos" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Termino</Link></li>
              <li><Link href="/privacidad" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">Sociales</h4>
            <ul className="space-y-3">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">YouTube</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Facebook</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">TikTok</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default function ProductsPage() {
  const featuredProduct = products.find((p) => p.isFeatured) || products[0];
  const gridProducts = products.filter((p) => !p.isFeatured);

  return (
    <main className="min-h-screen bg-white font-neue">
      <ProductsNavbar />

      <section className="pt-24 md:pt-28 pb-8 md:pb-12 px-4 md:px-8 lg:px-14">
        <div className="max-w-340 mx-auto">
          <h1 className="text-[32px] md:text-[42px] font-normal text-[#0e0e0e] tracking-[-0.64px] mb-8 md:mb-10">
            Cerradura para tu casa
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-[439px_1fr] gap-6">
            <div className="h-124.5">
              <FeaturedProductCard product={featuredProduct} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[240px]">
              {gridProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full h-125 md:h-189.75 overflow-hidden">
        <Image
          src="/ProductsImages/hero-image.png"
          alt="Seguridad inteligente para su hogar"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute bottom-12 left-8 md:left-16 lg:left-24">
          <h2 className="text-[#f2f2f2] text-[32px] md:text-[42px] font-normal tracking-[-0.64px] leading-[1.2] max-w-91">
            Ingenieria y seguridad biometrica 3d por primera vez en Colombia.
          </h2>
        </div>
      </section>

      <NewsletterSection />
      <ProductsFooter />
    </main>
  );
}
