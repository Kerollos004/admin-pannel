import React, { useEffect, useState } from 'react'
import "./SideMenu.css"
import { Link } from 'react-router'
import {auth} from "../../js/firebase-config"
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { ThemeContext } from '../../js/theme'

export default function SideMenu({ activeMenu , setActiveMenu }) {
  const [themIcon, setThemeIcon] = useState("bi bi-moon")
  const { theme, setTheme } = useContext(ThemeContext)
  const [themBtn , setThemeBtn] = useState("dark mode")
  const navigate = useNavigate()
  const logOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
      localStorage.removeItem("current-admin")
    }
    catch (err) {
      console.error(err)
    }
  }
  const handleTheme = () => {
    if (theme == "light") {
      setTheme("dark")
      setThemeIcon("bi bi-brightness-high")
      setThemeBtn("light mode")
      localStorage.setItem("mode", "dark")
    }
    else {
      setTheme("light")
      setThemeIcon("bi bi-moon")
      setThemeBtn("dark mode")
      localStorage.setItem("mode", "light")
    }
  }

  useEffect(() => {
    const currentTheme = localStorage.getItem("mode")
    if (currentTheme == "dark") {
      setTheme("dark")
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeIcon("bi bi-brightness-high")
      setThemeBtn("light mode")
    }
    else {
      setTheme("light")
      setThemeIcon("bi bi-moon")
      setThemeBtn("dark mode")
    }
  }, [setTheme])
  
  return (
    <div className={activeMenu?'side-menu active':'side-menu'}>
      <ul>
        <li>
          <Link to={"/dashboard"}>
          <div>
            <i className="bi bi-house"></i>
            <p>dashboard</p>
          </div>
          </Link>
        </li>
        <li>
          <Link to={"/users"}>
          <div>
            <i className="bi bi-people"></i>
            <p>users</p>
          </div>
          </Link>
        </li>
        <li>
          <Link to={"/products"}>
          <div>
            <i className="bi bi-bag"></i>
            <p>products</p>
          </div>
          </Link>
        </li>
        <li>
          <Link to={"/settings"}>
          <div>
            <i className="bi bi-gear"></i>
            <p>settings</p>
          </div>
          </Link>
        </li>
          <li>
          <div onClick={handleTheme}>
            <i className={themIcon}></i>
            <p> {themBtn}</p>
          </div>
        </li>
        <li>
          <Link onClick={logOut}>
          <div className='log-out'>
            <i className="bi bi-box-arrow-left"></i>
            <p>logout</p>
          </div>
          </Link>
        </li>
      </ul>
      <i onClick={() => {
        setActiveMenu(false)
      }} className="bi bi-arrow-left back"></i>
    </div>
  )
}

