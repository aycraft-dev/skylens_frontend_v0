import { notFound } from "next/navigation"
import { Navbar } from "@/components/skylens/navbar"
import { Footer } from "@/components/skylens/footer"
import { PackageDetail } from "@/components/skylens/package-detail"
import { getPackage, packages } from "@/lib/skylens-data"

export function generateStaticParams() {
  return packages.map((p) => ({ id: p.id }))
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const pkg = getPackage(id)
  if (!pkg) return notFound()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PackageDetail pkg={pkg} />
      <Footer />
    </main>
  )
}
