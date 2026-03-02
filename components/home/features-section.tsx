'use client';

import {
  Battery,
  AlertTriangle,
  Zap,
  Shield,
  Smartphone,
  TrendingUp,
} from 'lucide-react';

const features = [
  {
    icon: Battery,
    title: 'Battery Health Analysis',
    description:
      'Track battery capacity, charge cycles, and temperature history. Get insights into your battery\'s lifespan and optimize charging habits.',
  },
  {
    icon: AlertTriangle,
    title: 'Crash Reports',
    description:
      'Detailed crash logs and app stability metrics. Identify problematic apps and get actionable insights to improve device stability.',
  },
  {
    icon: Zap,
    title: 'Performance Insights',
    description:
      'Monitor memory warnings, thermal events, and performance trends. Understand your device\'s behavior under load.',
  },
  {
    icon: Shield,
    title: 'Component Authenticity',
    description:
      'Detect genuine vs used/refurbished parts (iOS 18+). Verify your device components are authentic and in good condition.',
  },
  {
    icon: Smartphone,
    title: 'Charging Analytics',
    description:
      'Fast charging detection, charging session patterns, and battery health correlation. Optimize your charging workflow.',
  },
  {
    icon: TrendingUp,
    title: 'Export & History',
    description:
      'Save and export detailed reports. Track device health over time with premium subscriptions.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-black border-b border-[#2C2C2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-4 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Powerful iPhone Analytics
          </h2>
          <p className="text-base text-[#A0A0A0] max-w-2xl mx-auto font-normal" style={{ lineHeight: 1.5 }}>
            Get comprehensive insights into your device's health with advanced diagnostic tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 bg-[#1C1C1E] border border-[#2C2C2E] rounded-lg hover:border-[#3A3A3C] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150"
              >
                <div className="mb-4 p-2.5 bg-[#2C2C2E] rounded-md w-fit">
                  <Icon className="w-5 h-5 text-[#A0A0A0]" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[#A0A0A0] font-normal text-sm" style={{ lineHeight: 1.5 }}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
