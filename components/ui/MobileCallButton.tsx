import { FaPhoneAlt } from "react-icons/fa";

export default function MobileCallButton() {
  return (
    <a
      href="tel:+61753388715"
      aria-label="Call to book"
      className="md:hidden fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-800/20 bg-warm-white/90 text-sumi-ink transition-colors hover:border-driftwood/60 hover:text-driftwood focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-driftwood/40"
    >
      <FaPhoneAlt aria-hidden className="text-sm" />
    </a>
  );
}
