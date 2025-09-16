// hooks/useOrderNotifications.js
import { useEffect } from 'react'
import { notifyOrder } from '../utils/notifications'

const useOrderNotifications = () => {
  useEffect(() => {
    const ws = new WebSocket('wss://your-server.com/orders')

    ws.onmessage = event => {
      const newOrder = JSON.parse(event.data)
      notifyOrder(newOrder)
    }

    return () => ws.close()
  }, [])
}

export default useOrderNotifications
