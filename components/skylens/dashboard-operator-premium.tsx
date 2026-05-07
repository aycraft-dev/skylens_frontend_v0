'use client'

import Link from 'next/link'
import { Calendar, Plane, TrendingUp, Clock } from 'lucide-react'
import { OperatorLayout } from './operator-layout'
import { SummaryCard } from './summary-card'
import { BookingCard } from './booking-card'
import { Button } from '@/components/ui/button'

const mockBookings = [
  {
    id: 'BK001',
    customerName: 'Luxury Resort Estates',
    location: 'Mountain Valley Setup',
    time: '09:00 AM',
    duration: '2 hours',
    status: 'Reserved' as const,
    guestCount: 150,
  },
  {
    id: 'BK002',
    customerName: 'Premium Wedding Events',
    location: 'Beachfront Garden',
    time: '02:00 PM',
    duration: '3 hours',
    status: 'Ready' as const,
    guestCount: 250,
  },
  {
    id: 'BK003',
    customerName: 'Corporate Retreat Co.',
    location: 'Highland Venue Complex',
    time: '05:00 PM',
    duration: '1.5 hours',
    status: 'Flying' as const,
    guestCount: 100,
  },
]

const upcomingMissions = [
  { id: 1, name: 'Scenic Aerial', time: '11:30 AM', status: 'Uploading' as const },
  { id: 2, name: 'Multi-angle Capture', time: '02:00 PM', status: 'Processing' as const },
  { id: 3, name: 'Venue Overview', time: '04:30 PM', status: 'Pending' as const },
]

export function DashboardOperatorPremium() {
  return (
    <OperatorLayout title="Flight Operations">
      <div className="space-y-8">
        {/* Summary Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Today's Bookings"
            value="6"
            icon={Calendar}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <SummaryCard
            label="Active Missions"
            value="2"
            icon={Plane}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          />
          <SummaryCard
            label="Total Flight Hours"
            value="12.5"
            icon={Clock}
            iconBg="bg-amber-100"
            iconColor="text-amber-600"
          />
          <SummaryCard
            label="Success Rate"
            value="98.2%"
            icon={TrendingUp}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 flex-wrap">
          <Link href="/operator/verify-arrival">
            <Button className="bg-operator-charcoal hover:bg-opacity-90 text-operator-white">
              Verify QR Arrival
            </Button>
          </Link>
          <Link href="/operator/start-mission">
            <Button variant="outline" className="border-operator-gray-light text-operator-charcoal">
              Start New Mission
            </Button>
          </Link>
          <Link href="/operator/upload-footage">
            <Button variant="outline" className="border-operator-gray-light text-operator-charcoal">
              Upload Footage
            </Button>
          </Link>
        </div>

        {/* Bookings Section */}
        <div>
          <h2 className="text-2xl font-bold text-operator-charcoal mb-6">Today's Bookings</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockBookings.map((booking) => (
              <BookingCard key={booking.id} {...booking} />
            ))}
          </div>
        </div>

        {/* Active Missions */}
        <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
          <h2 className="text-2xl font-bold text-operator-charcoal mb-6">Active Missions</h2>
          <div className="space-y-3">
            {upcomingMissions.map((mission) => (
              <div key={mission.id} className="flex items-center justify-between p-4 rounded-lg bg-operator-sand-light hover:bg-opacity-75 transition">
                <div>
                  <p className="font-semibold text-operator-charcoal">{mission.name}</p>
                  <p className="text-sm text-operator-gray">{mission.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                    {mission.status}
                  </span>
                  <Link href={`/operator/mission-history/${mission.id}`}>
                    <Button size="sm" variant="ghost" className="text-operator-gold hover:text-operator-charcoal">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OperatorLayout>
  )
}
