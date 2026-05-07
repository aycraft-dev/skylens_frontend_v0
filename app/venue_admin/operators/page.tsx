'use client'

import { useEffect, useState } from 'react'
import { Plus, Mail, Phone, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { VenueAdminLayout } from '@/components/venue-admin/layout'
import { getOperators, Operator } from '@/lib/venue-admin-data'
import { OperatorStatusBadge } from '@/components/venue-admin/shared-components'

export default function OperatorsPage() {
  const [operators, setOperators] = useState<Operator[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    async function loadOperators() {
      try {
        const data = await getOperators()
        setOperators(data)
      } finally {
        setLoading(false)
      }
    }
    loadOperators()
  }, [])

  if (loading) {
    return <VenueAdminLayout title="Operators">Loading...</VenueAdminLayout>
  }

  return (
    <VenueAdminLayout title="Operators">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{operators.length} Operators</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]">
                <Plus className="h-4 w-4" />
                Invite Operator
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#111827] border-white/10 text-foreground">
              <DialogHeader>
                <DialogTitle>Invite Operator</DialogTitle>
                <DialogDescription>
                  Send an invitation to a new operator to manage bookings
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="operator@example.com"
                    className="mt-1 bg-white/5 border-white/10"
                  />
                </div>
                <div>
                  <Label>Full Name</Label>
                  <Input
                    placeholder="John Doe"
                    className="mt-1 bg-white/5 border-white/10"
                  />
                </div>
                <Button onClick={() => setIsDialogOpen(false)} className="w-full bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]">
                  Send Invitation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Operators Table */}
        <Card className="border-white/10 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Name</TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground">Phone</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Bookings</TableHead>
                  <TableHead className="text-muted-foreground">Avg Rating</TableHead>
                  <TableHead className="text-muted-foreground">Turnaround</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operators.map((op) => (
                  <TableRow key={op.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-medium text-foreground">{op.name}</TableCell>
                    <TableCell className="text-foreground flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      {op.email}
                    </TableCell>
                    <TableCell className="text-foreground flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      {op.phone}
                    </TableCell>
                    <TableCell>
                      <OperatorStatusBadge status={op.status} />
                    </TableCell>
                    <TableCell className="text-foreground">{op.bookingsThisMonth}</TableCell>
                    <TableCell className="text-foreground">
                      <span className="text-[#C9A961]">★</span> {op.avgRating.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-foreground">{op.avgTurnaroundTime}m</TableCell>
                    <TableCell>
                      <Link href={`/venue_admin/operators/${op.id}`}>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </TableCell>
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
