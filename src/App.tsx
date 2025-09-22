import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import HomePage from './pages/homePage'
import TestPage from './pages/testPage'

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Layout>
  )
}

export default App
