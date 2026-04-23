import { Navbar } from "@/components/skylens/navbar"
import { Footer } from "@/components/skylens/footer"
import { Payment } from "@/components/skylens/payment"

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Payment />
      <Footer />
    </main>
  )
}
