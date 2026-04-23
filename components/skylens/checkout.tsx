"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Check,
  Copy,
  ChevronRight,
  ChevronLeft,
  Lock,
  UploadCloud,
  Pencil,
} from "lucide-react"
import { formatIDR } from "@/lib/skylens-data"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, title: "Your Info" },
  { id: 2, title: "Trip Details" },
  { id: 3, title: "Review & Pay" },
  { id: 4, title: "Confirmed" },
]

const BASE = 4500000
const ADDONS = 1500000
const TOTAL = BASE + ADDONS

export function Checkout() {
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    name: "Ayu Putri",
    email: "ayu@gmail.com",
    phone: "+62 812 3456 7890",
    date: "2025-06-15",
    location: "Seminyak, Bali",
    notes: "",
  })

  const copyRef = () => {
    navigator.clipboard.writeText("SKY-20250615-A7X9K")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      {/* Stepper */}
      <Stepper current={step} />

      <div
        className={cn(
          "mt-10 grid gap-8 lg:gap-10",
          step === 4 ? "lg:grid-cols-1" : "lg:grid-cols-[1fr_380px]",
        )}
      >
        {/* Left column */}
        <div className="min-w-0">
          {step === 1 && <Step1 form={form} setForm={setForm} onNext={() => setStep(2)} />}
          {step === 2 && (
            <Step2
              form={form}
              setForm={setForm}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <Step3 form={form} onBack={() => setStep(2)} onNext={() => setStep(4)} onEdit={setStep} />
          )}
          {step === 4 && <Step4 copied={copied} copyRef={copyRef} />}
        </div>

        {/* Right summary */}
        {step !== 4 && (
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <OrderSummary />
          </aside>
        )}
      </div>
    </div>
  )
}

function Stepper({ current }: { current: number }) {
  return (
    <div>
      <div className="flex items-center">
        {steps.map((s, i) => {
          const isDone = current > s.id
          const isActive = current === s.id
          return (
            <div key={s.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition",
                    isDone && "bg-emerald text-emerald-foreground",
                    isActive && "bg-navy text-navy-foreground ring-4 ring-navy/10",
                    !isDone && !isActive && "bg-light text-muted-foreground",
                  )}
                >
                  {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : s.id}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-semibold sm:block",
                    isActive || isDone ? "text-navy" : "text-muted-foreground",
                  )}
                >
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 flex-1 transition",
                    current > s.id ? "bg-emerald" : "bg-light",
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground sm:hidden">
        Step {current} of {steps.length} · {steps[current - 1]!.title}
      </div>
    </div>
  )
}

function OrderSummary() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
      <div className="text-sm font-bold uppercase tracking-wider text-navy">Order Summary</div>
      <div className="mt-4 flex gap-3">
        <div className="h-16 w-20 flex-shrink-0 rounded-lg bg-gradient-to-br from-navy to-emerald" />
        <div>
          <div className="text-sm font-semibold text-navy">Wedding Drone Coverage</div>
          <div className="mt-1 text-xs text-muted-foreground">Full Day · Aerial Photography</div>
        </div>
      </div>
      <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
        <div>· Raw footage on USB drive</div>
        <div>· Same-day edited highlight</div>
      </div>
      <hr className="my-5 border-border" />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Base package</span>
          <span>{formatIDR(BASE)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Add-ons</span>
          <span>{formatIDR(ADDONS)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
          <span className="text-navy">Total</span>
          <span className="text-navy">{formatIDR(TOTAL)}</span>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-lg bg-surface px-3 py-2.5 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5 text-emerald" />
        Booking confirmed after payment
      </div>
    </div>
  )
}

function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <div className="mt-2">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  )
}

const inputCls =
  "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm placeholder:text-muted-foreground focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10"

function Step1({
  form,
  setForm,
  onNext,
}: {
  form: Record<string, string>
  setForm: (v: Record<string, string>) => void
  onNext: () => void
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-navy">Tell us who you are</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        We&apos;ll use this to confirm your booking and send updates.
      </p>
      <div className="mt-7 grid gap-5">
        <Field label="Full Name">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Email Address">
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="WhatsApp Number" hint="We'll send updates here">
          <input
            required
            placeholder="+62 812 3456 7890"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputCls}
          />
        </Field>
      </div>
      <button
        onClick={onNext}
        className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy text-sm font-semibold text-navy-foreground transition hover:opacity-90"
      >
        Continue <ChevronRight className="h-4 w-4" />
      </button>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        No account needed. Booking as a guest.
      </p>
    </div>
  )
}

