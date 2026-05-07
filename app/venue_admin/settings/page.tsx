'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { VenueAdminLayout } from '@/components/venue-admin/layout'

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    // TODO: API call
  }

  return (
    <VenueAdminLayout title="Settings">
      <div className="max-w-4xl">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 border-white/10">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-6 text-lg font-semibold text-foreground">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="John Doe"
                    className="mt-2 bg-white/5 border-white/10 text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john@venue.com"
                    className="mt-2 bg-white/5 border-white/10 text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    defaultValue="+62 361 123 4567"
                    className="mt-2 bg-white/5 border-white/10 text-foreground"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-6 text-lg font-semibold text-foreground">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current" className="text-foreground">
                    Current Password
                  </Label>
                  <Input
                    id="current"
                    type="password"
                    className="mt-2 bg-white/5 border-white/10"
                  />
                </div>
                <div>
                  <Label htmlFor="new" className="text-foreground">
                    New Password
                  </Label>
                  <Input
                    id="new"
                    type="password"
                    className="mt-2 bg-white/5 border-white/10"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm" className="text-foreground">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm"
                    type="password"
                    className="mt-2 bg-white/5 border-white/10"
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-2">
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
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-6 text-lg font-semibold text-foreground">Email Notifications</h3>
              <div className="space-y-4">
                {[
                  { label: 'New Booking', id: 'new-booking' },
                  { label: 'Booking Cancelled', id: 'booking-cancelled' },
                  { label: 'New Review', id: 'new-review' },
                  { label: 'Payout Processed', id: 'payout-processed' },
                ].map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between">
                    <Label htmlFor={notif.id} className="text-foreground cursor-pointer">
                      {notif.label}
                    </Label>
                    <Switch defaultChecked id={notif.id} />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-6 text-lg font-semibold text-foreground">In-App Notifications</h3>
              <div className="space-y-4">
                {[
                  { label: 'New Booking', id: 'in-app-booking' },
                  { label: 'Booking Status Updates', id: 'status-updates' },
                  { label: 'New Review', id: 'in-app-review' },
                  { label: 'System Updates', id: 'system-updates' },
                ].map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between">
                    <Label htmlFor={notif.id} className="text-foreground cursor-pointer">
                      {notif.label}
                    </Label>
                    <Switch defaultChecked id={notif.id} />
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex justify-end gap-2">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="gap-2 bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save Preferences'}
              </Button>
            </div>
          </TabsContent>

          {/* Payouts Tab */}
          <TabsContent value="payouts" className="space-y-6 mt-6">
            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-6 text-lg font-semibold text-foreground">Payment Method</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground">Bank Account (Stripe)</Label>
                  <div className="mt-2 rounded-lg bg-white/5 border border-white/10 p-4">
                    <p className="text-sm text-muted-foreground">Connected Bank Account</p>
                    <p className="mt-1 text-foreground">•••• •••• •••• 4242</p>
                  </div>
                </div>
                <Button variant="outline" className="border-white/10">
                  Update Payment Method
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-6 text-lg font-semibold text-foreground">Payout Schedule</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Payout Frequency</span>
                  <span className="text-muted-foreground">Weekly (Mondays)</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-foreground">Next Payout</span>
                  <span className="text-muted-foreground">May 20, 2024</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-6 text-lg font-semibold text-foreground">Recent Payouts</h3>
              <div className="space-y-3">
                {[
                  { date: 'May 13, 2024', amount: '$2,450.00' },
                  { date: 'May 6, 2024', amount: '$1,890.50' },
                  { date: 'Apr 29, 2024', amount: '$3,120.00' },
                ].map((payout, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                    <span className="text-muted-foreground">{payout.date}</span>
                    <span className="font-medium text-foreground">{payout.amount}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding" className="space-y-6 mt-6">
            <Card className="p-6 border-white/10 bg-card">
              <h3 className="mb-6 text-lg font-semibold text-foreground">Venue Branding</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="logo" className="text-foreground">
                    Venue Logo
                  </Label>
                  <div className="mt-2 rounded-lg border-2 border-dashed border-white/20 p-8 text-center">
                    <p className="text-muted-foreground">Upload your venue logo</p>
                    <Button variant="outline" className="mt-4 border-white/10">
                      Choose File
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="primary-color" className="text-foreground">
                    Primary Color
                  </Label>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="color"
                      defaultValue="#C9A961"
                      className="h-10 w-20 rounded border border-white/10 cursor-pointer"
                    />
                    <span className="text-sm text-muted-foreground">#C9A961</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="welcome" className="text-foreground">
                    Welcome Message
                  </Label>
                  <Textarea
                    id="welcome"
                    placeholder="Welcome to our venue booking system..."
                    defaultValue="Welcome to Aurora Beach Resort"
                    className="mt-2 min-h-24 bg-white/5 border-white/10 text-foreground"
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline" className="border-white/10">
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="gap-2 bg-[#C9A961] hover:bg-[#B8985B] text-[#0B1B3B]"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save Branding'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </VenueAdminLayout>
  )
}
