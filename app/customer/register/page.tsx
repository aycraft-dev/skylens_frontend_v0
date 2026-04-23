'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export default function CustomerRegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)
    alert(`Registration attempt for: ${formData.email}`)
  }

  const handleGoogleSignUp = () => {
    alert('Google Sign-Up clicked')
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Venue background image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="/venue-event-bg.jpg"
          alt="Venue Events"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Branding content */}
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <div>
            <h2 className="text-4xl font-bold mb-2">Join Us</h2>
            <p className="text-lg opacity-90">Create your account today</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm opacity-75">Discover thousands of stunning venues</p>
            <p className="text-sm opacity-75">Reserve instantly, celebrate confidently</p>
          </div>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-600">Start booking your perfect venues</p>
          </div>

          {/* Google Sign-Up Button */}
          <div className="mb-5">
            <Button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full h-11 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-sm text-slate-500">or register with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Registration form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="h-10 border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-rose-500 focus:ring-offset-0 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-10 border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-rose-500 focus:ring-offset-0 focus:border-transparent"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+62 812 3456 7890"
                value={formData.phone}
                onChange={handleChange}
                required
                className="h-10 border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-rose-500 focus:ring-offset-0 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-10 border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-rose-500 focus:ring-offset-0 focus:border-transparent"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="h-10 border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-rose-500 focus:ring-offset-0 focus:border-transparent"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                className="mt-0.5 border-slate-300 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
              />
              <Label htmlFor="terms" className="text-sm text-slate-600 leading-tight">
                I agree to the{' '}
                <Link href="#" className="text-rose-600 hover:text-rose-700 font-medium">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-rose-600 hover:text-rose-700 font-medium">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {/* Create Account button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-rose-600 hover:bg-rose-700 text-white font-medium transition-colors"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Already have an account?{' '}
              <Link
                href="/customer/login"
                className="text-rose-600 hover:text-rose-700 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
