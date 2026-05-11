// components/products/StickyPriceBar.tsx
'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

interface StickyPriceBarProps {
  title: string;
  formattedPrice: string;
  variantId?: string;
}

export default function StickyPriceBar({
  title,
  formattedPrice,
  variantId,
}: StickyPriceBarProps) {
  const [visible, setVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { openCart, setCartCount } = useCart();

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('pdp-hero');
      const showroom = document.getElementById('productos');
      if (!hero || !showroom) return;

      const heroBottom = hero.getBoundingClientRect().bottom;
      const showroomBottom = showroom.getBoundingClientRect().bottom;

      // Show after hero scrolls out, hide after showroom scrolls out (avoid showing in footer)
      setVisible(heroBottom < 0 && showroomBottom > 200);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAddToCart = async () => {
    if (!variantId || isAdding) return;
    setIsAdding(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId, quantity: 1 }),
      });
      const data = await res.json();
      if (data?.cart?.totalQuantity != null) {
        setCartCount(data.cart.totalQuantity);
      }
      openCart();
    } catch (err) {
      console.error('Add to cart failed', err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-[#ececec] bg-white/90 backdrop-blur-xl shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 py-3 sm:py-4 flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[#626262] text-[11px] sm:text-[12px] font-neue uppercase tracking-wide truncate">
            {title}
          </p>
          <p className="text-[#070707] text-[16px] sm:text-[18px] font-medium font-neue">
            {formattedPrice}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!variantId || isAdding}
          className="shrink-0 bg-[#070707] text-white text-[14px] sm:text-[14.5px] font-medium font-neue px-5 sm:px-7 h-11 sm:h-12 inline-flex items-center justify-center rounded-[15px] tracking-[0.1px] hover:bg-[#191817] active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
        >
          {isAdding ? 'Añadiendo…' : 'Comprar ahora'}
        </button>
      </div>
    </div>
  );
}