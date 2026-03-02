'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Get started with essential features',
    features: [
      'Upload and analyze reports',
      'Basic stability score',
      'Battery health overview',
      'Crash summary',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Premium Monthly',
    price: '$9.99',
    period: '/month',
    description: 'Full access to all features',
    features: [
      'Everything in Free',
      'Detailed battery analysis',
      'Full crash reports',
      'Performance insights',
      'Report history & export',
      'Component authenticity',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Premium Yearly',
    price: '$99.99',
    period: '/year',
    description: 'Best value for annual commitment',
    features: [
      'Everything in Monthly',
      'Priority support',
      'Advanced analytics',
      'Unlimited reports',
    ],
    badge: '20% off',
    cta: 'Start Free Trial',
    highlighted: false,
  },
];

export function PricingTeaser() {
  return (
    <section className="py-20 md:py-28 bg-black border-b border-[#2C2C2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-4 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-base text-[#A0A0A0] max-w-2xl mx-auto font-normal" style={{ lineHeight: 1.5 }}>
            Choose the plan that works for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div key={plan.name} className="relative">
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-medium px-3 py-1">
                  {plan.badge}
                </Badge>
              )}
              <Card
                className={`p-8 flex flex-col rounded-2xl ${
                  plan.highlighted
                    ? 'border-2 border-white bg-white text-black shadow-lg'
                    : 'border border-gray-800 bg-gray-900 hover:border-gray-700 hover:bg-gray-800 hover:shadow-md'
                }`}
              >
                <h3 className={`text-2xl font-semibold mb-2 ${plan.highlighted ? 'text-black' : 'text-white'}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 font-light ${plan.highlighted ? 'text-gray-700' : 'text-gray-400'}`}>{plan.description}</p>
                <div className="mb-8">
                  <span className={`text-4xl font-semibold ${plan.highlighted ? 'text-black' : 'text-white'}`}>{plan.price}</span>
                  {plan.period && <span className={`text-sm ${plan.highlighted ? 'text-gray-600' : 'text-gray-500'}`}>{plan.period}</span>}
                </div>
                <Button
                  asChild
                  className={`mb-8 rounded-full font-medium ${
                    plan.highlighted
                      ? 'bg-black hover:bg-gray-900 text-white'
                      : 'bg-white hover:bg-gray-100 text-black'
                  }`}
                >
                  <Link href="/plans">{plan.cta}</Link>
                </Button>
                <div className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-gray-700' : 'text-gray-500'}`} strokeWidth={2.5} />
                      <span className={`text-sm ${plan.highlighted ? 'text-gray-700' : 'text-gray-400'} font-light`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/plans">
            <Button
              variant="outline"
              className="border border-gray-700 text-gray-300 hover:bg-gray-900 rounded-full font-medium"
            >
              See All Plans
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
