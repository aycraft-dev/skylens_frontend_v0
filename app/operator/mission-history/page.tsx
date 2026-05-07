'use client'

import Link from 'next/link'
import { Calendar, Clock, MapPin, Download, Eye, ChevronRight, Search, Filter } from 'lucide-react'
import { useState } from 'react'
import { OperatorLayout } from '@/components/skylens/operator-layout'
import { StatusBadge } from '@/components/skylens/status-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const missionHistory = [
  {
    id: 1,
    bookingId: 'BK001',
    customerName: 'Luxury Resort Estates',
    location: 'Mountain Valley Setup',
    date: 'Today',
    startTime: '09:00 AM',
    endTime: '11:00 AM',
    duration: '2h 15m',
    status: 'Completed' as const,
    flightHours: 2.25,
    footageSize: '245 MB',
    waipoints: 4,
    photos: 342,
    videoFiles: 12,
  },
  {
    id: 2,
    bookingId: 'BK002',
    customerName: 'Premium Wedding Events',
    location: 'Beachfront Garden',
    date: 'Yesterday',
    startTime: '02:00 PM',
    endTime: '05:15 PM',
    duration: '3h 15m',
    status: 'Delivered' as const,
    flightHours: 3.25,
    footageSize: '387 MB',
    waipoints: 5,
    photos: 512,
    videoFiles: 18,
  },
  {
    id: 3,
    bookingId: 'BK003',
    customerName: 'Corporate Retreat Co.',
    location: 'Highland Venue Complex',
    date: 'Mar 18',
    startTime: '10:00 AM',
    endTime: '12:30 PM',
    duration: '2h 30m',
    status: 'Processing' as const,
    flightHours: 2.5,
    footageSize: '298 MB',
    waipoints: 4,
    photos: 401,
    videoFiles: 14,
  },
  {
    id: 4,
    bookingId: 'BK004',
    customerName: 'Gourmet Restaurant Group',
    location: 'Chef's Garden Venue',
    date: 'Mar 17',
    startTime: '04:00 PM',
    endTime: '06:45 PM',
    duration: '2h 45m',
    status: 'Delivered' as const,
    flightHours: 2.75,
    footageSize: '312 MB',
    waipoints: 4,
    photos: 467,
    videoFiles: 16,
  },
  {
    id: 5,
    bookingId: 'BK005',
    customerName: 'Executive Retreat Inc.',
    location: 'Mountain Estate',
    date: 'Mar 16',
    startTime: '08:00 AM',
    endTime: '10:30 AM',
    duration: '2h 30m',
    status: 'Completed' as const,
    flightHours: 2.5,
    footageSize: '276 MB',
    waipoints: 3,
    photos: 389,
    videoFiles: 13,
  },
]

