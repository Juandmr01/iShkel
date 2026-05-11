'use client';

import Link from 'next/link';

const ProductsFooter = () => (
  <footer className="bg-black py-12 md:py-16 px-4 md:px-8 lg:px-12">
    <div className="max-w-[1360px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto] gap-12">
        {/* Brand Column */}
        <div className="max-w-[353px]">
          <h3 className="text-white text-[22.6px] font-light tracking-[-1.56px] mb-4">
            iShkel
          </h3>
          <p className="text-white/70 text-[16px]  tracking-[-0.64px] mb-6">
            Especialistas en cerraduras inteligentes premium con instalación certificada en puertas tradicionales y de alta seguridad. Líder en Colombia desde 2018.
          </p>
          <p className="text-white/70 text-[16px] tracking-[-0.64px]">
            © 2026 iShkel, Created by Diego
          </p>
        </div>

        {/* Links Columns */}
        <div className="flex gap-12 md:gap-16 lg:gap-20">
          {/* Pages */}
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">
              Pages
            </h4>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/works" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Works</Link></li>
              <li><Link href="/contact" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/404" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">404</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">
              Info
            </h4>
            <ul className="space-y-3">
              <li><Link href="/terminos" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Termino</Link></li>
              <li><Link href="/privacidad" className="text-white/70 text-[16px] tracking-[-0.64px] hover:text-white transition-colors">Privacidad</Link></li>
            </ul>
          </div>

          {/* Sociales */}
          <div>
            <h4 className="text-white text-[16px] font-medium tracking-[-0.64px] mb-4">
              Sociales
            </h4>
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

export default ProductsFooter;