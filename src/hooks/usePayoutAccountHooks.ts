import { useState, useEffect } from 'react'

// Define interface for payout account data
interface PayoutAccount {
  // Add specific properties based on your actual payout account structure
  [key: string]: any
}

export const usePayoutAccountHooks = (): {
  PayoutAccountData: PayoutAccount[]
  fetchPayoutAccount: () => Promise<void>
} => {
  const [PayoutAccountData, setPayoutAccountData] = useState<PayoutAccount[]>(
    []
  )

  const fetchPayoutAccount = async (): Promise<void> => {
    try {
      const formData = new FormData()
      const res = await fetch('/api/payout-account/list', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      setPayoutAccountData(data.payoutAccounts)

      console.log('payoutAccountData data:', data.payoutAccounts)
    } catch (error) {
      console.error('Error fetching payoutAccountData data:', error)
    }
  }

  useEffect(() => {
    fetchPayoutAccount()
  }, [])

  return { PayoutAccountData, fetchPayoutAccount }
}
