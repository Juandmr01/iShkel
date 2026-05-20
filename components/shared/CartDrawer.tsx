'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
// this is just the way to format the data we are getting from shopify - we could also do this in the api route, but I prefer to keep it here since it's more related to the UI and we can easily adjust it if the API changes without having to touch the backend code.
interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      images?: {
        nodes: {
          url: string;
          altText: string | null;
        }[];
      };
    };
    price: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost?: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: CartItem[];
}
// we create a separate interface for the props of the CartDrawer component, this way we can easily see what props it expects and we can also easily adjust it if we need to add more props in the future.
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Wait for client-side mount before using portal
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cart');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setCart(data.cart);
    } catch (e) {
      console.error('Failed to fetch cart:', e);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen, fetchCart]);

  // Listen for cart-updated events to refresh cart data
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCart();
    };
    
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, [fetchCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (quantity < 0) return;
    
    // Optimistic update - update lines AND recalculate total
    setCart((prev) => {
      if (!prev) return prev;
      
      const updatedLines = quantity === 0
        ? prev.lines.filter((l) => l.id !== lineId)
        : prev.lines.map((l) => (l.id === lineId ? { ...l, quantity } : l));
      
      // Recalculate total from updated lines
      const newTotal = updatedLines.reduce((sum, line) => {
        return sum + (Number(line.merchandise?.price?.amount || 0) * line.quantity);
      }, 0);
      
      return {
        ...prev,
        lines: updatedLines,
        cost: {
          ...prev.cost,
          totalAmount: {
            amount: String(newTotal),
            currencyCode: prev.cost?.totalAmount?.currencyCode || 'COP',
          },
        },
      };
    });
    
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', lineId, quantity }),
      });
      // Refetch to sync with server
      fetchCart();
    } catch (e) {
      console.error('Failed to update cart:', e);
      fetchCart();
    }
  };

  const handleCheckout = () => {
    if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
  };

  const formatPrice = (amount: string | number) => {
    const price = Number(amount);
    return `COP ${price.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
  };

  const total = Number(cart?.cost?.totalAmount?.amount || 0);
  const cartLines = cart?.lines || [];

  // Don't render if not mounted (SSR)
  if (!mounted) return null;

  // Portal renders directly in document.body - above everything
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP - Dark overlay with fade animation */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 99999,
              cursor: 'pointer',
            }}
          />

          {/* DRAWER with slide animation */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-screen w-[483px] max-w-[95vw] bg-white text-[#0e0e0e] flex flex-col font-neue"
            style={{ zIndex: 100000 }}
          >
            {/* HEADER */}
            <div className="flex-shrink-0 flex justify-between items-center px-6 py-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] ">
              <h2 className="font-medium text-[24px] tracking-[-0.64px]">Tu carrito</h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-[32px] h-[32px] flex items-center justify-center hover:opacity-60 transition-opacity"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <line x1="1" y1="1" x2="17" y2="17" stroke="#191817" strokeWidth="1.56" strokeLinecap="round" />
                    <line x1="17" y1="1" x2="1" y2="17" stroke="#191817" strokeWidth="1.56" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* FREE SHIPPING */}
            <div className="flex-shrink-0 px-6 py-3">
              <p className="text-[20px] tracking-[-0.64px]">Envio gratis a todo bogota</p>
            </div>

            {/* URGENCY CONTAINER */}
            <div className="flex-shrink-0 px-6 py-2">
              <div className="bg-[#f2f2f2] px-6 py-4 rounded-[8px]">
                <p className="text-[15px] tracking-[-0.64px] leading-[24px]">
                  Tus artículos no están reservados, finaliza la compra rápidamente para asegurarte de no quedarte sin ellos.
                </p>
              </div>
            </div>

            {/* CART ITEMS */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {loading ? (
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-[138px] h-[161px] bg-gray-200 animate-pulse rounded-[15px]" />
                      <div className="flex-1 space-y-3 pt-2">
                        <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : cartLines.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-[18px] mb-6">Tu carrito está vacío</p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-3 border-2 border-[#191817] rounded-[15px] text-[16px] font-medium hover:bg-[#191817] hover:text-white transition-colors"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cartLines.map((item) => {
                      const imageUrl = item.merchandise?.product?.images?.nodes?.[0]?.url;
                      const imageAlt = item.merchandise?.product?.images?.nodes?.[0]?.altText || item.merchandise?.product?.title || 'Producto';
                      const variantLabel =
                        item.merchandise?.title && item.merchandise.title !== 'Default Title'
                          ? item.merchandise.title
                          : 'Color Metal';

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          className="flex gap-4"
                        >
                          <div
                            className="flex-shrink-0 rounded-[15px] overflow-hidden bg-[#f0f0f0]"
                            style={{ width: 138, height: 161 }}
                          >
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={imageAlt}
                                width={138}
                                height={161}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <div
                                style={{ width: '100%', height: '100%' }}
                                className="flex items-center justify-center bg-[#e8e8e8]"
                              >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.2">
                                  <rect x="2" y="7" width="20" height="14" rx="2" />
                                  <path d="M16 7V5a4 4 0 0 0-8 0v2" />
                                </svg>
                              </div>
                            )}
                          </div>

                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h3 className="text-[20px] font-medium tracking-[-0.64px] leading-[1.2]">
                                  {item.merchandise?.product?.title || 'Producto'}
                                </h3>
                                <span className="text-[12px] tracking-[-0.5px] flex-shrink-0 mt-1">
                                  {formatPrice(item.merchandise?.price?.amount || 0)}
                                </span>
                              </div>

                              <p className="text-[13px] tracking-[-0.5px] mt-1 text-[#555]">
                                {variantLabel}
                              </p>

                              <div className="flex items-center gap-4 mt-4">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  aria-label="Disminuir cantidad"
                                  className="w-[28px] h-[28px] flex items-center justify-center text-[22px] leading-none text-[#191817] cursor-pointer"
                                >
                                  −
                                </button>
                                <span className="text-[15px] min-w-[20px] text-center text-[#191817]">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  aria-label="Aumentar cantidad"
                                  className="w-[28px] h-[28px] flex items-center justify-center text-[22px] leading-none text-[#191817] cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 0)}
                              className="text-[15px] font-light underline text-left mt-3 hover:opacity-60 transition-opacity"
                            >
                              remover
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="flex-shrink-0 px-6 pb-6 mt-auto">
              <div className="flex justify-between items-center py-4 border-t border-black">
                <div className="flex items-center gap-2">
                  <span className="text-[15px]">Total de la order</span>
                  <span className="text-[10px] text-[#555]">Tax incl.</span>
                </div>
                <span className="text-[13px]">{formatPrice(total)}</span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={cartLines.length === 0}
                className="w-full h-[48px] border-2 border-[#191817] rounded-[15px] text-[16px] font-medium hover:bg-[#191817] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Comprar Ahora
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}