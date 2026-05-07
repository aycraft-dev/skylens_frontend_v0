'use client'

import React from 'react'
import { VenueAdminSidebar } from './sidebar'
import { VenueAdminTopBar } from './top-bar'
import { VenueAdminLayoutProvider } from './layout-context'

interface VenueAdminLayoutProps {
  children: React.ReactNode
  title: string
}

export function VenueAdminLayout({ children, title }: VenueAdminLayoutProps) {
  return (
    <VenueAdminLayoutProvider>
      <div className="flex h-screen bg-background text-foreground">
        <VenueAdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <VenueAdminTopBar title={title} />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </VenueAdminLayoutProvider>
  )
}
