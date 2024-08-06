import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { AuthProvider } from './components/AuthProvider.jsx'
import './App.css'
import { HomePage } from './pages/HomePage.jsx'
import Layout from './components/Layout/Layout.jsx'

function App() {
  return (
    <>
    <AuthProvider>
        <Layout>
          <Routes>
            <Route index path='/login' element={<LoginPage />} />
            <Route path='/' element={<HomePage />}></Route> 
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  )
}

export default App
