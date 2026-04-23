export type Category =
  | "Aerial Photography"
  | "Mapping & Survey"
  | "Promotional Video"
  | "Monitoring"

export type Package = {
  id: string
  name: string
  category: Category
  duration: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  shortDescription: string
}

export const packages: Package[] = [
  {
    id: "wedding-drone-coverage",
    name: "Wedding Drone Coverage",
    category: "Aerial Photography",
    duration: "Full Day",
    price: 4500000,
    rating: 4.9,
    reviewCount: 28,
    shortDescription:
      "Cinematic aerial coverage of your ceremony, reception, and venue with two licensed pilots.",
  },
  {
    id: "land-survey-mapping",
    name: "Land Survey Drone Mapping",
    category: "Mapping & Survey",
    duration: "2–3 Days",
    price: 8500000,
    rating: 4.8,
    reviewCount: 15,
    shortDescription:
      "High-precision orthomosaic, contour, and 3D terrain maps for developers, architects, and surveyors.",
  },
  {
    id: "villa-promotion-video",
    name: "Villa Promotion Aerial Video",
    category: "Promotional Video",
    duration: "Half Day",
    price: 6000000,
    originalPrice: 7500000,
    rating: 5.0,
    reviewCount: 42,
    shortDescription:
      "Polished 60–90 second promotional reel that shows off your villa from every angle.",
  },
  {
    id: "construction-monitoring",
    name: "Construction Progress Monitoring",
    category: "Monitoring",
    duration: "Monthly",
    price: 3500000,
    rating: 4.7,
    reviewCount: 9,
    shortDescription:
      "Monthly aerial progress reports with side-by-side comparisons for construction sites.",
  },
  {
    id: "event-documentation",
    name: "Event Drone Documentation",
    category: "Aerial Photography",
    duration: "4 Hours",
    price: 2500000,
    rating: 4.9,
    reviewCount: 33,
    shortDescription:
      "Aerial coverage for concerts, festivals, launches, and gatherings — delivered within 24 hours.",
  },
]

export const categories: Category[] = [
  "Aerial Photography",
  "Mapping & Survey",
  "Promotional Video",
  "Monitoring",
]

export function getPackage(id: string) {
  return packages.find((p) => p.id === id)
}

export type BookingStatus =
  | "Drone Flying"
  | "Completed"
  | "Confirmed"
  | "Pending Payment"
  | "Cancelled"

export type PaymentStatus = "Paid" | "Awaiting" | "Refunded"

export type Booking = {
  reference: string
  packageId: string
  packageName: string
  category: Category
  customer: string
  date: string
  location: string
  total: number
  stepsCompleted: number
  totalSteps: number
  currentStep: string
  status: BookingStatus
  payment: PaymentStatus
}

export const bookings: Booking[] = [
  {
    reference: "SKY-20250615-A7X9K",
    packageId: "wedding-drone-coverage",
    packageName: "Wedding Drone Coverage",
    category: "Aerial Photography",
    customer: "Ayu Putri",
    date: "15 Jun 2025",
    location: "Seminyak, Bali",
    total: 4500000,
    stepsCompleted: 5,
    totalSteps: 8,
    currentStep: "Drone Flying",
    status: "Drone Flying",
    payment: "Paid",
  },
  {
    reference: "SKY-20250520-B3K2M",
    packageId: "land-survey-mapping",
    packageName: "Land Survey Drone Mapping",
    category: "Mapping & Survey",
    customer: "Budi Santoso",
    date: "20 May 2025",
    location: "Tabanan, Bali",
    total: 8500000,
    stepsCompleted: 8,
    totalSteps: 8,
    currentStep: "Completed",
    status: "Completed",
    payment: "Paid",
  },
  {
    reference: "SKY-20250702-C9P4R",
    packageId: "event-documentation",
    packageName: "Event Drone Documentation",
    category: "Aerial Photography",
    customer: "Ni Wayan Sri",
    date: "2 Jul 2025",
    location: "Kuta, Bali",
    total: 2500000,
    stepsCompleted: 3,
    totalSteps: 8,
    currentStep: "Confirmed",
    status: "Confirmed",
    payment: "Paid",
  },
  {
    reference: "SKY-20250410-D1X7W",
    packageId: "villa-promotion-video",
    packageName: "Villa Promotion Aerial Video",
    category: "Promotional Video",
    customer: "Made Ari",
    date: "10 Apr 2025",
    location: "Canggu, Bali",
    total: 6000000,
    stepsCompleted: 1,
    totalSteps: 8,
    currentStep: "Pending Payment",
    status: "Pending Payment",
    payment: "Awaiting",
  },
  {
    reference: "SKY-20250301-E5Q2L",
    packageId: "construction-monitoring",
    packageName: "Construction Progress Monitoring",
    category: "Monitoring",
    customer: "Komang Dewi",
    date: "1 Mar 2025",
    location: "Denpasar, Bali",
    total: 3500000,
    stepsCompleted: 2,
    totalSteps: 8,
    currentStep: "Cancelled",
    status: "Cancelled",
    payment: "Refunded",
  },
  {
    reference: "SKY-20250818-F2M8N",
    packageId: "event-documentation",
    packageName: "Event Drone Documentation",
    category: "Aerial Photography",
    customer: "Putu Raka",
    date: "18 Aug 2025",
    location: "Ubud, Bali",
    total: 2500000,
    stepsCompleted: 3,
    totalSteps: 8,
    currentStep: "Confirmed",
    status: "Confirmed",
    payment: "Paid",
  },
]

export function formatIDR(amount: number) {
  return `Rp ${amount.toLocaleString("id-ID").replace(/,/g, ".")}`
}
