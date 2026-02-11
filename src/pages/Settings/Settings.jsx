import { useState , useEffect , useContext  } from "react"
import SideMenu from '../../components/SideMenu/SideMenu'
import Header from '../../components/Header/Header'
import "./settings.css"
import img from "../../../public/placeholder-image-person-jpg.jpg"
import { db , auth } from '../../js/firebase-config'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { ThemeContext } from "../../js/theme"
const adminCollection = collection(db, "admins")

export default function Settings() {
  const [activeMenu, setActiveMenu] = useState(false)
  const [admin, setAdmin] = useState([])
  const [adminInputs, setAdminInputs] = useState({ name: "", email: "", img: null })
  const {theme} = useContext(ThemeContext)
  const getAdmin = async () => {
    try {
    const data = await getDocs(adminCollection)
    const admins = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    setAdmin(admins[0])
    }
    catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getAdmin()
  }, [])
  useEffect(() => {
  if (admin) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAdminInputs({
      name: admin.name || "",
      email: admin.email || "",
      img: admin.image || null
    });
  }
  }, [admin]);
  const updateUser = async (e) => {
    e.preventDefault()
    try {
      const uadminRef = doc(db, "admins", admin.id)
      await updateDoc(uadminRef, {
        name: adminInputs.name,
        email: adminInputs.email,
        image:adminInputs.img
      })
    }
    catch (err) {
      console.error(err)
    }
  }
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
      return (
        <div >
          <SideMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <Header activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          <div className={`container ${activeMenu ? "active" : ""} ${theme === "dark" ? "dark-mode" : ""}`}>
            <div className="setting-box">
              <div className="inputs-box">
                <input onChange={(e)=>{setAdminInputs({...adminInputs , name:e.target.value})}} value={ adminInputs.name} type="text" placeholder='name..' />
                <input onChange={(e)=>{setAdminInputs({...adminInputs , email:e.target.value })}} value={ adminInputs.email} type="text" placeholder='email..' />
              </div>
              <div className="img-box">
                <img src={admin?.image || img} alt="img" />
              <input onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onloadend = ()=>{
                      setAdminInputs({...adminInputs , img:reader.result})
                    }
                    reader.readAsDataURL(file);
                  }
              }}  type="file" />
              </div>
              <a href="#" onClick={updateUser}>append changes</a>
              <a href="#" className='out' onClick={logOut}>logout</a>
            </div>
          </div>
        </div>
      )
}
