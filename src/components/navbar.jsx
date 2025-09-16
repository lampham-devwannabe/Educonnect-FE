'use client'
import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useCart } from '@/utils/CartContext'
import { useNotificationHooks } from '@/hooks/useNotificationHooks'
import { formatDateTime } from '@/utils/dateformate'
import { BadgeMinus, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

import {
  Bell,
  BookOpen,
  Users,
  Gift,
  Shield,
  Radio,
  MoreHorizontal,
  Check,
  CheckCheck,
  Loader2,
} from 'lucide-react'

import { Jost } from 'next/font/google'
import Payment from '@/app/(frontend)/testpage/page'

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600'], // Adjust as needed
})

export default function Navbar({ user }) {
  const [cartOpen, setCartOpen] = useState(false)
  const { cartData, fetchCart } = useCart(cartOpen)
  const [notificationOpen, setNotificationOpen] = useState(false)

  const { notificationData, fetchNotification } =
    useNotificationHooks(notificationOpen)

  const [loading, setLoading] = useState(false)
  const [markingAllRead, setMarkingAllRead] = useState(false)

  const [collapseMenu, setCollapseMenu] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  const toggleDropdown = () => {
    setCollapseMenu(!collapseMenu)
  }

  const toggleMenu = () => {
    setDropdownOpen(!dropdownOpen)
  }

  let hideTimeouts = {
    notification: null,
    dropdown: null,
    cart: null,
  }

  const handleMouseEnter = type => {
    // Clear any existing timeout to prevent premature hiding
    clearTimeout(hideTimeouts[type])
    if (type === 'notification') setNotificationOpen(true)
    if (type === 'dropdown') setDropdownOpen(true)
    if (type === 'cart') setCartOpen(true)
  }

  const handleMouseLeave = type => {
    // Set a timeout to hide the dropdown after a short delay
    hideTimeouts[type] = setTimeout(() => {
      if (type === 'notification') setNotificationOpen(false)
      if (type === 'dropdown') setDropdownOpen(false)
      if (type === 'cart') setCartOpen(false)
    }, 300) // Adjust the delay as needed
  }
  const toggleCart = () => {
    setCartOpen(!cartOpen)
  }

  const logOut = async () => {
    const res = await fetch('/api/logout/', {
      method: 'POST',
    })

    if (res.ok) {
      router.push('/login')
    }
  }
  const [searchQuery, setSearchQuery] = useState('')

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      router.push(`/courselist?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
    }
  }
  const routeCheckout = () => {
    setCartOpen(false)
    router.push('/checkout')
  }

  const removeItem = async (cartId, itemId) => {
    const formData = new FormData()
    formData.append('cartId', cartId)
    formData.append('itemId', itemId)
    const res = await fetch(`/api/cart/delete`, {
      method: 'DELETE',
      body: formData,
    })

    const data = await res.json()
    if (data.status === 200) {
      await fetchCart()
    }
  }

  // mobile search option open or close
  const [searchOpen, setSearchOpen] = useState(false)
  const handleSearchOpen = () => {
    setSearchOpen(!searchOpen)
  }

  const getNotificationIcon = type => {
    const iconMap = {
      CoursePurchase: <BookOpen className="w-5 h-5" />,
      BookMentorShip: <Users className="w-5 h-5" />,
      Referral: <Gift className="w-5 h-5" />,
      AdminNotification: <Shield className="w-5 h-5" />,
      Broadcast: <Radio className="w-5 h-5" />,
      Other: <MoreHorizontal className="w-5 h-5" />,
      WithdrawalRequest: <BadgeMinus className="w-5 h-5" />,
      PaymentRequest: <Check className="w-5 h-5" />,
    }
    return iconMap[type] || iconMap['Other']
  }

  const getNotificationColor = type => {
    const colorMap = {
      CoursePurchase: 'bg-blue-100 text-blue-600',
      BookMentorShip: 'bg-purple-100 text-purple-600',
      Referral: 'bg-green-100 text-green-600',
      AdminNotification: 'bg-red-100 text-red-600',
      Broadcast: 'bg-orange-100 text-orange-600',
      Other: 'bg-gray-100 text-gray-600',
    }
    return colorMap[type] || colorMap['Other']
  }

  // Mark single notification as read
  const markAsRead = async notificationId => {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('notification_id', notificationId)
      formData.append('status', 'true')

      const response = await fetch('/api/notification/update-status', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.status === 200) {
        // Refetch notifications to get updated data
        await fetchNotification()
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      setMarkingAllRead(true)

      const formData = new FormData()
      formData.append('markAllRead', 'true')

      const response = await fetch('/api/notification/update', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.status === 200) {
        // Refetch notifications to get updated data
        await fetchNotification()
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    } finally {
      setMarkingAllRead(false)
    }
  }

  const unreadCount = notificationData?.filter(n => !n.isRead).length || 0

  const handleNotificationClick = async notification => {
    // Mark as read if not already read
    if (!notification.isRead) {
      await markAsRead(notification._id)
    }

    // Navigate to action link if available
    if (notification.actionLink) {
      window.location.href = notification.actionLink
    }
  }

  return (
    <header
      className={`z-[999] w-full flex shadow-sm bg-slate-50 bg-opacity-75 font-[sans-serif] lg:h-[90px] h-[60px] ${jost.className}`}
    >
      <div className=" container flex llg:flex lg:flex-wrap items-center justify-between sm:px-10 px-6 py-3 lg:gap-y-4 gap-y-6 gap-x-4 w-full ">
        <div className="flex">
          <button
            onClick={toggleDropdown}
            id="toggleOpen"
            className="border rounded-sm p-1 lg:hidden md:hidden inline"
          >
            <svg
              className="w-5 h-5"
              fill="#595959"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <a href="/" className="lg:ml-0 md:ml-0 ml-4 ">
            <Image
              src="/assets/icon/logo.png"
              alt="logo"
              width={100}
              height={50}
              className="rounned-full lg:w-[100px] w-[100px] lg:h-[50px] h-[30px]"
              // sizes="40vw"
              // optional
            />
          </a>
        </div>
        <div className="navMenu lg:block md:block hidden">
          <ul className="flex gap-5">
            <Link href={'/'}>
              <li className="cursor-pointer text-bold hover:text-[#007bff] text-lg">
                Home
              </li>
            </Link>
            <Link href={'/courselist'}>
              <li className="cursor-pointer text-bold hover:text-[#007bff] text-lg">
                Course
              </li>
            </Link>
            <Link href={'/mentorlist'}>
              <li className="cursor-pointer text-bold hover:text-[#007bff] text-lg">
                Mentor
              </li>
            </Link>
            <Link href={'/post-feed'}>
              <li className="cursor-pointer text-bold hover:text-[#007bff] text-lg">
                Community
              </li>
            </Link>
            <Link href={'/mobileApp'}>
              <li className="cursor-pointer text-bold hover:text-[#007bff] text-lg">
                App
              </li>
            </Link>
          </ul>
        </div>
        <div className="lg:block hidden">
          <div className=" bg-gray-100 flex border-2 max-md:order-1 border-transparent focus-within:border-blue-500 focus-within:bg-transparent px-4 rounded-full h-10 lg:w-64 md:w-64 max-md:w-48">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-gray-400 mr-4 rotate-90"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full outline-none bg-transparent text-[#333] text-sm"
            />
          </div>
        </div>

        {/* mobile responsive searchbar start */}

        <div className="mobile-searchbar">
          <div className="search-btn relative lg:hidden block">
            <Search
              onClick={handleSearchOpen}
              className="w-7 h-7 p-1 border rounded-sm text-gray-[#d6d6d6]"
            />
          </div>
          {searchOpen && (
            <div className="lg:hidden block absolute -bottom-7 right-0 border rounded-full duration-1000">
              <div className="bg-gray-50 flex border-2 max-md:order-1 border-transparent focus-within:border-blue-500 focus-within:bg-white px-4 rounded-full h-9 lg:w-64 md:w-64 max-md:w-48">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full outline-none bg-transparent text-[#333] text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* mobile responsive searchbar end */}

        <div className="hidden lg:block">
          <div className=" flex items-center space-x-8 max-md:ml-auto">
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                className="cursor-pointer fill-[#333] hover:fill-[#077bff]"
                viewBox="0 0 511 511.999"
              >
                <path
                  d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805 13.81C280.902 4.902 269.066 0 256.477 0c-12.59 0-24.426 4.902-33.332 13.809L14.398 222.55c-.07.07-.144.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.44 13.235 31.273 13.746.484.047.969.07 1.457.07h8.32v153.696c0 30.418 24.75 55.164 55.168 55.164h81.711c8.285 0 15-6.719 15-15V376.5c0-13.879 11.293-25.168 25.172-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.281 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.164V303.14h7.719c12.586 0 24.422-4.903 33.332-13.813 18.36-18.367 18.367-48.254.027-66.633zm-21.243 45.422a17.03 17.03 0 0 1-12.117 5.024h-22.72c-8.285 0-15 6.714-15 15v168.695c0 13.875-11.289 25.164-25.168 25.164h-66.71V376.5c0-30.418-24.747-55.168-55.169-55.168H232.38c-30.422 0-55.172 24.75-55.172 55.168V482h-66.71c-13.876 0-25.169-11.29-25.169-25.164V288.14c0-8.286-6.715-15-15-15H48a13.9 13.9 0 0 0-.703-.032c-4.469-.078-8.66-1.851-11.8-4.996-6.68-6.68-6.68-17.55 0-24.234.003 0 .003-.004.007-.008l.012-.012L244.363 35.02A17.003 17.003 0 0 1 256.477 30c4.574 0 8.875 1.781 12.113 5.02l208.8 208.796.098.094c6.645 6.692 6.633 17.54-.031 24.207zm0 0"
                  data-original="#000000"
                />
              </svg>
            </Link>

            <div
              onMouseEnter={() => handleMouseEnter('cart')}
              onMouseLeave={() => handleMouseLeave('cart')}
              className="relative font-[sans-serif] w-max mx-auto"
            >
              <span className="relative fill-[#333]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  onClick={toggleCart}
                  className="cursor-pointer hover:fill-[#007bff] inline"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                    data-original="#000000"
                  ></path>
                </svg>
                {cartData?.data?.items ? (
                  <span className="bg-red-500 text-[10px] px-1.5 font-semibold min-w-[16px] h-4 flex items-center justify-center text-white rounded-full absolute -top-2 left-[60%]">
                    {cartData?.data?.items.length}
                  </span>
                ) : (
                  ''
                )}
              </span>
              {cartOpen && (
                <div
                  id="dropdownMenu"
                  className="absolute right-0 mt-2 w-[420px] max-h-[600px] bg-white rounded-xl shadow-xl border border-gray-100 z-[1000] overflow-hidden"
                >
                  {cartData?.data?.items ? (
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Shopping Cart
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {cartData.data.items.length}{' '}
                          {cartData.data.items.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>

                      {/* Cart Items */}
                      <div className="flex-1 overflow-y-auto max-h-[320px]">
                        <ul className="divide-y divide-gray-100">
                          {cartData.data.items.map((item, index) => (
                            <li
                              key={index}
                              className="p-4 hover:bg-gray-50 transition-colors duration-200"
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                  <Image
                                    src={
                                      item.course.thumbnail ||
                                      '/placeholder.svg'
                                    }
                                    className="w-16 h-12 rounded-lg object-cover border border-gray-200"
                                    alt={item.course.title}
                                    width={64}
                                    height={48}
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-5">
                                    {item.course.title}
                                  </h4>
                                  <p className="text-lg font-semibold text-blue-600 mt-2">
                                    ${item.course.price}
                                  </p>
                                </div>

                                <button
                                  onClick={e => {
                                    e.stopPropagation()
                                    removeItem(cartData?.data?._id, item._id)
                                  }}
                                  className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                  aria-label="Remove item"
                                >
                                  <BadgeMinus className="w-5 h-5" />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer */}
                      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-gray-700">
                            Total:
                          </span>
                          <span className="text-xl font-bold text-gray-900">
                            ${cartData.totalAmount}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <Link href="/cart" className="flex-1">
                            <Button
                              variant="outline"
                              className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                              View Cart
                            </Button>
                          </Link>

                          <Button
                            onClick={routeCheckout}
                            className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-medium shadow-md"
                          >
                            Checkout
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center px-6 py-12">
                      <div className="w-32 h-32 mb-6 opacity-60">
                        <Image
                          src="/assets/empty-cart.svg"
                          alt="Empty cart"
                          width={128}
                          height={128}
                          className="w-full h-full"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Your cart is empty
                      </h3>
                      <p className="text-sm text-gray-500 text-center">
                        Add some courses to get started with your learning
                        journey
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* <Link href="/post-feed">
              <svg className="w-6 h-6 text-[#333] dark:text-white size-6" xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </Link> */}

            <div
              onMouseEnter={() => handleMouseEnter('notification')}
              onMouseLeave={() => handleMouseLeave('notification')}
              className="relative font-[sans-serif] w-max mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                className="cursor-pointer fill-[#333] hover:fill-[#077bff]"
                viewBox="0 0 371.263 371.263"
              >
                <path
                  d="M305.402 234.794v-70.54c0-52.396-33.533-98.085-79.702-115.151.539-2.695.838-5.449.838-8.204C226.539 18.324 208.215 0 185.64 0s-40.899 18.324-40.899 40.899c0 2.695.299 5.389.778 7.964-15.868 5.629-30.539 14.551-43.054 26.647-23.593 22.755-36.587 53.354-36.587 86.169v73.115c0 2.575-2.096 4.731-4.731 4.731-22.096 0-40.959 16.647-42.995 37.845-1.138 11.797 2.755 23.533 10.719 32.276 7.904 8.683 19.222 13.713 31.018 13.713h72.217c2.994 26.887 25.869 47.905 53.534 47.905s50.54-21.018 53.534-47.905h72.217c11.797 0 23.114-5.03 31.018-13.713 7.904-8.743 11.797-20.479 10.719-32.276-2.036-21.198-20.958-37.845-42.995-37.845a4.704 4.704 0 0 1-4.731-4.731zM185.64 23.952c9.341 0 16.946 7.605 16.946 16.946 0 .778-.12 1.497-.24 2.275-4.072-.599-8.204-1.018-12.336-1.138-7.126-.24-14.132.24-21.078 1.198-.12-.778-.24-1.497-.24-2.275.002-9.401 7.607-17.006 16.948-17.006zm0 323.358c-14.431 0-26.527-10.3-29.342-23.952h58.683c-2.813 13.653-14.909 23.952-29.341 23.952zm143.655-67.665c.479 5.15-1.138 10.12-4.551 13.892-3.533 3.773-8.204 5.868-13.353 5.868H59.89c-5.15 0-9.82-2.096-13.294-5.868-3.473-3.772-5.09-8.743-4.611-13.892.838-9.042 9.282-16.168 19.162-16.168 15.809 0 28.683-12.874 28.683-28.683v-73.115c0-26.228 10.419-50.719 29.282-68.923 18.024-17.425 41.498-26.887 66.528-26.887 1.198 0 2.335 0 3.533.06 50.839 1.796 92.277 45.929 92.277 98.325v70.54c0 15.809 12.874 28.683 28.683 28.683 9.88 0 18.264 7.126 19.162 16.168z"
                  data-original="#000000"
                />
              </svg>
              {notificationData && unreadCount > 0 && (
                <span className="bg-red-500 text-[10px] px-1.5 font-semibold min-w-[16px] h-4 flex items-center justify-center text-white rounded-full absolute -top-2 left-[60%]">
                  {unreadCount}
                </span>
              )}
              {notificationOpen && (
                <div
                  id="notificationDropdown"
                  className="absolute right-0 mt-2 w-[440px] max-h-[600px] bg-white rounded-xl shadow-xl border border-gray-100 z-[1000] overflow-hidden"
                >
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <Badge
                            variant="destructive"
                            className="text-xs px-2 py-1"
                          >
                            {unreadCount}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <Link href="/notification">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            View All
                          </Button>
                        </Link>
                        {unreadCount > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            disabled={markingAllRead}
                            className="text-gray-600 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                          >
                            {markingAllRead ? (
                              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            ) : (
                              <CheckCheck className="w-4 h-4 mr-1" />
                            )}
                            Mark All Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="flex-1 overflow-y-auto max-h-[400px]">
                    {notificationData && notificationData.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {notificationData.map((notification, index) => (
                          <div
                            key={notification._id || index}
                            className={`p-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer relative ${
                              !notification.isRead
                                ? 'bg-blue-50/30 border-l-4 border-l-blue-500'
                                : ''
                            }`}
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                          >
                            <div className="flex items-start gap-4">
                              {/* Notification Icon/Image */}
                              <div className="flex-shrink-0">
                                {notification.imageUrl ? (
                                  <Image
                                    src={
                                      notification.imageUrl ||
                                      '/placeholder.svg'
                                    }
                                    alt="Notification"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                    width={48}
                                    height={48}
                                  />
                                ) : (
                                  <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${getNotificationColor(
                                      notification.type
                                    )}`}
                                  >
                                    {getNotificationIcon(notification.type)}
                                  </div>
                                )}
                              </div>

                              {/* Notification Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <h4
                                    className={`text-sm font-medium line-clamp-2 leading-5 ${
                                      !notification.isRead
                                        ? 'text-gray-900'
                                        : 'text-gray-700'
                                    }`}
                                  >
                                    {notification.title}
                                  </h4>
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                  )}
                                </div>

                                <p className="text-sm text-gray-600 mt-1 line-clamp-2 leading-5">
                                  {notification.message}
                                </p>

                                <div className="flex items-center justify-between mt-3">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs px-2 py-1"
                                  >
                                    {notification.type
                                      .replace(/([A-Z])/g, ' $1')
                                      .trim()}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {formatDateTime(notification.createdAt)}
                                  </span>
                                </div>
                              </div>

                              {/* Mark as Read Button */}
                              {!notification.isRead && (
                                <button
                                  onClick={e => {
                                    e.stopPropagation()
                                    markAsRead(notification._id)
                                  }}
                                  disabled={loading}
                                  className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                  aria-label="Mark as read"
                                >
                                  {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Check className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Empty State */
                      <div className="flex flex-col items-center justify-center px-6 py-16">
                        <div className="w-20 h-20 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <Bell className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No notifications yet
                        </h3>
                        <p className="text-sm text-gray-500 text-center max-w-sm">
                          When you have new notifications, they&apos;ll appear
                          here to keep you updated.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {notificationData && notificationData.length > 0 && (
                    <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
                      <Link href="/notification">
                        <Button
                          variant="outline"
                          className="w-full text-gray-700 hover:bg-gray-100"
                        >
                          View All Notifications
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {user.token ? (
              <div className="relative">
                {!user.image ? (
                  <svg
                    onMouseEnter={() => handleMouseEnter('dropdown')}
                    onMouseLeave={() => handleMouseLeave('dropdown')}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    className="cursor-pointer fill-[#333] hover:fill-[#077bff]"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                      data-original="#000000"
                    />
                  </svg>
                ) : (
                  <div
                    onMouseEnter={() => handleMouseEnter('dropdown')}
                    onMouseLeave={() => handleMouseLeave('dropdown')}
                    className="relative w-8 h-8 cursor-pointer"
                  >
                    <Image
                      src={user?.image || '/assets/default-avatar.png'}
                      alt={user?.name || 'User avatar'}
                      fill
                      className="rounded-full object-cover border border-gray-200 shadow-sm"
                      sizes="32px"
                      priority
                    />
                  </div>
                )}

                {dropdownOpen && (
                  <div
                    onMouseEnter={() => handleMouseEnter('dropdown')}
                    onMouseLeave={() => handleMouseLeave('dropdown')}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 "
                  >
                    <ul className="absolute block shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto">
                      <Link href="/profile">
                        <li className="capitalize py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-4 h-4 mr-3"
                            viewBox="0 0 512 512"
                          >
                            <path
                              d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                              data-original="#000000"
                            ></path>
                          </svg>
                          {user.role} profile
                        </li>
                      </Link>
                      {(user.role === 'instructor' ||
                        user.role === 'admin') && (
                        <Link href="/dashboard">
                          <li className="py-2.5 px-5 flex items-center capitalize hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              className="w-4 h-4 mr-3"
                              viewBox="0 0 512 512"
                            >
                              <path
                                d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                                data-original="#000000"
                              ></path>
                            </svg>
                            {user.role} Dashboard
                          </li>
                        </Link>
                      )}
                      <li
                        onClick={logOut}
                        className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="w-4 h-4 mr-3"
                          viewBox="0 0 6.35 6.35"
                        >
                          <path
                            d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                            data-original="#000000"
                          ></path>
                        </svg>
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-1 rounded-full bg-[--primary] py-3 px-6 text-gray-100 text-sm">
                <Link href="/login">
                  <h5 className="">Login</h5>
                </Link>
                /
                <Link href="/register">
                  <h5 className="">SignUp</h5>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {collapseMenu && (
        <div
          id="collapseMenu"
          className=" before:fixed before:bg-black before:opacity-40 before:inset-0 max-lg:before:z-50"
        >
          <button
            id="toggleClose"
            onClick={toggleDropdown}
            className="fixed top-2 right-4 z-[100] rounded-full bg-white p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 fill-red-600"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
          </button>
          <ul className="block space-x-4 space-y-3 fixed bg-white w-1/2 min-w-[300px] top-0 left-0 p-4 h-full shadow-md overflow-auto z-50">
            <li className="pb-4 px-3">
              <a href="">
                <Image
                  width={100}
                  height={50}
                  src="/assets/icon/logo.png"
                  alt="logo"
                  className="w-[80px] h-[30px]"
                />
              </a>
            </li>
            <li className="border-b pb-4 px-3 hidden">
              <a href="">
                <Image
                  width={100}
                  height={50}
                  src="https://readymadeui.com/readymadeui.svg"
                  alt="logo"
                  className="w-36"
                />
              </a>
            </li>
            <li className="border-b py-3 px-3">
              <a
                href="/"
                className="hover:text-[#007bff] text-[#007bff] block font-semibold text-sm"
              >
                Home
              </a>
            </li>
            <li className="border-b py-3 px-3">
              <a
                href="/categorylist"
                className="hover:text-[#007bff] text-black block font-semibold text-sm"
              >
                Categories
              </a>
            </li>
            <li className="border-b py-3 px-3">
              <a
                href="/courselist"
                className="hover:text-[#007bff] text-black block font-semibold text-sm"
              >
                Courses
              </a>
            </li>
            <li className="border-b py-3 px-3">
              <a
                href="/mentorlist"
                className="hover:text-[#007bff] text-black block font-semibold text-sm"
              >
                Mentor
              </a>
            </li>
            <li className="border-b py-3 px-3">
              <a
                href="/mobileApp"
                className="hover:text-[#007bff] text-black block font-semibold text-sm"
              >
                App
              </a>
            </li>
            <li className="border-b py-3 px-3">
              <a
                href="/contact"
                className="hover:text-[#007bff] text-black block font-semibold text-sm"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
