import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import Layout from '@/components/layout'
import Login from '@/pages/login'
import Profile from '@/pages/profile'
import Home from '@/pages/homePage'
import Register from '@/pages/register'

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Store the location they were trying to access so we can redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

const protectedRoutes = [
  {
    path: '/profile',
    element: <Profile />,
  },
]

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

      {/* Protected routes */}
      {noLayoutRoutes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {/* Catch all unmatched routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
