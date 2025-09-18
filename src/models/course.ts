import type { Instructor } from './user'
import type { Category } from './category'

export interface Course {
  _id: string
  title: string
  price: number
  discount?: number
  thumbnail?: string
  courseBadge: string
  level: string
  totalSeat: number
  instructor: Instructor
  duration: string
  description: string
  categories: Category[]
}
