import Hero from '@/components/home/Hero';
import BrandSection from '@/components/home/BrandSection';
import Showroom from '@/components/home/Showroom';
import { getProductWithVariants } from '@/lib/shopify';  // ← changed
import Collage from '@/components/home/Collage';
import FounderQuoteSection from '@/components/home/FounderQuoteSection';
import TestimonialSection from '@/components/home/TestimonialSection';
import AutoridadSection from '@/components/home/AutoridadSection';
import ComparisonTable from '@/components/home/ComparisonTable';
import FAQSection from '@/components/home/FAQSection';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

export default async function Home() {
  const featuredProduct = await getProductWithVariants('cerradura-fx-321312');  // ← changed

  return (
    <main>
      <ErrorBoundary><Navbar /></ErrorBoundary>
      <ErrorBoundary><Hero /></ErrorBoundary>
      <ErrorBoundary><BrandSection /></ErrorBoundary>
      <ErrorBoundary><FounderQuoteSection /></ErrorBoundary>
      <ErrorBoundary><Collage /></ErrorBoundary>
      {featuredProduct && <ErrorBoundary><Showroom product={featuredProduct} /></ErrorBoundary>}
      <ErrorBoundary><TestimonialSection /></ErrorBoundary>
      <ErrorBoundary><AutoridadSection /></ErrorBoundary>
      <ErrorBoundary><ComparisonTable /></ErrorBoundary>
      <ErrorBoundary><FAQSection /></ErrorBoundary>
      <ErrorBoundary><Footer /></ErrorBoundary>
    </main>
  );
}