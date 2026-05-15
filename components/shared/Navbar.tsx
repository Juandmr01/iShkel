'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar({ dark = false }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const { openCart, cartCount, setCartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fetch cart count on mount
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        if (data.cart) {
          setCartCount(data.cart.totalQuantity || 0);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartCount();

    // Listen for cart updates
    const handleCartUpdate = (event: Event) => {
      fetchCartCount();
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.openDrawer) {
        openCart();
      }
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, [setCartCount, openCart]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? dark
            ? 'bg-black shadow-[0_2px_24px_rgba(0,0,0,0.4)]'
            : 'bg-white shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
          : dark
            ? 'bg-white shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
            : 'bg-linear-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="max-w-450 mx-auto px-8 lg:px-12 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Images_Icons/iShkel_White.png"
              alt="iShkel Logo"
              width={120}
              height={120}
              className={`transition-all duration-500 ${scrolled !== dark ? 'invert' : ''}`}
            />
          </Link>
        </div>

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center gap-10 pt-2">
          <Link
            href="/"
            className={`text-[15px] font-neue transition-colors duration-500 ${
              scrolled !== dark ? 'text-[#070707] hover:text-[#070707]/50' : 'text-white hover:text-white/70'
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`text-[15px] font-neue transition-colors duration-500 ${
              scrolled !== dark ? 'text-[#070707] hover:text-[#070707]/50' : 'text-white hover:text-white/70'
            }`}
          >
            Productos
          </Link>
          
          <Link
            href="/Soporte"
            className={`text-[15px] font-neue transition-colors duration-500 ${
              scrolled !== dark ? 'text-[#070707] hover:text-[#070707]/50' : 'text-white hover:text-white/70'
            }`}
          >
            Soporte
          </Link>
          <Link
            href="/pro"
            className={`text-[15px] font-neue transition-colors duration-500 ${
              scrolled !== dark ? 'text-[#070707] hover:text-[#070707]/50' : 'text-white hover:text-white/70'
            }`}
          >
            iShkel Pro (Constructores)
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="hidden lg:flex items-center gap-6 pt-2">
          {/* Account Icon */}
          <button className="transition-opacity duration-300 hover:opacity-60">
            <Image
              src="/Images_Icons/account_icon.svg"
              alt="Account Icon"
              width={32}
              height={32}
              className={`transition-all duration-500 ${scrolled !== dark ? 'invert' : 'opacity-70'}`}
            />
          </button>

          {/* Cart Icon with Count */}
          <button 
            onClick={openCart}
            className="relative transition-opacity duration-300 hover:opacity-60"
          >
            {cartCount > 0 ? (
              /* Cart with items icon */
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 50 50" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-all duration-500 ${scrolled ? '' : 'opacity-90'}`}
              >
                <mask id="mask0_cart_filled" style={{ maskType: 'alpha' } as React.CSSProperties} maskUnits="userSpaceOnUse" x="5" y="17" width="40" height="25">
                  <path d="M10.0532 18.75L13.1656 36.9792H36.8228L40 18.75H43.75V40.625H6.25V18.75H10.0532Z" fill={scrolled !== dark ? '#191817' : 'white'} stroke={scrolled !== dark ? '#191817' : 'white'} strokeWidth="1.6"/>
                </mask>
                <g mask="url(#mask0_cart_filled)">
                  <path d="M13.5589 39.375L10.8506 23.125H39.1494L36.4411 39.375H13.5589Z" stroke={scrolled !== dark ? '#191817' : 'white'} strokeWidth="1.6"/>
                </g>
                <mask id="mask1_cart_filled" style={{ maskType: 'alpha' } as React.CSSProperties} maskUnits="userSpaceOnUse" x="9" y="9" width="32" height="10">
                  <path d="M40.625 9.375H9.375V18.75H40.625V9.375Z" fill={scrolled !== dark ? '#191817' : 'white'}/>
                </mask>
                <g mask="url(#mask1_cart_filled)">
                  <path d="M25 26.5625C29.3147 26.5625 32.8125 23.0647 32.8125 18.75C32.8125 14.4353 29.3147 10.9375 25 10.9375C20.6853 10.9375 17.1875 14.4353 17.1875 18.75C17.1875 23.0647 20.6853 26.5625 25 26.5625Z" stroke={scrolled !== dark ? '#191817' : 'white'} strokeWidth="1.6"/>
                </g>
                <circle cx="36" cy="22" r="5" fill="#E85D3F"/>
                <rect x="19" y="26" width="12" height="2" rx="1" fill={scrolled !== dark ? '#191817' : 'white'}/>
                <rect x="19" y="29" width="12" height="2" rx="1" fill={scrolled !== dark ? '#191817' : 'white'}/>
                <rect x="20" y="32" width="10" height="2" rx="1" fill={scrolled !== dark ? '#191817' : 'white'}/>
                <rect x="18" y="26" width="15" height="2" rx="1" fill={scrolled !== dark ? '#191817' : 'white'}/>
              </svg>
            ) : (
              /* Empty cart icon */
              <Image
                src="/Images_Icons/cartIcon.svg"
                alt="Cart Icon"
                width={32}
                height={32}
                className={`transition-all duration-500 ${scrolled !== dark ? 'invert' : 'opacity-70'}`}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden transition-colors duration-500 ${
            scrolled !== dark ? 'text-[#070707]' : 'text-white'
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}