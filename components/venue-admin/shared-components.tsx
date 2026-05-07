'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

export function StatusBadge({
  status,
}: {
  status: 'pending' | 'confirmed' | 'captured' | 'edited' | 'delivered' | 'cancelled'
}) {
  const statusConfig = {
    pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800' },
    confirmed: { label: 'Confirmed', className: 'bg-blue-100 text-blue-800' },
    captured: { label: 'Captured', className: 'bg-purple-100 text-purple-800' },
    edited: { label: 'Edited', className: 'bg-indigo-100 text-indigo-800' },
    delivered: { label: 'Delivered', className: 'bg-emerald-100 text-emerald-800' },
    cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
  }

  const config = statusConfig[status]

  return <Badge className={cn('font-medium', config.className)}>{config.label}</Badge>
}

export function PaymentStatusBadge({
  status,
}: {
  status: 'paid' | 'pending' | 'refunded'
}) {
  const statusConfig = {
    paid: { label: 'Paid', className: 'bg-emerald-100 text-emerald-800' },
    pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800' },
    refunded: { label: 'Refunded', className: 'bg-red-100 text-red-800' },
  }

  const config = statusConfig[status]

  return <Badge className={cn('font-medium', config.className)}>{config.label}</Badge>
}

export function OperatorStatusBadge({
  status,
}: {
  status: 'active' | 'off-duty' | 'suspended'
}) {
  const statusConfig = {
    active: { label: 'Active', className: 'bg-emerald-100 text-emerald-800' },
    'off-duty': { label: 'Off-duty', className: 'bg-amber-100 text-amber-800' },
    suspended: { label: 'Suspended', className: 'bg-red-100 text-red-800' },
  }

  const config = statusConfig[status]

  return <Badge className={cn('font-medium', config.className)}>{config.label}</Badge>
}

interface KpiCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  delta?: string
  trend?: 'up' | 'down'
  subtitle?: string
}

export function KpiCard({ title, value, icon: Icon, delta, trend, subtitle }: KpiCardProps) {
  return (
    <Card className="p-6 border-white/10 bg-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
          {delta && (
            <p
              className={cn(
                'mt-2 text-sm font-medium',
                trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              )}
            >
              {trend === 'up' ? '↑' : '↓'} {delta}
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#C9A961]/20">
          <Icon className="h-6 w-6 text-[#C9A961]" />
        </div>
      </div>
    </Card>
  )
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/10 px-6 py-12">
      <p className="text-lg font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 rounded-lg bg-[#C9A961] px-4 py-2 text-sm font-medium text-[#0B1B3B] hover:bg-[#B8985B] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export function Skeleton() {
  return <div className="animate-pulse rounded-lg bg-white/10 h-12" />
}
