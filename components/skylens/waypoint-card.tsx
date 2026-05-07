'use client'

import { MapPin, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WaypointCardProps {
  number: number
  name: string
  description: string
  coordinates: string
  altitude: string
  completed?: boolean
  active?: boolean
}

export function WaypointCard({ number, name, description, coordinates, altitude, completed = false, active = false }: WaypointCardProps) {
  return (
    <div className={cn('rounded-lg border p-4 transition', active ? 'border-operator-gold bg-operator-sand-light' : 'border-operator-gray-light bg-operator-white', completed && 'opacity-60')}>
      <div className="flex items-start gap-4">
        <div className={cn('flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 font-semibold text-sm', active ? 'bg-operator-gold text-operator-charcoal' : completed ? 'bg-emerald-500 text-white' : 'bg-operator-gray-light text-operator-gray')}>
          {completed ? <Check className="h-4 w-4" /> : number}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-operator-charcoal">{name}</h4>
          <p className="text-sm text-operator-gray mt-1">{description}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1 text-operator-gray">
              <MapPin className="h-3 w-3" />
              <span>{coordinates}</span>
            </div>
            <div className="text-operator-gray">Alt: {altitude}m</div>
          </div>
        </div>
      </div>
    </div>
  )
}
