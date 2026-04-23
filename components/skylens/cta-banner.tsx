import Link from "next/link"

export function CtaBanner() {
  return (
    <section className="bg-navy py-16 text-navy-foreground md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Ready to fly?
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-white/70 md:text-lg">
            Book your drone session today. Available 7 days a week across Bali, Lombok, and the
            Nusa islands.
          </p>
        </div>
        <Link
          href="/#packages"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-gold px-7 text-base font-semibold text-gold-foreground transition hover:opacity-90"
        >
          Browse Packages
        </Link>
      </div>
    </section>
  )
}
