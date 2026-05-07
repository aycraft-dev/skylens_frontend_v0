'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, MapPin, Users, Clock, FileText, Download } from 'lucide-react'
import { OperatorLayout } from '@/components/skylens/operator-layout'
import { StatusBadge } from '@/components/skylens/status-badge'
import { WaypointCard } from '@/components/skylens/waypoint-card'
import { Button } from '@/components/ui/button'

const bookingDetails = {
  id: 'BK001',
  customerName: 'Luxury Resort Estates',
  location: 'Mountain Valley Setup',
  date: 'Today, March 20, 2024',
  time: '09:00 AM - 11:00 AM',
  status: 'Ready' as const,
  guestCount: 150,
  coordinatorName: 'Sarah Johnson',
  coordinatorPhone: '+1 (555) 123-4567',
  coordinatorEmail: 'sarah@luxuryresorts.com',
  venueAddress: '1234 Mountain Peak Road, Valley View, CA 94025',
  flightZone: 'North Aerial Zone - Designated Flight Path A',
  restrictions: ['Max altitude 400ft', 'Keep clear of guest areas', 'Avoid direct sunlight hours'],
  waypoints: [
    {
      number: 1,
      name: 'Launch Point',
      description: 'Main entrance aerial overview',
      coordinates: '37.7749, -122.4194',
      altitude: '150',
      completed: true,
    },
    {
      number: 2,
      name: 'Garden Section',
      description: 'Cinematic garden flyover',
      coordinates: '37.7755, -122.4200',
      altitude: '250',
      completed: true,
      active: true,
    },
    {
      number: 3,
      name: 'Venue Overview',
      description: 'Full property wide shot',
      coordinates: '37.7760, -122.4205',
      altitude: '350',
    },
    {
      number: 4,
      name: 'Detail Captures',
      description: 'Decorative elements and details',
      coordinates: '37.7750, -122.4198',
      altitude: '200',
    },
  ],
  specialRequests: 'Focus on sunset lighting. Client wants golden hour cinematic shots. Avoid flying over guest reception area between 10-10:30 AM.',
}

export default function BookingDetailPage() {
  const [expanded, setExpanded] = useState(true)

  return (
    <OperatorLayout>
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/operator/today-schedule">
            <Button variant="ghost" size="sm" className="gap-2 text-operator-gray hover:text-operator-charcoal">
              <ChevronLeft className="h-4 w-4" />
              Back to Schedule
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-operator-charcoal">{bookingDetails.customerName}</h1>
            <p className="text-operator-gray mt-1">{bookingDetails.location}</p>
          </div>
          <StatusBadge status={bookingDetails.status} size="lg" />
        </div>

        {/* Quick Info Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="bg-operator-white rounded-lg border border-operator-gray-light p-4">
            <p className="text-xs text-operator-gray mb-1">Booking ID</p>
            <p className="text-lg font-semibold text-operator-charcoal">{bookingDetails.id}</p>
          </div>
          <div className="bg-operator-white rounded-lg border border-operator-gray-light p-4">
            <p className="text-xs text-operator-gray mb-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Time
            </p>
            <p className="text-sm font-semibold text-operator-charcoal">{bookingDetails.time}</p>
          </div>
          <div className="bg-operator-white rounded-lg border border-operator-gray-light p-4">
            <p className="text-xs text-operator-gray mb-1 flex items-center gap-1">
              <Users className="h-3 w-3" /> Guests
            </p>
            <p className="text-lg font-semibold text-operator-charcoal">{bookingDetails.guestCount}</p>
          </div>
          <div className="bg-operator-white rounded-lg border border-operator-gray-light p-4">
            <p className="text-xs text-operator-gray mb-1 flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Zone
            </p>
            <p className="text-sm font-semibold text-operator-charcoal">Zone A</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Venue Information */}
            <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
              <h2 className="text-xl font-bold text-operator-charcoal mb-4">Venue Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-operator-gray mb-1">Address</p>
                  <p className="text-operator-charcoal font-medium">{bookingDetails.venueAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-operator-gray mb-1">Flight Zone</p>
                  <p className="text-operator-charcoal font-medium">{bookingDetails.flightZone}</p>
                </div>
                <div>
                  <p className="text-sm text-operator-gray mb-2">Flight Restrictions</p>
                  <ul className="space-y-1">
                    {bookingDetails.restrictions.map((restriction, i) => (
                      <li key={i} className="text-sm text-operator-charcoal flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-operator-gold" />
                        {restriction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Flight Plan Waypoints */}
            <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
              <h2 className="text-xl font-bold text-operator-charcoal mb-4">Flight Plan Waypoints</h2>
              <div className="space-y-3">
                {bookingDetails.waypoints.map((waypoint) => (
                  <WaypointCard key={waypoint.number} {...waypoint} />
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-operator-sand-light rounded-xl border border-operator-gray-light p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-operator-gold" />
                <h2 className="text-lg font-bold text-operator-charcoal">Special Requests</h2>
              </div>
              <p className="text-operator-charcoal leading-relaxed">{bookingDetails.specialRequests}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Coordinator Info */}
            <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
              <h3 className="text-lg font-bold text-operator-charcoal mb-4">Event Coordinator</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-operator-gray mb-1">Name</p>
                  <p className="font-semibold text-operator-charcoal">{bookingDetails.coordinatorName}</p>
                </div>
                <div>
                  <p className="text-xs text-operator-gray mb-1">Phone</p>
                  <a href={`tel:${bookingDetails.coordinatorPhone}`} className="text-operator-gold hover:text-operator-charcoal font-medium transition">
                    {bookingDetails.coordinatorPhone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-operator-gray mb-1">Email</p>
                  <a href={`mailto:${bookingDetails.coordinatorEmail}`} className="text-operator-gold hover:text-operator-charcoal font-medium transition break-all">
                    {bookingDetails.coordinatorEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href={`/operator/start-mission/${bookingDetails.id}`} className="block">
                <Button className="w-full bg-operator-charcoal hover:bg-opacity-90 text-operator-white font-semibold">
                  Start Mission
                </Button>
              </Link>
              <Link href="/operator/verify-arrival" className="block">
                <Button variant="outline" className="w-full border-operator-gray-light text-operator-charcoal">
                  Verify Arrival
                </Button>
              </Link>
              <Button variant="outline" className="w-full border-operator-gray-light text-operator-charcoal gap-2">
                <Download className="h-4 w-4" />
                Download Briefing
              </Button>
            </div>

            {/* Status Timeline */}
            <div className="bg-operator-sand-light rounded-xl p-6 border border-operator-gray-light">
              <h3 className="text-lg font-bold text-operator-charcoal mb-4">Status Timeline</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <div>
                    <p className="font-medium text-operator-charcoal">Booking Confirmed</p>
                    <p className="text-xs text-operator-gray">March 19, 2:30 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <div>
                    <p className="font-medium text-operator-charcoal">Ready for Flight</p>
                    <p className="text-xs text-operator-gray">March 20, 8:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-slate-300" />
                  <div>
                    <p className="font-medium text-operator-gray">In Progress</p>
                    <p className="text-xs text-operator-gray">Waiting...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OperatorLayout>
  )
}
