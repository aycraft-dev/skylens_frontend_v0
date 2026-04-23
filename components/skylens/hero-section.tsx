import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-navy text-navy-foreground">
      {/* Decorative drone path SVG */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-white/10"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M-50 600 Q 300 400 600 500 T 1200 300 Q 1400 220 1500 260"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <path
          d="M-50 700 Q 200 560 520 620 T 1100 460 Q 1350 400 1500 440"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 10"
        />
        <circle cx="600" cy="500" r="4" fill="currentColor" />
        <circle cx="1200" cy="300" r="3" fill="currentColor" />
        <circle cx="520" cy="620" r="3" fill="currentColor" />
      </svg>

      {/* Subtle gold glow */}
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #C8A96B 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            DGCA Certified · Insured · Bali-based
          </span>
          <h1 className="mt-6 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Capture Bali <span className="text-gold">From Above</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/70 md:text-xl">
            Professional drone photography & videography for weddings, real estate, surveys, and
            events. Flown by licensed pilots, delivered in cinematic 4K.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#packages"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-gold px-7 text-base font-semibold text-gold-foreground transition hover:opacity-90"
            >
              Browse Packages
            </Link>
            <Link
              href="/#work"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-transparent px-7 text-base font-semibold text-white transition hover:bg-white/10"
            >
              See Our Work
            </Link>
          </div>

          <div className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <div>
              <div className="text-2xl font-bold text-gold md:text-3xl">120+</div>
              <div className="mt-1 text-xs text-white/60 md:text-sm">Projects flown</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold md:text-3xl">4.9★</div>
              <div className="mt-1 text-xs text-white/60 md:text-sm">Average rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold md:text-3xl">24h</div>
              <div className="mt-1 text-xs text-white/60 md:text-sm">Preview delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
