'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  Package,
  Calendar,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  X,
  Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useVenueAdminLayout } from './layout-context'

const navItems = [
  {
    label: 'Dashboard',
    href: '/venue_admin',
    icon: LayoutDashboard,
  },
  {
    label: 'My Venue',
    href: '/venue_admin/venue',
    icon: Building2,
  },
  {
    label: 'Packages',
    href: '/venue_admin/packages',
    icon: Package,
  },
  {
    label: 'Bookings',
    href: '/venue_admin/bookings',
    icon: Calendar,
  },
  {
    label: 'Operators',
    href: '/venue_admin/operators',
    icon: Users,
  },
  {
    label: 'Customers',
    href: '/venue_admin/customers',
    icon: Users,
  },
  {
    label: 'Reviews',
    href: '/venue_admin/reviews',
    icon: MessageSquare,
  },
  {
    label: 'Settings',
    href: '/venue_admin/settings',
    icon: Settings,
  },
]

export function VenueAdminSidebar() {
  const pathname = usePathname()
  const { sidebarOpen, setSidebarOpen } = useVenueAdminLayout()

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#0B1B3B] text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo Area */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9A961]">
              <Building2 className="h-5 w-5 text-[#0B1B3B]" />
            </div>
            <span className="text-lg font-bold">Sky Memory</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/60 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Venue Name */}
        <div className="border-b border-white/10 px-6 py-4">
          <div className="text-xs font-medium text-white/50 uppercase tracking-wider">
            Managing
          </div>
          <div className="mt-1 text-sm font-semibold truncate">Aurora Beach Resort</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'relative flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-[#C9A961]/20 text-[#C9A961]'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 h-6 w-1 rounded-r-full bg-[#C9A961]" />
                    )}
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-3 py-4">
          <Link
            href="/venue_admin/login"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Button */}
      <div className="fixed bottom-4 right-4 lg:hidden z-50">
        <Button
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-full h-12 w-12 bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
    </>
  )
}
