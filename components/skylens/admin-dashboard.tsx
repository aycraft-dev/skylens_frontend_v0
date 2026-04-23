"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock,
  DollarSign,
  FileImage,
  LayoutDashboard,
  LogOut,
  Package,
  Plane,
  Settings,
  Tag,
  X,
} from "lucide-react"
import { bookings, formatIDR, type BookingStatus } from "@/lib/skylens-data"
import { cn } from "@/lib/utils"

const navSections = [
  {
    label: "Overview",
    items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: true }],
  },
  {
    label: "Bookings",
    items: [
      { id: "activities", label: "Activities", icon: Activity, badge: 3 },
      { id: "payments", label: "Payments", icon: DollarSign, badge: 2 },
    ],
  },
  {
    label: "Catalog",
    items: [
      { id: "packages", label: "Packages", icon: Package },
      { id: "categories", label: "Categories", icon: Tag },
    ],
  },
] as const

const pendingPayments = [
  {
    customer: "Made Ari",
    pkg: "Villa Promotion Aerial Video",
    amount: 6000000,
  },
  {
    customer: "Komang Dewi",
    pkg: "Event Drone Documentation",
    amount: 2500000,
  },
]

const stepOptions = [
  "Order Received",
  "Payment Confirmed",
  "Schedule Locked",
  "Team Assigned",
  "Drone Flying",
  "Editing In Progress",
  "Delivering Files",
  "Completed",
]

const timelineRows = [
  { customer: "Ayu Putri", pkg: "Wedding Coverage", current: "Drone Flying" },
  { customer: "Ni Wayan Sri", pkg: "Event Documentation", current: "Schedule Locked" },
  { customer: "Putu Raka", pkg: "Event Documentation", current: "Team Assigned" },
]

