import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Home,
  Package,
  UserCheck,
  Users,
  Bell,
  Settings,
  BadgeDollarSign,
  ChevronDown,
  MonitorPlay,
  BarChart2Icon,
  Shield,
  CreditCardIcon,
  BookOpen,
  SlidersHorizontal,
  CheckCheck,
  MessageSquare,
  LucideMessageSquareCode,
  Gift,
  Radio,
  MoreHorizontal,
  Loader2,
  Check,
  Megaphone,
  Video,
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
} from 'lucide-react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { formatDateTime } from '../utils/dateformate'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Badge } from './ui/badge'

interface User {
  name: string
  role: string
  image?: string
}

interface Notification {
  _id: string
  title: string
  message: string
  type: string
  isRead: boolean
  createdAt: string
  actionLink?: string
  imageUrl?: string
}

interface SidebarProps {
  user: User
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [activeLink, setActiveLink] = useState<string>('/dashboard')
  const [categorySubmenuOpen, setCategorySubmenuOpen] = useState<boolean>(false)
  const [courseSubmenuOpen, setCourseSubmenuOpen] = useState<boolean>(false)
  const [mentorshipSubmenuOpen, setMentorshipSubmenuOpen] =
    useState<boolean>(false)
  // const [userSubmenuOpen, setUserSubmenuOpen] = useState<boolean>(false)
  const [financialSubmenuOpen, setFinancialSubmenuOpen] =
    useState<boolean>(false)
  const [salesReportSubmenuOpen, setSalesReportSubmenuOpen] =
    useState<boolean>(false)

  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)
  const [notificationData, setNotificationData] = useState<Notification[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [markingAllRead, setMarkingAllRead] = useState<boolean>(false)

  // Links
  // const dashboardLinks = '/dashboard'
  // const courseLinks = '/dashboard/course'
  // const courseAddLinks = '/dashboard/course/add-new'
  // const courseManageLinks = '/dashboard/course/'
  // const courseTypeLinks = '/dashboard/course-type'
  // const mentorshipLinks = '/dashboard/mentorship'
  // const mentorshipAddLinks = '/dashboard/mentorship/add-new'
  // const mentorshipManageLinks = '/dashboard/mentorship/'
  // const categoryLinks = '/dashboard/category'
  // const categoryAddLinks = '/dashboard/category/add'
  // const categoryManageLinks = '/dashboard/category/manage'
  // const userLinks = '/dashboard/user'
  // const financialLinks = '/dashboard/financial'
  // const analyticsLinks = '/dashboard/analytics'
  // const feedPostLinks = '/dashboard/post-feed'
  // const messageLinks = '/dashboard/contact-message'
  // const notificationLinks = '/dashboard/notification'
  // const settingsLinks = '/dashboard/settings'
  // const transectionLinks = '/dashboard/transection'
  // const appsettingsLinks = '/dashboard/appsettings'
  // const salesReportLinks = '/dashboard/sales-report'
  const courseSalesLinks = '/dashboard/sales-report/course'
  const mentorshipSalesLinks = '/dashboard/sales-report/mentorship'
  const paymentMehodLinks = '/dashboard/payment-method'
  const paymentAccountLinks = '/dashboard/payment-account'
  const withdrawGatewayLinks = '/dashboard/withdraw-getway'
  // const bannerLinks = '/dashboard/banners'

  const toggleCategorySubmenu = () => {
    setCategorySubmenuOpen(!categorySubmenuOpen)
  }

  const toggleCourseSubmenu = () => {
    setCourseSubmenuOpen(!courseSubmenuOpen)
  }

  const toggleMentorshipSubmenu = () => {
    setMentorshipSubmenuOpen(!mentorshipSubmenuOpen)
  }

  const toggleFinancialSubmenu = () => {
    setFinancialSubmenuOpen(!financialSubmenuOpen)
  }

  const toggleSalesReportSubmenu = () => {
    setSalesReportSubmenuOpen(!salesReportSubmenuOpen)
  }

  // Notification handling
  const hideTimeouts: Record<string, NodeJS.Timeout | null> = {
    notification: null,
  }

  const fetchNotification = async () => {
    try {
      const response = await fetch('/api/notification')
      const data = await response.json()
      if (data.status === 200) {
        setNotificationData(data.notifications)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  const handleMouseEnter = (type: string) => {
    if (hideTimeouts[type]) {
      clearTimeout(hideTimeouts[type]!)
    }
    if (type === 'notification') {
      setNotificationOpen(true)
      fetchNotification()
    }
  }

  const handleMouseLeave = (type: string) => {
    hideTimeouts[type] = setTimeout(() => {
      if (type === 'notification') setNotificationOpen(false)
    }, 300)
  }

  const getNotificationIcon = (type: string) => {
    const iconMap: Record<string, React.JSX.Element> = {
      CoursePurchase: <BookOpen className="w-5 h-5" />,
      BookMentorShip: <Users className="w-5 h-5" />,
      Referral: <Gift className="w-5 h-5" />,
      AdminNotification: <Shield className="w-5 h-5" />,
      Broadcast: <Radio className="w-5 h-5" />,
      Other: <MoreHorizontal className="w-5 h-5" />,
    }
    return iconMap[type] || iconMap['Other']
  }

  const getNotificationColor = (type: string) => {
    const colorMap: Record<string, string> = {
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
  const markAsRead = async (notificationId: string) => {
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

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      if (response.ok) {
        window.location.href = '/'
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id)
    }

    if (notification.actionLink) {
      window.location.href = notification.actionLink
    }
  }

  const unreadCount = notificationData?.filter(n => !n.isRead).length || 0

  return (
    <div className="hidden mb-5 border-r bg-muted/40 md:block">
      <div className="flex flex-col h-full fixed md:w-[200px] lg:w-[280px] justify-between">
        <div className="flex h-14 py-3 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            to="/"
            className="flex items-center mt-2 mb-2 gap-2 font-semibold"
          >
            <img
              src="/assets/icon/logo.png"
              alt="smart academy"
              width={100}
              height={50}
            />
          </Link>
          <Button
            onClick={() => handleMouseEnter('notification')}
            variant="outline"
            size="icon"
            className="ml-auto h-8 w-8"
          >
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
                  className="absolute left-0 mt-2 w-[440px] max-h-[600px] bg-white rounded-xl shadow-xl border border-gray-100 z-[1000] overflow-hidden"
                >
                  {/* Notification dropdown content */}
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
                        <Link to="/notification">
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
                                  <img
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
                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}
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
                      <Link to="/notification">
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
          </Button>
        </div>

        {/* Navigation Menu */}
        <div
          className="flex h-fit max-h-screen overflow-y-scroll flex-col gap-2 mt-3 mx-1"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {/* Dashboard link */}
              <Link
                to="/dashboard"
                onClick={() => setActiveLink('/dashboard')}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  activeLink === '/dashboard'
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>

              {/* Course menu */}
              <div>
                <button
                  onClick={toggleCourseSubmenu}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    activeLink === '/dashboard/course'
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <MonitorPlay className="h-4 w-4" />
                  Course
                  <ChevronDown
                    className={`h-4 w-4 ml-auto transition-transform ${
                      courseSubmenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {courseSubmenuOpen && (
                  <div className="ml-8 flex flex-col gap-1">
                    <Link
                      to="/dashboard/course/add-new"
                      onClick={() => setActiveLink('/dashboard/course/add-new')}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        activeLink === '/dashboard/course/add-new'
                          ? 'bg-muted text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      Add Course
                    </Link>
                    <Link
                      to="/dashboard/course/"
                      onClick={() => setActiveLink('/dashboard/course/')}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        activeLink === '/dashboard/course/'
                          ? 'bg-muted text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      Manage Course
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/dashboard/course-type"
                        onClick={() => setActiveLink('/dashboard/course-type')}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                          activeLink === '/dashboard/course-type'
                            ? 'bg-muted text-primary'
                            : 'text-muted-foreground hover:text-primary'
                        }`}
                      >
                        Course Type
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Mentorship menu */}
              <div>
                <button
                  onClick={toggleMentorshipSubmenu}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    activeLink === '/dashboard/mentorship'
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <UserCheck className="h-4 w-4" />
                  Mentorship
                  <ChevronDown
                    className={`h-4 w-4 ml-auto transition-transform ${
                      mentorshipSubmenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mentorshipSubmenuOpen && (
                  <div className="ml-8 flex flex-col gap-1">
                    <Link
                      to="/dashboard/mentorship/add-plan"
                      onClick={() =>
                        setActiveLink('dashboard/mentorship/add-plan')
                      }
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        activeLink === 'dashboard/mentorship/add-plan'
                          ? 'bg-muted text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      Add Plan
                    </Link>
                    <Link
                      to="/dashboard/mentorship/all-plan"
                      onClick={() =>
                        setActiveLink('/dashboard/mentorship/all-plan')
                      }
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        activeLink === '/dashboard/mentorship/all-plan'
                          ? 'bg-muted text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      Manage Plan
                    </Link>
                    <Link
                      to="/dashboard/mentorship/booked-mentorship"
                      onClick={() =>
                        setActiveLink('/dashboard/mentorship/booked-mentorship')
                      }
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        activeLink === '/dashboard/mentorship/booked-mentorship'
                          ? 'bg-muted text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      Booked Mentorship
                    </Link>
                  </div>
                )}
              </div>

              {/* Admin-only menus */}
              {user.role === 'admin' && (
                <>
                  {/* Categories */}
                  <div>
                    <button
                      onClick={toggleCategorySubmenu}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        activeLink === '/dashboard/category'
                          ? 'bg-muted text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      <Package className="h-4 w-4" />
                      Categories
                      <ChevronDown
                        className={`h-4 w-4 ml-auto transition-transform ${
                          categorySubmenuOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {categorySubmenuOpen && (
                      <div className="ml-8 flex flex-col gap-1">
                        <Link
                          to="/dashboard/category"
                          onClick={() =>
                            setActiveLink('/dashboard/category/manage')
                          }
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                            activeLink === '/dashboard/category/manage'
                              ? 'bg-muted text-primary'
                              : 'text-muted-foreground hover:text-primary'
                          }`}
                        >
                          Manage Categories
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* User management */}
                  <Link
                    to="/dashboard/user"
                    onClick={() => setActiveLink('/dashboard/user')}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      activeLink === '/dashboard/user'
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    User
                  </Link>
                </>
              )}

              {/* Sales Reports */}
              <div>
                <button
                  onClick={toggleSalesReportSubmenu}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    activeLink === '/dashboard/sales-report'
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <BarChart2Icon className="h-4 w-4" />
                  Sales Report
                  <ChevronDown
                    className={`h-4 w-4 ml-auto transition-transform ${
                      salesReportSubmenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {salesReportSubmenuOpen && (
                  <div className="ml-8 flex flex-col gap-1">
                    <Link
                      to={courseSalesLinks}
                      onClick={() => setActiveLink(courseSalesLinks)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        activeLink === courseSalesLinks
                          ? 'bg-muted text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      Course Sales
                    </Link>
                    <Link
                      to={mentorshipSalesLinks}
                      onClick={() => setActiveLink(mentorshipSalesLinks)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        activeLink === mentorshipSalesLinks
                          ? 'bg-muted text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      Mentorship Sales
                    </Link>
                  </div>
                )}
              </div>

              {/* Financial submenu */}
              <div>
                <button
                  onClick={toggleFinancialSubmenu}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    activeLink === '/dashboard/category'
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <CreditCardIcon className="h-4 w-4" />
                  Financial
                  <ChevronDown
                    className={`h-4 w-4 ml-auto transition-transform ${
                      financialSubmenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {financialSubmenuOpen && (
                  <div className="ml-8 flex flex-col gap-1">
                    <Link
                      to="/dashboard/payment"
                      onClick={() => setActiveLink('/dashboard/payment')}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        activeLink === '/dashboard/payment'
                          ? 'bg-muted text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      Payment
                    </Link>
                    <Link
                      to={paymentAccountLinks}
                      onClick={() => setActiveLink(paymentAccountLinks)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        activeLink === paymentAccountLinks
                          ? 'bg-muted text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      Manage Account
                    </Link>
                    {user.role === 'admin' && (
                      <>
                        <Link
                          to={paymentMehodLinks}
                          onClick={() => setActiveLink(paymentMehodLinks)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                            activeLink === paymentMehodLinks
                              ? 'bg-muted text-primary'
                              : 'text-muted-foreground hover:text-primary'
                          }`}
                        >
                          Payment Method
                        </Link>
                        <Link
                          to="/dashboard/payment-request"
                          onClick={() =>
                            setActiveLink('/dashboard/payment-request')
                          }
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                            activeLink === '/dashboard/payment-request'
                              ? 'bg-muted text-primary'
                              : 'text-muted-foreground hover:text-primary'
                          }`}
                        >
                          Payment Request
                        </Link>
                        <Link
                          to={withdrawGatewayLinks}
                          onClick={() => setActiveLink(withdrawGatewayLinks)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                            activeLink === withdrawGatewayLinks
                              ? 'bg-muted text-primary'
                              : 'text-muted-foreground hover:text-primary'
                          }`}
                        >
                          Withdraw Gateway
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Admin-only menus continued */}
              {user.role === 'admin' && (
                <>
                  <Link
                    to="/dashboard/banners"
                    onClick={() => setActiveLink('/dashboard/banners')}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      activeLink === '/dashboard/banners'
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Banners
                  </Link>
                  <Link
                    to="/dashboard/post-feed"
                    onClick={() => setActiveLink('/dashboard/post-feed')}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      activeLink === '/dashboard/post-feed'
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <GlobeAltIcon className="h-4 w-4" />
                    Feed Post
                  </Link>
                  <Link
                    to="/dashboard/contact-message"
                    onClick={() => setActiveLink('/dashboard/contact-message')}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      activeLink === '/dashboard/contact-message'
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Contact Message
                  </Link>
                  <Link
                    to="/dashboard/admission-message"
                    onClick={() =>
                      setActiveLink('/dashboard/admission-message')
                    }
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      activeLink === '/dashboard/admission-message'
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <LucideMessageSquareCode className="h-4 w-4" />
                    Admission Box
                  </Link>
                  <Link
                    to="/dashboard/notification"
                    onClick={() => setActiveLink('/dashboard/notification')}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      activeLink === '/dashboard/notification'
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <Bell className="h-4 w-4" />
                    Notification
                  </Link>
                </>
              )}

              {/* Meeting link */}
              <Link
                to="/meeting"
                onClick={() => setActiveLink('/meeting')}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  activeLink === '/meeting'
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Video className="h-4 w-4" />
                Online Class
              </Link>

              {/* More admin-only menus */}
              {user.role === 'admin' && (
                <>
                  <Link
                    to="/dashboard/ads-promo"
                    onClick={() => setActiveLink('/dashboard/ads-promo')}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      activeLink === '/dashboard/ads-promo'
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <Megaphone className="h-4 w-4" />
                    Ads-Promo
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setActiveLink('/dashboard/settings')}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      activeLink === '/dashboard/settings'
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    Setting
                  </Link>
                </>
              )}

              {/* Transaction link */}
              <Link
                to="/dashboard/transection"
                onClick={() => setActiveLink('/dashboard/transection')}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  activeLink === '/dashboard/transection'
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <BadgeDollarSign className="h-4 w-4" />
                Transaction
              </Link>
            </nav>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="mt-auto p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>
                    {user.name?.substring(0, 2) || 'UN'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.role}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link to="/dashboard/admin-profile">
                  <DropdownMenuItem>
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
