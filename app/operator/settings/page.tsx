'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Save, Lock, Bell, Shield, HardDrive, LogOut, Mail, Phone, MapPin } from 'lucide-react'
import { OperatorLayout } from '@/components/skylens/operator-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Operator',
    email: 'john.operator@skymemory.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  })

  const [notifications, setNotifications] = useState({
    missionReminders: true,
    uploadNotifications: true,
    weeklyReport: true,
    systemAlerts: true,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    shareStats: true,
    twoFactorEnabled: true,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Settings saved successfully!')
  }

  return (
    <OperatorLayout title="Settings">
      <div className="space-y-6">
        <Link href="/operator/dashboard">
          <Button variant="ghost" size="sm" className="gap-2 text-operator-gray hover:text-operator-charcoal mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-operator-white rounded-xl border border-operator-gray-light p-4 space-y-2">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-operator-sand-light text-operator-charcoal font-medium">
                Profile Settings
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-operator-sand-light text-operator-gray font-medium transition">
                Notifications
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-operator-sand-light text-operator-gray font-medium transition">
                Privacy & Security
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-operator-sand-light text-operator-gray font-medium transition">
                Device & Storage
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Section */}
            <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
              <h2 className="text-2xl font-bold text-operator-charcoal mb-6">Profile Settings</h2>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-operator-charcoal mb-2">First Name</label>
                    <Input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleProfileChange('firstName', e.target.value)}
                      className="border-operator-gray-light focus:border-operator-gold focus:ring-operator-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-operator-charcoal mb-2">Last Name</label>
                    <Input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleProfileChange('lastName', e.target.value)}
                      className="border-operator-gray-light focus:border-operator-gold focus:ring-operator-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-operator-charcoal mb-2 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="border-operator-gray-light focus:border-operator-gold focus:ring-operator-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-operator-charcoal mb-2 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    className="border-operator-gray-light focus:border-operator-gold focus:ring-operator-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-operator-charcoal mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </label>
                  <Input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                    className="border-operator-gray-light focus:border-operator-gold focus:ring-operator-gold"
                  />
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
              <h2 className="text-2xl font-bold text-operator-charcoal mb-6 flex items-center gap-2">
                <Bell className="h-6 w-6" />
                Notification Preferences
              </h2>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-operator-sand-light hover:bg-opacity-75 transition">
                    <label className="cursor-pointer flex-1">
                      <p className="font-medium text-operator-charcoal capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-xs text-operator-gray mt-1">
                        {key === 'missionReminders' && 'Remind me before scheduled missions'}
                        {key === 'uploadNotifications' && 'Notify when uploads are complete'}
                        {key === 'weeklyReport' && 'Send weekly mission summary'}
                        {key === 'systemAlerts' && 'Critical system notifications'}
                      </p>
                    </label>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy & Security Section */}
            <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
              <h2 className="text-2xl font-bold text-operator-charcoal mb-6 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Privacy & Security
              </h2>

              <div className="space-y-4 mb-6">
                {Object.entries(privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-operator-sand-light hover:bg-opacity-75 transition">
                    <label className="cursor-pointer flex-1">
                      <p className="font-medium text-operator-charcoal capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-xs text-operator-gray mt-1">
                        {key === 'profilePublic' && 'Make your profile visible to other operators'}
                        {key === 'shareStats' && 'Allow sharing of mission statistics'}
                        {key === 'twoFactorEnabled' && 'Secure your account with two-factor authentication'}
                      </p>
                    </label>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setPrivacy(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              {/* Password Section */}
              <div className="border-t border-operator-gray-light pt-6">
                <h3 className="text-lg font-bold text-operator-charcoal mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-operator-charcoal mb-2">Current Password</label>
                    <Input type="password" placeholder="••••••••" className="border-operator-gray-light focus:border-operator-gold focus:ring-operator-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-operator-charcoal mb-2">New Password</label>
                    <Input type="password" placeholder="••••••••" className="border-operator-gray-light focus:border-operator-gold focus:ring-operator-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-operator-charcoal mb-2">Confirm Password</label>
                    <Input type="password" placeholder="••••••••" className="border-operator-gray-light focus:border-operator-gold focus:ring-operator-gold" />
                  </div>
                  <Button variant="outline" className="border-operator-gray-light text-operator-charcoal">
                    Update Password
                  </Button>
                </div>
              </div>
            </div>

            {/* Storage & Device Section */}
            <div className="bg-operator-white rounded-xl border border-operator-gray-light p-6">
              <h2 className="text-2xl font-bold text-operator-charcoal mb-6 flex items-center gap-2">
                <HardDrive className="h-6 w-6" />
                Storage & Device
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-operator-sand-light">
                  <p className="text-sm text-operator-gray mb-2">Cloud Storage Used</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="w-full bg-operator-gray-light rounded-full h-3 overflow-hidden">
                        <div className="bg-operator-gold h-full" style={{ width: '65%' }} />
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-operator-charcoal">650 GB / 1 TB</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="border-operator-gray-light text-operator-charcoal">
                    Clear Cache
                  </Button>
                  <Button variant="outline" className="border-operator-gray-light text-operator-charcoal">
                    Manage Backups
                  </Button>
                </div>
              </div>
            </div>

            {/* Logout Section */}
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-operator-charcoal hover:bg-opacity-90 text-operator-white font-semibold py-3 h-auto gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 font-semibold py-3 h-auto gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </OperatorLayout>
  )
}
