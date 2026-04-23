"use client"

import Link from "next/link"
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock,
  ListTodo,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const statsCards = [
  {
    label: "Assigned Tasks Today",
    value: "6",
    icon: ListTodo,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
  },
  {
    label: "Pending Items",
    value: "3",
    icon: Clock,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    label: "Completed This Week",
    value: "18",
    icon: CheckCircle2,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
]

const tasks = [
  {
    id: 1,
    name: "Setup AV Equipment",
    venue: "Grand Ballroom",
    dueTime: "9:00 AM",
    priority: "high" as const,
    completed: false,
  },
  {
    id: 2,
    name: "Arrange Table Settings",
    venue: "Ocean Terrace",
    dueTime: "10:30 AM",
    priority: "high" as const,
    completed: false,
  },
  {
    id: 3,
    name: "Check Sound System",
    venue: "Grand Ballroom",
    dueTime: "11:00 AM",
    priority: "medium" as const,
    completed: false,
  },
  {
    id: 4,
    name: "Coordinate with Catering",
    venue: "Garden Suite",
    dueTime: "12:00 PM",
    priority: "medium" as const,
    completed: true,
  },
  {
    id: 5,
    name: "Final Walkthrough",
    venue: "Grand Ballroom",
    dueTime: "1:30 PM",
    priority: "low" as const,
    completed: false,
  },
  {
    id: 6,
    name: "Update Event Checklist",
    venue: "All Venues",
    dueTime: "4:00 PM",
    priority: "low" as const,
    completed: false,
  },
]

const weekDays = [
  { day: "Mon", date: "21", shifts: ["9:00 AM - 5:00 PM"] },
  { day: "Tue", date: "22", shifts: ["10:00 AM - 6:00 PM"] },
  { day: "Wed", date: "23", shifts: ["9:00 AM - 5:00 PM"], isToday: true },
  { day: "Thu", date: "24", shifts: ["Off"] },
  { day: "Fri", date: "25", shifts: ["12:00 PM - 8:00 PM"] },
  { day: "Sat", date: "26", shifts: ["9:00 AM - 3:00 PM"] },
  { day: "Sun", date: "27", shifts: ["Off"] },
]

const priorityStyles = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-slate-100 text-slate-700 border-slate-200",
}

export function DashboardOperator() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/operator/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900">
                <ClipboardList className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">OpsDash</span>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="#"
                className="text-sm font-medium text-slate-900 border-b-2 border-slate-900 pb-0.5"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
              >
                My Tasks
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
              >
                Schedule
              </Link>
            </nav>
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
                    <AvatarFallback className="bg-slate-700 text-white text-sm font-semibold">
                      MR
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left md:block">
                    <div className="text-sm font-semibold text-slate-900">Mike Rodriguez</div>
                    <div className="text-xs text-slate-500">Operator</div>
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

      {/* Main Content */}
      <main className="mx-auto max-w-7xl p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Mike</h1>
          <p className="text-slate-600 mt-1">Here&apos;s what you have scheduled today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
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

        {/* Task List + Shift Schedule */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          {/* Task List */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h2 className="text-lg font-bold text-slate-900">Today&apos;s Tasks</h2>
              <span className="text-sm text-slate-600">
                {tasks.filter((t) => t.completed).length}/{tasks.length} completed
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4",
                    task.completed && "bg-slate-50"
                  )}
                >
                  <button
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border-2 transition",
                      task.completed
                        ? "border-emerald-500 bg-emerald-500"
                        : "border-slate-300 hover:border-slate-400"
                    )}
                    aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {task.completed && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={cn(
                          "text-sm font-semibold truncate",
                          task.completed ? "text-slate-400 line-through" : "text-slate-900"
                        )}
                      >
                        {task.name}
                      </p>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border",
                          priorityStyles[task.priority]
                        )}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5">{task.venue}</p>
                  </div>
                  <div className="text-sm text-slate-500 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {task.dueTime}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shift Schedule */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">This Week&apos;s Schedule</h2>
            <div className="space-y-2">
              {weekDays.map((day) => (
                <div
                  key={day.day}
                  className={cn(
                    "flex items-center gap-4 rounded-lg p-3 transition",
                    day.isToday ? "bg-slate-900 text-white" : "bg-slate-50"
                  )}
                >
                  <div className="w-16 text-center">
                    <div
                      className={cn(
                        "text-xs font-medium",
                        day.isToday ? "text-slate-300" : "text-slate-500"
                      )}
                    >
                      {day.day}
                    </div>
                    <div
                      className={cn(
                        "text-lg font-bold",
                        day.isToday ? "text-white" : "text-slate-900"
                      )}
                    >
                      {day.date}
                    </div>
                  </div>
                  <div className="flex-1">
                    {day.shifts.map((shift, i) => (
                      <p
                        key={i}
                        className={cn(
                          "text-sm font-medium",
                          day.isToday
                            ? "text-white"
                            : shift === "Off"
                            ? "text-slate-400"
                            : "text-slate-700"
                        )}
                      >
                        {shift}
                      </p>
                    ))}
                  </div>
                  {day.isToday && (
                    <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded">
                      Today
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
