import type { Metadata } from 'next'
import { VenueAdminLayout } from '@/components/venue-admin/layout'

export const metadata: Metadata = {
  title: 'Venue Admin Dashboard — Sky Memory',
  description: 'Manage your drone tourism operations with Sky Memory',
}

export default function VenueAdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
