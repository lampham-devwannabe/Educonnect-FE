import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import PublicLayout from '@/layouts/publicLayout'
import AuthenLayout from '@/layouts/authenLayout'
import Login from '@/pages/authen/login'
import Profile from './pages/public/profile'
import Home from './pages/public/homePage'
import Register from '@/pages/authen/register'
import ForgotPassword from '@/pages/authen/forgotPassword'
import ResetPassword from '@/pages/authen/reset-password'
import path from 'path'
import MentorDetails from './pages/public/mentor/page'
import AllMentor from './pages/public/mentorlist/page'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Only redirect if authentication check is complete AND user is not authenticated
  if (!isAuthenticated && !isLoading) {
    // Store the location they were trying to access so we can redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

// Routes that require authentication
const protectedRoutes = [
  {
    path: '/profile',
    element: <Profile />,
  },
  // Add other protected routes...
]

// Public routes - accessible without authentication
const publicRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/mentor',
    element: <MentorDetails />,
  },
  {
    path: '/mentorlist',
    element: <AllMentor />,
  },
]

const authenRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
]

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={<PublicLayout>{route.element}</PublicLayout>}
        />
      ))}

      {/* Protected routes */}
      {protectedRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute>
              <PublicLayout>{route.element}</PublicLayout>
            </ProtectedRoute>
          }
        />
      ))}

      {/* Authentication layout routes */}
      {authenRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={<AuthenLayout>{route.element}</AuthenLayout>}
        />
      ))}

      {/* Catch all unmatched routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