export function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <Plane className="h-4 w-4 -rotate-45 text-gold" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-bold">SkyLens Admin</span>
          </Link>
          <button
            className="text-white/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {navSections.map((section) => (
            <div key={section.label} className="mb-5">
              <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                {section.label}
              </div>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = "active" in item && item.active
                  return (
                    <li key={item.id}>
                      <button
                        className={cn(
                          "relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition",
                          isActive
                            ? "bg-white/5 text-gold"
                            : "text-white/70 hover:bg-white/5 hover:text-white",
                        )}
                      >
                        {isActive && (
                          <span className="absolute left-0 h-5 w-1 rounded-r-full bg-gold" />
                        )}
                        <item.icon className="h-4 w-4" />
                        <span className="flex-1 font-medium">{item.label}</span>
                        {"badge" in item && item.badge ? (
                          <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-gold-foreground">
                            {item.badge}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border px-3 py-4">
          <ul className="space-y-0.5">
            <li>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white">
                <Settings className="h-4 w-4" /> Settings
              </button>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                <LogOut className="h-4 w-4" /> Exit to Site
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col lg:ml-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-border bg-background">
          <div className="flex h-16 items-center justify-between px-5 md:px-8">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <LayoutDashboard className="h-4 w-4" />
              </button>
              <h1 className="text-lg font-bold text-navy md:text-xl">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-navy hover:text-navy"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-gold ring-2 ring-background" />
              </button>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                  A
                </span>
                <div className="hidden text-left md:block">
                  <div className="text-xs font-semibold text-navy">Admin</div>
                  <div className="text-[11px] text-muted-foreground">SkyLens HQ</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 md:p-8">
          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Revenue"
              value={formatIDR(48500000)}
              delta="+12% vs last month"
              deltaTone="up"
              icon={DollarSign}
              iconTone="gold"
            />
            <StatCard
              label="Active Bookings"
              value="8"
              delta="3 in progress today"
              deltaTone="neutral"
              icon={Activity}
              iconTone="navy"
            />
            <StatCard
              label="Pending Payments"
              value="2"
              delta="Needs attention"
              deltaTone="warn"
              icon={Clock}
              iconTone="amber"
            />
            <StatCard
              label="Completed This Month"
              value="14"
              delta="+4 more than last month"
              deltaTone="up"
              icon={CheckCircle2}
              iconTone="emerald"
            />
          </div>

          {/* Row 2 */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            {/* Recent bookings */}
            <section className="rounded-2xl border border-border bg-background shadow-sm">
              <div className="flex items-center justify-between p-5">
                <h2 className="text-base font-bold text-navy">Recent Bookings</h2>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-gold"
                >
                  View All <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-y border-border bg-surface text-[11px] uppercase tracking-wider text-muted-foreground">
                      <th className="px-5 py-3 font-semibold">Reference</th>
                      <th className="px-5 py-3 font-semibold">Customer</th>
                      <th className="px-5 py-3 font-semibold">Package</th>
                      <th className="px-5 py-3 font-semibold">Date</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                      <th className="px-5 py-3 text-right font-semibold">Amount</th>
                      <th className="px-5 py-3 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((b) => (
                      <tr
                        key={b.reference}
                        className="border-b border-border transition last:border-b-0 hover:bg-surface"
                      >
                        <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                          {b.reference.replace("SKY-20250", "SKY-").replace(/\d{4}-/, "")}
                        </td>
                        <td className="px-5 py-4 font-semibold text-navy">{b.customer}</td>
                        <td className="px-5 py-4 text-foreground">{b.packageName}</td>
                        <td className="px-5 py-4 text-muted-foreground">
                          {b.date.replace(" 2025", "")}
                        </td>
                        <td className="px-5 py-4">
                          <AdminStatusBadge status={b.status} />
                        </td>
                        <td className="px-5 py-4 text-right font-semibold text-navy">
                          {formatIDR(b.total)}
                        </td>
                        <td className="px-5 py-4 text-right">
                          {b.status === "Pending Payment" ? (
                            <button className="inline-flex h-8 items-center rounded-lg bg-emerald px-3 text-xs font-semibold text-emerald-foreground transition hover:opacity-90">
                              Confirm
                            </button>
                          ) : (
                            <Link
                              href={`/tracking/${b.reference}`}
                              className="inline-flex h-8 items-center rounded-lg border border-border px-3 text-xs font-semibold text-navy transition hover:border-navy"
                            >
                              View
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Pending payments */}
            <section className="rounded-2xl border border-border bg-background p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-navy">Awaiting Confirmation</h2>
                <span className="rounded-full bg-amber-soft px-2 py-0.5 text-xs font-bold text-amber">
                  {pendingPayments.length}
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {pendingPayments.map((p) => (
                  <div
                    key={p.customer}
                    className="rounded-xl border border-border bg-surface p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-navy">{p.customer}</div>
                        <div className="text-xs text-muted-foreground">{p.pkg}</div>
                        <div className="mt-2 text-base font-extrabold text-navy">
                          {formatIDR(p.amount)}
                        </div>
                      </div>
                      <button className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-border bg-background text-muted-foreground transition hover:border-navy hover:text-navy">
                        <FileImage className="h-5 w-5" />
                      </button>
                    </div>
                    <button className="mt-2 text-xs font-medium text-gold underline-offset-4 hover:underline">
                      View Proof
                    </button>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button className="inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-emerald text-xs font-semibold text-emerald-foreground transition hover:opacity-90">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Confirm
                      </button>
                      <button className="inline-flex h-9 items-center justify-center rounded-lg border border-rose/30 bg-background text-xs font-semibold text-rose transition hover:bg-rose-soft">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Row 3 — timeline editor */}
          <section className="mt-6 rounded-2xl border border-border bg-background p-5 shadow-sm md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-navy">Activity Timeline Updates</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Update the step to notify the customer via WhatsApp.
                </p>
              </div>
            </div>
            <div className="mt-5 divide-y divide-border">
              {timelineRows.map((row) => (
                <TimelineRow key={row.customer} row={row} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  delta,
  deltaTone,
  icon: Icon,
  iconTone,
}: {
  label: string
  value: string
  delta: string
  deltaTone: "up" | "neutral" | "warn"
  icon: React.ComponentType<{ className?: string }>
  iconTone: "gold" | "navy" | "amber" | "emerald"
}) {
  const deltaStyles = {
    up: "text-emerald",
    neutral: "text-muted-foreground",
    warn: "text-amber",
  }
  const iconStyles = {
    gold: "bg-gold/15 text-gold",
    navy: "bg-navy/10 text-navy",
    amber: "bg-amber-soft text-amber",
    emerald: "bg-emerald/10 text-emerald",
  }
  return (
    <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            iconStyles[iconTone],
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 text-2xl font-extrabold tracking-tight text-navy md:text-3xl">
        {value}
      </div>
      <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium", deltaStyles[deltaTone])}>
        {deltaTone === "up" && <ArrowUpRight className="h-3 w-3" />}
        {delta}
      </div>
    </div>
  )
}

function AdminStatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    "Drone Flying": "bg-emerald/10 text-emerald",
    Completed: "bg-light text-foreground",
    Confirmed: "bg-navy/10 text-navy",
    "Pending Payment": "bg-amber-soft text-amber",
    Cancelled: "bg-rose-soft text-rose",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        styles[status],
      )}
    >
      {status === "Drone Flying" && (
        <span className="h-1.5 w-1.5 rounded-full bg-emerald live-blink" />
      )}
      {status}
    </span>
  )
}

function TimelineRow({
  row,
}: {
  row: { customer: string; pkg: string; current: string }
}) {
  const [step, setStep] = useState(row.current)
  return (
    <div className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <div className="text-sm font-semibold text-navy">
          {row.pkg}{" "}
          <span className="font-normal text-muted-foreground">({row.customer})</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            value={step}
            onChange={(e) => setStep(e.target.value)}
            className="h-9 appearance-none rounded-lg border border-border bg-background pl-3 pr-9 text-xs font-semibold text-navy focus:border-navy focus:outline-none"
          >
            {stepOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
        <button className="inline-flex h-9 items-center rounded-lg border border-navy bg-background px-3 text-xs font-semibold text-navy transition hover:bg-navy hover:text-navy-foreground">
          Update
        </button>
      </div>
    </div>
  )
}
