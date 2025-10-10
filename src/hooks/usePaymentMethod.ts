// src/hooks/usePaymentMethod.ts
import { useEffect, useState } from 'react'

// Define interface for payment method
interface PaymentMethod {
  _id: string
  name: string
  description: string
  image?: string
  codeName: string
}

export const usePaymentMethod = (): {
  paymentMethods: PaymentMethod[]
  fetchPaymentMethods: () => Promise<void>
} => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])

  const fetchPaymentMethods = async (): Promise<void> => {
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
