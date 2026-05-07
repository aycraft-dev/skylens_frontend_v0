import { VenueAdminLayout } from '@/components/venue-admin/layout'
import { DashboardContent } from '@/components/venue-admin/dashboard-content'

export default function DashboardPage() {
  return (
    <VenueAdminLayout title="Dashboard">
      <DashboardContent />
    </VenueAdminLayout>
  )
}
