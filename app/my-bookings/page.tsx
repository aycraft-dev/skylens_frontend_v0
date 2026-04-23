import { Navbar } from "@/components/skylens/navbar"
import { Footer } from "@/components/skylens/footer"
import { MyBookings } from "@/components/skylens/my-bookings"

export default function MyBookingsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <MyBookings />
      <Footer />
    </main>
  )
}
