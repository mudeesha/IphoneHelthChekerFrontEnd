'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'iPhone User',
    content: 'This tool saved me from buying a new iPhone! Found out my battery was degrading and adjusted my charging habits. Amazing insights!',
    initials: 'SJ',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Tech Enthusiast',
    content: 'Finally a tool that makes sense of iPhone diagnostics. The crash analysis feature helped me identify and remove a problematic app. Highly recommend!',
    initials: 'MC',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Business Professional',
    content: 'Premium features are worth every penny. The detailed reports and history tracking help me monitor device health like never before.',
    initials: 'ER',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-black border-b border-[#2C2C2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-4 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Loved by Users
          </h2>
          <p className="text-base text-[#A0A0A0] max-w-2xl mx-auto font-normal" style={{ lineHeight: 1.5 }}>
            See what people are saying about iPhone Health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-6 border border-[#2C2C2E] rounded-lg bg-[#1C1C1E] hover:border-[#3A3A3C] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150"
            >
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(null)
                  .map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFD60A] text-[#FFD60A]" strokeWidth={2} />
                  ))}
              </div>
              <p className="text-[#FFFFFF] mb-6 font-normal text-sm leading-relaxed" style={{ lineHeight: 1.6 }}>{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#0A84FF] text-white font-semibold text-xs">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                  <p className="text-xs text-[#8E8E93]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
