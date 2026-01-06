export interface Project {
  title: string
  slug: string
  excerpt: string
  category: 'education' | 'women' | 'water' | 'culture' | 'health'
  status: 'planned' | 'active' | 'completed'
  location?: string
  goalAmount: number
  raisedAmount?: number
  featured?: boolean
  tags?: string[]
  coverImage?: string
  gallery?: string[]
  date: string
  body?: any
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface DonationForm {
  amount: number
  frequency: 'one-time' | 'monthly'
  projectSlug?: string
  dedication?: string
  email?: string
  name?: string
}
