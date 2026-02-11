import "./header.css"
import {   auth } from "../../js/firebase-config"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router"
import img from "../../../public/placeholder-image-person-jpg.jpg"


export default function Header({ setActiveMenu, activeMenu }) {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const currentAdmin = JSON.parse(localStorage.getItem("current-admin"))
    if (currentAdmin) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAdmin(currentAdmin)
    }
  }, [])

  // متابعة حالة الدخول
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        localStorage.removeItem("current-admin")
        navigate("/")
      }
    })
    return () => unsub()
  }, [navigate])

  return (
    <div className={activeMenu ? "header active" : "header"}>
      <i onClick={() => setActiveMenu(!activeMenu)} className="bi bi-list"></i>
      <ul>
        <li>
          <div className="admin">
            <h3>{admin?.name}</h3>
            <img src={admin?.image || img} alt="" />
          </div>
        </li>
        <li><i className="bi bi-bell"></i></li>
        <li><i className="bi bi-envelope"></i></li>
      </ul>
    </div>
  )
}

