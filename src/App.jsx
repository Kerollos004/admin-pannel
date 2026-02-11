
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Products from './pages/Products/Products'
import Settings from './pages/Settings/Settings'
import Users from './pages/Users/Users'
import  { useState } from 'react'
import { ThemeContext } from './js/theme'
import { Routes, Route } from 'react-router'

export default function App() {
  const [theme , setTheme] = useState("light")
  return (
    <ThemeContext.Provider value={{theme , setTheme}} >
      <Routes>
        <Route path='/' element={< Login />} />
        <Route path='dashboard' element={< Dashboard />} />
        <Route path='users' element={< Users />} />
        <Route path='products' element={< Products />} />
        <Route path='settings' element={< Settings />} />
      </Routes>
    </ThemeContext.Provider>
  )
}

