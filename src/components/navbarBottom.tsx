import React, { useState } from 'react'
import { formatDateTime } from '../utils/dateformate'
import { useNotificationHooks } from '../hooks/useNotificationHooks'
import type { User } from '@/models/user'

interface NavbarBottomProps {
  user: User
}

interface HideTimeouts {
  notification: NodeJS.Timeout | null
  dropdown: NodeJS.Timeout | null
  cart: NodeJS.Timeout | null
}

const NavbarBottom: React.FC<NavbarBottomProps> = ({ user }) => {
  const [cartOpen, setCartOpen] = useState<boolean>(false)
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)

  const { notificationData } = useNotificationHooks(notificationOpen)

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

  const hideTimeouts: HideTimeouts = {
    notification: null,
    dropdown: null,
    cart: null,
  }

  const handleMouseEnter = (type: keyof HideTimeouts): void => {
    // Clear any existing timeout to prevent premature hiding
    if (hideTimeouts[type]) {
      clearTimeout(hideTimeouts[type]!)
    }
    if (type === 'notification') setNotificationOpen(true)
    if (type === 'dropdown') setDropdownOpen(true)
    if (type === 'cart') setCartOpen(true)
  }

  const handleMouseLeave = (type: keyof HideTimeouts): void => {
    // Set a timeout to hide the dropdown after a short delay
    hideTimeouts[type] = setTimeout(() => {
      if (type === 'notification') setNotificationOpen(false)
      if (type === 'dropdown') setDropdownOpen(false)
      if (type === 'cart') setCartOpen(false)
    }, 300) // Adjust the delay as needed
  }

  const toggleCart = (): void => {
    setCartOpen(!cartOpen)
  }

  const logOut = async (): Promise<void> => {
    try {
      const res = await fetch('/api/logout/', {
        method: 'POST',
      })

      if (res.ok) {
        // In a React app, you'd use react-router-dom for navigation
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return (
    <div className="lg:hidden block">
      <div className="fixed z-[999] bottom-0 left-0 w-full flex shadow-sm font-[sans-serif] h-[80px] ">
        <div className="container flex flex-wrap justify-center items-center sm:px-10 relative lg:gap-y-4 gap-y-6 gap-x-4 w-full">
          <div className="flex items-center space-x-8 bg-slate-50 bg-opacity-30 px-7 py-2 rounded-full backdrop-blur-sm">
            <a href="/post-feed">
              <svg
                className="w-6 h-6 text-[#333] dark:text-white size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </a>

            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                toggleCart()
              }}
            >
              <div className="relative font-[sans-serif] w-max mx-auto">
                <span className="relative fill-[#333]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    className="cursor-pointer hover:fill-[#007bff] inline"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                      data-original="#000000"
                    ></path>
                  </svg>
                </span>
              </div>
            </a>

            <a href="/" className="bg-indigo-300 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                className="cursor-pointer fill-[#fff] hover:fill-[#077bff]"
                viewBox="0 0 511 511.999"
              >
                <path
                  d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805 13.81C280.902 4.902 269.066 0 256.477 0c-12.59 0-24.426 4.902-33.332 13.809L14.398 222.55c-.07.07-.144.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.44 13.235 31.273 13.746.484.047.969.07 1.457.07h8.32v153.696c0 30.418 24.75 55.164 55.168 55.164h81.711c8.285 0 15-6.719 15-15V376.5c0-13.879 11.293-25.168 25.172-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.281 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.164V303.14h7.719c12.586 0 24.422-4.903 33.332-13.813 18.36-18.367 18.367-48.254.027-66.633zm-21.243 45.422a17.03 17.03 0 0 1-12.117 5.024h-22.72c-8.285 0-15 6.714-15 15v168.695c0 13.875-11.289 25.164-25.168 25.164h-66.71V376.5c0-30.418-24.747-55.168-55.169-55.168H232.38c-30.422 0-55.172 24.75-55.172 55.168V482h-66.71c-13.876 0-25.169-11.29-25.169-25.164V288.14c0-8.286-6.715-15-15-15H48a13.9 13.9 0 0 0-.703-.032c-4.469-.078-8.66-1.851-11.8-4.996-6.68-6.68-6.68-17.55 0-24.234.003 0 .003-.004.007-.008l.012-.012L244.363 35.02A17.003 17.003 0 0 1 256.477 30c4.574 0 8.875 1.781 12.113 5.02l208.8 208.796.098.094c6.645 6.692 6.633 17.54-.031 24.207zm0 0"
                  data-original="#000000"
                />
              </svg>
            </a>

            <div className="relative font-[sans-serif] w-max mx-auto">
              <a href="/notification">
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
              </a>

              {notificationData && notificationData.length > 0 && (
                <span className="bg-red-500 text-[10px] px-1.5 font-semibold min-w-[16px] h-4 flex items-center justify-center text-white rounded-full absolute -top-2 left-[60%]">
                  {notificationData.length}
                </span>
              )}

              {notificationOpen && (
                <div
                  id="dropdownMenu"
                  className="absolute block right-0 shadow-lg bg-white py-4 z-[1000] min-w-full rounded-lg w-[410px] max-h-[500px] overflow-auto mt-2"
                >
                  <div className="flex items-center justify-between px-4 mb-4">
                    <p className="text-xs text-blue-600 cursor-pointer">
                      View all
                    </p>
                    <p className="text-xs text-blue-600 cursor-pointer">
                      Mark as read
                    </p>
                  </div>
                  {notificationData ? (
                    notificationData.map((notification, index) => (
                      <div key={index}>
                        <ul className="divide-y">
                          <li
                            key={index}
                            className="p-4 flex items-center hover:bg-gray-50 cursor-pointer"
                          >
                            {notification.image ? (
                              <img
                                src="https://readymadeui.com/profile_2.webp"
                                className="w-12 h-12 rounded-full shrink-0"
                                alt="Profile"
                              />
                            ) : (
                              <span className="text-white bg-indigo-300 rounded-xl p-5 text-xl font-medium">
                                {notification?.title.charAt(0).toUpperCase()}
                              </span>
                            )}
                            <div className="ml-6">
                              <h3 className="text-sm text-[#333] font-semibold">
                                {notification.title}
                              </h3>
                              <p className="text-xs text-gray-500 mt-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-blue-600 leading-3 mt-2">
                                {formatDateTime(notification.createdAt)}
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 mt-4">
                      <img
                        src="/assets/no-notification.svg"
                        alt="no notification"
                        height={400}
                        width={600}
                      />
                      <p className="text-xl font-mono mt-3 cursor-pointer">
                        Cart is empty
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {user.token ? (
              <div className="relative w-[30px] h-[30px]">
                {!user.image ? (
                  <a href="/profile">
                    <svg
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
                  </a>
                ) : (
                  <a href="/profile">
                    <img
                      src={user.image}
                      alt="avatar"
                      width={30}
                      height={30}
                      className="cursor-pointer w-8 h-8 rounded-full"
                    />
                  </a>
                )}

                {dropdownOpen && (
                  <div
                    onMouseEnter={() => handleMouseEnter('dropdown')}
                    onMouseLeave={() => handleMouseLeave('dropdown')}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                  >
                    <ul className="absolute block shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto">
                      <a href="/profile">
                        <li className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
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
                          View profile
                        </li>
                      </a>
                      {user.role === 'instructor' && (
                        <a href="/dashboard">
                          <li className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
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
                            Dashboard
                          </li>
                        </a>
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
              <a href="/login">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium">
                  Login
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarBottom
