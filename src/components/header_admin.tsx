import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Search, Menu } from 'lucide-react'
import { Input } from './ui/input'

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu"

import { useNavigate, Link } from 'react-router-dom'

const Header: React.FC = () => {
  const dashboardOptions = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Courses', path: '/dashboard/course' },
    { label: 'Add New Course', path: '/dashboard/course/add-new' },
    { label: 'Manage Courses', path: '/dashboard/course/' },
    { label: 'Course Types', path: '/dashboard/course-type' },
    { label: 'Mentorship', path: '/dashboard/mentorship' },
    { label: 'Add New Mentorship', path: '/dashboard/mentorship/add-new' },
    { label: 'Manage Mentorship', path: '/dashboard/mentorship/' },
    { label: 'Category', path: '/dashboard/category' },
    { label: 'Add Category', path: '/dashboard/category/add' },
    { label: 'Manage Category', path: '/dashboard/category/manage' },
    { label: 'Users', path: '/dashboard/user' },
    { label: 'Financial', path: '/dashboard/financial' },
    { label: 'Analytics', path: '/dashboard/analytics' },
    { label: 'Post Feed', path: '/dashboard/post-feed' },
    { label: 'Messages', path: '/dashboard/contact-message' },
    { label: 'Notifications', path: '/dashboard/notification' },
    { label: 'Settings', path: '/dashboard/settings' },
    { label: 'Transactions', path: '/dashboard/transection' },
    { label: 'App Settings', path: '/dashboard/appsettings' },
    { label: 'Sales Report', path: '/dashboard/sales-report' },
    { label: 'Course Sales', path: '/dashboard/sales-report/course' },
    { label: 'Mentorship Sales', path: '/dashboard/sales-report/mentorship' },
    { label: 'Payment Methods', path: '/dashboard/payment-method' },
    { label: 'Payment Accounts', path: '/dashboard/payment-account' },
    { label: 'Withdraw Gateway', path: '/dashboard/withdraw-getway' },
    { label: 'Banners', path: '/dashboard/banners' },
  ]

  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filteredLinks = dashboardOptions.filter(option =>
    option.label.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (path: string) => {
    setQuery('')
    navigate(path)
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            {dashboardOptions.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Search Box */}
      <div className="w-full flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search option..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query.length > 0 && (
            <ul className="absolute z-50 mt-1 w-full max-w-lg bg-white border rounded shadow-md">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => handleSelect(item.path)}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    {item.label}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No match found</li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* User Dropdown (nếu cần) */}
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </header>
  )
}

export default Header
