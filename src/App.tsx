import { AuthProvider } from './providers/AuthProvider'
import AppRoutes from './AppRoutes'
import LanguageProvider from '@/providers/LanguageProvider'
import ErrorBoundary from '@/components/errorBoundary'
import { Toaster } from 'react-hot-toast'

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <AuthProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </AuthProvider>
      </ErrorBoundary>
    </LanguageProvider>
  )
}

export default App
