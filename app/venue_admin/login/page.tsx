'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function VenueAdminLoginPage() {
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
    <div className="flex min-h-screen bg-surface items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
          {/* Venue Illustration */}
          <div className="relative h-48 bg-light overflow-hidden">
            <Image
              src="/venue-illustration.jpg"
              alt="Venue Management"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-teal/20 to-transparent" />
          </div>

          {/* Form Section */}
          <div className="p-8 space-y-6">
            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Access Venue Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to manage your venue operations
              </p>
            </div>

            {/* Form */}
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
                  className="h-10 border border-border bg-white text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-teal focus:ring-offset-0"
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
                  className="h-10 border border-border bg-white text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-teal focus:ring-offset-0"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm text-teal hover:text-teal-light font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-teal hover:bg-teal-light text-teal-foreground font-medium transition-colors"
              >
                {isLoading ? 'Signing in...' : 'Access Venue Dashboard'}
              </Button>
            </form>

            {/* Footer Text */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Contact your administrator if you need access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
