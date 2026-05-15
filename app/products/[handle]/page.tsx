// app/products/[handle]/page.tsx
import { notFound } from 'next/navigation';
import { getProductWithVariants } from '@/lib/shopify';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import PDPHero from '@/components/products/PDPHero';
import ProductShowroom from '@/components/products/ProductShowroom';
import SeguridadDisenoSplit from '@/components/products/SeguridadDisenoSplit';
import StickyPriceBar from '@/components/products/StickyPriceBar';
import AutoridadProduct from '@/components/products/AutoridadProduct';
import TestimonialSection from '@/components/home/TestimonialSection';
import FAQSection from '@/components/home/FAQSection';

export const revalidate = 60;

type PageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProductWithVariants(handle);
  if (!product) return { title: 'Producto no encontrado | iShkel' };

  return {
    title: `${product.title} | iShkel`,
    description: product.description?.slice(0, 160) ?? 'Cerradura inteligente iShkel',
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProductWithVariants(handle);

  if (!product) return notFound();

  const variant = product.variants?.nodes?.[0];
  const price = variant?.price ?? product.priceRange?.minVariantPrice;
 const heroImage = '/Images_Icons/MainImg.png';
  const formattedPrice = price
    ? new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: price.currencyCode ?? 'COP',
        maximumFractionDigits: 0,
      }).format(Number(price.amount))
    : 'Consultar';

  return (
    <main className="bg-white font-neue antialiased overflow-x-hidden">
      <Navbar />
      <PDPHero
        title={product.title}
        heroImage={heroImage}
        formattedPrice={formattedPrice}
      />
      <ProductShowroom product={product} formattedPrice={formattedPrice} />
      <SeguridadDisenoSplit />
      <AutoridadProduct /> 
      <StickyPriceBar
        title={product.title}
        formattedPrice={formattedPrice}
        variantId={variant?.id}
      />
      <TestimonialSection />
      <FAQSection />
      <Footer />
    </main>
  );
}