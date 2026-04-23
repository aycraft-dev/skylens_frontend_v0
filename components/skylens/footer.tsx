import Link from "next/link"
import { Plane, Instagram, Youtube, MessageCircle, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-3 md:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <Plane className="h-4 w-4 -rotate-45 text-gold" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold">SkyLens</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Professional drone photography & videography across Bali, Lombok, and the Nusa islands.
          </p>
          <div className="mt-5 flex gap-3">
            <Link
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/80 transition hover:bg-white/15"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/80 transition hover:bg-white/15"
            >
              <Youtube className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-gold">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#packages" className="hover:text-gold">
                Packages
              </Link>
            </li>
            <li>
              <Link href="/my-bookings" className="hover:text-gold">
                My Bookings
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-gold">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-gold" />
              <span>+62 812 3456 7890</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" />
              <span>hello@skylens.id</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              <span>Seminyak, Bali — Indonesia</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/50 md:px-8">
          © 2025 SkyLens Indonesia. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
