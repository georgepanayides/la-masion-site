import { useState } from "react";

export default function Booking() {


  return (
    <section id="book" className="w-full py-12 md:py-20 bg-brand-warm-white" aria-labelledby="book-heading">
      <div className="container max-w-3xl mx-auto px-4 text-center">
        <h2 id="book-heading" className="text-2xl md:text-3xl font-serif text-sumi-ink mb-3">Book your experience</h2>
        <p className="text-gray-700 mb-6">Simple, fast booking — no hard sell. Choose a time and we will follow up to confirm.</p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="name" required placeholder="Full name" className="p-3 rounded-lg border border-gray-200" />
            <input name="phone" required placeholder="Phone number" className="p-3 rounded-lg border border-gray-200" />
            <input name="email" type="email" placeholder="Email" className="p-3 rounded-lg border border-gray-200 md:col-span-2" />
            <input name="date" type="date" className="p-3 rounded-lg border border-gray-200 md:col-span-2" />
            <textarea name="notes" placeholder="Any notes or preferences" className="p-3 rounded-lg border border-gray-200 md:col-span-2" rows={3} />

            <div className="md:col-span-2 text-right">
              <button type="submit" className="px-5 py-3 bg-[#2c2823] text-white rounded-md">Send request</button>
            </div>
          </form>
      </div>
    </section>
  );
}
