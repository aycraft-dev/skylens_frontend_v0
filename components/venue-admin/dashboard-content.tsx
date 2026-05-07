'use client'

import { useEffect, useState } from 'react'
import {
  DollarSign,
  Calendar,
  TrendingUp,
  Star,
  Zap,
  Clock,
  Users,
  Package,
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { KpiCard, StatusBadge, PaymentStatusBadge } from './shared-components'
import { getDashboardStats, getBookings, getReviews } from '@/lib/venue-admin-data'

// Chart data
const revenueData = [
  { date: 'May 1', revenue: 2400 },
  { date: 'May 3', revenue: 1398 },
  { date: 'May 5', revenue: 9800 },
  { date: 'May 7', revenue: 3908 },
  { date: 'May 9', revenue: 4800 },
  { date: 'May 11', revenue: 3800 },
  { date: 'May 13', revenue: 4300 },
  { date: 'May 15', revenue: 5200 },
]

const statusData = [
  { name: 'Pending', value: 8, color: '#F59E0B' },
  { name: 'Confirmed', value: 12, color: '#3B82F6' },
  { name: 'Captured', value: 5, color: '#A855F7' },
  { name: 'Edited', value: 4, color: '#6366F1' },
  { name: 'Delivered', value: 15, color: '#10B981' },
]

export function DashboardContent() {
  const [stats, setStats] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const dashboardStats = await getDashboardStats()
        const bookingsData = await getBookings()
        const reviewsData = await getReviews()
        
        setStats(dashboardStats)
        setBookings(bookingsData.slice(0, 10))
        setReviews(reviewsData.slice(0, 5))
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>
  }

  return (
    <div className="space-y-8">
      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          delta="12% vs last month"
          trend="up"
          subtitle="Month to date"
        />
        <KpiCard
          title="Total Bookings"
          value={stats.monthBookings}
          icon={Calendar}
          delta="2 today"
          trend="up"
          subtitle="This month"
        />
        <KpiCard
          title="Average Rating"
          value={`${stats.avgRating.toFixed(1)}/5.0`}
          icon={Star}
          delta={`${stats.reviewCount} reviews`}
          subtitle="From customers"
        />
        <KpiCard
          title="Delivery Time"
          value={`${stats.deliveryTurnaround}m`}
          icon={Clock}
          delta="Target: 30m"
          trend="down"
          subtitle="Average"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(11, 27, 59, 0.95)',
                  border: '1px solid rgba(201, 169, 97, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#C9A961"
                strokeWidth={2}
                dot={{ fill: '#C9A961', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bookings Status Chart */}
        <Card className="p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Bookings by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(11, 27, 59, 0.95)',
                  border: '1px solid rgba(201, 169, 97, 0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2 text-sm">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Bookings Table */}
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
                <TableHead className="text-muted-foreground">Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} className="border-white/10">
                  <TableCell className="font-mono text-sm text-foreground">
                    {booking.id}
                  </TableCell>
                  <TableCell className="text-foreground">{booking.guestName}</TableCell>
                  <TableCell className="text-foreground">
                    {new Date(booking.dateTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={booking.paymentStatus} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Recent Reviews */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Recent Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-white/10 pb-4 last:border-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{review.customerName}</p>
                    <p className="text-sm text-muted-foreground">{review.packageName}</p>
                    <div className="mt-2 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < review.rating ? 'text-[#C9A961]' : 'text-white/20'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-foreground line-clamp-2">{review.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Package */}
        <Card className="p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Top Package</h3>
          {stats.topPackage && (
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-bold text-[#C9A961]">{stats.topPackage.name}</div>
                <p className="mt-2 text-sm text-muted-foreground">{stats.topPackage.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bookings This Month</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {stats.topPackage.count}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Price</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    ${stats.topPackage.price}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Videos:</span>
                  <span className="text-foreground font-medium">{stats.topPackage.videoCount}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Photos:</span>
                  <span className="text-foreground font-medium">{stats.topPackage.photoCount}</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
