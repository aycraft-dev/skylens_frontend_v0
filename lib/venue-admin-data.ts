// TODO: replace with API call
// Mock data for Venue Admin Dashboard

export interface Venue {
  id: string
  name: string
  description: string
  address: string
  email: string
  phone: string
  latitude: number
  longitude: number
  photos: string[]
  operatingHours: Record<string, { open: string; close: string } | null>
  status: 'active' | 'maintenance' | 'disabled'
  takeoffPoints: Array<{
    id: string
    name: string
    lat: number
    lng: number
    notes: string
    active: boolean
  }>
}

export interface Package {
  id: string
  name: string
  description: string
  duration: number
  price: number
  currency: string
  videoCount: number
  photoCount: number
  dronePreset: string
  coverImage: string
  active: boolean
}

export interface Booking {
  id: string
  guestName: string
  guestEmail: string
  packageId: string
  dateTime: string
  status: 'pending' | 'confirmed' | 'captured' | 'edited' | 'delivered' | 'cancelled'
  paymentStatus: 'paid' | 'pending' | 'refunded'
  operator: string
  footageStatus: 'uploaded' | 'editing' | 'ready'
  deliveryEmail: string | null
  downloadLink: string | null
  notes: string
}

export interface Operator {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'off-duty' | 'suspended'
  bookingsThisMonth: number
  avgTurnaroundTime: number
  lastActive: string
  avgRating: number
}

export interface Customer {
  id: string
  name: string
  email: string
  country: string
  totalBookings: number
  totalSpent: number
  lastVisit: string
  avgRatingGiven: number
}

export interface Review {
  id: string
  customerId: string
  customerName: string
  packageId: string
  packageName: string
  rating: number
  text: string
  date: string
  reply?: string
  replyDate?: string
}

// Mock Venue
const mockVenue: Venue = {
  id: 'venue-1',
  name: 'Aurora Beach Resort',
  description: 'Luxury beachfront resort in Bali offering premium drone photography and videography services.',
  address: '123 Coastal Road, Seminyak, Bali 80361, Indonesia',
  email: 'admin@aurorabeach.com',
  phone: '+62 361 123 4567',
  latitude: -8.6844,
  longitude: 115.1697,
  photos: [
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
  ],
  operatingHours: {
    monday: { open: '06:00', close: '18:00' },
    tuesday: { open: '06:00', close: '18:00' },
    wednesday: { open: '06:00', close: '18:00' },
    thursday: { open: '06:00', close: '18:00' },
    friday: { open: '06:00', close: '18:00' },
    saturday: { open: '06:00', close: '20:00' },
    sunday: { open: '08:00', close: '18:00' },
  },
  status: 'active',
  takeoffPoints: [
    { id: 'point-1', name: 'Main Beach', lat: -8.6844, lng: 115.1697, notes: 'Primary launch site', active: true },
    { id: 'point-2', name: 'Resort Grounds', lat: -8.6850, lng: 115.1705, notes: 'Alternative launch site', active: true },
    { id: 'point-3', name: 'Cliff View', lat: -8.6835, lng: 115.1690, notes: 'Scenic overlook', active: true },
  ],
}

// Mock Packages
const mockPackages: Package[] = [
  {
    id: 'pkg-1',
    name: 'Sunset Cinematic',
    description: 'Cinematic 4K video of your sunset moments with AI-edited highlights',
    duration: 30,
    price: 299,
    currency: 'USD',
    videoCount: 1,
    photoCount: 50,
    dronePreset: 'cinematic-sunset',
    coverImage: '/api/placeholder/300/200',
    active: true,
  },
  {
    id: 'pkg-2',
    name: 'Aerial Portrait',
    description: 'Artistic aerial photography capturing your best angles',
    duration: 45,
    price: 199,
    currency: 'USD',
    videoCount: 0,
    photoCount: 100,
    dronePreset: 'portrait',
    coverImage: '/api/placeholder/300/200',
    active: true,
  },
  {
    id: 'pkg-3',
    name: 'Couple Story',
    description: 'Romantic video telling your love story from above',
    duration: 60,
    price: 449,
    currency: 'USD',
    videoCount: 2,
    photoCount: 150,
    dronePreset: 'couple-story',
    coverImage: '/api/placeholder/300/200',
    active: true,
  },
  {
    id: 'pkg-4',
    name: 'Adventure Reel',
    description: 'Action-packed video of your adventure activities',
    duration: 90,
    price: 599,
    currency: 'USD',
    videoCount: 3,
    photoCount: 200,
    dronePreset: 'adventure',
    coverImage: '/api/placeholder/300/200',
    active: true,
  },
]

