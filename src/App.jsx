import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { AuthProvider } from './components/AuthProvider.jsx'
import './App.css'
import { HomePage } from './pages/HomePage.jsx'

function App() {
  return (
    <>
    <AuthProvider>
        <Routes>
          <Route index path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />}></Route> 
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
