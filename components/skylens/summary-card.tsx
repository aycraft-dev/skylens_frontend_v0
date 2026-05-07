'use client'

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SummaryCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  iconBg?: string
  iconColor?: string
}

export function SummaryCard({ label, value, icon: Icon, iconBg = 'bg-operator-sand-light', iconColor = 'text-operator-charcoal' }: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-operator-gray-light bg-operator-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="text-sm font-medium text-operator-gray">{label}</div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', iconBg)}>
          <Icon className={cn('h-6 w-6', iconColor)} />
        </div>
      </div>
      <div className="mt-4 text-3xl font-bold text-operator-charcoal">{value}</div>
    </div>
  )
}
