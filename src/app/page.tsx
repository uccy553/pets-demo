'use client';

import { Header, ScrollToTop } from '@/components/shared';
import {
  HeroSection,
  TrustBar,
  ServicesSection,
  WhyChooseUsSection,
  GallerySection,
  TestimonialsSection,
  FAQSection,
  ContactSection,
  Footer,
} from '@/components/sections';

/**
 * Main landing page assembling all sections
 * All content is dynamically loaded from data.json
 */
export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main id="main-content">
        {/* Hero with fullscreen carousel */}
        <HeroSection />

        {/* Trust statistics bar */}
        <TrustBar />

        {/* Services offerings */}
        <ServicesSection />

        {/* Why choose us features */}
        <WhyChooseUsSection />

        {/* Before/After gallery */}
        <GallerySection />

        {/* Customer testimonials */}
        <TestimonialsSection />

        {/* Frequently asked questions */}
        <FAQSection />

        {/* Contact form and info */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      <ScrollToTop />
    </>
  );
}
