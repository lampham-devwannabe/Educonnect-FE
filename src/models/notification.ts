export interface Notification {
  _id: string
  title: string
  message: string
  type: string
  isRead: boolean
  createdAt: string
  actionLink?: string
  imageUrl?: string
}
