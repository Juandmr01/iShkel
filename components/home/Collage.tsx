import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  image: string;
  alt: string;
  href?: string;
  width: number;
  height: number;
}

const products: Product[] = [
  { id: 1, image: '/Images_Icons/Collage_Image_1.png', alt: 'Smart Lock iShkel - Black Modern Design', href: '/products', width: 440, height: 560 },
  { id: 2, image: '/Images_Icons/Collage_Image_2.png', alt: 'Smart Lock iShkel - Decorated Door', href: '/products', width: 350, height: 530 },
  { id: 3, image: '/Images_Icons/Collage_Image_3.png', alt: 'Smart Lock iShkel - Silver Model', href: '/products', width: 440, height: 560 },
  { id: 4, image: '/Images_Icons/Collage_Image_4.png', alt: 'Smart Lock iShkel - Touchscreen', href: '/products', width: 440, height: 560 },
  { id: 5, image: '/Images_Icons/Collage_Image_5.png', alt: 'Smart Lock iShkel - Wall Mounted', href: '/products', width: 340, height: 560 },
  { id: 6, image: '/Images_Icons/Collage_Image_6.png', alt: 'Smart Lock iShkel - Modern Interior', href: '/products', width: 440, height: 560 },
];

export default function CollageSection() {
  const column1 = [products[0], products[3]];
  const column2 = [products[1], products[4]];
  const column3 = [products[2], products[5]];

  return (
    <section className="w-full bg-[#F3F3F3] py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-neue font-medium text-[#1a1a1a] mt-3 mb-4 leading-tight">
            Projectos{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #626262 0%, #1a1a1a 50%, #626262 100%)',
              }}
            >
              iShkel
            </span>
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed max-w-xl mx-auto">
            Somos la elección predilecta en Bogotá, Medellín, y el eje Cafetero 
            para quienes buscan reemplazar sus chapas tradicionales por la tecnologia de iShkel elegancia y control total.
          </p>
        </div>

        {/* Masonry columns — desktop: 3 cols, mobile: 2 cols */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 items-start">

          {/* Column 1 — offset down */}
          <div className="flex flex-col gap-4 md:gap-5 mt-20 md:mt-42">
            {column1.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Column 2 — starts at top */}
          <div className="flex flex-col gap-4 md:gap-5">
            {column2.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Column 3 — offset down (hidden on mobile, merged into 2-col grid) */}
          <div className="hidden md:flex flex-col gap-5 mt-42">
            {column3.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="relative group overflow-hidden bg-[#e0e0e0] rounded-[15px]"
      style={{ aspectRatio: `${product.width} / ${product.height}` }}
    >
      <Image
        src={product.image}
        alt={product.alt}
        width={product.width}
        height={product.height}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Gradient overlay — fades in on hover */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-[15px]" />

      {/* Button — slides up on hover */}
      <Link
        href={product.href || '/products'}
        className="absolute bottom-4 left-4 right-4 flex items-center justify-center py-3.5 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white/35"
      >
        <span className="text-sm font-medium text-white">
          Ver Producto
        </span>
      </Link>
    </div>
  );
}