function Step2({
  form,
  setForm,
  onBack,
  onNext,
}: {
  form: Record<string, string>
  setForm: (v: Record<string, string>) => void
  onBack: () => void
  onNext: () => void
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-navy">Tell us about your shoot</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Give us the essentials so we can plan the flight.
      </p>
      <div className="mt-7 grid gap-5">
        <Field label="Service Date">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Location in Bali">
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Seminyak, Uluwatu, Ubud"
            className={inputCls}
          />
        </Field>
        <Field label="Special Notes">
          <textarea
            rows={4}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Any details about the venue, schedule, or requirements..."
            className="w-full rounded-xl border border-border bg-background p-4 text-sm placeholder:text-muted-foreground focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/10"
          />
        </Field>
        <Field label="Reference Files">
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface px-6 py-10 text-center">
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm font-medium text-navy">
              Upload reference images or documents
            </div>
            <div className="text-xs text-muted-foreground">
              Drag & drop files here, or{" "}
              <button className="font-semibold text-gold hover:underline">click to browse</button>
            </div>
          </div>
        </Field>
      </div>
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-navy"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={onNext}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-navy px-7 text-sm font-semibold text-navy-foreground transition hover:opacity-90"
        >
          Continue <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function Step3({
  form,
  onBack,
  onNext,
  onEdit,
}: {
  form: Record<string, string>
  onBack: () => void
  onNext: () => void
  onEdit: (step: number) => void
}) {
  const row = (label: string, value: string, step: number) => (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 text-sm font-semibold text-navy">{value}</div>
      </div>
      <button
        onClick={() => onEdit(step)}
        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-navy hover:underline"
      >
        <Pencil className="h-3 w-3" /> Edit
      </button>
    </div>
  )

  const dateLabel = new Date(form.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold text-navy">Confirm your booking</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Review everything before we lock in your date.
        </p>
        <div className="mt-6 divide-y divide-border rounded-xl bg-surface px-5">
          {row("Name", form.name, 1)}
          {row("Email", form.email, 1)}
          {row("WhatsApp", form.phone, 1)}
          {row("Package", "Wedding Drone Coverage", 1)}
          {row("Date", dateLabel, 2)}
          {row("Location", form.location, 2)}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
        <h3 className="text-lg font-bold text-navy">Payment Method</h3>
        <div className="mt-4 rounded-xl border-2 border-gold bg-gold/5 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-16 items-center justify-center rounded-md bg-navy text-sm font-bold text-navy-foreground">
                BCA
              </span>
              <div>
                <div className="text-sm font-bold text-navy">Bank Central Asia (BCA)</div>
                <div className="text-xs text-muted-foreground">Bank Transfer</div>
              </div>
            </div>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-gold-foreground">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
          </div>
          <hr className="my-4 border-border" />
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Number</span>
              <span className="font-semibold">1234567890</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Name</span>
              <span className="font-semibold">PT SkyLens Indonesia</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Transfer within 24 hours to confirm your booking.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-navy"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          onClick={onNext}
          className="flex h-14 flex-1 items-center justify-center rounded-xl bg-gold text-base font-semibold text-gold-foreground transition hover:opacity-90 sm:flex-none sm:px-10"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  )
}

function Step4({ copied, copyRef }: { copied: boolean; copyRef: () => void }) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald check-pop">
        <Check className="h-10 w-10 text-emerald-foreground" strokeWidth={3} />
      </div>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
        Booking Confirmed!
      </h1>
      <p className="mt-3 text-sm text-muted-foreground md:text-base">
        We&apos;ve sent a confirmation to <span className="font-semibold text-foreground">ayu@gmail.com</span>. Please
        complete payment within 24 hours.
      </p>

      <div className="mt-5 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-mono text-xs font-semibold text-navy">
          SKY-20250615-A7X9K
        </span>
        <button
          onClick={copyRef}
          aria-label="Copy reference"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-navy hover:text-navy"
        >
          {copied ? <Check className="h-4 w-4 text-emerald" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-left md:p-8">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          Amount to Transfer
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            {formatIDR(TOTAL)}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(String(TOTAL))}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:border-navy hover:text-navy"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <hr className="my-5 border-border" />
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bank</span>
            <span className="font-semibold">BCA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Account</span>
            <span className="font-semibold">1234567890</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="font-semibold">PT SkyLens Indonesia</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Link
          href="/payment"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gold text-base font-semibold text-gold-foreground transition hover:opacity-90"
        >
          Upload Payment Proof <ChevronRight className="h-4 w-4" />
        </Link>
        <Link
          href="/my-bookings"
          className="flex h-14 w-full items-center justify-center rounded-xl border-2 border-navy text-base font-semibold text-navy transition hover:bg-navy hover:text-navy-foreground"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  )
}
