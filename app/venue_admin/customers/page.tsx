'use client'

import { useEffect, useState } from 'react'
import { Search, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { VenueAdminLayout } from '@/components/venue-admin/layout'
import { getCustomers, Customer } from '@/lib/venue-admin-data'

const countries = [
  'All Countries',
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Singapore',
  'France',
  'Spain',
  'South Korea',
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('All Countries')

  useEffect(() => {
    async function loadCustomers() {
      try {
        const data = await getCustomers()
        setCustomers(data)
      } finally {
        setLoading(false)
      }
    }
    loadCustomers()
  }, [])

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(search.toLowerCase()) ||
      cust.email.toLowerCase().includes(search.toLowerCase())
    const matchesCountry =
      countryFilter === 'All Countries' || cust.country === countryFilter
    return matchesSearch && matchesCountry
  })

  if (loading) {
    return <VenueAdminLayout title="Customers">Loading...</VenueAdminLayout>
  }

  return (
    <VenueAdminLayout title="Customers">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white/5 border-white/10"
            />
          </div>

          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-40 bg-white/5 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Customers Table */}
        <Card className="border-white/10 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Name</TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground">Country</TableHead>
                  <TableHead className="text-muted-foreground">Total Bookings</TableHead>
                  <TableHead className="text-muted-foreground">Total Spent</TableHead>
                  <TableHead className="text-muted-foreground">Last Visit</TableHead>
                  <TableHead className="text-muted-foreground">Avg Rating</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((cust) => (
                  <TableRow key={cust.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-medium text-foreground">{cust.name}</TableCell>
                    <TableCell className="text-foreground text-sm">{cust.email}</TableCell>
                    <TableCell className="text-foreground">{cust.country}</TableCell>
                    <TableCell className="text-foreground">{cust.totalBookings}</TableCell>
                    <TableCell className="text-foreground font-medium">
                      ${cust.totalSpent.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-foreground text-sm">
                      {new Date(cust.lastVisit).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-foreground">
                      <span className="text-[#C9A961]">★</span> {cust.avgRatingGiven.toFixed(1)}
                    </TableCell>
                    <TableCell>
                      <Link href={`/venue_admin/customers/${cust.id}`}>
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
