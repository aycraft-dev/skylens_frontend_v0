'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { VenueAdminLayout } from '@/components/venue-admin/layout'
import { getCustomerById } from '@/lib/venue-admin-data'

interface CustomerDetailPageProps {
  params: Promise<{ id: string }>
}

export default function CustomerDetailPage({ params }: CustomerDetailPageProps) {
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { id } = params as unknown as { id: string }

  useEffect(() => {
    async function loadCustomer() {
      try {
        const customerData = await getCustomerById(id)
        setCustomer(customerData)
      } finally {
        setLoading(false)
      }
    }
    loadCustomer()
  }, [id])

  if (loading) {
    return <VenueAdminLayout title="Customer Details">Loading...</VenueAdminLayout>
  }

  if (!customer) {
    return (
      <VenueAdminLayout title="Customer Not Found">
        <Card className="p-8 text-center border-white/10 bg-card">
          <p className="text-muted-foreground">Customer not found.</p>
        </Card>
      </VenueAdminLayout>
    )
  }

  return (
    <VenueAdminLayout title={customer.name}>
      <div className="space-y-6">
        {/* Header */}
        <Link
          href="/venue_admin/customers"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground w-fit"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Customers
        </Link>

        {/* Profile Card */}
        <Card className="p-6 border-white/10 bg-card">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-[#C9A961] text-[#0B1B3B] text-lg font-bold">
                {customer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{customer.name}</h1>
              <p className="mt-1 text-muted-foreground">{customer.email}</p>
              <p className="mt-1 text-muted-foreground">{customer.country}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Member since {new Date(customer.lastVisit).getFullYear()}
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="p-6 border-white/10 bg-card">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{customer.totalBookings}</p>
          </Card>
          <Card className="p-6 border-white/10 bg-card">
            <p className="text-sm text-muted-foreground">Lifetime Value</p>
            <p className="mt-2 text-3xl font-bold text-foreground">${customer.totalSpent}</p>
          </Card>
          <Card className="p-6 border-white/10 bg-card">
            <p className="text-sm text-muted-foreground">Avg Rating Given</p>
            <p className="mt-2 text-3xl font-bold">
              <span className="text-[#C9A961]">★</span> {customer.avgRatingGiven.toFixed(1)}
            </p>
          </Card>
          <Card className="p-6 border-white/10 bg-card">
            <p className="text-sm text-muted-foreground">Last Visit</p>
            <p className="mt-2 text-sm text-foreground">
              {new Date(customer.lastVisit).toLocaleDateString()}
            </p>
          </Card>
        </div>

        {/* Booking History */}
        <Card className="p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Booking History</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">Package</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3].map((_, idx) => (
                  <TableRow key={idx} className="border-white/10">
                    <TableCell className="text-foreground">
                      {new Date(Date.now() - idx * 86400000 * 10).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {['Sunset Cinematic', 'Couple Story', 'Aerial Portrait'][idx]}
                    </TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                        Delivered
                      </span>
                    </TableCell>
                    <TableCell className="text-foreground">${[299, 449, 199][idx]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Reviews Left */}
        <Card className="p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Reviews Left</h3>
          <div className="space-y-4">
            {[1, 2].map((_, idx) => (
              <div key={idx} className="border-b border-white/10 pb-4 last:border-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      {['Sunset Cinematic', 'Aerial Portrait'][idx]}
                    </p>
                    <div className="mt-1 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < (idx === 0 ? 5 : 4)
                              ? 'text-[#C9A961]'
                              : 'text-white/20'
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-foreground">
                      {idx === 0
                        ? 'Absolutely stunning aerial shots! Highly recommend!'
                        : 'Great quality photos and professional service.'}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {10 + idx} days ago
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </VenueAdminLayout>
  )
}
