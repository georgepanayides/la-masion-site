import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-sumi-ink text-silk-cream border-t border-stone-grey/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="text-lg uppercase tracking-widest font-light">
              La Maison De Aesthetics
            </h3>
            <p className="text-xs leading-relaxed text-silk-cream/70 max-w-xs">
              Where ancient rituals meet modern luxury. Experience transformative aesthetic treatments in our serene sanctuary.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-silk-cream/60 hover:text-clay transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-silk-cream/60 hover:text-clay transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-medium text-clay">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-xs text-silk-cream/70 hover:text-clay transition-colors uppercase tracking-wider">
                Home
              </Link>
              <Link href="/treatments" className="text-xs text-silk-cream/70 hover:text-clay transition-colors uppercase tracking-wider">
                Treatments
              </Link>
              <Link href="/booking" className="text-xs text-silk-cream/70 hover:text-clay transition-colors uppercase tracking-wider">
                Book Now
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-medium text-clay">
              Contact
            </h4>
            <div className="space-y-3 text-xs text-silk-cream/70">
              <p className="uppercase tracking-wider">
                <a href="tel:+61753388715" className="hover:text-clay transition-colors">
                  (07) 5338 8715
                </a>
              </p>
              <p className="tracking-wider">
                <a href="mailto:lamaisondeaesthetics@gmail.com" className="hover:text-clay transition-colors">
                  lamaisondeaesthetics@gmail.com
                </a>
              </p>
              <p className="leading-relaxed">
                1/172 Brisbane Road<br />
                Mooloolaba, Queensland
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest font-medium text-clay">
              Hours
            </h4>
            <div className="space-y-2 text-xs text-silk-cream/70">
              <div className="flex justify-between gap-4">
                <span className="uppercase tracking-wider">Monday</span>
                <span>9am - 5pm</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="uppercase tracking-wider">Tuesday</span>
                <span>9am - 5pm</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="uppercase tracking-wider">Wednesday</span>
                <span>9am - 5pm</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="uppercase tracking-wider">Thursday</span>
                <span>9am - 7pm</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="uppercase tracking-wider">Friday</span>
                <span>9am - 6pm</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="uppercase tracking-wider">Saturday</span>
                <span>9am - 4pm</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="uppercase tracking-wider">Sunday</span>
                <span>9am - 5pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-stone-grey/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-silk-cream/50 uppercase tracking-wider">
              © {new Date().getFullYear()} La Maison De Aesthetics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}