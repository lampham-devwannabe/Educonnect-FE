import { useState, useEffect } from 'react'
export const useNotificationHooks = notificationOpen => {
  const [notificationData, setNotificationData] = useState([])

  const fetchNotification = async () => {
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
