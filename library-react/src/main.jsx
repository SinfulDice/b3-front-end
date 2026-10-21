import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home/Home.jsx'
import './styles/global.css'
import { BrowserRouter } from 'react-router'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <App/>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