export default function MissionHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const filteredMissions = missionHistory.filter(mission => {
    const matchesSearch = 
      mission.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.bookingId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !selectedStatus || mission.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalMissions: missionHistory.length,
    completed: missionHistory.filter(m => m.status === 'Completed' || m.status === 'Delivered').length,
    totalHours: missionHistory.reduce((sum, m) => sum + m.flightHours, 0),
    totalStorage: missionHistory.reduce((sum, m) => sum + parseFloat(m.footageSize), 0),
  }

  return (
    <OperatorLayout title="Mission History">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
            <p className="text-sm text-operator-gray mb-2">Total Missions</p>
            <p className="text-3xl font-bold text-operator-charcoal">{stats.totalMissions}</p>
            <p className="text-xs text-operator-gold mt-2">{stats.completed} completed</p>
          </div>
          <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
            <p className="text-sm text-operator-gray mb-2">Total Flight Hours</p>
            <p className="text-3xl font-bold text-operator-charcoal">{stats.totalHours.toFixed(1)}</p>
            <p className="text-xs text-emerald-600 mt-2">This month</p>
          </div>
          <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
            <p className="text-sm text-operator-gray mb-2">Total Storage Used</p>
            <p className="text-3xl font-bold text-operator-charcoal">{stats.totalStorage.toFixed(0)}</p>
            <p className="text-xs text-operator-gray mt-2">MB</p>
          </div>
          <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
            <p className="text-sm text-operator-gray mb-2">Success Rate</p>
            <p className="text-3xl font-bold text-operator-charcoal">98.5%</p>
            <p className="text-xs text-emerald-600 mt-2">All-time</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-5 w-5 text-operator-gray" />
              <Input
                type="text"
                placeholder="Search by customer name or booking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-operator-gray-light focus:border-operator-gold focus:ring-operator-gold"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant={!selectedStatus ? 'default' : 'outline'}
                onClick={() => setSelectedStatus(null)}
                className={!selectedStatus ? 'bg-operator-charcoal text-operator-white' : 'border-operator-gray-light text-operator-charcoal'}
              >
                All Missions
              </Button>
              <Button
                variant={selectedStatus === 'Completed' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('Completed')}
                className={selectedStatus === 'Completed' ? 'bg-operator-charcoal text-operator-white' : 'border-operator-gray-light text-operator-charcoal'}
              >
                Completed
              </Button>
              <Button
                variant={selectedStatus === 'Delivered' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('Delivered')}
                className={selectedStatus === 'Delivered' ? 'bg-operator-charcoal text-operator-white' : 'border-operator-gray-light text-operator-charcoal'}
              >
                Delivered
              </Button>
              <Button
                variant={selectedStatus === 'Processing' ? 'default' : 'outline'}
                onClick={() => setSelectedStatus('Processing')}
                className={selectedStatus === 'Processing' ? 'bg-operator-charcoal text-operator-white' : 'border-operator-gray-light text-operator-charcoal'}
              >
                Processing
              </Button>
            </div>
          </div>
        </div>

        {/* Mission List */}
        <div className="space-y-4">
          {filteredMissions.map((mission) => (
            <Link key={mission.id} href={`/operator/booking/${mission.bookingId}`}>
              <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6 hover:shadow-lg transition cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-operator-charcoal group-hover:text-operator-gold transition">{mission.customerName}</h3>
                      <span className="text-xs text-operator-gray px-2 py-1 bg-operator-sand-light rounded">{mission.bookingId}</span>
                    </div>
                    <p className="text-sm text-operator-gray mb-3">{mission.location}</p>
                  </div>
                  <StatusBadge status={mission.status} size="sm" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 pb-4 border-b border-operator-gray-light">
                  <div>
                    <p className="text-xs text-operator-gray mb-1">Date</p>
                    <div className="flex items-center gap-1 text-sm font-medium text-operator-charcoal">
                      <Calendar className="h-4 w-4" />
                      {mission.date}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-operator-gray mb-1">Time</p>
                    <div className="flex items-center gap-1 text-sm font-medium text-operator-charcoal">
                      <Clock className="h-4 w-4" />
                      {mission.startTime}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-operator-gray mb-1">Duration</p>
                    <p className="text-sm font-medium text-operator-charcoal">{mission.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-operator-gray mb-1">Flight Hours</p>
                    <p className="text-sm font-medium text-operator-charcoal">{mission.flightHours}h</p>
                  </div>
                  <div>
                    <p className="text-xs text-operator-gray mb-1">Footage</p>
                    <p className="text-sm font-medium text-operator-charcoal">{mission.footageSize}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-operator-gray">{mission.photos} photos • {mission.videoFiles} videos • {mission.waipoints} waypoints</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="text-operator-gold hover:text-operator-charcoal gap-1">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="ghost" className="text-operator-gold hover:text-operator-charcoal gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <ChevronRight className="h-5 w-5 text-operator-gray group-hover:text-operator-gold transition" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredMissions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-operator-gray text-lg">No missions found matching your search</p>
          </div>
        )}
      </div>
    </OperatorLayout>
  )
}
