"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  Bell,
  Building2,
  ChevronDown,
  DollarSign,
  FileText,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Settings,
  UserCircle,
  UserCog,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
  { id: "venues", label: "Venues", icon: Building2, badge: 12 },
  { id: "staff", label: "Staff Management", icon: UserCog },
  { id: "operators", label: "Operators", icon: Users },
  { id: "customers", label: "Customers", icon: UserCircle },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
]

const statsCards = [
  {
    label: "Total Venues",
    value: "48",
    delta: "+3 this month",
    deltaTone: "up" as const,
    icon: Building2,
  },
  {
    label: "Active Operators",
    value: "124",
    delta: "+12 this week",
    deltaTone: "up" as const,
    icon: Users,
  },
  {
    label: "Total Customers",
    value: "2,847",
    delta: "+156 this month",
    deltaTone: "up" as const,
    icon: UserCircle,
  },
  {
    label: "Revenue This Month",
    value: "$89,420",
    delta: "+18% vs last month",
    deltaTone: "up" as const,
    icon: DollarSign,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "registration",
    name: "Sarah Johnson",
    action: "registered as a new customer",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "venue",
    name: "Grand Ballroom",
    action: "was updated by John Admin",
    time: "15 minutes ago",
  },
  {
    id: 3,
    type: "registration",
    name: "Michael Chen",
    action: "registered as a new customer",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "venue",
    name: "Ocean View Terrace",
    action: "was added by Jane Operator",
    time: "2 hours ago",
  },
  {
    id: 5,
    type: "registration",
    name: "Emma Wilson",
    action: "registered as a new customer",
    time: "3 hours ago",
  },
]

export function DashboardAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-900 text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">VenueAdmin</span>
          </Link>
          <button
            className="text-white/60 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
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
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
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

        {/* Logout */}
        <div className="border-t border-slate-800 px-3 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Link>
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

              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Search venues, users..."
                    className="h-9 w-72 pl-9 bg-slate-50 border-slate-200 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>

              {/* Avatar dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-slate-900 text-white text-sm font-semibold">
                        SA
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden text-left md:block">
                      <div className="text-sm font-semibold text-slate-900">Super Admin</div>
                      <div className="text-xs text-slate-500">admin@venue.com</div>
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Welcome back, Super Admin</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statsCards.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="text-sm font-medium text-slate-600">{stat.label}</div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    <stat.icon className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
                <div className="mt-3 text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="mt-1 flex items-center gap-1 text-sm text-emerald-600">
                  <ArrowUpRight className="h-4 w-4" />
                  {stat.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity + Quick Actions */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            {/* Recent Activity */}
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 p-5">
                <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  View All <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 px-5 py-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        activity.type === "registration" ? "bg-emerald-100" : "bg-blue-100"
                      )}
                    >
                      {activity.type === "registration" ? (
                        <UserCircle className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <Building2 className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900">
                        <span className="font-semibold">{activity.name}</span> {activity.action}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full justify-start gap-3 h-12 bg-slate-900 hover:bg-slate-800">
                  <Plus className="h-5 w-5" />
                  Invite Staff
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 border-slate-200"
                >
                  <Building2 className="h-5 w-5" />
                  Add Venue
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 border-slate-200"
                >
                  <FileText className="h-5 w-5" />
                  Generate Report
                </Button>
              </div>

              {/* Mini Stats */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">This Week</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="text-2xl font-bold text-slate-900">32</div>
                    <div className="text-xs text-slate-600">New Bookings</div>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <div className="text-2xl font-bold text-slate-900">$12.4k</div>
                    <div className="text-xs text-slate-600">Revenue</div>
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