// Mock Bookings
const mockBookings: Booking[] = [
  {
    id: 'bk-001',
    guestName: 'John Smith',
    guestEmail: 'john@example.com',
    packageId: 'pkg-1',
    dateTime: '2024-05-10T17:00:00',
    status: 'delivered',
    paymentStatus: 'paid',
    operator: 'op-1',
    footageStatus: 'ready',
    deliveryEmail: '2024-05-11T14:30:00',
    downloadLink: 'https://example.com/download/bk-001',
    notes: 'Client very satisfied',
  },
  {
    id: 'bk-002',
    guestName: 'Sarah Johnson',
    guestEmail: 'sarah@example.com',
    packageId: 'pkg-3',
    dateTime: '2024-05-12T15:00:00',
    status: 'edited',
    paymentStatus: 'paid',
    operator: 'op-2',
    footageStatus: 'editing',
    deliveryEmail: null,
    downloadLink: null,
    notes: 'Wedding highlights package',
  },
  {
    id: 'bk-003',
    guestName: 'Michael Chen',
    guestEmail: 'michael@example.com',
    packageId: 'pkg-2',
    dateTime: '2024-05-14T16:30:00',
    status: 'captured',
    paymentStatus: 'pending',
    operator: 'op-3',
    footageStatus: 'uploaded',
    deliveryEmail: null,
    downloadLink: null,
    notes: 'Corporate event photography',
  },
  {
    id: 'bk-004',
    guestName: 'Emma Davis',
    guestEmail: 'emma@example.com',
    packageId: 'pkg-1',
    dateTime: '2024-05-15T17:30:00',
    status: 'confirmed',
    paymentStatus: 'paid',
    operator: 'op-1',
    footageStatus: 'ready',
    deliveryEmail: null,
    downloadLink: null,
    notes: 'Honeymoon photos',
  },
  {
    id: 'bk-005',
    guestName: 'Robert Wilson',
    guestEmail: 'robert@example.com',
    packageId: 'pkg-4',
    dateTime: '2024-05-16T08:00:00',
    status: 'pending',
    paymentStatus: 'pending',
    operator: null,
    footageStatus: 'ready',
    deliveryEmail: null,
    downloadLink: null,
    notes: 'Adventure sports documentation',
  },
]

// Mock Operators
const mockOperators: Operator[] = [
  {
    id: 'op-1',
    name: 'Alex Reyes',
    email: 'alex@skylens.com',
    phone: '+62 812 3456 7890',
    status: 'active',
    bookingsThisMonth: 12,
    avgTurnaroundTime: 28,
    lastActive: '2024-05-14T18:00:00',
    avgRating: 4.8,
  },
  {
    id: 'op-2',
    name: 'Maria Santos',
    email: 'maria@skylens.com',
    phone: '+62 812 3456 7891',
    status: 'active',
    bookingsThisMonth: 8,
    avgTurnaroundTime: 35,
    lastActive: '2024-05-13T17:30:00',
    avgRating: 4.6,
  },
  {
    id: 'op-3',
    name: 'James Park',
    email: 'james@skylens.com',
    phone: '+62 812 3456 7892',
    status: 'off-duty',
    bookingsThisMonth: 5,
    avgTurnaroundTime: 42,
    lastActive: '2024-05-10T12:00:00',
    avgRating: 4.4,
  },
  {
    id: 'op-4',
    name: 'Lisa Kumar',
    email: 'lisa@skylens.com',
    phone: '+62 812 3456 7893',
    status: 'active',
    bookingsThisMonth: 10,
    avgTurnaroundTime: 31,
    lastActive: '2024-05-14T16:45:00',
    avgRating: 4.7,
  },
  {
    id: 'op-5',
    name: 'Carlos Mendez',
    email: 'carlos@skylens.com',
    phone: '+62 812 3456 7894',
    status: 'suspended',
    bookingsThisMonth: 0,
    avgTurnaroundTime: 45,
    lastActive: '2024-04-20T10:00:00',
    avgRating: 3.9,
  },
]

// Mock Customers
const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'John Smith',
    email: 'john@example.com',
    country: 'United States',
    totalBookings: 3,
    totalSpent: 897,
    lastVisit: '2024-05-10',
    avgRatingGiven: 4.7,
  },
  {
    id: 'cust-2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    country: 'Canada',
    totalBookings: 1,
    totalSpent: 449,
    lastVisit: '2024-05-12',
    avgRatingGiven: 5.0,
  },
  {
    id: 'cust-3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    country: 'Singapore',
    totalBookings: 5,
    totalSpent: 1595,
    lastVisit: '2024-05-14',
    avgRatingGiven: 4.6,
  },
  {
    id: 'cust-4',
    name: 'Emma Davis',
    email: 'emma@example.com',
    country: 'Australia',
    totalBookings: 2,
    totalSpent: 748,
    lastVisit: '2024-05-15',
    avgRatingGiven: 4.8,
  },
  {
    id: 'cust-5',
    name: 'Robert Wilson',
    email: 'robert@example.com',
    country: 'United Kingdom',
    totalBookings: 4,
    totalSpent: 1495,
    lastVisit: '2024-05-16',
    avgRatingGiven: 4.5,
  },
  {
    id: 'cust-6',
    name: 'Sophie Martin',
    email: 'sophie@example.com',
    country: 'France',
    totalBookings: 1,
    totalSpent: 299,
    lastVisit: '2024-05-08',
    avgRatingGiven: 4.9,
  },
  {
    id: 'cust-7',
    name: 'David Kim',
    email: 'david@example.com',
    country: 'South Korea',
    totalBookings: 6,
    totalSpent: 2096,
    lastVisit: '2024-05-09',
    avgRatingGiven: 4.7,
  },
  {
    id: 'cust-8',
    name: 'Anna Lopez',
    email: 'anna@example.com',
    country: 'Spain',
    totalBookings: 2,
    totalSpent: 648,
    lastVisit: '2024-05-11',
    avgRatingGiven: 5.0,
  },
]

