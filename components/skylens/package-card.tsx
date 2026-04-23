import Link from "next/link"
import { Clock, Star } from "lucide-react"
import { formatIDR, type Package } from "@/lib/skylens-data"

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <Link
      href={`/packages/${pkg.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] bg-gradient-to-br from-navy via-navy to-emerald">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), transparent 55%), radial-gradient(circle at 80% 70%, rgba(200,169,107,0.35), transparent 60%)",
          }}
          aria-hidden="true"
        />
        <svg
          className="absolute inset-0 h-full w-full text-white/15"
          viewBox="0 0 400 250"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 200 Q100 120 200 160 T400 100"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <circle cx="200" cy="160" r="3" fill="currentColor" />
        </svg>
        <span className="absolute left-3 top-3 rounded-full bg-background px-3 py-1 text-xs font-semibold text-navy shadow-sm">
          {pkg.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold leading-snug text-navy">{pkg.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {pkg.shortDescription}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="font-semibold text-foreground">{pkg.rating}</span>
            <span>({pkg.reviewCount} reviews)</span>
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            {pkg.originalPrice && (
              <div className="text-xs text-muted-foreground line-through">
                {formatIDR(pkg.originalPrice)}
              </div>
            )}
            <div className="text-xl font-bold text-navy">{formatIDR(pkg.price)}</div>
          </div>
        </div>
        <span className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-gold px-4 text-sm font-semibold text-gold-foreground transition group-hover:opacity-90">
          Book Now
        </span>
      </div>
    </Link>
  )
}
