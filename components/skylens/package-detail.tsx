"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Check,
  Clock,
  MessageCircle,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { formatIDR, type Package } from "@/lib/skylens-data"
import { cn } from "@/lib/utils"

const included = [
  "Up to 6 hours of aerial coverage",
  "2 licensed DGCA-certified pilots",
  "DJI Mavic 3 Pro with 4K RAW footage",
  "Edited highlight video (3–5 min, cinematic)",
  "50+ high-resolution aerial photos",
  "Same-day preview delivery",
  "Full RAW footage included",
]

const timeline = [
  { label: "Shoot Day", meta: "Day 0" },
  { label: "Raw Footage", meta: "+24h" },
  { label: "Edited Video", meta: "+3 days" },
  { label: "Final Delivery", meta: "+5 days" },
]

const reviews = [
  {
    name: "Ketut & Indra",
    initials: "KI",
    date: "12 Mar 2025",
    rating: 5,
    body: "The team arrived early, scouted the venue, and captured every angle of our beach ceremony in Uluwatu. The highlight reel moved us to tears. Worth every rupiah.",
  },
  {
    name: "Sarah Mitchell",
    initials: "SM",
    date: "28 Feb 2025",
    rating: 5,
    body: "Wayan and his crew were professional, punctual, and incredibly creative. The aerial shots of our villa reception made our wedding album unforgettable.",
  },
  {
    name: "Made Arya",
    initials: "MA",
    date: "14 Jan 2025",
    rating: 5,
    body: "From booking to delivery, completely seamless. The RAW footage gave our editor so much to work with. The drone work is genuinely cinematic.",
  },
]

const addons = [
  { id: "raw", label: "Raw footage on USB drive", price: 500000 },
  { id: "sameday", label: "Same-day edited highlight", price: 1000000 },
  { id: "ceremony", label: "Drone operator for ceremony", price: 750000 },
]

