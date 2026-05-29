import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ProvideContext from './context/ProvideContext.jsx'

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <ProvideContext>
         <App/>
      </ProvideContext>
   </BrowserRouter>
)
