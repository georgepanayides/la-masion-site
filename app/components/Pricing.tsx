import PackageDisclaimer from "./ui/PackageDisclaimer";

export default function Pricing() {
  const plans = [
    { name: "Xmas Offer", price: "$79", desc: "Xmas offer — 30min scalp renewal + consultation (Use code Xmas10)" },
    { name: "Signature Head Spa", price: "$149", desc: "90min full ritual for scalp health & deep relaxation" },
    { name: "Renewal Package (3)", price: "$420", desc: "Three-session package — save & sustain results" },
  ];

  return (
    <section className="w-full py-12 md:py-20" aria-labelledby="pricing-heading">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 id="pricing-heading" className="text-2xl md:text-3xl font-serif text-sumi-ink mb-6">Packages & Pricing</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <article key={p.name} className="rounded-xl p-6 border border-gray-100 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl mb-2">{p.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{p.desc}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <strong className="text-lg">{p.price}</strong>
                <a href="#book" className="text-sm inline-block bg-[#2c2823] text-white px-4 py-2 rounded-md">Book</a>
              </div>
            </article>
          ))}
        </div>

        <PackageDisclaimer />
      </div>
    </section>
  );
}
