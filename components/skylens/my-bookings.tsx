"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  Calendar,
  Check,
  ChevronRight,
  Download,
  MapPin,
  Plane,
  Search,
} from "lucide-react"
import {
  bookings,
  formatIDR,
  type Booking,
  type BookingStatus,
} from "@/lib/skylens-data"
import { cn } from "@/lib/utils"

const statusFilters: { id: "All" | BookingStatus; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Pending Payment", label: "Pending" },
  { id: "Confirmed", label: "Confirmed" },
  { id: "Drone Flying", label: "In Progress" },
  { id: "Completed", label: "Completed" },
  { id: "Cancelled", label: "Cancelled" },
]

export function MyBookings() {
  const [filter, setFilter] = useState<"All" | BookingStatus>("All")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return bookings.filter((b) => {
      const byStatus = filter === "All" || b.status === filter
      const byQuery =
        q === "" ||
        b.reference.toLowerCase().includes(q) ||
        b.packageName.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q)
      return byStatus && byQuery
    })
  }, [filter, query])

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: bookings.length }
    for (const b of bookings) {
      map[b.status] = (map[b.status] ?? 0) + 1
    }
    return map
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            My Bookings
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Track all your drone sessions, payments, and deliverables.
          </p>
        </div>
        <Link
          href="/#packages"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gold px-5 text-sm font-semibold text-gold-foreground transition hover:opacity-90"
        >
          <Plane className="h-4 w-4" /> New Booking
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="-mx-1 flex flex-wrap gap-2 px-1">
          {statusFilters.map((f) => {
            const active = filter === f.id
            const count = counts[f.id] ?? 0
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition",
                  active
                    ? "bg-navy text-navy-foreground"
                    : "bg-light text-muted-foreground hover:bg-surface hover:text-foreground",
                )}
              >
                {f.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 text-[11px]",
                    active ? "bg-white/15 text-white" : "bg-background text-foreground/60",
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by reference or package..."
            className="h-11 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-navy focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((b) => (
            <BookingCard key={b.reference} booking={b} />
          ))}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    "Drone Flying": "bg-emerald text-emerald-foreground",
    Completed: "bg-light text-foreground",
    Confirmed: "bg-navy/10 text-navy",
    "Pending Payment": "bg-amber-soft text-amber",
    Cancelled: "bg-rose-soft text-rose",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        styles[status],
      )}
    >
      {status === "Drone Flying" && (
        <span className="h-1.5 w-1.5 rounded-full bg-white live-blink" />
      )}
      {status === "Completed" && <Check className="h-3 w-3" strokeWidth={3} />}
      {status}
    </span>
  )
}

function PaymentBadge({ payment }: { payment: Booking["payment"] }) {
  const styles = {
    Paid: "bg-emerald/10 text-emerald",
    Awaiting: "bg-amber-soft text-amber",
    Refunded: "bg-rose-soft text-rose",
  } as const
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        styles[payment],
      )}
    >
      {payment}
    </span>
  )
}

function BookingCard({ booking }: { booking: Booking }) {
  const percent = Math.round((booking.stepsCompleted / booking.totalSteps) * 100)
  return (
    <article className="rounded-2xl border border-border bg-background p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-navy">{booking.packageName}</h3>
            <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              {booking.category}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="font-mono text-[11px]">#{booking.reference}</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {booking.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {booking.location}
            </span>
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-navy">{booking.currentStep}</span>
          <span className="text-muted-foreground">
            {booking.stepsCompleted}/{booking.totalSteps} steps
          </span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-light">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              booking.status === "Cancelled" ? "bg-rose" : "bg-emerald",
            )}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <hr className="my-5 border-border" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-base font-bold text-navy">{formatIDR(booking.total)}</div>
          <PaymentBadge payment={booking.payment} />
        </div>
        <div className="flex flex-wrap gap-2">
          {booking.status === "Completed" && (
            <button className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-emerald px-4 text-xs font-semibold text-emerald-foreground transition hover:opacity-90">
              <Download className="h-3.5 w-3.5" /> Download Files
            </button>
          )}
          {booking.status === "Pending Payment" && (
            <Link
              href="/payment"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-gold px-4 text-xs font-semibold text-gold-foreground transition hover:opacity-90"
            >
              Pay Now <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          )}
          <Link
            href={`/tracking/${booking.reference}`}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-4 text-xs font-semibold text-navy transition hover:border-navy"
          >
            Track <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

function EmptyState() {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <svg
        className="mx-auto h-20 w-20 text-muted-foreground"
        viewBox="0 0 64 64"
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <circle cx="32" cy="32" r="8" />
        <path d="M32 24V14M32 40v10M24 32H14M40 32h10" strokeLinecap="round" />
        <circle cx="14" cy="14" r="4" />
        <circle cx="50" cy="14" r="4" />
        <circle cx="14" cy="50" r="4" />
        <circle cx="50" cy="50" r="4" />
      </svg>
      <h3 className="mt-4 text-lg font-bold text-navy">No bookings match your filter</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Browse our packages and book your first drone session.
      </p>
      <Link
        href="/#packages"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-gold px-6 text-sm font-semibold text-gold-foreground transition hover:opacity-90"
      >
        Explore Packages
      </Link>
    </div>
  )
}
