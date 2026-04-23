"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { PackageCard } from "./package-card"
import { categories, packages } from "@/lib/skylens-data"
import { cn } from "@/lib/utils"

const filters = ["All", ...categories] as const
type Filter = (typeof filters)[number]

export function PackagesSection() {
  const [filter, setFilter] = useState<Filter>("All")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    return packages.filter((p) => {
      const matchesFilter = filter === "All" || p.category === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  return (
    <section id="packages" className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-gold">
              Our Services
            </div>
            <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-navy md:text-4xl">
              Packages built for every kind of shoot
            </h2>
          </div>
          <div className="relative w-full md:w-[420px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search packages..."
              className="h-12 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm placeholder:text-muted-foreground focus:border-navy focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((f) => {
            const count =
              f === "All"
                ? packages.length
                : packages.filter((p) => p.category === f).length
            const active = filter === f
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-navy text-navy-foreground"
                    : "bg-light text-muted-foreground hover:bg-surface hover:text-foreground",
                )}
              >
                {f}
                <span
                  className={cn(
                    "rounded-full px-1.5 text-xs",
                    active ? "bg-white/15 text-white" : "bg-background text-foreground/60",
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-16 text-center">
            <div className="text-lg font-semibold text-navy">No packages match your search</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different keyword or clear the filters.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
