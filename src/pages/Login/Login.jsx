import React, { useState , useEffect  } from 'react'
import "./login.css"
import { auth , provider , db  } from '../../js/firebase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup , onAuthStateChanged } from 'firebase/auth'
import { collection, addDoc , getDocs , where , query } from 'firebase/firestore'
const adminsCollection = collection(db, "admins")
import { useNavigate } from 'react-router'
export default function Login() {
  const [admin, setAdmin] = useState({ name: "", email: "", password: "", image: "" })
  const [type, setType] = useState("password")
  const [currentState, setCurrentState] = useState("login")
  const navigate = useNavigate()
  ///////////////////////
  const handleTypeInput = () => {
    type == "password" ? setType("text"):setType("password")
  }
  const handleBtn = (e) => {
    e.preventDefault()
    currentState == "login" ? setCurrentState("create account"):setCurrentState("login")
  }
  //////////////////////////////////
  const createAccount = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, admin.email, admin.password)
      await addDoc(adminsCollection, {
      name: admin.name,
      email: admin.email,
      image: admin.image,
      })
      navigate("/dashboard")
    }
    catch (err) { console.error(err.message) }
    finally {
      setAdmin({ name: "", email: "", password: "", image: "" })
      setCurrentState("login")
    }
  }

    const login = async (e) => {
    e.preventDefault()
      try {
        await signInWithEmailAndPassword(auth, admin.email, admin.password)
        navigate("/dashboard")
      }
      catch (err) {console.error(err.message)}
      
  }
  
  
    const googleLogin = async (e) => {
    e.preventDefault()
      try {
        await signInWithPopup(auth, provider)
        navigate("/dashboard")
      }
      catch (err) {console.error(err.message)}
    }
  
useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Firestore query
      const q = query(adminsCollection, where("email", "==", user.email));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const adminData = snap.docs[0].data();
        localStorage.setItem("current-admin" , JSON.stringify(adminData))
      }

      navigate("/dashboard");
    } else {
      navigate("/");
      localStorage.removeItem("current-admin")
    }
  });

  return () => unsub();
}, [navigate]);



  return (
    <div className='login'>
    <form action="">
        <h3> {currentState} </h3>
        <input className={currentState=="create account"?'inp active':"inp"} onChange={(e)=>{setAdmin({...admin , name:e.target.value})}} value={admin.name} type="text" placeholder='user name' />
        <input onChange={(e) => { setAdmin({ ...admin, email: e.target.value }) }} value={admin.email} type="text" placeholder='email address' />
        <div className="pass">
          <input onChange={(e) => { setAdmin({ ...admin, password: e.target.value }) }} value={admin.password} type={type} placeholder='password' />
          <i onClick={handleTypeInput} className={type == "password" ?"bi bi-eye":"bi bi-eye-slash"}></i>
        </div>
        <div className={currentState=="create account"?"file active":"file"}>
            <label htmlFor="file">
              <i className="bi bi-card-image"></i>
            </label>
<input
  type="file"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setAdmin(prev => ({
          ...prev,
          image: reader.result  
        }));
      };

      reader.readAsDataURL(file); 
    }
  }}
/>

        </div>
        <a href="#" onClick={ currentState == "login" ? login : createAccount } >{currentState }</a>
        <a href="#"  onClick={googleLogin}> signin with google </a>
        <div className="other">
          <p> {currentState=="login"?"don,t have an account ?":" already have an account ?"} </p>
          <a href="#" onClick={handleBtn}> {currentState == "login" ? "create account" : "login"} </a>
        </div>
    </form>
    </div>
  )
}
