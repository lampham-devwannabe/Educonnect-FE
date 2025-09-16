import { useState, useEffect } from 'react'

interface Notification {
  // Add appropriate properties based on your data structure
  id: string
  title: string
  message: string
  date: string
  read: boolean
  image: ImageBitmap
  createdAt: string
  // Add any other properties your notifications have
}

export const useNotificationHooks = (notificationOpen: boolean) => {
  const [notificationData, setNotificationData] = useState<Notification[]>([])

  const fetchNotification = async (): Promise<void> => {
    try {
      const formData = new FormData()
      const res = await fetch('/api/notification/list', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      console.log('Notification data:', data)
      setNotificationData(data.notifications)
    } catch (error) {
      console.error('Error fetching notification data:', error)
    }
  }

  useEffect(() => {
    fetchNotification()
  }, [notificationOpen])

  return { notificationData, fetchNotification }
}
