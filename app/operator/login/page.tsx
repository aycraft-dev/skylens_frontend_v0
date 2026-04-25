'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function OperatorLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      window.location.href = '/operator/dashboard'
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-operator-white via-operator-sand-light to-operator-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and heading */}
        <div className="text-center mb-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-operator-charcoal mx-auto mb-4">
            <svg className="h-7 w-7 text-operator-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-operator-charcoal mb-2">SkyMemory Ops</h1>
          <p className="text-operator-gray">Premium Drone Flight Operations</p>
        </div>

        {/* Login card */}
        <div className="bg-operator-white rounded-2xl border border-operator-gray-light shadow-lg p-8">
          <h2 className="text-2xl font-bold text-operator-charcoal mb-6">Operator Login</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-operator-charcoal mb-2">
                Operator Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="operator@skymemory.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-operator-gray-light focus:border-operator-gold focus:ring-operator-gold"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-operator-charcoal mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-operator-gray-light focus:border-operator-gold focus:ring-operator-gold pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-operator-gray hover:text-operator-charcoal transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-operator-gray-light" />
                <span className="text-operator-gray">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-operator-gold hover:text-operator-charcoal transition font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Login button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-operator-charcoal hover:bg-opacity-90 text-operator-white font-semibold py-2.5 rounded-lg transition h-auto"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-operator-gray-light"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-operator-white text-operator-gray">Or continue with</span>
            </div>
          </div>

          {/* Alternative login methods */}
          <div className="space-y-3">
            <button className="w-full border border-operator-gray-light hover:bg-operator-sand-light rounded-lg py-2.5 text-operator-charcoal font-medium transition">
              Login with QR Code
            </button>
            <button className="w-full border border-operator-gray-light hover:bg-operator-sand-light rounded-lg py-2.5 text-operator-charcoal font-medium transition">
              Login with Biometric
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-operator-gray mt-6">
          Contact support at{' '}
          <a href="mailto:support@skymemory.com" className="text-operator-gold hover:text-operator-charcoal transition font-medium">
            support@skymemory.com
          </a>
        </p>
      </div>
    </div>
  )
}