// Mock Reviews
const mockReviews: Review[] = [
  {
    id: 'rev-1',
    customerId: 'cust-1',
    customerName: 'John Smith',
    packageId: 'pkg-1',
    packageName: 'Sunset Cinematic',
    rating: 5,
    text: 'Absolutely stunning aerial shots! The team was professional and the final video exceeded our expectations. Highly recommend!',
    date: '2024-05-10',
    reply: 'Thank you John! We loved working with you and are thrilled you enjoyed the sunset cinematic. Your energy made the shoot perfect!',
    replyDate: '2024-05-11',
  },
  {
    id: 'rev-2',
    customerId: 'cust-2',
    customerName: 'Sarah Johnson',
    packageId: 'pkg-3',
    packageName: 'Couple Story',
    rating: 5,
    text: 'Our wedding video is absolutely perfect. The drone footage captured our day beautifully. Worth every penny!',
    date: '2024-05-13',
    reply: 'Congratulations Sarah & partner! Thank you for letting us capture such a special day. These are the moments we live for!',
    replyDate: '2024-05-13',
  },
  {
    id: 'rev-3',
    customerId: 'cust-3',
    customerName: 'Michael Chen',
    packageId: 'pkg-2',
    packageName: 'Aerial Portrait',
    rating: 4,
    text: 'Great quality photos and very professional service. Only minor feedback on color grading preferences.',
    date: '2024-05-14',
  },
  {
    id: 'rev-4',
    customerId: 'cust-4',
    customerName: 'Emma Davis',
    packageId: 'pkg-1',
    packageName: 'Sunset Cinematic',
    rating: 5,
    text: 'Magical sunset footage! The editing was impeccable and delivery was quick. Best decision ever!',
    date: '2024-05-15',
    reply: 'Emma, thank you so much! Golden hour is always special, and you made it even better with your enthusiasm. Cheers!',
    replyDate: '2024-05-15',
  },
  {
    id: 'rev-5',
    customerId: 'cust-6',
    customerName: 'Sophie Martin',
    packageId: 'pkg-2',
    packageName: 'Aerial Portrait',
    rating: 5,
    text: 'Outstanding work! The attention to detail in the editing is remarkable. Très bien!',
    date: '2024-05-12',
    reply: 'Thank you Sophie! We appreciate the kind words and loved capturing the beauty from above!',
    replyDate: '2024-05-12',
  },
]

// API functions (to be replaced with real API calls)
export async function getVenue(): Promise<Venue> {
  return mockVenue
}

export async function getPackages(): Promise<Package[]> {
  return mockPackages
}

export async function getBookings(): Promise<Booking[]> {
  return mockBookings
}

export async function getOperators(): Promise<Operator[]> {
  return mockOperators
}

export async function getCustomers(): Promise<Customer[]> {
  return mockCustomers
}

export async function getReviews(): Promise<Review[]> {
  return mockReviews
}

export function getPackageById(id: string): Package | undefined {
  return mockPackages.find((pkg) => pkg.id === id)
}

export function getOperatorById(id: string): Operator | undefined {
  return mockOperators.find((op) => op.id === id)
}

export function getCustomerById(id: string): Customer | undefined {
  return mockCustomers.find((cust) => cust.id === id)
}

export function getBookingById(id: string): Booking | undefined {
  return mockBookings.find((bk) => bk.id === id)
}

// Dashboard statistics
export async function getDashboardStats() {
  const bookings = await getBookings()
  const customers = await getCustomers()
  const reviews = await getReviews()
  const packages = await getPackages()

  const todayBookings = bookings.filter((b) =>
    new Date(b.dateTime).toDateString() === new Date().toDateString()
  ).length
  
  const monthBookings = bookings.length
  
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === 'paid')
    .reduce((sum, b) => {
      const pkg = getPackageById(b.packageId)
      return sum + (pkg?.price || 0)
    }, 0)

  const topPackage = packages.reduce((max, pkg) => {
    const count = bookings.filter((b) => b.packageId === pkg.id).length
    return count > (max.count || 0) ? { ...pkg, count } : max
  })

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  const operatorUtilization = 75

  const deliveryTurnaround = 28

  return {
    todayBookings,
    monthBookings,
    totalRevenue,
    topPackage,
    avgRating,
    reviewCount: reviews.length,
    operatorUtilization,
    deliveryTurnaround,
  }
}
