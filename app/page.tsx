import { Navbar } from "@/components/skylens/navbar"
import { Footer } from "@/components/skylens/footer"
import { HeroSection } from "@/components/skylens/hero-section"
import { PackagesSection } from "@/components/skylens/packages-section"
import { WhyChooseUs } from "@/components/skylens/why-choose-us"
import { CtaBanner } from "@/components/skylens/cta-banner"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PackagesSection />
      <WhyChooseUs />
      <CtaBanner />
      <Footer />
    </main>
  )
}
