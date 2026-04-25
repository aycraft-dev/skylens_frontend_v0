'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Play, AlertTriangle, CheckCircle2, MapPin, Zap } from 'lucide-react'
import { OperatorLayout } from '@/components/skylens/operator-layout'
import { WaypointCard } from '@/components/skylens/waypoint-card'
import { Button } from '@/components/ui/button'

const missionData = {
  id: 'BK001',
  customerName: 'Luxury Resort Estates',
  location: 'Mountain Valley Setup',
  waypoints: [
    { number: 1, name: 'Launch Point', description: 'Main entrance', coordinates: '37.7749, -122.4194', altitude: '150', completed: false, active: true },
    { number: 2, name: 'Garden Section', description: 'Garden flyover', coordinates: '37.7755, -122.4200', altitude: '250', completed: false },
    { number: 3, name: 'Venue Overview', description: 'Full property', coordinates: '37.7760, -122.4205', altitude: '350', completed: false },
    { number: 4, name: 'Detail Captures', description: 'Decorative elements', coordinates: '37.7750, -122.4198', altitude: '200', completed: false },
  ],
  preFlightChecks: [
    { id: 1, name: 'Battery Level', status: 'Pass', icon: '🔋', completed: true },
    { id: 2, name: 'GPS Signal', status: 'Pass', icon: '🛰️', completed: true },
    { id: 3, name: 'Camera Test', status: 'Pass', icon: '📷', completed: true },
    { id: 4, name: 'Wind Speed', status: 'Pass', icon: '💨', completed: true },
    { id: 5, name: 'Airspace Clear', status: 'Pass', icon: '✈️', completed: true },
  ],
}

export default function StartMissionPage() {
  const [missionStarted, setMissionStarted] = useState(false)
  const [flightTime, setFlightTime] = useState(0)
  const [allChecksComplete, setAllChecksComplete] = useState(true)

  const handleStartMission = () => {
    setMissionStarted(true)
  }

  return (
    <OperatorLayout>
      <div className="space-y-6">
        <Link href={`/operator/booking/${missionData.id}`}>
          <Button variant="ghost" size="sm" className="gap-2 text-operator-gray hover:text-operator-charcoal mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Booking
          </Button>
        </Link>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-operator-charcoal">{missionData.customerName}</h1>
            <p className="text-operator-gray mt-1">{missionData.location}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {!missionStarted ? (
                <>
                  {/* Pre-Flight Checklist */}
                  <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
                    <h2 className="text-xl font-bold text-operator-charcoal mb-4">Pre-Flight Checklist</h2>
                    <div className="space-y-3">
                      {missionData.preFlightChecks.map((check) => (
                        <div key={check.id} className="flex items-center gap-4 p-4 rounded-lg bg-operator-sand-light hover:bg-opacity-75 transition">
                          <span className="text-2xl">{check.icon}</span>
                          <div className="flex-1">
                            <p className="font-semibold text-operator-charcoal">{check.name}</p>
                          </div>
                          {check.completed ? (
                            <div className="flex items-center gap-1 text-emerald-600">
                              <CheckCircle2 className="h-5 w-5" />
                              <span className="text-sm font-medium">{check.status}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-operator-gray">Pending</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Flight Plan */}
                  <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
                    <h2 className="text-xl font-bold text-operator-charcoal mb-4">Flight Plan Waypoints</h2>
                    <div className="space-y-3">
                      {missionData.waypoints.map((waypoint) => (
                        <WaypointCard key={waypoint.number} {...waypoint} />
                      ))}
                    </div>
                  </div>

                  {/* Weather & Conditions */}
                  <div className="bg-operator-sand-light rounded-xl border border-operator-gray-light p-6">
                    <h3 className="text-lg font-bold text-operator-charcoal mb-4">Current Conditions</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-operator-gray mb-1">Temperature</p>
                        <p className="text-2xl font-bold text-operator-charcoal">72°F</p>
                      </div>
                      <div>
                        <p className="text-sm text-operator-gray mb-1">Wind Speed</p>
                        <p className="text-2xl font-bold text-operator-charcoal">8 mph</p>
                      </div>
                      <div>
                        <p className="text-sm text-operator-gray mb-1">Visibility</p>
                        <p className="text-2xl font-bold text-operator-charcoal">10 mi</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Mission In Progress */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-8">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <div className="h-6 w-6 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-lg font-bold text-blue-900">Mission In Progress</span>
                      </div>
                      <p className="text-blue-700 mb-6">Drone is actively capturing footage</p>

                      {/* Flight Timer */}
                      <div className="bg-white rounded-lg p-6 inline-block mb-6">
                        <p className="text-sm text-operator-gray mb-2">Flight Time Elapsed</p>
                        <p className="text-4xl font-bold text-operator-charcoal font-mono">
                          {Math.floor(flightTime / 60)}:{String(flightTime % 60).padStart(2, '0')}
                        </p>
                      </div>

                      {/* Active Waypoint */}
                      <div className="flex items-center justify-center gap-2 text-blue-700 font-medium">
                        <MapPin className="h-4 w-4" />
                        <span>Waypoint 1: Launch Point</span>
                      </div>
                    </div>
                  </div>

                  {/* Real-Time Telemetry */}
                  <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
                    <h2 className="text-xl font-bold text-operator-charcoal mb-4">Live Telemetry</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-operator-sand-light">
                        <p className="text-xs text-operator-gray mb-1">Altitude</p>
                        <p className="text-2xl font-bold text-operator-charcoal">250 ft</p>
                      </div>
                      <div className="p-4 rounded-lg bg-operator-sand-light">
                        <p className="text-xs text-operator-gray mb-1">Distance</p>
                        <p className="text-2xl font-bold text-operator-charcoal">850 m</p>
                      </div>
                      <div className="p-4 rounded-lg bg-operator-sand-light">
                        <p className="text-xs text-operator-gray mb-1">Battery</p>
                        <p className="text-2xl font-bold text-operator-charcoal">78%</p>
                      </div>
                      <div className="p-4 rounded-lg bg-operator-sand-light">
                        <p className="text-xs text-operator-gray mb-1">Speed</p>
                        <p className="text-2xl font-bold text-operator-charcoal">12 mph</p>
                      </div>
                    </div>
                  </div>

                  {/* Waypoint Progress */}
                  <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
                    <h2 className="text-xl font-bold text-operator-charcoal mb-4">Waypoint Progress</h2>
                    <div className="space-y-2">
                      {missionData.waypoints.map((wp, idx) => (
                        <div key={wp.number} className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${idx < 2 ? 'bg-emerald-500' : 'bg-operator-gray-light'}`} />
                          <span className={idx < 2 ? 'font-medium text-operator-charcoal' : 'text-operator-gray'}>
                            Waypoint {wp.number}: {wp.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {!missionStarted ? (
                <>
                  {/* Mission Summary */}
                  <div className="bg-operator-sand-light rounded-xl border border-operator-gray-light p-6">
                    <h3 className="text-lg font-bold text-operator-charcoal mb-4">Mission Summary</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-operator-gray mb-1">Duration</p>
                        <p className="font-semibold text-operator-charcoal">~45 minutes</p>
                      </div>
                      <div>
                        <p className="text-operator-gray mb-1">Total Distance</p>
                        <p className="font-semibold text-operator-charcoal">~3.2 km</p>
                      </div>
                      <div>
                        <p className="text-operator-gray mb-1">Max Altitude</p>
                        <p className="font-semibold text-operator-charcoal">350 ft</p>
                      </div>
                      <div>
                        <p className="text-operator-gray mb-1">Waypoints</p>
                        <p className="font-semibold text-operator-charcoal">4 points</p>
                      </div>
                    </div>
                  </div>

                  {/* Safety Reminders */}
                  <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
                    <div className="flex gap-3 mb-3">
                      <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <h3 className="font-bold text-orange-900">Safety Reminders</h3>
                    </div>
                    <ul className="text-sm text-orange-800 space-y-1 list-disc list-inside">
                      <li>Keep flight visible at all times</li>
                      <li>Avoid flying over people</li>
                      <li>Monitor battery constantly</li>
                      <li>Maintain safe distance from venue</li>
                    </ul>
                  </div>

                  {/* Start Mission Button */}
                  {allChecksComplete && (
                    <Button
                      onClick={handleStartMission}
                      className="w-full bg-operator-charcoal hover:bg-opacity-90 text-operator-white font-semibold py-6 text-lg h-auto gap-2"
                    >
                      <Play className="h-5 w-5" />
                      Start Mission
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {/* Mission Controls */}
                  <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6 space-y-3">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold">
                      Pause Mission
                    </Button>
                    <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                      Emergency Stop
                    </Button>
                  </div>

                  {/* Mission Info */}
                  <div className="bg-operator-sand-light rounded-xl border border-operator-gray-light p-6">
                    <h3 className="font-bold text-operator-charcoal mb-3">Mission Active</h3>
                    <div className="text-sm space-y-2 text-operator-gray">
                      <p>Status: <span className="font-semibold text-blue-600">In Progress</span></p>
                      <p>Satellite Signal: <span className="font-semibold text-emerald-600">Strong</span></p>
                      <p>Connection: <span className="font-semibold text-emerald-600">Stable</span></p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </OperatorLayout>
  )
}
