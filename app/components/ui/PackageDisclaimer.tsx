import Link from 'next/link';

export default function PackageDisclaimer() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-6 px-2">
      <p className="text-[10px] md:text-xs text-stone-grey/80 italic leading-relaxed text-center">
        *Packages are not transferrable to another person. If you would like to purchase a gift for someone,{' '}
        <Link href="https://www.lamaisondeaesthetics.com/store-2" className="underline hover:text-sumi-ink transition-colors">
          click here to buy a gift voucher
        </Link>
      </p>
    </div>
  );
}
