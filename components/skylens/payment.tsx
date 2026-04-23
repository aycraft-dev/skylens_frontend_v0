"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  Check,
  Copy,
  FileImage,
  Lock,
  UploadCloud,
  X,
} from "lucide-react"
import { formatIDR } from "@/lib/skylens-data"
import { cn } from "@/lib/utils"

const AMOUNT = 4500000
const INITIAL_SECONDS = 23 * 3600 + 47 * 60 + 12
const EXPIRY_LABEL = "16 May 2025 at 14:30 WIB"

function pad(n: number) {
  return String(n).padStart(2, "0")
}

export function Payment() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [file, setFile] = useState<{ name: string; size: string } | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const iv = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(iv)
  }, [])

  const hours = Math.floor(secondsLeft / 3600)
  const minutes = Math.floor((secondsLeft % 3600) / 60)
  const seconds = secondsLeft % 60
  const progress = Math.max(0, Math.min(100, (secondsLeft / (24 * 3600)) * 100))

  const copy = (value: string, field: string) => {
    navigator.clipboard.writeText(value)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleFile = (f: File | undefined) => {
    if (!f) return
    const kb = f.size / 1024
    const sizeLabel =
      kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`
    setFile({ name: f.name, size: sizeLabel })
    setSubmitted(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 md:px-8 md:pb-16 md:pt-14">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm text-muted-foreground">
          Booking #SKY-20250615-A7X9K
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-soft px-3 py-1 text-xs font-semibold text-amber">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" /> Awaiting Payment
        </span>
      </div>
      <h1 className="mt-2 text-balance text-2xl font-extrabold tracking-tight text-navy md:text-3xl">
        Wedding Drone Coverage — 15 June 2025
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Countdown */}
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Time remaining to complete payment
            </div>
            <div className="mt-3 font-mono text-5xl font-extrabold tracking-tight text-navy md:text-6xl">
              {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </div>
            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-light">
              <div
                className="h-full rounded-full bg-gold transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Payment expires on {EXPIRY_LABEL}
            </div>
          </div>

          {/* Bank Transfer */}
          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-16 items-center justify-center rounded-md bg-navy text-sm font-bold text-navy-foreground">
                BCA
              </span>
              <div>
                <div className="text-sm font-bold text-navy">Transfer to</div>
                <div className="text-xs text-muted-foreground">
                  Bank Central Asia (BCA)
                </div>
              </div>
            </div>
            <div className="mt-5 divide-y divide-border rounded-xl border border-border bg-background">
              <CopyRow
                label="Account Number"
                value="1234567890"
                onCopy={() => copy("1234567890", "account")}
                copied={copiedField === "account"}
              />
              <CopyRow
                label="Account Name"
                value="PT SkyLens Indonesia"
                onCopy={() => copy("PT SkyLens Indonesia", "name")}
                copied={copiedField === "name"}
              />
              <CopyRow
                label="Bank"
                value="Bank Central Asia (BCA)"
                onCopy={() => copy("Bank Central Asia (BCA)", "bank")}
                copied={copiedField === "bank"}
              />
            </div>

            <hr className="my-6 border-border" />

            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Amount to Transfer
              </div>
              <div className="mt-2 text-4xl font-extrabold tracking-tight text-navy md:text-5xl">
                {formatIDR(AMOUNT)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Transfer exactly this amount
              </div>
              <button
                onClick={() => copy(String(AMOUNT), "amount")}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold text-sm font-semibold text-gold-foreground transition hover:opacity-90"
              >
                {copiedField === "amount" ? (
                  <>
                    <Check className="h-4 w-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy Amount
                  </>
                )}
              </button>
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber/30 bg-amber-soft p-4 text-sm text-amber">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <p className="text-[13px] leading-relaxed">
                  Transfer the exact amount shown above. Different amounts cause processing delays.
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="rounded-2xl border border-border bg-background p-6 md:p-8">
            <h3 className="text-lg font-bold text-navy">How to pay</h3>
            <ol className="mt-4 space-y-3 text-sm">
              {[
                "Open your BCA mobile app or internet banking",
                `Transfer exactly ${formatIDR(AMOUNT)} to the account above`,
                "Take a screenshot of the transfer confirmation",
                "Upload your proof and we'll confirm within 2 hours",
              ].map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-navy-foreground">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          {/* Upload */}
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
            <h3 className="text-lg font-bold text-navy">Upload Transfer Proof</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We need proof of your transfer to confirm your booking.
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
            />

            {!file ? (
              <button
                onClick={() => inputRef.current?.click()}
                className="mt-5 flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-surface px-6 py-10 text-center transition hover:border-navy/30 hover:bg-background"
              >
                <UploadCloud className="h-10 w-10 text-muted-foreground" />
                <div className="text-sm font-semibold text-navy">
                  Drag & drop your transfer screenshot
                </div>
                <div className="text-xs text-muted-foreground">
                  or <span className="font-semibold text-gold">click to browse</span>
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Accepted: JPG, PNG, PDF · Max 10MB
                </div>
              </button>
            ) : (
              <div className="mt-5 rounded-xl border border-emerald/30 bg-emerald/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-emerald text-emerald-foreground">
                    <FileImage className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald" strokeWidth={3} />
                      <span className="truncate text-sm font-semibold text-navy">
                        {file.name}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{file.size}</div>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null)
                      setSubmitted(false)
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-rose hover:underline"
                  >
                    <X className="h-3 w-3" /> Remove
                  </button>
                </div>
              </div>
            )}

            <button
              disabled={!file || submitted}
              onClick={() => setSubmitted(true)}
              className={cn(
                "mt-5 flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold transition",
                file && !submitted
                  ? "bg-emerald text-emerald-foreground hover:opacity-90"
                  : submitted
                    ? "bg-emerald/20 text-emerald"
                    : "cursor-not-allowed bg-light text-muted-foreground",
              )}
            >
              {submitted ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Proof Submitted
                </>
              ) : (
                "Submit Payment Proof"
              )}
            </button>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" />
              Your proof is encrypted and stored securely
            </div>
          </div>

          {/* Status */}
          <div className="rounded-2xl border border-border bg-background p-6 md:p-8">
            <h3 className="text-lg font-bold text-navy">Payment Status</h3>
            <ol className="mt-5 space-y-4">
              <StatusItem
                state="done"
                title="Booking Created"
                meta="14 May 2025, 09:14 WIB"
              />
              <StatusItem
                state={submitted ? "done" : "active"}
                title="Awaiting Payment"
                meta={submitted ? "Proof uploaded" : "Transfer & upload proof"}
              />
              <StatusItem
                state={submitted ? "active" : "upcoming"}
                title="Payment Confirmed"
                meta="Usually within 2 hours"
              />
              <StatusItem
                state="upcoming"
                title="Session Scheduled"
                meta="We'll confirm via WhatsApp"
              />
            </ol>
            <Link
              href="/tracking/SKY-20250615-A7X9K"
              className="mt-6 flex h-11 w-full items-center justify-center rounded-xl border border-navy text-sm font-semibold text-navy transition hover:bg-navy hover:text-navy-foreground"
            >
              Track This Booking
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile sticky copy bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background p-3 shadow-lg lg:hidden">
        <button
          onClick={() => copy(String(AMOUNT), "amount-mobile")}
          className="flex h-12 w-full items-center justify-between rounded-xl bg-gold px-5 text-sm font-semibold text-gold-foreground"
        >
          <span>{formatIDR(AMOUNT)}</span>
          <span className="inline-flex items-center gap-2">
            {copiedField === "amount-mobile" ? (
              <>
                <Check className="h-4 w-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy Amount
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}

function CopyRow({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string
  value: string
  onCopy: () => void
  copied: boolean
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="truncate text-sm font-semibold text-navy">{value}</div>
      </div>
      <button
        onClick={onCopy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-navy hover:text-navy"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald" /> Copied
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" /> Copy
          </>
        )}
      </button>
    </div>
  )
}

function StatusItem({
  state,
  title,
  meta,
}: {
  state: "done" | "active" | "upcoming"
  title: string
  meta: string
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="relative mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center">
        {state === "done" && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald">
            <Check className="h-3 w-3 text-emerald-foreground" strokeWidth={3} />
          </span>
        )}
        {state === "active" && (
          <>
            <span className="h-3 w-3 rounded-full bg-navy" />
            <span className="pulse-ring absolute h-3 w-3 rounded-full bg-navy" />
          </>
        )}
        {state === "upcoming" && (
          <span className="h-3 w-3 rounded-full border-2 border-light bg-background" />
        )}
      </span>
      <div className="flex-1">
        <div
          className={cn(
            "text-sm font-semibold",
            state === "upcoming" ? "text-muted-foreground" : "text-navy",
          )}
        >
          {title}
        </div>
        <div className="text-xs text-muted-foreground">{meta}</div>
      </div>
    </li>
  )
}
