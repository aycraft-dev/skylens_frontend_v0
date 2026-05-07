'use client'

import React, { createContext, useContext, useState } from 'react'

interface VenueAdminLayoutContextType {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const VenueAdminLayoutContext = createContext<VenueAdminLayoutContextType | undefined>(undefined)

export function VenueAdminLayoutProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <VenueAdminLayoutContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </VenueAdminLayoutContext.Provider>
  )
}

export function useVenueAdminLayout() {
  const context = useContext(VenueAdminLayoutContext)
  if (!context) {
    throw new Error('useVenueAdminLayout must be used within VenueAdminLayoutProvider')
  }
  return context
}
