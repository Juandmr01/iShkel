// components/products/ProductShowroom.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { ShopifyProduct } from '@/lib/shopify';

interface ProductShowroomProps {
  product: ShopifyProduct;
  formattedPrice: string;
}

const FEATURES = [
  'Envío Gratis (Contra entrega)',
  'Soporte 24/7',
  'Hasta 2 años de garantía',
];

// Map color names from Shopify options to swatch colors
const COLOR_SWATCHES: Record<string, string> = {
  'Negro Azabache': '#292929',
  Negro: '#292929',
  Plata: '#D9D9D9',
  Blanco: '#F5F5F5',
};

export default function ProductShowroom({ product, formattedPrice }: ProductShowroomProps) {
  const images = product.images.nodes;
  const variants = product.variants?.nodes ?? [];
  const [activeImage, setActiveImage] = useState(0);
  const [activeVariantId, setActiveVariantId] = useState(variants[0]?.id);
  const [isAdding, setIsAdding] = useState(false);
  const { openCart, setCartCount } = useCart();

  const activeVariant = variants.find((v) => v.id === activeVariantId) ?? variants[0];

  const colorOption = product.options?.find((o) =>
    o.name.toLowerCase().includes('color')
  );
  const doorOption = product.options?.find((o) =>
    o.name.toLowerCase().includes('puerta') || o.name.toLowerCase().includes('door')
  );

  const next = () => setActiveImage((i) => (i + 1) % Math.max(images.length, 1));
  const prev = () =>
    setActiveImage((i) => (i - 1 + images.length) % Math.max(images.length, 1));

  const handleAddToCart = async () => {
    if (!activeVariant?.id || isAdding) return;
    setIsAdding(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId: activeVariant.id, quantity: 1 }),
      });
      const data = await res.json();
      if (data?.cart?.totalQuantity != null) {
        setCartCount(data.cart.totalQuantity);
      }
      window.dispatchEvent(
        new CustomEvent('cart-updated', { detail: { openDrawer: true } })
      );
      openCart();
    } catch (err) {
      console.error('Add to cart failed', err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <section id="productos" className="bg-[#f2f2f2] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-start">
          {/* Image carousel */}
          <div className="relative w-full">
            <div className="relative aspect-[4/5] lg:aspect-[776/805] w-full rounded-[15px] overflow-hidden bg-[#e5e5e5]">
              {images[activeImage] ? (
                <Image
                  src={images[activeImage].url}
                  alt={images[activeImage].altText ?? product.title}
                  fill
                  className="object-cover transition-opacity duration-500"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              ) : null}

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Imagen anterior"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 size-11 sm:size-[45px] rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200 active:scale-95"
                  >
                    <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                      <path
                        d="M12 2L3 10L12 18"
                        stroke="#191817"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    aria-label="Imagen siguiente"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 size-11 sm:size-[45px] rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200 active:scale-95"
                  >
                    <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                      <path
                        d="M2 2L11 10L2 18"
                        stroke="#191817"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Pagination dots */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Ir a imagen ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeImage
                        ? 'w-2 h-2 bg-[#191817]'
                        : 'w-1.5 h-1.5 bg-[#8c8c8c] hover:bg-[#626262]'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <div className="pb-4">
              <p className="text-[#070707] text-[15px] font-neue mb-1">iShkel</p>
              <h1
                className="text-[#070707] text-[24px] sm:text-[26px] lg:text-[28px] font-medium font-neue tracking-tight leading-[1.2]"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                {product.title}
              </h1>
            </div>

            {product.descriptionHtml ? (
              <div
                className="pb-6 text-[#070707] text-[14px] font-medium font-neue leading-[20px] [&_p]:mb-1"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : (
              <p className="pb-6 text-[#070707] text-[14px] font-medium font-neue leading-[20px]">
                {product.description}
              </p>
            )}

            {/* Color swatches (if Shopify option exists) */}
            {colorOption && (
              <div className="border-t border-b border-[#191817] py-5 flex items-center justify-between">
                <span className="text-black text-[14px] font-medium font-neue tracking-[0.1px]">
                  {colorOption.values.find((v) =>
                    activeVariant?.selectedOptions?.some(
                      (o) => o.name === colorOption.name && o.value === v
                    )
                  ) ?? colorOption.values[0]}
                </span>
                <div className="flex items-center gap-2">
                  {colorOption.values.map((value) => {
                    const matchVariant = variants.find((v) =>
                      v.selectedOptions?.some(
                        (o) => o.name === colorOption.name && o.value === value
                      )
                    );
                    const isActive = activeVariant?.selectedOptions?.some(
                      (o) => o.name === colorOption.name && o.value === value
                    );
                    return (
                      <button
                        key={value}
                        onClick={() => matchVariant && setActiveVariantId(matchVariant.id)}
                        aria-label={value}
                        className={`size-[25px] rounded-full border flex items-center justify-center transition-all duration-200 ${
                          isActive ? 'border-[#191817] border-2' : 'border-[#626262]'
                        }`}
                      >
                        <span
                          className="size-[18px] rounded-full block"
                          style={{ backgroundColor: COLOR_SWATCHES[value] ?? '#D9D9D9' }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Door type swatches (if Shopify option exists) */}
            {doorOption && (
              <div className="border-b border-[#191817] py-5 flex items-center justify-between">
                <span className="text-black text-[14px] font-medium font-neue tracking-[0.1px]">
                  Tipo de puerta ({doorOption.values[0]})
                </span>
                <div className="flex items-center gap-2">
                  {doorOption.values.map((value, i) => {
                    const fills = ['#A0846B', '#5C4530', '#E8B89A'];
                    return (
                      <button
                        key={value}
                        aria-label={value}
                        className="size-[25px] rounded-full border border-[#aca69f] hover:border-[#191817] transition-all duration-200"
                        style={{ backgroundColor: fills[i % fills.length] }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Features */}
            <ul className="pt-6 pb-2 space-y-2">
              {FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-[14px] font-medium font-neue text-black tracking-[0.1px] leading-[20px]"
                >
                  <svg
                    className="shrink-0 mt-1"
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                  >
                    <path
                      d="M1 5.5L4 8.5L10 1.5"
                      stroke="#626262"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <p className="text-[#191817] text-[24px] font-neue leading-[36px] py-4">
              {formattedPrice}
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 max-w-[374px]">
              <button
                onClick={handleAddToCart}
                disabled={!activeVariant?.availableForSale || isAdding}
                className="h-12 w-full border-2 border-[#191817] rounded-[15px] text-[#191817] text-[14.5px] font-medium font-neue tracking-[0.1px] hover:bg-[#191817] hover:text-white active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding ? 'Añadiendo…' : 'Comprar ahora'}
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!activeVariant?.availableForSale || isAdding}
                className="relative h-[51px] w-full rounded-[11.5px] bg-[#3b3b3b] p-[1.5px] active:scale-[0.99] transition-transform duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative h-full w-full rounded-[10px] bg-black overflow-hidden flex items-center justify-center">
                  <div className="absolute -top-4 -right-4 w-24 h-9 bg-white/10 blur-xl rounded-full" />
                  <div className="absolute -bottom-4 -left-6 w-20 h-9 bg-white/5 blur-xl rounded-full" />
                  <span className="relative text-white text-[18px] sm:text-[20px] font-neue">
                    {isAdding ? 'Añadiendo…' : 'Añadir al carrito'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}