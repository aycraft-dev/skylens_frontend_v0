'use client'

import { cn } from '@/lib/utils'

type Status = 'Reserved' | 'Arrived' | 'Ready' | 'Flying' | 'Uploading' | 'Processing' | 'Delivered' | 'Completed' | 'Cancelled'

interface StatusBadgeProps {
  status: Status
  size?: 'sm' | 'md' | 'lg'
}

const statusStyles: Record<Status, { bg: string; text: string }> = {
  Reserved: { bg: 'bg-blue-50', text: 'text-blue-700' },
  Arrived: { bg: 'bg-cyan-50', text: 'text-cyan-700' },
  Ready: { bg: 'bg-amber-50', text: 'text-amber-700' },
  Flying: { bg: 'bg-purple-50', text: 'text-purple-700' },
  Uploading: { bg: 'bg-orange-50', text: 'text-orange-700' },
  Processing: { bg: 'bg-indigo-50', text: 'text-indigo-700' },
  Delivered: { bg: 'bg-green-50', text: 'text-green-700' },
  Completed: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  Cancelled: { bg: 'bg-red-50', text: 'text-red-700' },
}

const sizeStyles = {
  sm: 'text-xs px-2 py-1',
  md: 'text-sm px-3 py-1.5',
  lg: 'text-base px-4 py-2',
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const style = statusStyles[status]
  
  return (
    <span className={cn('inline-flex items-center font-medium rounded-full border border-current border-opacity-20', style.bg, style.text, sizeStyles[size])}>
      {status}
    </span>
  )
}
