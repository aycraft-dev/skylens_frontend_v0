import { Navbar } from "@/components/skylens/navbar"
import { Footer } from "@/components/skylens/footer"
import { Checkout } from "@/components/skylens/checkout"

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Checkout />
      <Footer />
    </main>
  )
}
