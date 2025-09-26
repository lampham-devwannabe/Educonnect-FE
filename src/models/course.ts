import type { User } from './user'
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
  instructor: User
  duration: string
  description: string
  categories: Category[]
}

export interface EnrolledCourse {
  id: Course
  progress: number
  completed: boolean
  enrollmentDate: string
}
