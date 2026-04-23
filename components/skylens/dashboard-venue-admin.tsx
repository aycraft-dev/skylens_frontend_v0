"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Bell,
  Building2,
  Calendar,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  DollarSign,
  Download,
  FileText,
  LayoutDashboard,
  LogOut,
  Percent,
  Plus,
  Settings,
  UserCircle,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
  { id: "my-venue", label: "My Venue", icon: Building2 },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "bookings", label: "Bookings", icon: ClipboardList, badge: 5 },
  { id: "staff", label: "Staff", icon: Users },
  { id: "reports", label: "Reports", icon: FileText },
]

const statsCards = [
  {
    label: "Today's Bookings",
    value: "8",
    icon: Calendar,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-700",
  },
  {
    label: "Upcoming Events",
    value: "24",
    icon: CalendarDays,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    label: "Monthly Revenue",
    value: "$32,480",
    icon: DollarSign,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    label: "Occupancy Rate",
    value: "78%",
    icon: Percent,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
]

const upcomingEvents = [
  {
    id: 1,
    date: "Apr 24",
    time: "2:00 PM - 6:00 PM",
    customer: "Sarah Johnson",
    event: "Birthday Party",
    status: "confirmed",
  },
  {
    id: 2,
    date: "Apr 24",
    time: "7:00 PM - 11:00 PM",
    customer: "Tech Corp Inc.",
    event: "Corporate Dinner",
    status: "confirmed",
  },
  {
    id: 3,
    date: "Apr 25",
    time: "10:00 AM - 4:00 PM",
    customer: "Michael Chen",
    event: "Wedding Reception",
    status: "pending",
  },
  {
    id: 4,
    date: "Apr 26",
    time: "6:00 PM - 10:00 PM",
    customer: "Emma Wilson",
    event: "Engagement Party",
    status: "confirmed",
  },
  {
    id: 5,
    date: "Apr 27",
    time: "12:00 PM - 5:00 PM",
    customer: "David Park",
    event: "Product Launch",
    status: "confirmed",
  },
]

export function DashboardVenueAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Deep Teal */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-teal-800 text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-teal-700 px-5">
          <Link href="/venue-admin/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">VenueHub</span>
          </Link>
          <button
            className="text-white/60 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Venue Name */}
        <div className="border-b border-teal-700 px-5 py-4">
          <div className="text-xs font-medium text-teal-300 uppercase tracking-wider">
            Managing
          </div>
          <div className="text-sm font-semibold mt-1 truncate">Grand Ballroom & Events</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={cn(
                    "relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition",
                    item.active
                      ? "bg-white/10 text-white"
                      : "text-teal-200 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.active && (
                    <span className="absolute left-0 h-6 w-1 rounded-r-full bg-white" />
                  )}
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 font-medium">{item.label}</span>
                  {"badge" in item && item.badge && (
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="border-t border-teal-700 px-3 py-4">
          <ul className="space-y-1">
            <li>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-teal-200 hover:bg-white/5 hover:text-white transition">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
              </button>
            </li>
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-teal-200 hover:bg-white/5 hover:text-white transition"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
          <div className="flex h-16 items-center justify-between px-5 md:px-8">
            <div className="flex items-center gap-4">
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <LayoutDashboard className="h-4 w-4" />
              </button>
              <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-teal-600 ring-2 ring-white" />
              </button>

              {/* Avatar dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-teal-700 text-white text-sm font-semibold">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden text-left md:block">
                      <div className="text-sm font-semibold text-slate-900">John Doe</div>
                      <div className="text-xs text-slate-500">Venue Manager</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
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

        {/* Main */}
        <main className="flex-1 p-5 md:p-8">
          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statsCards.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="text-sm font-medium text-slate-600">{stat.label}</div>
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      stat.iconBg
                    )}
                  >
                    <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
                  </div>
                </div>
                <div className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Upcoming Events + Quick Actions */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            {/* Upcoming Events */}
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <h2 className="text-lg font-bold text-slate-900">Upcoming Events</h2>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  View Schedule <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-teal-50 text-teal-800">
                      <div className="text-xs font-medium">{event.date.split(" ")[0]}</div>
                      <div className="text-lg font-bold">{event.date.split(" ")[1]}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {event.event}
                        </p>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                            event.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          )}
                        >
                          {event.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-0.5">{event.customer}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full justify-start gap-3 h-12 bg-teal-700 hover:bg-teal-800 text-white">
                  <Plus className="h-5 w-5" />
                  Add Event
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 border-slate-200"
                >
                  <CalendarDays className="h-5 w-5" />
                  View Schedule
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 border-slate-200"
                >
                  <Download className="h-5 w-5" />
                  Export Report
                </Button>
              </div>

              {/* Today's Summary */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Today&apos;s Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Confirmed Bookings</span>
                    <span className="text-sm font-semibold text-slate-900">6</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Pending Approvals</span>
                    <span className="text-sm font-semibold text-amber-600">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Staff On Duty</span>
                    <span className="text-sm font-semibold text-slate-900">12</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
