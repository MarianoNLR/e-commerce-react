import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage/LoginPage.jsx'
import { AuthProvider } from './components/AuthProvider.jsx'
import './App.css'
import { HomePage } from '../src/pages/HomePage/HomePage.jsx'
import Layout from './components/Layout/Layout.jsx'
import { ProductView } from './pages/ProductView/ProductView.jsx'
import { CartViewPage } from './pages/CartView/CartViewPage.jsx'
import { CartProvider } from './components/CartProvider.jsx'
import { CategoryProducts } from './pages/CategoryProducts/CategoryProducts.jsx'

function App() {
  return (
    <>
    <AuthProvider>
      <CartProvider>
          <Layout>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route index path='/' element={<HomePage />}></Route> 
              <Route path='/products/product/:productId' element={<ProductView/>}></Route>
              <Route path='/cart/:userId' element={<CartViewPage />}></Route>
              <Route path='products/:categoryId' element={< CategoryProducts/>}></Route>
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App
