'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileUp } from 'lucide-react';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { FeaturesSection } from '@/components/home/features-section';
import { HowItWorks } from '@/components/home/how-it-works';
import { UploadArea } from '@/components/home/upload-area';
import { PricingTeaser } from '@/components/home/pricing-teaser';
import { Testimonials } from '@/components/home/testimonials';
import { FAQ } from '@/components/home/faq';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-black">
        {/* Hero Section - Ultra Compact */}
        <section 
          className="relative w-full h-40 md:h-48 flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url(/images/hero-health-iphone.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black"></div>
          
          {/* Content */}
          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight whitespace-nowrap overflow-x-auto pb-2" style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Understand Your iPhone's Health
            </h1>
            <p className="mt-2 text-sm md:text-base text-[#A0A0A0] max-w-4xl mx-auto" style={{ lineHeight: 1.5 }}>
              Upload your analytics logs to get deep insights about battery, crashes, and performance
            </p>
            <div className="mt-4">
              <Button 
                size="lg" 
                className="bg-[#0071e3] hover:bg-[#0077ED] text-white font-semibold px-8 py-6 rounded-full text-base"
                onClick={() => {
                  document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Upload Area - Primary Focus */}
        <section id="upload-section" className="relative bg-black px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <UploadArea />
          </div>
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* Features Section */}
        <div id="features">
          <FeaturesSection />
        </div>

        {/* Testimonials */}
        {/* <Testimonials /> */}

        {/* Pricing Teaser */}
        <PricingTeaser />

        {/* FAQ */}
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}