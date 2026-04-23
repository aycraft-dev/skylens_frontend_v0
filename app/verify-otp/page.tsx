'use client'

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent, FormEvent } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Loader2, Smartphone, Mail, Key } from 'lucide-react'

type OTPMethod = 'authenticator' | 'sms' | 'email'

const methodConfig = {
  authenticator: {
    icon: Key,
    label: 'Authenticator App',
    subtext: 'Enter the 6-digit code from your authenticator app',
    showResend: false,
  },
  sms: {
    icon: Smartphone,
    label: 'SMS',
    subtext: 'Enter the 6-digit code sent to your phone',
    showResend: true,
  },
  email: {
    icon: Mail,
    label: 'Email',
    subtext: 'Enter the 6-digit code sent to your email',
    showResend: true,
  },
}

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [method, setMethod] = useState<OTPMethod>('authenticator')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attemptsRemaining, setAttemptsRemaining] = useState(5)
  const [isLocked, setIsLocked] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [showResendToast, setShowResendToast] = useState(false)
  const [shake, setShake] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  // Resend timer countdown
  useEffect(() => {
    if (!methodConfig[method].showResend) return
    
    if (resendTimer > 0 && !canResend) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else if (resendTimer === 0) {
      setCanResend(true)
    }
  }, [resendTimer, canResend, method])

  // Auto-submit when all 6 digits are filled
  useEffect(() => {
    const code = otp.join('')
    if (code.length === 6 && !otp.includes('') && !isLoading && !isLocked) {
      handleVerify()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp])

  const handleChange = (index: number, value: string) => {
    if (isLocked || isLoading) return
    
    // Only allow digits
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError(null)

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (isLocked || isLoading) return

    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus()
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
      } else {
        // Clear current input
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      }
      e.preventDefault()
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (isLocked || isLoading) return
    
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    
    if (pastedData.length === 6) {
      setOtp(pastedData.split(''))
      inputRefs.current[5]?.focus()
    }
  }

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length !== 6 || isLocked) return

    setIsLoading(true)
    setError(null)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Simulate verification (for demo, "123456" is the correct code)
    if (code === '123456') {
      setIsSuccess(true)
      setIsLoading(false)
      // Redirect after success animation
      setTimeout(() => {
        window.location.href = '/customer/dashboard'
      }, 1500)
    } else {
      setIsLoading(false)
      const remaining = attemptsRemaining - 1
      setAttemptsRemaining(remaining)
      
      if (remaining <= 0) {
        setIsLocked(true)
        setError(null)
      } else {
        setError(`Invalid code. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`)
        triggerShake()
      }
    }
  }

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => {
      setShake(false)
      setOtp(Array(6).fill(''))
      inputRefs.current[0]?.focus()
    }, 500)
  }

  const handleResend = () => {
    if (!canResend || isLocked) return
    
    setResendTimer(60)
    setCanResend(false)
    setShowResendToast(true)
    setTimeout(() => setShowResendToast(false), 3000)
  }

  const handleMethodChange = (newMethod: OTPMethod) => {
    setMethod(newMethod)
    setOtp(Array(6).fill(''))
    setError(null)
    setResendTimer(60)
    setCanResend(false)
    inputRefs.current[0]?.focus()
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleVerify()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const isComplete = otp.every(digit => digit !== '')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f172a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Resend toast */}
      {showResendToast && (
        <div className="fixed top-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-top-2 fade-in duration-300 z-50">
          Code resent!
        </div>
      )}

      {/* Main card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
        {/* Shield icon with pulse effect */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-navy/10 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <div className="relative w-16 h-16 bg-navy rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Two-Factor Authentication</h1>
          <p className="text-slate-600 text-sm">{methodConfig[method].subtext}</p>
        </div>

        {/* Method toggle (if user has multiple 2FA methods) */}
        <div className="flex bg-slate-100 rounded-lg p-1 mb-8">
          {(Object.keys(methodConfig) as OTPMethod[]).map((key) => {
            const config = methodConfig[key]
            const Icon = config.icon
            return (
              <button
                key={key}
                onClick={() => handleMethodChange(key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium transition-all ${
                  method === key
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{config.label}</span>
              </button>
            )
          })}
        </div>

        {isLocked ? (
          /* Locked state */
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Account Locked</h2>
            <p className="text-slate-600 text-sm mb-4">Too many failed attempts. Please contact support.</p>
            <a
              href="mailto:support@skylens.com"
              className="text-navy font-medium hover:underline"
            >
              support@skylens.com
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* OTP Input boxes */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => { inputRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={isLoading || isLocked}
                  aria-label={`Digit ${index + 1} of 6`}
                  className={`
                    w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-mono font-bold
                    border-2 rounded-xl outline-none transition-all duration-200
                    ${isSuccess
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : shake
                        ? 'border-red-500 bg-red-50 text-red-700 animate-shake'
                        : digit
                          ? 'border-navy bg-slate-50 text-slate-900'
                          : 'border-slate-200 bg-white text-slate-900'
                    }
                    focus:border-navy focus:ring-2 focus:ring-navy/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                />
              ))}
            </div>

            {/* Error message */}
            {error && (
              <p className="text-center text-red-600 text-sm mb-4" role="alert">
                {error}
              </p>
            )}

            {/* Timer & Resend (for SMS/email only) */}
            {methodConfig[method].showResend && (
              <div className="text-center mb-6">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-navy font-medium hover:underline text-sm"
                  >
                    Resend Code
                  </button>
                ) : (
                  <p className="text-slate-500 text-sm">
                    Resend code in {formatTime(resendTimer)}
                  </p>
                )}
              </div>
            )}

            {/* Verify button */}
            <Button
              type="submit"
              disabled={!isComplete || isLoading || isLocked || isSuccess}
              className="w-full h-12 bg-navy hover:bg-navy/90 text-white font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </span>
              ) : isSuccess ? (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Verified!
                </span>
              ) : (
                'Verify'
              )}
            </Button>

            {/* Secondary link */}
            <div className="mt-4 text-center">
              <Link
                href="/verify-backup"
                className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
              >
                Use a backup code instead
              </Link>
            </div>
          </form>
        )}

        {/* Tertiary link */}
        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <Link
            href="/customer/login"
            className="text-slate-500 hover:text-slate-700 text-xs transition-colors"
          >
            Sign out and try again
          </Link>
        </div>
      </div>

      {/* Shake animation styles */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
