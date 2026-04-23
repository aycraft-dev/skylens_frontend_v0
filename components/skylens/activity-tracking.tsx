import Link from "next/link"
import {
  Calendar,
  Check,
  Lock,
  MapPin,
  MessageCircle,
  Mail,
} from "lucide-react"
import { formatIDR } from "@/lib/skylens-data"
import { cn } from "@/lib/utils"

const steps = [
  {
    label: "Order Received",
    meta: "Completed · 14 May 2025, 10:22 WIB",
    desc: "Your booking has been received and confirmed.",
    state: "done",
  },
  {
    label: "Payment Confirmed",
    meta: "Completed · 14 May 2025, 14:05 WIB",
    desc: "Payment of Rp 4.500.000 confirmed. Thank you!",
    state: "done",
  },
  {
    label: "Schedule Locked",
    meta: "Completed · 14 May 2025, 15:30 WIB",
    desc: "Your shoot date of 15 June 2025 is confirmed.",
    state: "done",
  },
  {
    label: "Team Assigned",
    meta: "Completed · 20 May 2025, 09:00 WIB",
    desc: "Pilot: Wayan Dharma. Assistant: Kadek Sari.",
    state: "done",
  },
  {
    label: "Drone Flying",
    meta: "In Progress · Started 15 June 2025, 08:00 WIB",
    desc: "Your drone session is live! Aerial footage being captured.",
    state: "active",
    live: true,
  },
  {
    label: "Editing In Progress",
    meta: "Up next",
    desc: "Our editors begin cutting your highlight film.",
    state: "upcoming",
  },
  {
    label: "Delivering Files",
    meta: "Estimated 17 Jun 2025",
    desc: "Final files delivered via private download link.",
    state: "upcoming",
  },
  {
    label: "Completed",
    meta: "",
    desc: "Leave a review and tag us in your final edit.",
    state: "upcoming",
  },
] as const

const team = [
  { initials: "WD", name: "Wayan Dharma", role: "Lead Pilot · DJI certified" },
  { initials: "KS", name: "Kadek Sari", role: "Camera Assistant" },
]

export function ActivityTracking({ reference }: { reference: string }) {
  const completed = 5
  const total = steps.length
  const percent = Math.round((completed / total) * 100)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      {/* Header card */}
      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="text-lg font-bold text-navy md:text-xl">
              Wedding Drone Coverage
            </div>
            <div className="mt-2 inline-flex rounded-full bg-background px-3 py-1 font-mono text-xs font-semibold text-navy">
              {reference}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Saturday, 15 June 2025
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                Seminyak, Bali
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald px-4 py-1.5 text-sm font-semibold text-emerald-foreground">
              <span className="h-2 w-2 rounded-full bg-white live-blink" />
              Drone Flying
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald/10 px-3 py-0.5 text-xs font-semibold text-emerald">
              <Check className="h-3 w-3" strokeWidth={3} /> Paid
            </span>
            <div className="text-lg font-bold text-navy">{formatIDR(4500000)}</div>
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>
              Progress — <span className="font-semibold text-navy">{completed} of {total}</span> steps completed
            </span>
            <span>{percent}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-light">
            <div
              className="h-full rounded-full bg-emerald transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Est. completion: 17 June 2025
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        {/* Timeline */}
        <section>
          <h2 className="text-lg font-bold text-navy">Session Progress</h2>
          <ol className="mt-5 space-y-0">
            {steps.map((s, i) => (
              <TimelineStep
                key={s.label}
                step={s}
                isLast={i === steps.length - 1}
              />
            ))}
          </ol>
        </section>

        {/* Right column */}
        <aside className="space-y-6">
          {/* Team */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-base font-bold text-navy">Your Team</h3>
            <div className="mt-4 space-y-3">
              {team.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-navy-foreground">
                    {m.initials}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-navy">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.role}</div>
                  </div>
                  <button
                    aria-label={`WhatsApp ${m.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald text-emerald-foreground transition hover:opacity-90"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Session details */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-base font-bold text-navy">Session Details</h3>
            <dl className="mt-4 divide-y divide-border text-sm">
              <DetailRow label="Package" value="Wedding Drone Coverage" />
              <DetailRow label="Date" value="15 June 2025" />
              <DetailRow label="Location" value="Seminyak, Bali" />
              <DetailRow label="Duration" value="Full Day (up to 8 hrs)" />
              <DetailRow label="Estimated Delivery" value="17 June 2025" />
            </dl>
          </div>

          {/* Need help */}
          <div className="rounded-2xl border border-border bg-background p-6">
            <h3 className="text-base font-bold text-navy">Need help?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Questions about your booking? We&apos;re here for you.
            </p>
            <button className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald text-sm font-semibold text-emerald-foreground transition hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </button>
            <a
              href="mailto:hello@skylens.id"
              className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-navy"
            >
              <Mail className="h-4 w-4" /> hello@skylens.id
            </a>
          </div>

          {/* Your files (locked) */}
          <div className="rounded-2xl border-2 border-dashed border-border bg-surface p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-light text-muted-foreground">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-base font-bold text-navy">Your Files</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Files will appear here once editing is complete.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-10">
        <Link
          href="/my-bookings"
          className="text-sm font-medium text-muted-foreground hover:text-navy"
        >
          ← Back to all bookings
        </Link>
      </div>
    </div>
  )
}

function TimelineStep({
  step,
  isLast,
}: {
  step: (typeof steps)[number]
  isLast: boolean
}) {
  const { state, label, meta, desc } = step
  return (
    <li className="flex gap-4 pb-6 last:pb-0">
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
            state === "done" && "bg-emerald text-emerald-foreground",
            state === "active" && "bg-navy text-navy-foreground",
            state === "upcoming" && "border-2 border-light bg-background",
          )}
        >
          {state === "done" && <Check className="h-4 w-4" strokeWidth={3} />}
          {state === "active" && (
            <>
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="pulse-ring absolute inset-0 rounded-full bg-navy" />
            </>
          )}
        </span>
        {!isLast && (
          <span
            className={cn(
              "mt-1 w-0.5 flex-1",
              state === "done"
                ? "bg-emerald"
                : state === "active"
                  ? "border-l-2 border-dashed border-navy/40 bg-transparent"
                  : "border-l-2 border-dashed border-light bg-transparent",
            )}
            style={{ minHeight: 36 }}
          />
        )}
      </div>
      <div className="flex-1 pt-0.5 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "text-sm font-semibold",
              state === "upcoming" ? "text-muted-foreground" : "text-navy",
              state === "active" && "text-base",
            )}
          >
            {label}
          </span>
          {state === "active" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-rose">
              <span className="h-1.5 w-1.5 rounded-full bg-rose live-blink" /> Live
            </span>
          )}
          {state === "active" && (
            <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-foreground">
              In Progress
            </span>
          )}
        </div>
        {meta && <div className="mt-0.5 text-xs text-muted-foreground">{meta}</div>}
        <p
          className={cn(
            "mt-1.5 text-sm leading-relaxed",
            state === "upcoming" ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {desc}
        </p>
      </div>
    </li>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="text-sm font-semibold text-navy">{value}</dd>
    </div>
  )
}
