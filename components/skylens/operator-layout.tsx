'use client'

import Link from 'next/link'
import { Bell, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface OperatorLayoutProps {
  children: React.ReactNode
  title?: string
}

export function OperatorLayout({ children, title }: OperatorLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-operator-gray-light bg-operator-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/operator/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-operator-charcoal">
                <svg className="h-5 w-5 text-operator-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-operator-charcoal">SkyMemory Ops</span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              <Link href="/operator/dashboard" className="text-sm font-medium text-operator-charcoal hover:text-operator-gold transition">
                Dashboard
              </Link>
              <Link href="/operator/today-schedule" className="text-sm font-medium text-operator-gray hover:text-operator-charcoal transition">
                Schedule
              </Link>
              <Link href="/operator/mission-history" className="text-sm font-medium text-operator-gray hover:text-operator-charcoal transition">
                History
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-operator-gray-light text-operator-gray hover:bg-operator-sand-light transition" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-operator-sand-light rounded-lg p-1 transition">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-operator-charcoal text-operator-white text-sm font-semibold">
                      OP
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left md:block">
                    <div className="text-sm font-semibold text-operator-charcoal">Operator</div>
                    <div className="text-xs text-operator-gray">Active</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-operator-gray hidden md:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/operator/settings" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-operator-charcoal">{title}</h1>
          </div>
        )}
        {children}
      </main>
    </div>
  )
}
