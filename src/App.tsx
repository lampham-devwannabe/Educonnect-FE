import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import HomePage from './pages/homePage'
import TestPage from './pages/testPage'
import Login from './pages/login'
import ModernRegister from './pages/register'
import LanguageProvider from './providers/LanguageProvider'

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/test"
          element={
            <Layout>
              <TestPage />
            </Layout>
          }
        />

        {/* No layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<ModernRegister />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App
