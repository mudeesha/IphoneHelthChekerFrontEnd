'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do I export my iPhone analytics?',
    answer:
      'Go to Settings > Privacy > Analytics & Improvements on your iPhone. Tap "Share iPhone Analytics" to download the diagnostic report file (.ips).',
  },
  {
    question: 'What file formats are supported?',
    answer:
      'We support .ips, .ips.synced, .ips.ca.synced, .json, and .txt files. These are the standard iPhone diagnostic report formats.',
  },
  {
    question: 'Is my data secure and private?',
    answer:
      'Yes, your data is completely secure. We use industry-standard encryption, and your reports are never shared or sold. You own your data completely.',
  },
  {
    question: 'Can I try the Premium features before subscribing?',
    answer:
      'Absolutely! We offer a 7-day free trial for Premium features. No credit card required to start your trial.',
  },
  {
    question: 'How often can I upload new reports?',
    answer:
      'With Free tier, you can upload weekly. Premium users get unlimited uploads and can analyze as many reports as they want.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes, you can cancel your Premium subscription anytime from your billing page. No cancellation fees or lock-in period.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-black border-b border-[#2C2C2E]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-white mb-4 tracking-tight" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#A0A0A0] font-normal" style={{ lineHeight: 1.5 }}>
            Find answers to common questions about iPhone Health
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-[#2C2C2E] rounded-lg px-6 bg-[#1C1C1E] hover:border-[#3A3A3C] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-150"
            >
              <AccordionTrigger className="hover:no-underline py-4 text-left font-semibold text-white hover:text-[#A0A0A0]" style={{ fontSize: '1rem' }}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#A0A0A0] pb-4 font-normal text-sm" style={{ lineHeight: 1.6 }}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
