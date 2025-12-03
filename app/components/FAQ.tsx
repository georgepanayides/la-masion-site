"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is Japanese head spa safe?",
      answer: "Absolutely. Japanese head spa is a gentle, non-invasive treatment suitable for most people. Our qualified practitioners use professional-grade equipment and TGA-approved products. We conduct a thorough consultation before each treatment to assess your scalp condition and tailor the experience to your needs. If you have specific medical concerns, we recommend consulting your healthcare provider first."
    },
    {
      question: "How long does a treatment take?",
      answer: "Treatment duration varies by service. Our Express Refresh is 30 minutes, the Signature Head Spa is 60 minutes, and the Deep Renewal is 90 minutes. We recommend arriving 10 minutes early for your first visit to complete a brief consultation form. This ensures we can begin your treatment on time and maximize your relaxation."
    },
    {
      question: "How often should I book a treatment?",
      answer: "For optimal results, we recommend monthly treatments to maintain scalp health and stress relief benefits. If you're addressing specific concerns like excessive build-up, tension headaches, or hair thinning, you may benefit from treatments every 2-3 weeks initially. Your therapist will provide personalized recommendations during your consultation based on your scalp condition and wellness goals."
    },
    {
      question: "Is it suitable for sensitive scalp or hair loss?",
      answer: "Yes. Japanese head spa can be particularly beneficial for sensitive scalps and those experiencing hair loss. The gentle massage improves circulation, which promotes hair health, while the cleansing ritual removes build-up without harsh scrubbing. We use pH-balanced, gentle products and adjust pressure to your comfort level. Always inform your therapist of any sensitivities or concerns during consultation."
    },
    {
      question: "What should I do before my appointment?",
      answer: "Come as you are—no special preparation needed. Your hair can be clean or unwashed. Avoid applying heavy styling products on the day of your treatment if possible. Arrive hydrated and with an open mind for relaxation. We provide everything you need, including hair ties, towels, and post-treatment styling if desired."
    },
    {
      question: "What should I expect after treatment?",
      answer: "Most clients feel deeply relaxed, with reduced tension and a lighter, cleaner scalp. Your hair may feel softer and look shinier immediately. Some people experience mild tingling or warmth from improved circulation—this is normal and temporary. We recommend avoiding harsh styling or chemical treatments for 24 hours post-session. Drink plenty of water to support the detoxification process."
    },
    {
      question: "Can I get a treatment if I'm pregnant?",
      answer: "Yes, with some modifications. Japanese head spa is generally safe during pregnancy and can provide wonderful stress relief. We adjust pressure and avoid certain essential oils. Please inform us during booking if you're pregnant so we can tailor your treatment appropriately. As always, consult your healthcare provider if you have any concerns."
    },
    {
      question: "Do you offer gift vouchers?",
      answer: "Yes! Gift vouchers are available for all treatments and can be purchased in-clinic or by phone. They make a thoughtful gift for birthdays, Mother's Day, or simply as a wellness gesture. Vouchers are valid for 12 months from purchase date and can be redeemed for any treatment or add-on service."
    },
  ];

  return (
    <section id="faq" className="relative py-16 md:py-24 bg-silk-cream">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-stone-grey/70 mb-3">
            Common Questions
          </p>
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 font-light uppercase tracking-[0.12em] text-sumi-ink">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto text-stone-grey text-sm leading-relaxed">
            Everything you need to know about Japanese head spa treatments at La Maison de Aesthetics.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-warm-white border border-stone-800/12 overflow-hidden transition-all duration-300 hover:border-stone-800/25"
            >
              {/* Question Button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4 group"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm uppercase tracking-wider text-sumi-ink font-normal pr-4">
                  {faq.question}
                </span>
                <span 
                  className={`flex-shrink-0 text-stone-grey transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </span>
              </button>

              {/* Answer */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                  <div className="border-t border-stone-800/12 pt-4">
                    <p className="text-xs leading-relaxed text-stone-grey">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 pt-12 border-t border-stone-800/20 text-center">
          <p className="text-xs uppercase tracking-wider text-stone-grey mb-6">
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="tel:+61XXXXXXXXX"
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-800/20 text-stone-grey text-xs uppercase tracking-widest hover:border-stone hover:text-stone transition-all duration-300"
            >
              Call Us
            </a>
            <a 
              href="mailto:hello@lamaisonde.com.au"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone text-warm-white text-xs uppercase tracking-widest hover:bg-stone-grey transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
