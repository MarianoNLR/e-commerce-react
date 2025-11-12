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
import { SearchProduct } from './pages/SearchProduct/SearchProduct.jsx'
import { AddProductPage } from './pages/Moderation/AddProductPage/AddProductPage.jsx'
import { CheckoutCustomerPage } from './pages/Checkout/CheckoutCustomerPage.jsx'
import { CheckoutConfirmationPage } from './pages/Checkout/CheckoutConfirmationPage.jsx'
import { PaymentMethodSelectionPage } from './pages/Checkout/PaymentMethodSelectionPage.jsx'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute.jsx'
import { OrdersViewPage } from './pages/Moderation/OrdersViewPage/OrdersViewPage.jsx'
import { UpdateProductPage } from './pages/Moderation/UpdateProductPage/UpdateProductPage.jsx'
import { StockPage } from './pages/Moderation/StockPage/StockPage.jsx'
import { OrderDetailsView } from './pages/Moderation/OrderDetailsView/OrderDetailsView.jsx'
import AuthGoogleSuccessPage from './pages/AuthGooglePage/AuthGoogleSuccessPage.jsx'
import { AuthModalProvider } from './context/AuthModalContext.jsx'
function App() {

  return (
    <>
      
        <AuthProvider>
          <AuthModalProvider>
            <CartProvider>
                <Layout>
                  <Routes>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/auth/google/success' element={<AuthGoogleSuccessPage />} />
                    <Route index path='/' element={<HomePage />}></Route> 
                    <Route path='/products/product/:productId' element={<ProductView/>}></Route>
                    <Route path='/products/search/' element={<SearchProduct/>}></Route>
                    <Route path='/cart/:userId' element={
                      <ProtectedRoute>
                        <CartViewPage />
                      </ProtectedRoute>
                    }></Route>
                    <Route path='/products/:categoryId' element={< CategoryProducts/>}></Route>
                    <Route path='/moderation/add_product' element={
                      <ProtectedRoute isAllowedRoles={['admin', 'moderator']}>
                        <AddProductPage />
                      </ProtectedRoute>
                    } />
                    <Route path='/moderation/orders' element={
                      <ProtectedRoute isAllowedRoles={['admin', 'moderator']}>
                        <OrdersViewPage />
                      </ProtectedRoute>
                    } />
                    <Route path='/moderation/orders/:orderId' element={
                      <ProtectedRoute isAllowedRoles={['admin', 'moderator']}>
                        <OrderDetailsView />
                      </ProtectedRoute>
                    } />
                    <Route path='/moderation/stock' element={
                      <ProtectedRoute isAllowedRoles={['admin', 'moderator']}>
                        <StockPage />
                      </ProtectedRoute>
                    } />
                    
                    <Route path='/checkout/customer' element={
                      <ProtectedRoute>
                        <CheckoutCustomerPage />
                      </ProtectedRoute>
                    } />
                    <Route path='/checkout/payment_method_selection' element={
                      <ProtectedRoute>
                        <PaymentMethodSelectionPage />
                      </ProtectedRoute>
                    } />
                    <Route path='/checkout/confirmation' element={
                      <ProtectedRoute>
                        <CheckoutConfirmationPage />
                      </ProtectedRoute>
                    } />

                    <Route path='/moderation/update_product/:productId' element={
                      <ProtectedRoute isAllowedRoles={['admin', 'moderator']}>
                        <UpdateProductPage />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </Layout>
              </CartProvider>
            </AuthModalProvider>
          </AuthProvider>
       
    </>
  )
}

export default App
