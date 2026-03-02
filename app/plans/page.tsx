'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billingPeriod: 'forever',
    description: 'Get started with basic analytics',
    features: [
      'Upload iPhone analytics files',
      'Basic stability score',
      'Crash summary',
      'Up to 5 reports per month',
      'Basic device metrics',
      'Email support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    id: 'premium-monthly',
    name: 'Premium Monthly',
    price: 9.99,
    billingPeriod: 'month',
    description: 'Unlock advanced analytics and insights',
    features: [
      'All Free features',
      'Advanced battery analysis',
      'Detailed crash reports',
      'Thermal event tracking',
      'Network analytics',
      'Performance metrics',
      'Memory analysis',
      'Unlimited reports',
      'Historical trends',
      'Export reports as PDF',
      'Priority support',
    ],
    cta: 'Subscribe Now',
    highlighted: true,
  },
  {
    id: 'premium-yearly',
    name: 'Premium Yearly',
    price: 99.99,
    billingPeriod: 'year',
    savings: '20% off',
    description: 'Save 20% with annual billing',
    features: [
      'All Free features',
      'Advanced battery analysis',
      'Detailed crash reports',
      'Thermal event tracking',
      'Network analytics',
      'Performance metrics',
      'Memory analysis',
      'Unlimited reports',
      'Historical trends',
      'Export reports as PDF',
      'Priority support',
    ],
    cta: 'Subscribe Now',
    highlighted: false,
  },
];

export default function PlansPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubscribe = (planId: string) => {
    if (!user) {
      router.push('/register');
      return;
    }

    if (user.role === 'premium') {
      toast({
        title: 'Already Premium',
        description: 'You already have a premium subscription.',
      });
      return;
    }

    if (planId === 'free') {
      toast({
        title: 'Already on Free Plan',
        description: 'You are already using the free tier.',
      });
      return;
    }

    // Mock payment flow
    toast({
      title: 'Subscription Updated',
      description: `You've been upgraded to ${plans.find(p => p.id === planId)?.name}`,
    });

    // In a real app, redirect to Stripe checkout
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  if (user?.role === 'premium') {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-[#1C1C1E] border-[#2C2C2E]">
            <CardHeader>
              <CardTitle className="text-white text-2xl font-semibold">Premium Subscriber</CardTitle>
              <CardDescription className="text-[#8E8E93]">You are already enjoying all the benefits of Premium</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Your Plan</h3>
                <Badge className="bg-[#0A84FF] text-white">Premium Active</Badge>
              </div>
              <p className="text-[#A0A0A0]">
                Thank you for being a premium member! You have unlimited access to all advanced analytics features.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => router.push('/dashboard/billing')}
                  className="bg-[#0A84FF] hover:bg-[#409CFF] text-white rounded-lg font-semibold transition-colors duration-150"
                >
                  View Billing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => router.push('/dashboard')}
                  variant="outline"
                  className="border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E] rounded-lg font-normal transition-colors duration-150"
                >
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-semibold text-white mb-4 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>Simple, Transparent Pricing</h1>
          <p className="text-base text-[#A0A0A0] max-w-2xl mx-auto" style={{ lineHeight: 1.5 }}>
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              <Card className={`relative ${plan.highlighted ? 'bg-[#1C1C1E] border-[#3A3A3C]' : 'bg-[#1C1C1E] border-[#2C2C2E]'} h-full hover:border-[#3A3A3C] transition-all duration-150`}>
                <CardHeader>
                  {plan.savings && (
                    <Badge className="w-fit bg-[#30D158] text-black font-semibold text-xs mb-2">{plan.savings}</Badge>
                  )}
                  <CardTitle className="text-white text-2xl font-semibold">{plan.name}</CardTitle>
                  <CardDescription className="text-[#8E8E93]">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-semibold text-white">${plan.price.toFixed(2)}</span>
                    <span className="text-[#A0A0A0] ml-2 text-sm">
                      {plan.billingPeriod === 'forever' ? 'forever' : `per ${plan.billingPeriod}`}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    className={
                      plan.highlighted
                        ? 'w-full bg-[#0A84FF] hover:bg-[#409CFF] text-white rounded-lg font-semibold transition-colors duration-150'
                        : 'w-full border-[#3A3A3C] text-[#A0A0A0] hover:bg-[#2C2C2E] rounded-lg font-normal transition-colors duration-150'
                    }
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-[#30D158] flex-shrink-0 mt-0.5" />
                        <span className="text-[#A0A0A0] text-sm" style={{ lineHeight: 1.5 }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto bg-[#1C1C1E] border border-[#2C2C2E] rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Can I upgrade or downgrade anytime?</h3>
              <p className="text-[#A0A0A0] text-sm" style={{ lineHeight: 1.6 }}>Yes! You can change your plan at any time from your billing settings. Changes take effect immediately.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Is there a free trial?</h3>
              <p className="text-[#A0A0A0] text-sm" style={{ lineHeight: 1.6 }}>The Free plan is our trial. Upgrade to Premium to unlock advanced features and get full access to all analytics.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-[#A0A0A0] text-sm" style={{ lineHeight: 1.6 }}>We accept all major credit cards (Visa, Mastercard, American Express) via secure Stripe payments.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Do you offer refunds?</h3>
              <p className="text-[#A0A0A0] text-sm" style={{ lineHeight: 1.6 }}>We offer a 14-day money-back guarantee on all Premium plans. Contact support for more details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
