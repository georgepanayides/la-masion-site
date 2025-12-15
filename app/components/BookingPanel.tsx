"use client";

import { useState } from "react";
import Image from "next/image";
import { treatments } from "../data/Treatments";
import DatePicker from "../../components/ui/DatePicker";

type Step = 'service' | 'datetime' | 'details' | 'confirmation';

interface FormData {
  service: string;
  addon: string[];
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

export default function BookingPanel() {
  const [currentStep, setCurrentStep] = useState<Step>('service');
  const [formData, setFormData] = useState<FormData>({
    service: '',
    addon: [],
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const addons = [
    { id: 'aromatherapy', name: 'Aromatherapy Upgrade', price: 25 },
    { id: 'massage', name: 'Extended Massage', price: 45 },
    { id: 'mask', name: 'Hair Treatment Mask', price: 35 },
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleServiceSelect = (serviceId: string) => {
    setFormData({ ...formData, service: serviceId });
  };

  const handleAddonToggle = (addonId: string) => {
    const newAddons = formData.addon.includes(addonId)
      ? formData.addon.filter(a => a !== addonId)
      : [...formData.addon, addonId];
    setFormData({ ...formData, addon: newAddons });
  };

  const handleNext = () => {
    if (currentStep === 'service' && formData.service) setCurrentStep('datetime');
    else if (currentStep === 'datetime' && formData.date && formData.time) setCurrentStep('details');
    else if (currentStep === 'details' && formData.firstName && formData.lastName && formData.email && formData.phone) {
      // Submit booking
      setCurrentStep('confirmation');
    }
  };

  const handleBack = () => {
    if (currentStep === 'datetime') setCurrentStep('service');
    else if (currentStep === 'details') setCurrentStep('datetime');
  };

  const canProceed = () => {
    if (currentStep === 'service') return !!formData.service;
    if (currentStep === 'datetime') return !!(formData.date && formData.time);
    if (currentStep === 'details') return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
    return false;
  };

  const selectedService = treatments.find(t => t.id === formData.service);
  const selectedAddons = addons.filter(a => formData.addon.includes(a.id));
  const totalPrice = (selectedService ? parseInt(selectedService.price) : 0) + selectedAddons.reduce((sum, a) => sum + a.price, 0);

  return (
    <section id="booking" className="relative py-16 md:py-24 bg-warm-white">
      <div className="container max-w-4xl mx-auto px-3">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-stone-grey/70 mb-3">
            Reserve Your Experience
          </p>
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 font-light uppercase tracking-[0.12em] text-sumi-ink">
            Book Your Appointment
          </h2>
          <p className="max-w-2xl mx-auto text-stone-grey text-sm leading-relaxed">
            Choose your treatment, select a time, and we&apos;ll confirm via email or SMS.
          </p>
        </div>

        {/* Progress Indicator */}
        {currentStep !== 'confirmation' && (
          <div className="mb-8 flex items-center justify-center gap-2">
            {['service', 'datetime', 'details'].map((step, idx) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                  currentStep === step 
                    ? 'bg-stone text-warm-white' 
                    : ['service', 'datetime'].indexOf(currentStep) > idx
                    ? 'bg-stone/30 text-stone-grey'
                    : 'bg-stone-800/12 text-stone-grey/50'
                }`}>
                  {idx + 1}
                </div>
                {idx < 2 && (
                  <div className={`w-12 md:w-20 h-px transition-all duration-300 ${
                    ['datetime', 'details'].indexOf(currentStep) > idx ? 'bg-stone/30' : 'bg-stone-800/12'
                  }`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Booking Panel */}
        <div className="bg-silk-cream border border-stone-800/12 p-3 md:p-10">
          
          {/* Step 1: Choose Service */}
          {currentStep === 'service' && (
            <div className="space-y-6">
              <h3 className="text-sm uppercase tracking-wider text-sumi-ink mb-6 text-center">
                Choose Your Treatment
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {treatments.map((treatment) => (
                  <button
                    key={treatment.id}
                    onClick={() => handleServiceSelect(treatment.id)}
                    className={`text-left flex gap-4 p-6 border transition-all duration-300 relative ${
                      formData.service === treatment.id
                        ? 'border-stone bg-warm-white'
                        : 'border-stone-800/12 bg-warm-white hover:border-stone-800/25'
                    }`}
                  >
                    {treatment.featured && (
                      <span className="absolute -top-2 right-4 bg-stone px-3 py-0.5 text-xs uppercase tracking-widest text-warm-white">
                        Popular
                      </span>
                    )}
                    
                    {/* Image */}
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                      <Image
                        src={treatment.image}
                        alt={treatment.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm uppercase tracking-wider text-sumi-ink">
                          {treatment.name}
                        </h4>
                        <span className="text-lg font-light text-stone">${treatment.price}</span>
                      </div>
                      <p className="text-xs text-stone-grey">{treatment.duration}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Add-ons */}
              {formData.service && (
                <div className="pt-6 border-t border-stone-800/12">
                  <h4 className="text-xs uppercase tracking-wider text-sumi-ink mb-4">
                    Add Enhancements (Optional)
                  </h4>
                  <div className="space-y-3">
                    {addons.map((addon) => (
                      <label
                        key={addon.id}
                        className="flex items-center justify-between p-4 border border-stone-800/12 bg-warm-white cursor-pointer hover:border-stone-800/25 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={formData.addon.includes(addon.id)}
                              onChange={() => handleAddonToggle(addon.id)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 border-2 transition-all duration-200 flex items-center justify-center ${
                              formData.addon.includes(addon.id)
                                ? 'bg-stone-800 border-stone-800'
                                : 'bg-warm-white border-stone-800/30'
                            }`}>
                              {formData.addon.includes(addon.id) && (
                                <svg className="w-3 h-3 text-warm-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-stone-grey">{addon.name}</span>
                        </div>
                        <span className="text-sm text-stone">+${addon.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Choose Date & Time */}
          {currentStep === 'datetime' && (
            <div className="space-y-6">
              <h3 className="text-sm uppercase tracking-wider text-sumi-ink mb-6 text-center">
                Select Date & Time
              </h3>

              {/* Date Picker */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-grey mb-3">
                  Preferred Date
                </label>
                <DatePicker
                  selectedDate={formData.date}
                  onDateSelect={(date) => setFormData({ ...formData, date })}
                  minDate={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Time Slots */}
              {formData.date && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-grey mb-3">
                    Available Times
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setFormData({ ...formData, time })}
                        className={`p-3 text-xs uppercase tracking-wider border transition-all ${
                          formData.time === time
                            ? 'border-stone bg-stone text-warm-white'
                            : 'border-stone-800/12 bg-warm-white text-stone-grey hover:border-stone-800/25'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Your Details */}
          {currentStep === 'details' && (
            <div className="space-y-6">
              <h3 className="text-sm uppercase tracking-wider text-sumi-ink mb-6 text-center">
                Your Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-grey mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full p-4 border border-stone-800/12 bg-warm-white text-sm text-stone-grey focus:outline-none focus:border-stone transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-grey mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full p-4 border border-stone-800/12 bg-warm-white text-sm text-stone-grey focus:outline-none focus:border-stone transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-grey mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-4 border border-stone-800/12 bg-warm-white text-sm text-stone-grey focus:outline-none focus:border-stone transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-grey mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-4 border border-stone-800/12 bg-warm-white text-sm text-stone-grey focus:outline-none focus:border-stone transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-grey mb-2">
                  Special Requests or Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="w-full p-4 border border-stone-800/12 bg-warm-white text-sm text-stone-grey focus:outline-none focus:border-stone transition-all resize-none"
                  placeholder="Any allergies, preferences, or concerns we should know about?"
                />
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 'confirmation' && (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 rounded-full bg-stone/20 mx-auto flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-lg uppercase tracking-wider text-sumi-ink">
                Booking Request Received
              </h3>
              
              <p className="text-sm text-stone-grey leading-relaxed max-w-md mx-auto">
                Thank you, {formData.firstName}! We&apos;ve received your booking request for {selectedService?.name} on {new Date(formData.date).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {formData.time}.
              </p>

              <div className="bg-warm-white border border-stone-800/12 p-6 text-left space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-grey">Treatment:</span>
                  <span className="text-sumi-ink">{selectedService?.name}</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-grey">Add-ons:</span>
                    <span className="text-sumi-ink">{selectedAddons.map(a => a.name).join(', ')}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs">
                  <span className="text-stone-grey">Date & Time:</span>
                  <span className="text-sumi-ink">{new Date(formData.date).toLocaleDateString('en-AU')} at {formData.time}</span>
                </div>
                <div className="flex justify-between text-xs pt-3 border-t border-stone-800/12">
                  <span className="text-stone-grey uppercase tracking-wider">Total:</span>
                  <span className="text-base font-light text-stone">${totalPrice}</span>
                </div>
              </div>

              <p className="text-xs text-stone-grey">
                We&apos;ll confirm your appointment via email within 24 hours.
              </p>

              <button
                onClick={() => {
                  setCurrentStep('service');
                  setFormData({
                    service: '',
                    addon: [],
                    date: '',
                    time: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    notes: '',
                  });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-stone-800/20 text-stone-grey text-xs uppercase tracking-widest hover:border-stone hover:text-stone transition-all duration-300"
              >
                Book Another Appointment
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep !== 'confirmation' && (
            <div className="mt-8 pt-6 border-t border-stone-800/12 flex items-center justify-between gap-4">
              {currentStep !== 'service' && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 border border-stone-800/20 text-stone-grey text-xs uppercase tracking-widest hover:border-stone-800/40 transition-all"
                >
                  Back
                </button>
              )}
              
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`ml-auto px-6 py-3 text-xs uppercase tracking-widest transition-all ${
                  canProceed()
                    ? 'bg-stone text-warm-white hover:bg-stone-grey'
                    : 'bg-stone-800/12 text-stone-grey/50 cursor-not-allowed'
                }`}
              >
                {currentStep === 'details' ? 'Confirm Booking' : 'Continue'}
              </button>
            </div>
          )}

          {/* Summary Sidebar (Mobile: Bottom, Desktop: Always visible) */}
          {currentStep !== 'confirmation' && formData.service && (
            <div className="mt-6 pt-6 border-t border-stone-800/12">
              <div className="bg-warm-white border border-stone-800/12 p-6 space-y-3">
                <p className="text-xs uppercase tracking-wider text-stone-grey mb-3">Your Selection</p>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-grey">{selectedService?.name}</span>
                  <span className="text-sumi-ink">${selectedService?.price}</span>
                </div>
                {selectedAddons.map((addon) => (
                  <div key={addon.id} className="flex justify-between text-xs">
                    <span className="text-stone-grey">{addon.name}</span>
                    <span className="text-sumi-ink">+${addon.price}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-3 border-t border-stone-800/12 font-light">
                  <span className="text-sumi-ink uppercase tracking-wider text-xs">Total</span>
                  <span className="text-stone">${totalPrice}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Info */}
        {currentStep !== 'confirmation' && (
          <div className="mt-8 text-center">
            <p className="text-xs uppercase tracking-wider text-stone-grey mb-4">
              Prefer to book by phone?
            </p>
            <a 
              href="tel:+61753388715"
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-800/20 text-stone-grey text-xs uppercase tracking-widest hover:border-stone hover:text-stone transition-all duration-300"
            >
              Call (07) 5338 8715
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
