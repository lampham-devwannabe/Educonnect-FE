import { AuthProvider } from './providers/AuthProvider'
import AppRoutes from './AppRoutes'
import LanguageProvider from '@/providers/LanguageProvider'
import ErrorBoundary from '@/components/errorBoundary'

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ErrorBoundary>
    </LanguageProvider>
  )
}

export default App
