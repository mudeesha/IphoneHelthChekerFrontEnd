'use client';

import { Download, Upload, BarChart3, Zap } from 'lucide-react';

const steps = [
  {
    icon: Download,
    title: 'Export Analytics',
    description: 'Open Settings > Privacy > Analytics & Improvements on your iPhone and download the diagnostic report file.',
  },
  {
    icon: Upload,
    title: 'Upload Report',
    description: 'Drag and drop your .ips file or click to browse. Our tool accepts .ips, .ips.synced, and .ips.ca.synced formats.',
  },
  {
    icon: BarChart3,
    title: 'Get Insights',
    description: 'Instantly see your device health score, battery status, crashes, performance, and more in a beautiful dashboard.',
  },
  {
    icon: Zap,
    title: 'Upgrade (Optional)',
    description: 'Subscribe to Premium for advanced insights, unlimited reports, history tracking, and detailed analytics.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-black border-b border-[#2C2C2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-4 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            How It Works
          </h2>
          <p className="text-base text-[#A0A0A0] max-w-2xl mx-auto font-normal" style={{ lineHeight: 1.5 }}>
            Get started in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative">
                <div className="p-6 bg-[#1C1C1E] border border-[#2C2C2E] rounded-lg hover:border-[#3A3A3C] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150">
                  <div className="mb-4 p-2.5 bg-[#2C2C2E] rounded-md w-fit">
                    <Icon className="w-5 h-5 text-[#A0A0A0]" strokeWidth={1.5} />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0A84FF] text-white font-semibold text-xs">
                      {index + 1}
                    </span>
                    <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-[#A0A0A0] font-normal text-sm" style={{ lineHeight: 1.5 }}>{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#2C2C2E]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
