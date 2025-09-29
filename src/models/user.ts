export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  image?: string
  phone?: string
  gender?: string
  about?: string
  country?: string
  languages?: string[]
  certificates?: string[]
  hourlyRate?: number
  token?: string
  role?: string
  profession?: string
  expertise?: string[]
}

export interface Service {
  name: string
}

export interface Package {
  title: string
  price: number
  short_description: string
  services: string[]
}

export interface Enrollment {
  _id: string
  mentor: User
  user: User
  package: Package
  startDate: string
  endDate: string
}
