export interface User {
  id: string
  name: string
  email: string
  image?: string
  token: string
  role: string
}

export interface Instructor extends User {
  profession: string
  expertise: string[]
}
