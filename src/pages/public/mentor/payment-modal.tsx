'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import type { PlanPackage } from './page'

// Type definitions
interface PaymentMethod {
  _id: string
  name: string
  description: string
  image?: string
  codeName: string
}

interface PaymentModalProps {
  paymentMethods: PaymentMethod[]
  planId: string
  selectPackage: PlanPackage
}

interface CheckoutResponse {
  url: string
  message?: string
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  paymentMethods,
  planId,
  selectPackage,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  )

  const handlePlaceOrder = async (): Promise<void> => {
    const toastId = toast.loading('Processing your order...')

    try {
      const formData = new FormData()
      formData.append('paymentMethod', selectedMethod?.codeName || '')
      formData.append('plan_id', planId)
      formData.append('package_id', selectPackage._id?.toString() || '')

      const res = await fetch('/api/mentorship-plan/checkout', {
        method: 'POST',
        body: formData,
      })

      toast.dismiss(toastId)
      const data: CheckoutResponse = await res.json()

      if (res.status === 200) {
        toast.success('Redirecting to payment gateway...', {
          id: toastId,
        })
        window.location.href = data.url
      } else if (res.status === 401) {
        toast.error('User not authenticated! Please login to continue', {
          id: toastId,
        })
      } else if (res.status === 409) {
        toast.error('Item already exists in the cart', {
          id: toastId,
        })
      } else if (res.status === 400) {
        toast.error('Course ID is required', {
          id: toastId,
        })
      } else {
        toast.error('Error processing your order. Please try again.', {
          id: toastId,
        })
      }
    } catch (err: unknown) {
      console.error('Order Processing Error:', err)
      toast.error('Error processing your order. Please try again.', {
        id: toastId,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[--primary] hover:bg-[--primary-hover] text-white">
          Book Now
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] sm:max-w-[500px] max-h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col max-h-[90vh]">
          <DialogHeader className="px-4 sm:px-6 py-4 border-b">
            <DialogTitle className="text-lg sm:text-xl font-semibold">
              Checkout
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <div className="mb-6">
                <p className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                  Payment Methods
                </p>
                <form className="grid gap-3 sm:gap-4">
                  {paymentMethods?.length === 0 ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i: number) => (
                        <div key={i} className="flex items-center space-x-3">
                          <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg flex-shrink-0" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-3 sm:h-4 w-full max-w-[200px]" />
                            <Skeleton className="h-3 sm:h-4 w-full max-w-[150px]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    paymentMethods.map((item: PaymentMethod, index: number) => {
                      const id = `radio_${index}`
                      return (
                        <div key={index} className="relative">
                          <input
                            className="peer hidden"
                            id={id}
                            type="radio"
                            name="payment"
                            value={item._id}
                            checked={selectedMethod?._id === item._id}
                            onChange={() => setSelectedMethod(item)}
                          />
                          <span className="peer-checked:border-gray-700 absolute right-3 sm:right-4 top-1/2 box-content block h-2.5 w-2.5 sm:h-3 sm:w-3 -translate-y-1/2 rounded-full border-4 sm:border-8 border-gray-300 bg-white"></span>
                          <label
                            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-3 sm:p-4 min-h-[60px] sm:min-h-[80px] items-center"
                            htmlFor={id}
                          >
                            <div className="flex-shrink-0">
                              <img
                                src={
                                  item?.image ||
                                  '/placeholder.svg?height=56&width=56'
                                }
                                alt="Payment Method"
                                width="40"
                                height="40"
                                className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                              />
                            </div>
                            <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                              <div className="text-sm sm:text-base font-semibold truncate">
                                {item?.name}
                              </div>
                              <p className="text-slate-500 text-xs sm:text-sm leading-4 sm:leading-5 line-clamp-2">
                                {item?.description}
                              </p>
                            </div>
                          </label>
                        </div>
                      )
                    })
                  )}
                </form>
              </div>

              <div className="border-t pt-4">
                <p className="text-base sm:text-lg font-medium mb-4">
                  Billing Details
                </p>

                <div className="space-y-2 border-t border-b py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Subtotal
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      ${selectPackage?.price}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Tax</p>
                    <p className="text-sm font-semibold text-gray-900">$0.00</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-base sm:text-lg font-medium text-gray-900">
                    Total
                  </p>
                  <p className="text-lg sm:text-xl font-semibold text-gray-900">
                    ${selectPackage?.price}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t px-4 sm:px-6 py-4">
            <Button
              onClick={() => handlePlaceOrder()}
              className="w-full bg-[--primary] hover:bg-[--primary-hover] text-white"
            >
              Book Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentModal
