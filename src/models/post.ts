import type { User } from './user'

export interface Post {
  _id: string
  title: string
  content: string
  image?: string[]
  user: User
  createdAt: string
  status?: string
  liked?: boolean
  totalLikes?: number
  totalComments?: number
  totalShares?: number
  bookmarked?: boolean
  comments?: string[]
  shares?: number
  userLiked?: boolean
}

export interface NewPost {
  title: string
  content: string
  image: File | null
  thumbnail: string | null
}
