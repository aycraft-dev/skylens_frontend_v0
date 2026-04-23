'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setIsLoading(false)
    alert(`Login attempt: ${email}`)
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Dark Navy Sidebar */}
      <div className="hidden lg:flex w-1/2 bg-navy text-navy-foreground flex-col justify-between p-12">
        {/* Logo & Branding */}
        <div>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 mb-8">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1M9 17h.01M21 7a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Venue Management</h2>
          <p className="text-sm text-white/70">Admin Portal</p>
        </div>

        {/* Footer message */}
        <div>
          <p className="text-sm text-white/60">
            Secure access for authorized administrators only.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-sm">
          {/* Mobile branding */}
          <div className="lg:hidden mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-navy/10 mb-4">
              <svg
                className="w-6 h-6 text-navy"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1M9 17h.01M21 7a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-foreground">Venue Management</h2>
            <p className="text-sm text-muted-foreground">Admin Portal</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Sign in</h1>
              <p className="text-muted-foreground text-sm">
                Enter your credentials to access the dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@venue.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="h-10 border border-input bg-white text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-navy focus:ring-offset-0"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="h-10 border border-input bg-white text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-navy focus:ring-offset-0"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm text-navy hover:text-navy-light font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-navy hover:bg-navy-light text-navy-foreground font-medium transition-colors"
              >
                {isLoading ? 'Signing in...' : 'Sign in to Dashboard'}
              </Button>
            </form>

            {/* Footer text */}
            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground">
                Admin accounts are created internally. Contact your manager for access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
