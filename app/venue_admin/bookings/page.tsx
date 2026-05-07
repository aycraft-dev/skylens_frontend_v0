'use client'

import { useEffect, useState } from 'react'
import { Plus, Download, Search, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { VenueAdminLayout } from '@/components/venue-admin/layout'
import { getBookings, Booking, getPackageById } from '@/lib/venue-admin-data'
import { StatusBadge, PaymentStatusBadge } from '@/components/venue-admin/shared-components'

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentFilter, setPaymentFilter] = useState<string>('all')

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await getBookings()
        setBookings(data)
      } finally {
        setLoading(false)
      }
    }
    loadBookings()
  }, [])

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(search.toLowerCase()) ||
      booking.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter
    return matchesSearch && matchesStatus && matchesPayment
  })

  const handleExportCSV = () => {
    // TODO: implement CSV export
    console.log('Exporting CSV...')
  }

  if (loading) {
    return <VenueAdminLayout title="Bookings">Loading...</VenueAdminLayout>
  }

  return (
    <VenueAdminLayout title="Bookings">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by guest name or booking ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white/5 border-white/10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-white/5 border-white/10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="captured">Captured</SelectItem>
                <SelectItem value="edited">Edited</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-32 bg-white/5 border-white/10">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleExportCSV}
              variant="outline"
              className="gap-2 border-white/10"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Bookings Table */}
        <Card className="border-white/10 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Booking ID</TableHead>
                  <TableHead className="text-muted-foreground">Guest</TableHead>
                  <TableHead className="text-muted-foreground">Package</TableHead>
                  <TableHead className="text-muted-foreground">Date / Time</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Payment</TableHead>
                  <TableHead className="text-muted-foreground">Operator</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => {
                  const pkg = getPackageById(booking.packageId)
                  return (
                    <TableRow key={booking.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-mono text-sm text-foreground">
                        {booking.id}
                      </TableCell>
                      <TableCell>
                        <div className="text-foreground">{booking.guestName}</div>
                        <div className="text-xs text-muted-foreground">{booking.guestEmail}</div>
                      </TableCell>
                      <TableCell className="text-foreground">{pkg?.name || 'Unknown'}</TableCell>
                      <TableCell className="text-foreground">
                        {new Date(booking.dateTime).toLocaleDateString()}
                        <div className="text-xs text-muted-foreground">
                          {new Date(booking.dateTime).toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={booking.status} />
                      </TableCell>
                      <TableCell>
                        <PaymentStatusBadge status={booking.paymentStatus} />
                      </TableCell>
                      <TableCell className="text-foreground text-sm">
                        {booking.operator || '—'}
                      </TableCell>
                      <TableCell>
                        <Link href={`/venue_admin/bookings/${booking.id}`}>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </Card>

        {filteredBookings.length === 0 && (
          <Card className="border-white/10 bg-card p-8 text-center">
            <p className="text-muted-foreground">No bookings found matching your filters.</p>
          </Card>
        )}
      </div>
    </VenueAdminLayout>
  )
}
