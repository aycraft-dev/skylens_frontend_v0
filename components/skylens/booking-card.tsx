'use client'

import Link from 'next/link'
import { Clock, MapPin, Users, ChevronRight } from 'lucide-react'
import { StatusBadge } from './status-badge'
import { cn } from '@/lib/utils'

type Status = 'Reserved' | 'Arrived' | 'Ready' | 'Flying' | 'Uploading' | 'Processing' | 'Delivered' | 'Completed' | 'Cancelled'

interface BookingCardProps {
  id: string
  customerName: string
  location: string
  time: string
  duration: string
  status: Status
  guestCount: number
  onAction?: () => void
}

export function BookingCard({ id, customerName, location, time, duration, status, guestCount, onAction }: BookingCardProps) {
  const href = `/operator/booking/${id}`

  return (
    <Link href={href}>
      <div className="rounded-xl border border-operator-gray-light bg-operator-white p-6 hover:shadow-lg transition cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-operator-charcoal group-hover:text-operator-gold transition">{customerName}</h3>
            <p className="text-sm text-operator-gray mt-1">{location}</p>
          </div>
          <StatusBadge status={status} size="sm" />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-operator-gray">
            <Clock className="h-4 w-4" />
            <span>{time} • {duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-operator-gray">
            <Users className="h-4 w-4" />
            <span>{guestCount} guests</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-operator-gray">
            <MapPin className="h-4 w-4" />
            <span>Flight zone assigned</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-operator-gray-light">
          <div className="text-xs text-operator-gray">Booking ID: {id}</div>
          <ChevronRight className="h-4 w-4 text-operator-gray group-hover:text-operator-gold transition" />
        </div>
      </div>
    </Link>
  )
}
