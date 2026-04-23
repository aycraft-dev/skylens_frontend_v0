import Link from "next/link"
import { Plane } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy">
            <Plane className="h-4 w-4 -rotate-45 text-gold" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-bold tracking-tight text-navy">SkyLens</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-navy">
            Home
          </Link>
          <Link
            href="/#packages"
            className="text-sm font-medium text-muted-foreground hover:text-navy"
          >
            Packages
          </Link>
          <Link
            href="/my-bookings"
            className="text-sm font-medium text-muted-foreground hover:text-navy"
          >
            My Bookings
          </Link>
          <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-navy">
            Admin
          </Link>
        </nav>

        <Link
          href="/#packages"
          className="inline-flex h-10 items-center rounded-xl bg-navy px-5 text-sm font-semibold text-navy-foreground transition hover:opacity-90"
        >
          Book Now
        </Link>
      </div>
    </header>
  )
}
