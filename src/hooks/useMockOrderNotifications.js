// hooks/useMockOrderNotifications.js
'use client'
import { useEffect } from 'react'
import { notifyOrder } from '../utils/notifications'

const useMockOrderNotifications = () => {
  useEffect(() => {
    // Mock order data
    const mockOrders = [
      { id: 'ORD12345', total: 110.0 },
      { id: 'ORD12346', total: 69.99 },
      { id: 'ORD12347', total: 399.99 },
    ]

    let index = 0

    // Trigger notification for a different order every 3 seconds
    const interval = setInterval(() => {
      notifyOrder(mockOrders[index]) // Notify the current order
      index = (index + 1) % mockOrders.length // Cycle to the next order
    }, 3000) // 3 seconds interval

    // Cleanup on unmount
    return () => clearInterval(interval)
  }, [])
}

export default useMockOrderNotifications
