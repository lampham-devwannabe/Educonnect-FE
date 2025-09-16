//get payment method hook

import { useEffect, useState } from 'react'

export const usePaymentMethod = () => {
  const [paymentMethods, setPaymentMethods] = useState([])

  const fetchPaymentMethods = async () => {
    try {
      const res = await fetch('/api/payment-method/list')
      const data = await res.json()
      setPaymentMethods(data.paymentMethods)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPaymentMethods()
  }, [])

  return { paymentMethods, fetchPaymentMethods }
}
