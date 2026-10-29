import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './styles/tokens.css'
import './index.css'
import './styles/forms.css'
import './styles/admin.css'
import { initTheme } from './lib/theme.js'

initTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
