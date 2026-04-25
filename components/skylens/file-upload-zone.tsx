'use client'

import { Upload, File, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void
  accept?: string
  maxFiles?: number
  maxSize?: number
}

export function FileUploadZone({ onFilesSelected, accept = 'video/*,image/*', maxFiles = 5, maxSize = 500 }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).slice(0, maxFiles - uploadedFiles.length)
    const validFiles = newFiles.filter(file => file.size <= maxSize * 1024 * 1024)
    
    setUploadedFiles(prev => [...prev, ...validFiles])
    onFilesSelected([...uploadedFiles, ...validFiles])
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
    onFilesSelected(newFiles)
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'rounded-xl border-2 border-dashed p-8 text-center transition cursor-pointer',
          isDragging ? 'border-operator-gold bg-operator-sand-light' : 'border-operator-gray-light bg-operator-white hover:bg-operator-sand-light'
        )}
      >
        <input
          type="file"
          id="file-input"
          multiple
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
          disabled={uploadedFiles.length >= maxFiles}
        />
        <label htmlFor="file-input" className="cursor-pointer block">
          <Upload className={cn('h-12 w-12 mx-auto mb-3', isDragging ? 'text-operator-gold' : 'text-operator-gray')} />
          <p className="font-semibold text-operator-charcoal mb-1">Drop files here or click to browse</p>
          <p className="text-sm text-operator-gray">Supported: MP4, MOV, PNG, JPG (Max {maxSize}MB each)</p>
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-operator-charcoal">
            Files selected ({uploadedFiles.length}/{maxFiles})
          </p>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-3 rounded-lg bg-operator-sand-light p-3">
                <File className="h-5 w-5 text-operator-charcoal flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-operator-charcoal truncate">{file.name}</p>
                  <p className="text-xs text-operator-gray">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-operator-gray hover:text-red-600 transition flex-shrink-0"
                  aria-label="Remove file"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
