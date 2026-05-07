'use client'

import { useEffect, useState } from 'react'
import { Save, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { VenueAdminLayout } from '@/components/venue-admin/layout'
import { getVenue, Venue } from '@/lib/venue-admin-data'

export default function MyVenuePage() {
  const [venue, setVenue] = useState<Venue | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<Venue>>({})

  useEffect(() => {
    async function loadVenue() {
      try {
        const venueData = await getVenue()
        setVenue(venueData)
        setFormData(venueData)
      } finally {
        setLoading(false)
      }
    }
    loadVenue()
  }, [])

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    // TODO: replace with API call
  }

  if (loading) {
    return <VenueAdminLayout title="My Venue">Loading...</VenueAdminLayout>
  }

  return (
    <VenueAdminLayout title="My Venue">
      <div className="space-y-6">
        {/* Basic Info Section */}
        <Card className="p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Basic Information</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="name" className="text-foreground">
                Venue Name
              </Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="mt-2 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground">
                Contact Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="mt-2 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-foreground">
                Contact Phone
              </Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="mt-2 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label htmlFor="status" className="text-foreground">
                Status
              </Label>
              <Select value={formData.status || 'active'} onValueChange={(v) => handleChange('status', v)}>
                <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe your venue..."
              className="mt-2 min-h-32 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </Card>

        {/* Location Section */}
        <Card className="p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Location</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <Label htmlFor="address" className="text-foreground">
                Address
              </Label>
              <Input
                id="address"
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="mt-2 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label htmlFor="latitude" className="text-foreground">
                Latitude
              </Label>
              <Input
                id="latitude"
                type="number"
                step="0.0001"
                value={formData.latitude || ''}
                onChange={(e) => handleChange('latitude', parseFloat(e.target.value))}
                className="mt-2 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label htmlFor="longitude" className="text-foreground">
                Longitude
              </Label>
              <Input
                id="longitude"
                type="number"
                step="0.0001"
                value={formData.longitude || ''}
                onChange={(e) => handleChange('longitude', parseFloat(e.target.value))}
                className="mt-2 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-white/5 border border-white/10 p-4">
            <p className="text-sm text-muted-foreground">
              Map preview — integrate Mapbox/Google Maps later
            </p>
          </div>
        </Card>

        {/* Takeoff Points Section */}
        <Card className="p-6 border-white/10 bg-card">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Drone Takeoff Points</h3>
            <Button
              size="sm"
              className="bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]"
            >
              Add Point
            </Button>
          </div>
          <div className="space-y-4">
            {formData.takeoffPoints?.map((point, idx) => (
              <div key={point.id} className="rounded-lg border border-white/10 p-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <Input
                    value={point.name}
                    placeholder="Point name"
                    className="bg-white/5 border-white/10 text-foreground"
                  />
                  <Input
                    type="number"
                    value={point.lat}
                    placeholder="Latitude"
                    className="bg-white/5 border-white/10 text-foreground"
                    step="0.0001"
                  />
                  <Input
                    type="number"
                    value={point.lng}
                    placeholder="Longitude"
                    className="bg-white/5 border-white/10 text-foreground"
                    step="0.0001"
                  />
                  <Button size="icon" variant="ghost" className="text-red-500">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <Input
                    value={point.notes}
                    placeholder="Notes"
                    className="flex-1 bg-white/5 border-white/10 text-foreground"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Active</span>
                    <Switch defaultChecked={point.active} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Operating Hours */}
        <Card className="p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Operating Hours</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(formData.operatingHours || {}).map(([day, hours]) => (
              <div key={day} className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                <span className="font-medium text-foreground capitalize">{day}</span>
                {hours ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={hours.open}
                      className="w-24 bg-white/10 border-white/10 text-foreground text-sm"
                    />
                    <span className="text-muted-foreground">—</span>
                    <Input
                      type="time"
                      value={hours.close}
                      className="w-24 bg-white/10 border-white/10 text-foreground text-sm"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Closed</span>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Photos Section */}
        <Card className="p-6 border-white/10 bg-card">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Gallery Photos</h3>
          <div className="rounded-lg border-2 border-dashed border-white/20 p-8 text-center">
            <p className="text-muted-foreground">
              Drag and drop photos here or click to browse (max 10 photos)
            </p>
            <Button variant="outline" className="mt-4 border-white/10">
              Select Files
            </Button>
          </div>
          {formData.photos && formData.photos.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-3 md:grid-cols-5">
              {formData.photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-square rounded-lg bg-white/5 border border-white/10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Photo {idx + 1}</span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-500/80 hover:bg-red-600 text-white h-6 w-6"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Save Bar */}
        <div className="sticky bottom-0 flex justify-end gap-3 bg-background pt-4 border-t border-white/10">
          <Button variant="outline" className="border-white/10">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="gap-2 bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </VenueAdminLayout>
  )
}
