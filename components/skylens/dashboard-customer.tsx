"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Bell,
  Calendar,
  ChevronDown,
  ChevronRight,
  LogOut,
  MapPin,
  Search,
  Settings,
  Star,
  UserCircle,
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

const upcomingBookings = [
  {
    id: 1,
    venue: "Grand Ballroom",
    image: "/venue-event-bg.jpg",
    date: "Apr 28, 2026",
    time: "6:00 PM - 10:00 PM",
    status: "confirmed",
  },
  {
    id: 2,
    venue: "Ocean View Terrace",
    image: "/venue-event-bg.jpg",
    date: "May 5, 2026",
    time: "2:00 PM - 6:00 PM",
    status: "pending",
  },
]

const exploreVenues = [
  {
    id: 1,
    name: "The Garden Pavilion",
    image: "/venue-event-bg.jpg",
    rating: 4.9,
    reviews: 128,
    price: "$500",
    location: "Downtown",
  },
  {
    id: 2,
    name: "Skyline Rooftop",
    image: "/venue-event-bg.jpg",
    rating: 4.8,
    reviews: 96,
    price: "$750",
    location: "Midtown",
  },
  {
    id: 3,
    name: "Lakeside Manor",
    image: "/venue-event-bg.jpg",
    rating: 5.0,
    reviews: 64,
    price: "$1,200",
    location: "Lakeside",
  },
  {
    id: 4,
    name: "Industrial Loft Space",
    image: "/venue-event-bg.jpg",
    rating: 4.7,
    reviews: 82,
    price: "$400",
    location: "Arts District",
  },
  {
    id: 5,
    name: "Historic Mansion",
    image: "/venue-event-bg.jpg",
    rating: 4.9,
    reviews: 156,
    price: "$1,500",
    location: "Historic Quarter",
  },
]

export function DashboardCustomer() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-8">
            <Link href="/customer/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-600">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">VenueBook</span>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <Link href="#" className="text-sm font-medium text-slate-900">
                Explore
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
              >
                My Bookings
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
              >
                Profile
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
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {/* Avatar dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-rose-600 text-white text-sm font-semibold">
                      SJ
                    </AvatarFallback>
                  </Avatar>
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
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-50 to-orange-50 border-b border-rose-100">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Welcome back, Sarah!
            </h1>
            <p className="text-slate-600 mt-2 text-lg">Find your perfect venue for any occasion</p>

            {/* Search Bar */}
            <div className="mt-6 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search venues by name, location, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 pr-4 text-base bg-white border-slate-200 shadow-sm rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          {/* Upcoming Bookings */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900">Upcoming Bookings</h2>
              <Link
                href="#"
                className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-700"
              >
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                >
                  <div className="relative h-40">
                    <Image
                      src={booking.image}
                      alt={booking.venue}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-900">{booking.venue}</h3>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          booking.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        )}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <svg
                          className="h-4 w-4 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {booking.time}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-slate-200"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}

              {/* Empty state card */}
              <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 flex flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 mb-3">
                  <Calendar className="h-6 w-6 text-rose-600" />
                </div>
                <p className="text-sm font-medium text-slate-900">Book your next event</p>
                <p className="text-xs text-slate-500 mt-1">
                  Browse venues and find the perfect spot
                </p>
                <Button className="mt-4 bg-rose-600 hover:bg-rose-700 text-white">
                  Explore Venues
                </Button>
              </div>
            </div>
          </section>

          {/* Explore Venues */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900">Explore Venues</h2>
              <Link
                href="#"
                className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-700"
              >
                See All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Horizontal scroll container */}
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:-mx-8 md:px-8 scrollbar-hide">
              {exploreVenues.map((venue) => (
                <div
                  key={venue.id}
                  className="flex-shrink-0 w-72 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                >
                  <div className="relative h-40">
                    <Image
                      src={venue.image}
                      alt={venue.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 truncate">{venue.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-slate-900">{venue.rating}</span>
                      <span className="text-sm text-slate-500">({venue.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {venue.location}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                      <div>
                        <span className="text-lg font-bold text-slate-900">{venue.price}</span>
                        <span className="text-sm text-slate-500">/hour</span>
                      </div>
                      <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
