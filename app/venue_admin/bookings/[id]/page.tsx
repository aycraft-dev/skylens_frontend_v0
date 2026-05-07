'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { VenueAdminLayout } from '@/components/venue-admin/layout'
import {
  getBookingById,
  getPackageById,
  getCustomerById,
  getOperatorById,
} from '@/lib/venue-admin-data'
import { StatusBadge, PaymentStatusBadge } from '@/components/venue-admin/shared-components'

interface BookingDetailPageProps {
  params: Promise<{ id: string }>
}

export default function BookingDetailPage({ params }: BookingDetailPageProps) {
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState('')
  const { id } = params as unknown as { id: string }

  useEffect(() => {
    async function loadBooking() {
      try {
        const bookingData = await getBookingById(id)
        if (bookingData) {
          setBooking(bookingData)
          setNotes(bookingData.notes || '')
        }
      } finally {
        setLoading(false)
      }
    }
    loadBooking()
  }, [id])

  if (loading) {
    return <VenueAdminLayout title="Booking Details">Loading...</VenueAdminLayout>
  }

  if (!booking) {
    return (
      <VenueAdminLayout title="Booking Not Found">
        <Card className="p-8 text-center border-white/10 bg-card">
          <p className="text-muted-foreground">Booking not found.</p>
          <Link href="/venue_admin/bookings">
            <Button variant="outline" className="mt-4 border-white/10">
              Back to Bookings
            </Button>
          </Link>
        </Card>
      </VenueAdminLayout>
    )
  }

  const pkg = getPackageById(booking.packageId)

  return (
    <VenueAdminLayout title={`Booking ${booking.id}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/venue_admin/bookings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
            Back to Bookings
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 border-white/10">
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" className="gap-2 border-white/10 text-red-500">
              <Trash2 className="h-4 w-4" />
              Cancel Booking
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Info Card */}
            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Guest Information</h3>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-[#C9A961] text-[#0B1B3B]">
                    {booking.guestName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{booking.guestName}</p>
                  <p className="text-sm text-muted-foreground">{booking.guestEmail}</p>
                  <Link href="#" className="mt-2 inline-flex text-sm text-[#C9A961] hover:underline">
                    View Customer Profile
                  </Link>
                </div>
              </div>
            </Card>

            {/* Package Details */}
            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Package Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Package</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{pkg?.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="mt-1 font-medium text-foreground">{pkg?.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="mt-1 font-medium text-foreground">${pkg?.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Videos</p>
                    <p className="mt-1 font-medium text-foreground">{pkg?.videoCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Photos</p>
                    <p className="mt-1 font-medium text-foreground">{pkg?.photoCount}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Status Timeline */}
            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Status Timeline</h3>
              <div className="space-y-3">
                {[
                  { status: 'Confirmed', date: new Date(booking.dateTime).toLocaleString() },
                  { status: 'Captured', date: 'May 10, 2024 - 5:30 PM' },
                  { status: 'Edited', date: 'May 11, 2024 - 2:00 PM' },
                  { status: 'Delivered', date: 'May 11, 2024 - 3:45 PM' },
                ].map((event, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="relative">
                      <div className="h-3 w-3 rounded-full bg-[#C9A961] mt-1.5" />
                      {idx < 3 && (
                        <div className="absolute left-1.5 top-3 h-8 w-0.5 bg-white/10" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{event.status}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Internal Notes */}
            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Internal Notes</h3>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes about this booking..."
                className="min-h-24 bg-white/5 border-white/10 text-foreground"
              />
              <Button className="mt-4 bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]">
                Save Notes
              </Button>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Current Status</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Booking Status</p>
                  <StatusBadge status={booking.status} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Payment Status</p>
                  <PaymentStatusBadge status={booking.paymentStatus} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Footage Status</p>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">
                    {booking.footageStatus}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Operator Assignment */}
            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Assigned Operator</h3>
              {booking.operator ? (
                <div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#C9A961] text-[#0B1B3B]">
                        {booking.operator.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{booking.operator}</p>
                      <Link href="/venue_admin/operators" className="text-xs text-[#C9A961] hover:underline">
                        View Profile
                      </Link>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4 w-full border-white/10">
                    Reassign Operator
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-3">No operator assigned</p>
                  <Button className="w-full bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]">
                    Assign Operator
                  </Button>
                </div>
              )}
            </Card>

            {/* Payment Details */}
            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Payment Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium text-foreground">${pkg?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-foreground">
                    {booking.paymentStatus === 'paid' ? '✓ Paid' : 'Pending'}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-xs text-muted-foreground">Last 4 digits: 4242</p>
                </div>
              </div>
            </Card>

            {/* Delivery */}
            {booking.deliveryEmail && (
              <Card className="p-6 border-white/10 bg-card">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Delivery</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Sent on</span>
                    <br />
                    <span className="text-foreground">
                      {new Date(booking.deliveryEmail).toLocaleString()}
                    </span>
                  </p>
                  {booking.downloadLink && (
                    <Button variant="outline" className="w-full border-white/10 mt-3">
                      Share Download Link
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </VenueAdminLayout>
  )
}
