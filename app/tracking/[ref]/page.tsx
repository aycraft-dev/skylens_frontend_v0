import { Navbar } from "@/components/skylens/navbar"
import { Footer } from "@/components/skylens/footer"
import { ActivityTracking } from "@/components/skylens/activity-tracking"

export default async function TrackingPage({
  params,
}: {
  params: Promise<{ ref: string }>
}) {
  const { ref } = await params
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ActivityTracking reference={ref} />
      <Footer />
    </main>
  )
}
