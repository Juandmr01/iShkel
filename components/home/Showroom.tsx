'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

type SelectedOption = { name: string; value: string };

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  selectedOptions: SelectedOption[];
};

type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { nodes: { url: string; altText: string | null }[] };
  options?: { name: string; values: string[] }[];
  variants?: { nodes: Variant[] };
};

type ShowroomProps = { product: Product };

// Visual mapping for swatches (Shopify just stores names, we map them to visuals)
const COLOR_SWATCHES: Record<string, string> = {
  Plateado: '#D9D9D9',
  Negro: '#292929',
  'Negro Azabache': '#292929',
  Plata: '#D9D9D9',
};

const MATERIAL_IMAGES: Record<string, string> = {
  Madera: '/Images_Icons/ColorChoice1.png',
  Metal: '/Images_Icons/ColorChoice2.png',
  Blindado: '/Images_Icons/ColorChoice3.png',
  Blindada: '/Images_Icons/ColorChoice3.png',
};

export default function Showroom({ product }: ShowroomProps) {
  const images = product.images.nodes;
  const variants = product.variants?.nodes ?? [];
  const options = product.options ?? [];

  // Find which option is the "Color" and which is the "Material"
  const colorOption = options.find((o) => o.name.toLowerCase() === 'color');
  const materialOption = options.find((o) =>
    ['material', 'tipo', 'tipo de puerta'].includes(o.name.toLowerCase())
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    colorOption?.values[0]
  );
  const [selectedMaterial, setSelectedMaterial] = useState<string | undefined>(
    materialOption?.values[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

const activeVariant = useMemo(() => {
  if (!variants.length) return undefined;

  return (
    variants.find((v) => {
      // Defensive: if a variant has no options, skip matching
      if (!v.selectedOptions || v.selectedOptions.length === 0) return false;

      return v.selectedOptions.every((opt) => {
        if (opt.name.toLowerCase() === 'color') return opt.value === selectedColor;
        if (
          ['material', 'tipo', 'tipo de puerta'].includes(opt.name.toLowerCase())
        )
          return opt.value === selectedMaterial;
        return true;
      });
    }) ?? variants[0]
  );
}, [variants, selectedColor, selectedMaterial]);

  const price = parseFloat(
    activeVariant?.price.amount ?? product.priceRange.minVariantPrice.amount
  );
  const formattedPrice = `COP ${price.toLocaleString('es-CO')}`;
  const variantId = activeVariant?.id;
  const isOutOfStock = activeVariant && !activeVariant.availableForSale;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const handleBuyNow = async () => {
    if (!variantId) {
      window.location.href = `https://ishkel.myshopify.com/products/${product.handle}`;
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId, quantity: 1 }),
      });
      const data = await response.json();
      window.location.href =
        data.checkoutUrl ?? `https://ishkel.myshopify.com/products/${product.handle}`;
    } catch (error) {
      console.error('Checkout error:', error);
      window.location.href = `https://ishkel.myshopify.com/products/${product.handle}`;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!variantId) {
      alert('Producto no disponible');
      return;
    }
    setIsAddingToCart(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId, quantity: 1 }),
      });
      const data = await response.json();
      if (data.success) {
        window.dispatchEvent(
          new CustomEvent('cart-updated', { detail: { openDrawer: true } })
        );
      } else {
        alert('Error al añadir al carrito');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Error al añadir al carrito');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <section className="bg-[#f2f2f2] w-full py-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row items-start gap-0">
          {/* Left - Carousel */}
          <div className="w-full lg:w-[58%] relative">
            <div className="relative rounded-[15px] overflow-hidden bg-white h-80 sm:h-[480px] lg:h-[650px] w-full mt-0 lg:mt-12">
              {images.map((image, i) => (
                  <Image
                    key={image.url}
                    src={image.url}
                    alt={image.altText || `${product.title} - imagen ${i + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-500 ease-out ${
                      i === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                ))}
              <button
                onClick={prevImage}
                aria-label="Imagen anterior"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-[45px] h-[45px] z-20 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#191817" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                onClick={nextImage}
                aria-label="Imagen siguiente"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-[45px] h-[45px] z-20 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#191817" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    aria-label={`Ir a imagen ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentImage
                        ? 'w-[8px] h-[8px] bg-[#191817]'
                        : 'w-[4px] h-[4px] bg-[#8c8c8c]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Info */}
          <div className="w-full lg:w-[42%] lg:pl-[80px] flex flex-col justify-center py-10 lg:py-16">
            <div className="pb-2">
              <p className="font-neue font-normal text-[15px] text-[#070707]">iShkel</p>
              <h2 className="font-neue font-medium text-[22px] text-[#070707] leading-tight">
                {product.title}
              </h2>
            </div>

            <div className="pt-2 pb-4">
              <p className="font-neue font-medium text-[14px] text-[#070707] leading-[20px]">
                {product.description}
              </p>
            </div>

            {/* COLOR SELECTOR */}
            {colorOption && (
              <div className="flex items-center justify-between py-[21px] border-t border-b border-[#191817]">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="font-neue font-normal text-[13px] text-[#9a9a9a]">
                    Color:
                  </span>
                  <span
                    key={`color-${selectedColor}`}
                    className="font-neue font-medium text-[14px] text-[#191817] inline-block animate-[labelSlide_0.35s_ease-out]"
                  >
                    {selectedColor}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {colorOption.values.map((colorName) => {
                    const isActive = selectedColor === colorName;
                    const swatchColor = COLOR_SWATCHES[colorName] ?? '#D9D9D9';
                    return (
                      <button
                        key={colorName}
                        onClick={() => setSelectedColor(colorName)}
                        aria-label={`Seleccionar color ${colorName}`}
                        aria-pressed={isActive}
                        className={`relative w-[28px] h-[28px] rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
                          isActive
                            ? 'ring-2 ring-[#191817] ring-offset-2 ring-offset-[#f2f2f2]'
                            : 'ring-1 ring-[#c4c4c4] hover:ring-[#626262]'
                        }`}
                      >
                        <span
                          className={`block rounded-full transition-all duration-300 ease-out ${
                            isActive ? 'w-[18px] h-[18px]' : 'w-[20px] h-[20px]'
                          }`}
                          style={{ backgroundColor: swatchColor }}
                        />
                        {isActive && (
                          <svg
                            className="absolute inset-0 m-auto w-3 h-3 text-white pointer-events-none mix-blend-difference animate-[checkPop_0.3s_ease-out]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MATERIAL SELECTOR */}
            {materialOption && (
              <div className="flex items-center justify-between py-[20px] border-b border-[#191817]">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="font-neue font-normal text-[13px] text-[#9a9a9a]">
                    Instalado en:
                  </span>
                  <span
                    key={`material-${selectedMaterial}`}
                    className="font-neue font-medium text-[14px] text-[#191817] inline-block animate-[labelSlide_0.35s_ease-out]"
                  >
                    {selectedMaterial}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {materialOption.values.map((materialName) => {
                    const isActive = selectedMaterial === materialName;
                    const imageSrc = MATERIAL_IMAGES[materialName];
                    return (
                      <button
                        key={materialName}
                        onClick={() => setSelectedMaterial(materialName)}
                        aria-label={`Seleccionar material ${materialName}`}
                        aria-pressed={isActive}
                        className={`relative w-[28px] h-[28px] rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ease-out ${
                          isActive
                            ? 'ring-2 ring-[#191817] ring-offset-2 ring-offset-[#f2f2f2] scale-105'
                            : 'ring-1 ring-[#aca69f] hover:ring-[#626262] hover:scale-105'
                        }`}
                      >
                        {imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={materialName}
                            width={28}
                            height={28}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span
                            className="block w-full h-full"
                            style={{ backgroundColor: '#aca69f' }}
                          />
                        )}
                        {isActive && (
                          <span className="absolute inset-0 bg-black/10 pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Benefits */}
            <div className="pt-6 pb-4 space-y-2">
              {[
                'Envío Gratis (Contra entrega)',
                'Soporte 24/7',
                'Hasta 2 años de garantía',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7l3.5 3.5L12 4"
                      stroke="#626262"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-neue font-medium text-[14px] text-[#626262]">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Price — animates when variant changes */}
            <div className="pt-2 pb-4">
              <p
                key={`price-${variantId}`}
                className="font-neue font-normal text-[24px] text-[#191817] animate-[labelSlide_0.4s_ease-out]"
              >
                {formattedPrice}
              </p>
              {isOutOfStock && (
                <p className="font-neue text-[13px] text-[#c62828] mt-1">
                  Esta combinación está agotada
                </p>
              )}
            </div>

            <button
              onClick={handleBuyNow}
              disabled={isLoading || isOutOfStock}
              className="w-full h-[48px] rounded-[15px] border-2 border-[#191817] flex items-center justify-center hover:bg-[#191817] hover:text-white transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-neue font-medium text-[14.5px] text-[#191817] tracking-[0.1px] group-hover:text-white transition-colors duration-300">
                {isLoading ? 'Cargando...' : 'Comprar ahora'}
              </span>
            </button>

            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || isOutOfStock}
              className="relative mt-3 w-full h-[48px] group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 rounded-[15px] bg-gradient-to-r from-[#3b3b3b] to-[#a1a1a1] blur-[2px] opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="relative rounded-[15px] bg-gradient-to-r from-[#3b3b3b] to-[#a1a1a1] p-[2px] w-full h-[48px]">
                <div className="rounded-[13px] bg-[#070707] w-full h-full flex items-center justify-center relative overflow-hidden">
                  <span className="relative z-10 font-neue font-normal text-[20px] text-white">
                    {isAddingToCart ? 'Añadiendo...' : 'Añadir al carrito'}
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}