export function PackageDetail({ pkg }: { pkg: Package }) {
  const [activeImage, setActiveImage] = useState(0)
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  const addonTotal = addons.reduce(
    (sum, a) => (selected[a.id] ? sum + a.price : sum),
    0,
  )
  const total = pkg.price + addonTotal

  return (
    <>
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-sm text-muted-foreground md:px-8">
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/#packages" className="hover:text-navy">
            Packages
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{pkg.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-12">
          {/* LEFT */}
          <div className="min-w-0">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-navy to-emerald">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 55%), radial-gradient(circle at 80% 70%, rgba(200,169,107,0.35), transparent 60%)",
                  }}
                />
                <svg
                  className="absolute inset-0 h-full w-full text-white/15"
                  viewBox="0 0 800 450"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d={`M0 ${300 - activeImage * 40} Q200 ${200 - activeImage * 20} 400 ${250 + activeImage * 30} T800 ${180 + activeImage * 10}`}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="6 10"
                  />
                  <circle cx="400" cy={250 + activeImage * 30} r="5" fill="currentColor" />
                </svg>
                <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  View {activeImage + 1} of 4
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "aspect-[16/10] overflow-hidden rounded-xl border-2 transition",
                      activeImage === i ? "border-gold" : "border-transparent opacity-70 hover:opacity-100",
                    )}
                  >
                    <div
                      className="h-full w-full"
                      style={{
                        background: `linear-gradient(${120 + i * 25}deg, #1F2A44 0%, #1F7A6B 100%)`,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="mt-8">
              <span className="inline-flex rounded-full bg-gold px-3 py-1 text-xs font-semibold text-gold-foreground">
                {pkg.category}
              </span>
              <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-navy md:text-[40px]">
                {pkg.name}
              </h1>
              <div className="mt-3 flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <span className="font-semibold text-foreground">{pkg.rating}</span>
                <span className="text-muted-foreground">({pkg.reviewCount} reviews)</span>
              </div>
              <div className="mt-6">
                <div className="text-3xl font-extrabold text-navy">{formatIDR(pkg.price)}</div>
                <div className="mt-1 text-sm text-muted-foreground">per session</div>
              </div>
            </div>

            <hr className="my-8 border-border" />

            {/* Included */}
            <h2 className="text-xl font-bold text-navy">What&apos;s Included</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <hr className="my-8 border-border" />

            {/* Timeline */}
            <h2 className="text-xl font-bold text-navy">Delivery Timeline</h2>
            <div className="mt-6 hidden items-center sm:flex">
              {timeline.map((step, i) => (
                <div key={step.label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
                        i === 0 ? "bg-gold text-gold-foreground" : "bg-light text-muted-foreground",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="mt-2 text-sm font-semibold text-navy">{step.label}</span>
                    <span className="text-xs text-muted-foreground">{step.meta}</span>
                  </div>
                  {i < timeline.length - 1 && (
                    <div
                      className={cn(
                        "mx-2 h-0.5 flex-1",
                        i === 0 ? "bg-gradient-to-r from-gold to-light" : "bg-light",
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            {/* Mobile timeline */}
            <ol className="mt-6 space-y-4 sm:hidden">
              {timeline.map((step, i) => (
                <li key={step.label} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                      i === 0 ? "bg-gold text-gold-foreground" : "bg-light text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-navy">{step.label}</div>
                    <div className="text-xs text-muted-foreground">{step.meta}</div>
                  </div>
                </li>
              ))}
            </ol>

            <hr className="my-8 border-border" />

            {/* Reviews */}
            <h2 className="text-xl font-bold text-navy">Customer Reviews</h2>
            <div className="mt-5 space-y-4">
              {reviews.map((r) => (
                <div
                  key={r.name}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-navy-foreground">
                      {r.initials}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{r.name}</span>
                        <span className="text-xs text-muted-foreground">· {r.date}</span>
                      </div>
                      <div className="mt-0.5 flex gap-0.5 text-gold">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-navy hover:underline">
              Show all {pkg.reviewCount} reviews
            </button>

            <div className="mt-10">
              <Link
                href="/#packages"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to packages
              </Link>
            </div>
          </div>

          {/* RIGHT — Booking Card */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-lg">
              <div className="text-3xl font-extrabold text-navy">{formatIDR(pkg.price)}</div>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Full Day (up to 8 hours)
              </div>
              <hr className="my-5 border-border" />

              <div className="text-sm font-semibold text-navy">Select Add-ons</div>
              <div className="mt-3 space-y-2">
                {addons.map((a) => (
                  <label
                    key={a.id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-xl border p-3 text-sm transition",
                      selected[a.id]
                        ? "border-gold bg-gold/5"
                        : "border-border bg-surface hover:border-muted-foreground/40",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!selected[a.id]}
                        onChange={(e) =>
                          setSelected((prev) => ({ ...prev, [a.id]: e.target.checked }))
                        }
                        className="h-4 w-4 accent-navy"
                      />
                      <span className="font-medium text-foreground">{a.label}</span>
                    </span>
                    <span className="font-semibold text-navy">+{formatIDR(a.price)}</span>
                  </label>
                ))}
              </div>

              <hr className="my-5 border-border" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Base package</span>
                  <span>{formatIDR(pkg.price)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Add-ons</span>
                  <span>{formatIDR(addonTotal)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-base font-bold">
                  <span className="text-navy">Total</span>
                  <span className="text-navy">{formatIDR(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-5 flex h-14 w-full items-center justify-center rounded-xl bg-gold text-base font-semibold text-gold-foreground transition hover:opacity-90"
              >
                Book This Package
              </Link>
              <a
                href="#"
                className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald hover:underline"
              >
                <MessageCircle className="h-4 w-4" />
                Questions? WhatsApp us
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background p-3 shadow-lg lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Total</div>
            <div className="text-lg font-bold text-navy">{formatIDR(total)}</div>
          </div>
          <Link
            href="/checkout"
            className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-gold text-sm font-semibold text-gold-foreground"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  )
}
