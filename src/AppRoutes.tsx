import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import Layout from '@/components/layout'
import Login from './pages/login'
import Profile from './pages/profile'
import Home from './pages/homePage'
import Register from './pages/register'

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
]

const noLayoutRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
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
          element={<Layout>{route.element}</Layout>}
        />
      ))}

      {/* Protected routes */}
      {protectedRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute>
              <Layout>{route.element}</Layout>
            </ProtectedRoute>
          }
        />
      ))}

      {/* No layout routes */}
      {noLayoutRoutes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {/* Catch all unmatched routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
