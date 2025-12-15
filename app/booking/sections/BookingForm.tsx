"use client";

import { useState } from "react";
import { treatments } from "../../data/Treatments";

export default function BookingForm() {
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      // Reset form after success
      setTimeout(() => {
        setSubmitStatus("idle");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          notes: ""
        });
        setSelectedTreatment("");
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const selectedTreatmentData = treatments.find(t => t.id === selectedTreatment);

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-widest text-stone-grey/70 mb-3">
            Schedule Your Visit
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-sumi-ink font-light mb-4">
            Book Your Treatment
          </h1>
          <p className="text-sm md:text-base text-stone-grey max-w-2xl mx-auto leading-relaxed">
            Choose your preferred ritual and time. We&apos;ll confirm your booking within 24 hours.
          </p>
        </div>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div className="mb-8 p-6 bg-clay/10 border border-clay/30 text-center">
            <p className="text-sm uppercase tracking-wider text-sumi-ink font-medium mb-2">
              Booking Request Received
            </p>
            <p className="text-xs text-stone-grey">
              We&apos;ll contact you within 24 hours to confirm your appointment.
            </p>
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="bg-warm-white border border-stone-800/15 p-6 md:p-10">
          {/* Treatment Selection */}
          <div className="mb-6 md:mb-8">
            <label htmlFor="treatment" className="block text-xs uppercase tracking-widest text-sumi-ink mb-3 font-medium">
              Select Treatment *
            </label>
            <select
              id="treatment"
              name="treatment"
              required
              value={selectedTreatment}
              onChange={(e) => setSelectedTreatment(e.target.value)}
              className="w-full p-4 border border-stone-800/20 bg-silk-cream text-sm text-sumi-ink focus:border-clay focus:outline-none transition-colors"
            >
              <option value="">Choose a ritual...</option>
              {treatments.map((treatment) => (
                <option key={treatment.id} value={treatment.id}>
                  {treatment.name} — {treatment.duration} — ${treatment.price}
                </option>
              ))}
            </select>

            {/* Treatment Info Preview */}
            {selectedTreatmentData && (
              <div className="mt-4 p-4 bg-clay/5 border border-clay/10">
                <p className="text-xs text-stone-grey leading-relaxed">
                  {selectedTreatmentData.description}
                </p>
                {selectedTreatmentData.bestFor && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedTreatmentData.bestFor.map((tag) => (
                      <span 
                        key={tag}
                        className="inline-block px-2 py-1 bg-clay/10 text-clay text-[10px] uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Personal Information */}
          <div className="mb-6 md:mb-8 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-sumi-ink mb-2 font-medium">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full p-4 border border-stone-800/20 bg-silk-cream text-sm text-sumi-ink placeholder:text-stone-grey/50 focus:border-clay focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-sumi-ink mb-2 font-medium">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="(07) 1234 5678"
                className="w-full p-4 border border-stone-800/20 bg-silk-cream text-sm text-sumi-ink placeholder:text-stone-grey/50 focus:border-clay focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6 md:mb-8">
            <label htmlFor="email" className="block text-xs uppercase tracking-widest text-sumi-ink mb-2 font-medium">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full p-4 border border-stone-800/20 bg-silk-cream text-sm text-sumi-ink placeholder:text-stone-grey/50 focus:border-clay focus:outline-none transition-colors"
            />
          </div>

          {/* Date and Time Selection */}
          <div className="mb-6 md:mb-8 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <label htmlFor="date" className="block text-xs uppercase tracking-widest text-sumi-ink mb-2 font-medium">
                Preferred Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-4 border border-stone-800/20 bg-silk-cream text-sm text-sumi-ink focus:border-clay focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-xs uppercase tracking-widest text-sumi-ink mb-2 font-medium">
                Preferred Time *
              </label>
              <select
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full p-4 border border-stone-800/20 bg-silk-cream text-sm text-sumi-ink focus:border-clay focus:outline-none transition-colors"
              >
                <option value="">Select time...</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-8 md:mb-10">
            <label htmlFor="notes" className="block text-xs uppercase tracking-widest text-sumi-ink mb-2 font-medium">
              Special Requests or Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Any allergies, concerns, or special requests..."
              className="w-full p-4 border border-stone-800/20 bg-silk-cream text-sm text-sumi-ink placeholder:text-stone-grey/50 focus:border-clay focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 md:py-5 bg-stone-800 text-warm-white text-xs uppercase tracking-widest hover:bg-stone-800/90 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Request Booking"}
            </button>
            
            <p className="text-center text-xs text-stone-grey/70 leading-relaxed">
              By submitting, you agree to our cancellation policy. We require 24 hours notice for changes or cancellations.
            </p>
          </div>
        </form>

        {/* Contact Alternative */}
        <div className="mt-12 text-center border-t border-stone-800/20 pt-12">
          <p className="text-xs uppercase tracking-widest text-stone-grey/70 mb-4">
            Prefer to speak with us directly?
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
            <a 
              href="tel:+61753388715"
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-800/30 text-stone-800 text-xs uppercase tracking-widest hover:bg-stone-800 hover:text-warm-white transition-all duration-300"
            >
              Call (07) 5338 8715
            </a>
            <a 
              href="mailto:lamaisondeaesthetics@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-800/30 text-stone-800 text-xs uppercase tracking-widest hover:bg-stone-800 hover:text-warm-white transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
