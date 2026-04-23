import { ShieldCheck, Clock, Camera, Map } from "lucide-react"

const pillars = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    desc: "DGCA certified pilots, fully insured for every flight.",
  },
  {
    icon: Clock,
    title: "Same-Day Delivery",
    desc: "Rush edits delivered within 24 hours of your shoot.",
  },
  {
    icon: Camera,
    title: "4K Resolution",
    desc: "Latest DJI drones, RAW footage always included.",
  },
  {
    icon: Map,
    title: "All Bali Coverage",
    desc: "We fly anywhere in Bali, Lombok, and the Nusa islands.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-wider text-gold">
            Why SkyLens
          </div>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Precision, polish, and peace of mind
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-navy">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
