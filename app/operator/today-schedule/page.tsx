'use client'

import Link from 'next/link'
import { Clock, MapPin, Users, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { OperatorLayout } from '@/components/skylens/operator-layout'
import { StatusBadge } from '@/components/skylens/status-badge'
import { Button } from '@/components/ui/button'

const scheduleTimeline = [
  {
    id: 1,
    time: '08:00 AM',
    event: 'Pre-flight Inspection',
    location: 'Drone Bay',
    status: 'Completed' as const,
    duration: '30 min',
  },
  {
    id: 2,
    time: '09:00 AM',
    event: 'Luxury Resort Aerial Coverage',
    location: 'Mountain Valley Setup',
    status: 'Ready' as const,
    duration: '2 hours',
    customerName: 'Luxury Resort Estates',
    guestCount: 150,
  },
  {
    id: 3,
    time: '02:00 PM',
    event: 'Premium Wedding Cinematic',
    location: 'Beachfront Garden',
    status: 'Reserved' as const,
    duration: '3 hours',
    customerName: 'Premium Wedding Events',
    guestCount: 250,
  },
  {
    id: 4,
    time: '05:00 PM',
    event: 'Corporate Retreat Overview',
    location: 'Highland Venue Complex',
    status: 'Flying' as const,
    duration: '1.5 hours',
    customerName: 'Corporate Retreat Co.',
    guestCount: 100,
  },
  {
    id: 5,
    time: '07:00 PM',
    event: 'Equipment Maintenance',
    location: 'Drone Bay',
    status: 'Reserved' as const,
    duration: '1 hour',
  },
]

export default function TodaySchedulePage() {
  return (
    <OperatorLayout title="Today's Schedule">
      <div className="space-y-6">
        {/* Timeline Header */}
        <div className="bg-operator-sand-light rounded-xl p-6 border border-operator-gray-light">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-operator-charcoal">Today's Timeline</h3>
              <p className="text-sm text-operator-gray mt-1">5 scheduled events</p>
            </div>
            <div className="text-3xl font-bold text-operator-gold">5</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {scheduleTimeline.map((item, index) => (
            <Link key={item.id} href={item.customerName ? `/operator/booking/${item.id}` : '#'}>
              <div className="relative bg-operator-white rounded-xl border border-operator-gray-light p-6 hover:shadow-lg transition cursor-pointer group">
                {/* Timeline indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-operator-gold to-transparent rounded-l-xl" />

                <div className="ml-2 flex items-start justify-between">
                  <div className="flex-1">
                    {/* Time */}
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-operator-gold" />
                      <span className="text-sm font-semibold text-operator-charcoal">{item.time}</span>
                      <span className="text-xs text-operator-gray">({item.duration})</span>
                    </div>

                    {/* Event Title */}
                    <h3 className="text-lg font-semibold text-operator-charcoal mb-3 group-hover:text-operator-gold transition">
                      {item.event}
                    </h3>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-operator-gray">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>

                      {item.customerName && (
                        <>
                          <div className="flex items-center gap-2 text-sm text-operator-gray">
                            <Users className="h-4 w-4" />
                            <span>{item.customerName} • {item.guestCount} guests</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Status */}
                    <StatusBadge status={item.status} size="sm" />
                  </div>

                  <ChevronRight className="h-5 w-5 text-operator-gray group-hover:text-operator-gold transition ml-4 flex-shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Day Summary */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-operator-gray">Completed</span>
            </div>
            <div className="text-3xl font-bold text-operator-charcoal">1</div>
            <p className="text-xs text-operator-gray mt-2">Pre-flight inspection done</p>
          </div>

          <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-5 w-5 text-amber-600" />
              <span className="text-sm font-medium text-operator-gray">In Progress</span>
            </div>
            <div className="text-3xl font-bold text-operator-charcoal">1</div>
            <p className="text-xs text-operator-gray mt-2">Corporate retreat flight active</p>
          </div>

          <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-operator-gray">Pending</span>
            </div>
            <div className="text-3xl font-bold text-operator-charcoal">3</div>
            <p className="text-xs text-operator-gray mt-2">Awaiting execution</p>
          </div>
        </div>

        {/* Flight Hours Summary */}
        <div className="bg-operator-sand-light rounded-xl p-6 border border-operator-gray-light">
          <h3 className="text-lg font-semibold text-operator-charcoal mb-4">Flight Hours Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-operator-gray mb-1">Scheduled</p>
              <p className="text-2xl font-bold text-operator-charcoal">7.5 hrs</p>
            </div>
            <div>
              <p className="text-sm text-operator-gray mb-1">Completed</p>
              <p className="text-2xl font-bold text-operator-charcoal">0.5 hrs</p>
            </div>
            <div>
              <p className="text-sm text-operator-gray mb-1">Remaining</p>
              <p className="text-2xl font-bold text-operator-charcoal">7 hrs</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap pt-4">
          <Link href="/operator/dashboard">
            <Button variant="outline" className="border-operator-gray-light text-operator-charcoal">
              Back to Dashboard
            </Button>
          </Link>
          <Link href="/operator/verify-arrival">
            <Button className="bg-operator-charcoal hover:bg-opacity-90 text-operator-white">
              Verify Next Arrival
            </Button>
          </Link>
        </div>
      </div>
    </OperatorLayout>
  )
}
