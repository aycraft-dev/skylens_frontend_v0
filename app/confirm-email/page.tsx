'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ConfirmEmailPage() {
  const [isResending, setIsResending] = useState(false)
  const [resent, setResent] = useState(false)

  const handleResend = async () => {
    setIsResending(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsResending(false)
    setResent(true)
    setTimeout(() => setResent(false), 3000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          {/* Email icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <Mail className="h-10 w-10 text-slate-600" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Check your email</h1>
          <p className="text-slate-600 mb-6 leading-relaxed">
            We&apos;ve sent a confirmation link to your email address. Click the link to activate
            your account.
          </p>

          {/* Info box */}
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 mb-6 text-left">
            <p className="text-sm text-slate-600">
              <span className="font-medium text-slate-900">Didn&apos;t receive the email?</span>
              <br />
              Check your spam folder or request a new confirmation link below.
            </p>
          </div>

          {/* Resend button */}
          <div className="space-y-3">
            <Button
              onClick={handleResend}
              disabled={isResending}
              variant="outline"
              className="w-full h-10 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
            >
              {isResending ? 'Sending...' : resent ? 'Email Sent!' : 'Resend confirmation email'}
            </Button>

            <Link
              href="/customer/login"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
