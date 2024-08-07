import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage/LoginPage.jsx'
import { AuthProvider } from './components/AuthProvider.jsx'
import './App.css'
import { HomePage } from '../src/pages/HomePage/HomePage.jsx'
import Layout from './components/Layout/Layout.jsx'
import { ProductView } from './pages/ProductView/ProductView.jsx'

function App() {
  return (
    <>
    <AuthProvider>
        <Layout>
          <Routes>
            <Route index path='/login' element={<LoginPage />} />
            <Route path='/' element={<HomePage />}></Route> 
            <Route path='/products/:productId' element={<ProductView/>}></Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  )
}

export default App
