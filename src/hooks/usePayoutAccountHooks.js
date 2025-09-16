import { useState, useEffect } from 'react'

export const usePayoutAccountHooks = () => {
  const [PayoutAccountData, setPayoutAccountData] = useState([])

  const fetchPayoutAccount = async () => {
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
