'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { VenueAdminLayout } from '@/components/venue-admin/layout'
import { getOperatorById } from '@/lib/venue-admin-data'
import { OperatorStatusBadge } from '@/components/venue-admin/shared-components'

interface OperatorDetailPageProps {
  params: Promise<{ id: string }>
}

export default function OperatorDetailPage({ params }: OperatorDetailPageProps) {
  const [operator, setOperator] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { id } = params as unknown as { id: string }

  useEffect(() => {
    async function loadOperator() {
      try {
        const operatorData = await getOperatorById(id)
        setOperator(operatorData)
      } finally {
        setLoading(false)
      }
    }
    loadOperator()
  }, [id])

  if (loading) {
    return <VenueAdminLayout title="Operator Details">Loading...</VenueAdminLayout>
  }

  if (!operator) {
    return (
      <VenueAdminLayout title="Operator Not Found">
        <Card className="p-8 text-center border-white/10 bg-card">
          <p className="text-muted-foreground">Operator not found.</p>
        </Card>
      </VenueAdminLayout>
    )
  }

  return (
    <VenueAdminLayout title={operator.name}>
      <div className="space-y-6">
        {/* Header */}
        <Link
          href="/venue_admin/operators"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground w-fit"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Operators
        </Link>

        {/* Operator Profile Card */}
        <Card className="p-6 border-white/10 bg-card">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-[#C9A961] text-[#0B1B3B] text-lg font-bold">
                  {operator.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{operator.name}</h1>
                <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {operator.email}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {operator.phone}
                </p>
              </div>
            </div>
            <OperatorStatusBadge status={operator.status} />
          </div>
        </Card>

        {/* Performance Grid */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="p-6 border-white/10 bg-card">
            <p className="text-sm text-muted-foreground">Bookings This Month</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{operator.bookingsThisMonth}</p>
          </Card>
          <Card className="p-6 border-white/10 bg-card">
            <p className="text-sm text-muted-foreground">Average Rating</p>
            <p className="mt-2 text-3xl font-bold">
              <span className="text-[#C9A961]">★</span> {operator.avgRating.toFixed(1)}
            </p>
          </Card>
          <Card className="p-6 border-white/10 bg-card">
            <p className="text-sm text-muted-foreground">Avg Turnaround</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{operator.avgTurnaroundTime}m</p>
          </Card>
          <Card className="p-6 border-white/10 bg-card">
            <p className="text-sm text-muted-foreground">Last Active</p>
            <p className="mt-2 text-sm text-foreground">
              {new Date(operator.lastActive).toLocaleDateString()}
            </p>
          </Card>
        </div>

        {/* Weekly Schedule */}
        <Card className="p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Weekly Availability</h3>
          <div className="grid gap-2 md:grid-cols-7">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} className="rounded-lg bg-white/5 border border-white/10 p-4 text-center">
                <p className="text-sm font-medium text-foreground">{day}</p>
                <p className="mt-2 text-xs text-muted-foreground">{idx < 5 ? '06:00-18:00' : 'Off'}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Bookings */}
        <Card className="p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-muted-foreground">Booking ID</TableHead>
                  <TableHead className="text-muted-foreground">Guest</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Turnaround</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((_, idx) => (
                  <TableRow key={idx} className="border-white/10">
                    <TableCell className="font-mono text-sm text-foreground">BK-00{idx + 1}</TableCell>
                    <TableCell className="text-foreground">Guest {idx + 1}</TableCell>
                    <TableCell className="text-foreground">May {10 + idx}, 2024</TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                        Delivered
                      </span>
                    </TableCell>
                    <TableCell className="text-foreground">25m</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </VenueAdminLayout>
  )
}
