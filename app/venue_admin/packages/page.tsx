'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { VenueAdminLayout } from '@/components/venue-admin/layout'
import { getPackages, Package } from '@/lib/venue-admin-data'
import { EmptyState } from '@/components/venue-admin/shared-components'

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Package>>({})

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await getPackages()
        setPackages(data)
      } finally {
        setLoading(false)
      }
    }
    loadPackages()
  }, [])

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === 'all' || (filter === 'active' && pkg.active) || (filter === 'inactive' && !pkg.active)
    return matchesSearch && matchesFilter
  })

  const handleOpenDialog = (pkg?: Package) => {
    if (pkg) {
      setFormData(pkg)
      setEditingId(pkg.id)
    } else {
      setFormData({})
      setEditingId(null)
    }
    setIsDialogOpen(true)
  }

  const handleSavePackage = () => {
    // TODO: replace with API call
    setIsDialogOpen(false)
    setFormData({})
    setEditingId(null)
  }

  if (loading) {
    return <VenueAdminLayout title="Packages">Loading...</VenueAdminLayout>
  }

  return (
    <VenueAdminLayout title="Packages">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-foreground"
            />
          </div>

          <div className="flex gap-2">
            <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
              <SelectTrigger className="w-32 bg-white/5 border-white/10 text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => handleOpenDialog()}
                  className="gap-2 bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]"
                >
                  <Plus className="h-4 w-4" />
                  Create Package
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#111827] border-white/10 text-foreground max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingId ? 'Edit Package' : 'Create New Package'}</DialogTitle>
                  <DialogDescription>
                    {editingId ? 'Update package details' : 'Add a new drone photography package'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Package Name</Label>
                    <Input
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Sunset Cinematic"
                      className="mt-1 bg-white/5 border-white/10"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the package..."
                      className="mt-1 bg-white/5 border-white/10 min-h-20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Duration (min)</Label>
                      <Input
                        type="number"
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                        className="mt-1 bg-white/5 border-white/10"
                      />
                    </div>
                    <div>
                      <Label>Price ($)</Label>
                      <Input
                        type="number"
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                        className="mt-1 bg-white/5 border-white/10"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Videos</Label>
                      <Input
                        type="number"
                        value={formData.videoCount || ''}
                        onChange={(e) => setFormData({ ...formData, videoCount: parseInt(e.target.value) })}
                        className="mt-1 bg-white/5 border-white/10"
                      />
                    </div>
                    <div>
                      <Label>Photos</Label>
                      <Input
                        type="number"
                        value={formData.photoCount || ''}
                        onChange={(e) => setFormData({ ...formData, photoCount: parseInt(e.target.value) })}
                        className="mt-1 bg-white/5 border-white/10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Drone Preset</Label>
                    <Select value={formData.dronePreset || ''} onValueChange={(v) => setFormData({ ...formData, dronePreset: v })}>
                      <SelectTrigger className="mt-1 bg-white/5 border-white/10">
                        <SelectValue placeholder="Select preset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cinematic-sunset">Cinematic Sunset</SelectItem>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="couple-story">Couple Story</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSavePackage} className="w-full bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]">
                    {editingId ? 'Update Package' : 'Create Package'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length === 0 ? (
          <EmptyState
            title="No packages found"
            description="Create your first package to get started with drone tours"
            action={{
              label: 'Create Package',
              onClick: () => handleOpenDialog(),
            }}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden border-white/10 bg-card">
                <div className="aspect-video bg-white/5 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Cover Image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{pkg.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {pkg.description}
                      </p>
                    </div>
                    <Badge className={pkg.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}>
                      {pkg.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration</span>
                      <p className="font-medium text-foreground">{pkg.duration} min</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price</span>
                      <p className="font-medium text-foreground">${pkg.price}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Videos</span>
                      <p className="font-medium text-foreground">{pkg.videoCount}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Photos</span>
                      <p className="font-medium text-foreground">{pkg.photoCount}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-white/10"
                      onClick={() => handleOpenDialog(pkg)}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </VenueAdminLayout>
  )
}
