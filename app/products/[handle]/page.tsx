// app/products/[handle]/page.tsx
import { notFound } from 'next/navigation';
import { getProductByHandle } from '@/lib/shopify';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import PDPHero from '@/components/products/PDPHero';
import ProductShowroom from '@/components/products/ProductShowroom';
import SeguridadDisenoSplit from '@/components/products/SeguridadDisenoSplit';
import StickyPriceBar from '@/components/products/StickyPriceBar';

export const revalidate = 60;

type PageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: 'Producto no encontrado | iShkel' };

  return {
    title: `${product.title} | iShkel`,
    description: product.description?.slice(0, 160) ?? 'Cerradura inteligente iShkel',
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  // Normalize Shopify Storefront API shape
  const variant = product.variants?.nodes?.[0];
  const price = variant?.price ?? product.priceRange?.minVariantPrice;
  const heroImage = product.images?.nodes?.[0]?.url ?? '/Images_Icons/homePageImg.jpeg';

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

      <Footer />

      <StickyPriceBar
        title={product.title}
        formattedPrice={formattedPrice}
        variantId={variant?.id}
      />
    </main>
  );
}