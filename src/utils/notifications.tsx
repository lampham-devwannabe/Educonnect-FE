import toast from 'react-hot-toast'

// Define the interface for order details
interface OrderDetails {
  id: string
  total: number
}

export const notifyOrder = (orderDetails: OrderDetails): void => {
  toast.custom(
    t => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-sm w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4 text-white">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <span role="img" aria-label="cart" className="text-2xl">
                🛒
              </span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold">🎉 New Order Received!</p>
              <p className="mt-1 text-sm">Order ID: {orderDetails.id}</p>
              <p className="text-sm">
                Total:{' '}
                <span className="font-bold">
                  ${orderDetails.total.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-semibold text-white bg-black/20 hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Close ✖️
          </button>
        </div>
      </div>
    ),
    { duration: 5000, position: 'bottom-right' }
  )
}
