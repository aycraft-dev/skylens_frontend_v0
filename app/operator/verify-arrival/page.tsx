'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Camera, CheckCircle2, AlertCircle, ChevronLeft } from 'lucide-react'
import { OperatorLayout } from '@/components/skylens/operator-layout'
import { StatusBadge } from '@/components/skylens/status-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockQRData = {
  BK001: {
    customerName: 'Luxury Resort Estates',
    location: 'Mountain Valley Setup',
    coordinatorName: 'Sarah Johnson',
    checkInTime: new Date().toLocaleTimeString(),
    status: 'Arrived' as const,
  },
  BK002: {
    customerName: 'Premium Wedding Events',
    location: 'Beachfront Garden',
    coordinatorName: 'Michael Chen',
    checkInTime: new Date().toLocaleTimeString(),
    status: 'Arrived' as const,
  },
}

export default function VerifyArrivalPage() {
  const [scannedCode, setScannedCode] = useState('')
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(true)

  const handleQRScan = (code: string) => {
    setScannedCode(code)
    const result = mockQRData[code as keyof typeof mockQRData]
    
    if (result) {
      setVerificationResult({ ...result, verified: true, bookingId: code })
      setIsScanning(false)
    } else {
      setVerificationResult({ verified: false, error: 'Invalid QR code' })
      setIsScanning(false)
    }
  }

  const handleManualEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (scannedCode.trim()) {
      handleQRScan(scannedCode.toUpperCase())
    }
  }

  const handleReset = () => {
    setScannedCode('')
    setVerificationResult(null)
    setIsScanning(true)
  }

  return (
    <OperatorLayout>
      <div className="space-y-6">
        <Link href="/operator/dashboard">
          <Button variant="ghost" size="sm" className="gap-2 text-operator-gray hover:text-operator-charcoal mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="max-w-2xl mx-auto">
          {!verificationResult ? (
            <div className="bg-operator-white rounded-xl border border-operator-gray-light p-8">
              <h1 className="text-3xl font-bold text-operator-charcoal mb-2">Verify Arrival</h1>
              <p className="text-operator-gray mb-8">Scan the QR code or enter the booking ID to verify arrival</p>

              {/* QR Scanner Placeholder */}
              <div className="bg-operator-sand-light rounded-xl border-2 border-dashed border-operator-gray-light p-12 text-center mb-8">
                <Camera className="h-16 w-16 text-operator-gray mx-auto mb-4 opacity-50" />
                <p className="text-operator-gray font-medium mb-2">QR Code Scanner</p>
                <p className="text-sm text-operator-gray">Position the QR code in the camera frame</p>
              </div>

              {/* Manual Entry Form */}
              <div>
                <label className="block text-sm font-medium text-operator-charcoal mb-3">
                  Or enter Booking ID manually
                </label>
                <form onSubmit={handleManualEntry} className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="e.g., BK001"
                    value={scannedCode}
                    onChange={(e) => setScannedCode(e.target.value)}
                    className="border-operator-gray-light focus:border-operator-gold focus:ring-operator-gold uppercase"
                    maxLength={10}
                  />
                  <Button
                    type="submit"
                    className="bg-operator-charcoal hover:bg-opacity-90 text-operator-white px-6"
                    disabled={!scannedCode.trim()}
                  >
                    Verify
                  </Button>
                </form>
                <p className="text-xs text-operator-gray mt-3">Try: BK001 or BK002</p>
              </div>
            </div>
          ) : verificationResult.verified ? (
            <div className="space-y-6">
              {/* Success Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border-2 border-emerald-200 p-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-emerald-900 text-center mb-2">Arrival Verified!</h2>
                <p className="text-emerald-700 text-center">Event coordinator has successfully checked in</p>
              </div>

              {/* Booking Details */}
              <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
                <h3 className="text-lg font-bold text-operator-charcoal mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start justify-between pb-4 border-b border-operator-gray-light">
                    <div>
                      <p className="text-sm text-operator-gray mb-1">Booking ID</p>
                      <p className="font-semibold text-operator-charcoal">{verificationResult.bookingId}</p>
                    </div>
                    <StatusBadge status={verificationResult.status} size="sm" />
                  </div>

                  <div>
                    <p className="text-sm text-operator-gray mb-1">Event</p>
                    <p className="font-semibold text-operator-charcoal">{verificationResult.customerName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-operator-gray mb-1">Location</p>
                    <p className="font-semibold text-operator-charcoal">{verificationResult.location}</p>
                  </div>

                  <div>
                    <p className="text-sm text-operator-gray mb-1">Coordinator</p>
                    <p className="font-semibold text-operator-charcoal">{verificationResult.coordinatorName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-operator-gray mb-1">Check-in Time</p>
                    <p className="font-semibold text-operator-charcoal">{verificationResult.checkInTime}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Link href={`/operator/booking/${verificationResult.bookingId}`} className="flex-1">
                  <Button className="w-full bg-operator-charcoal hover:bg-opacity-90 text-operator-white font-semibold">
                    View Booking Details
                  </Button>
                </Link>
                <Link href={`/operator/start-mission/${verificationResult.bookingId}`} className="flex-1">
                  <Button variant="outline" className="w-full border-operator-gray-light text-operator-charcoal">
                    Start Mission
                  </Button>
                </Link>
              </div>

              {/* Scan Another */}
              <Button
                onClick={handleReset}
                variant="ghost"
                className="w-full text-operator-gold hover:text-operator-charcoal"
              >
                Scan Another QR Code
              </Button>
            </div>
          ) : (
            <div className="bg-red-50 rounded-xl border-2 border-red-200 p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-red-900 text-center mb-2">Verification Failed</h2>
              <p className="text-red-700 text-center mb-8">{verificationResult.error}</p>
              <Button
                onClick={handleReset}
                className="w-full bg-operator-charcoal hover:bg-opacity-90 text-operator-white font-semibold"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </OperatorLayout>
  )
}
