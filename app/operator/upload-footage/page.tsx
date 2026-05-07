'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react'
import { OperatorLayout } from '@/components/skylens/operator-layout'
import { FileUploadZone } from '@/components/skylens/file-upload-zone'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function UploadFootagePage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [missionNotes, setMissionNotes] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files)
  }

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      alert('Please select at least one file to upload')
      return
    }

    setIsUploading(true)
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsUploading(false)
    setUploadComplete(true)
  }

  if (uploadComplete) {
    return (
      <OperatorLayout>
        <div className="max-w-2xl mx-auto py-12">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-operator-charcoal mb-2">Upload Complete</h1>
            <p className="text-operator-gray text-lg mb-8">Your footage has been successfully uploaded and is being processed</p>

            <div className="bg-operator-sand-light rounded-xl border border-operator-gray-light p-8 mb-8">
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="text-sm text-operator-gray mb-2">Files Uploaded</p>
                  <p className="text-3xl font-bold text-operator-charcoal">{uploadedFiles.length}</p>
                </div>
                <div>
                  <p className="text-sm text-operator-gray mb-2">Total Size</p>
                  <p className="text-3xl font-bold text-operator-charcoal">
                    {(uploadedFiles.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
                <div>
                  <p className="text-sm text-operator-gray mb-2">Processing Time</p>
                  <p className="text-3xl font-bold text-operator-charcoal">~2 hrs</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-operator-charcoal">Files received and validated</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="text-operator-charcoal">Processing started</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-slate-300" />
                  <span className="text-operator-gray">Delivery pending</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Link href="/operator/dashboard">
                <Button className="bg-operator-charcoal hover:bg-opacity-90 text-operator-white">
                  Back to Dashboard
                </Button>
              </Link>
              <Link href="/operator/mission-history">
                <Button variant="outline" className="border-operator-gray-light text-operator-charcoal">
                  View Mission History
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </OperatorLayout>
    )
  }

  return (
    <OperatorLayout title="Upload Footage">
      <div className="space-y-6">
        <Link href="/operator/dashboard">
          <Button variant="ghost" size="sm" className="gap-2 text-operator-gray hover:text-operator-charcoal mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mission Info Box */}
            <div className="bg-operator-sand-light rounded-xl border border-operator-gray-light p-6">
              <h3 className="text-lg font-bold text-operator-charcoal mb-4">Mission Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-operator-gray mb-1">Mission ID</p>
                  <p className="font-semibold text-operator-charcoal">BK001</p>
                </div>
                <div>
                  <p className="text-xs text-operator-gray mb-1">Duration</p>
                  <p className="font-semibold text-operator-charcoal">45 min</p>
                </div>
                <div>
                  <p className="text-xs text-operator-gray mb-1">Status</p>
                  <p className="font-semibold text-emerald-600">Completed</p>
                </div>
              </div>
            </div>

            {/* File Upload Zone */}
            <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
              <h2 className="text-xl font-bold text-operator-charcoal mb-4">Upload Footage</h2>
              <FileUploadZone onFilesSelected={handleFilesSelected} />
            </div>

            {/* Mission Notes */}
            <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
              <h2 className="text-xl font-bold text-operator-charcoal mb-4">Mission Notes</h2>
              <textarea
                placeholder="Add any notes about the mission, weather conditions, special captures, or issues encountered..."
                value={missionNotes}
                onChange={(e) => setMissionNotes(e.target.value)}
                className="w-full border border-operator-gray-light rounded-lg p-4 focus:outline-none focus:border-operator-gold focus:ring-2 focus:ring-operator-gold/20 resize-none h-24"
              />
              <p className="text-xs text-operator-gray mt-2">Optional: Add any additional details about this mission</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upload Summary */}
            <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
              <h3 className="text-lg font-bold text-operator-charcoal mb-4">Upload Summary</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-operator-gray mb-1">Files Selected</p>
                  <p className="text-2xl font-bold text-operator-charcoal">{uploadedFiles.length}</p>
                </div>
                <div>
                  <p className="text-operator-gray mb-1">Total Size</p>
                  <p className="text-lg font-semibold text-operator-charcoal">
                    {uploadedFiles.length > 0 
                      ? `${(uploadedFiles.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(1)} MB`
                      : '0 MB'}
                  </p>
                </div>
                <div>
                  <p className="text-operator-gray mb-1">Processing Time</p>
                  <p className="font-semibold text-operator-charcoal">~2 hours</p>
                </div>
              </div>
            </div>

            {/* Supported Formats */}
            <div className="bg-operator-sand-light rounded-xl border border-operator-gray-light p-6">
              <h3 className="text-lg font-bold text-operator-charcoal mb-3">Supported Formats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-operator-gold">•</span>
                  <span className="text-operator-charcoal">MP4 (H.264)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-operator-gold">•</span>
                  <span className="text-operator-charcoal">MOV (ProRes)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-operator-gold">•</span>
                  <span className="text-operator-charcoal">PNG/JPG (RAW)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-operator-gold">•</span>
                  <span className="text-operator-charcoal">WebP (Stills)</span>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <div className="flex gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <h3 className="font-bold text-blue-900">Requirements</h3>
              </div>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Max 500 MB per file</li>
                <li>Up to 5 files per mission</li>
                <li>Valid video/image formats only</li>
                <li>Metadata must be preserved</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleUpload}
                disabled={uploadedFiles.length === 0 || isUploading}
                className="w-full bg-operator-charcoal hover:bg-opacity-90 text-operator-white font-semibold py-3 h-auto"
              >
                {isUploading ? 'Uploading...' : 'Upload Footage'}
              </Button>
              <Link href="/operator/dashboard" className="block">
                <Button variant="outline" className="w-full border-operator-gray-light text-operator-charcoal">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </OperatorLayout>
  )
}
