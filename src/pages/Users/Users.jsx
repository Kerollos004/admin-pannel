import { useState , useEffect , useContext } from "react"
import SideMenu from '../../components/SideMenu/SideMenu'
import Header from '../../components/Header/Header'
import "./users.css"
import { db } from '../../js/firebase-config'
import { getDocs, collection , deleteDoc , doc } from 'firebase/firestore'
import img from "../../../public/placeholder-image-person-jpg.jpg"
import { ThemeContext } from "../../js/theme"
const usersCollection = collection(db, "users")


export default function Users() {
  const [activeMenu, setActiveMenu] = useState(false)
  const [input, setInput] = useState("")
  const [users, setUsers] = useState([])
  const [searchedUsers, setSearchedUsers] = useState([])
  const {theme} = useContext(ThemeContext)
    const getUsers = async () => {
    try { 
      const data = await getDocs(usersCollection)
        const filteredUsers = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setUsers(filteredUsers)
    }
    catch (err) {
      console.error(err)
    }
  }
  
  useEffect(() => {
    if (data.length == 0) {
      return <h3 className="no">no users</h3>
    }
    else {
      getUsers()
    }
  },[])

  const deleteUser = async (id) => {
    try {
      const userDoc = doc(db , "users" , id)
      await deleteDoc(userDoc)
    }
    catch (err) {
      console.error(err)
    }
    finally {
      getUsers()
    }
  }
  const searchUsers = () => {
    const searchedUsers = users.filter(user => {
      return user.userName.toLowerCase().includes(input.toLowerCase())
    })
    setSearchedUsers(searchedUsers)
  }
  const usersHtml = users.map(user => {
    return (
      <div className="user" key={user.id}>
        <div className="user-img"><img src={user?.userImg || img} alt="img" /></div>
        <h3>  name : {user?.userName} </h3>
        <h3> orders : {user?.orders}</h3>
        <h3>  earning : {user?.totalEarns}$</h3>
        <h3>  status : <span className={user.orderStatus?" status done":" status canceled"}>{user?.orderStatus ? "done" : "canceled"}</span> </h3>
        <i onClick={()=>{deleteUser(user.id)}} className="bi bi-trash"></i>
      </div>
    )
  })
  const searchedUsersHtml = searchedUsers.map(user => {
    return (
      <div className="user" key={user.id}>
        <div className="user-img"><img src={user?.userImg || img} alt="img" /></div>
        <h3>  name : {user?.userName} </h3>
        <h3> orders : {user?.orders}</h3>
        <h3>  earning : {user?.totalEarns}$</h3>
        <h3>  status : <span className={user.orderStatus?" status done":" status canceled"}>{user?.orderStatus ? "done" : "canceled"}</span> </h3>
        <i onClick={()=>{deleteUser(user.id)}} className="bi bi-trash"></i>
      </div>
    )
  })
      return (
        <div >
          <SideMenu activeMenu={activeMenu } setActiveMenu={setActiveMenu} />
          <Header activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          <div className={`container ${activeMenu ? "active" : ""} ${theme === "dark" ? "dark-mode" : ""}`}>
            <div className="head">
              <h2>all users:</h2>
              <input onKeyUp={()=>{searchUsers()}} value={input} onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder='search users' />
            </div>
            <div className="users">
              {input == "" ? usersHtml : searchedUsersHtml}
            </div>

          </div>
        </div>
      )
}
