import { useState , useEffect , useContext } from "react"
import SideMenu from '../../components/SideMenu/SideMenu'
import Header from '../../components/Header/Header'
import "./products.css" 
import proImg from "../../../public/pro.jpeg"
import { db } from '../../js/firebase-config'
import { getDocs, collection, addDoc, updateDoc, doc } from 'firebase/firestore'
import { ThemeContext } from "../../js/theme"
const prosCollection = collection(db, 'products')


export default function Products() {
  const [btnState, SetBtnState] = useState("create")
  const [activeMenu, setActiveMenu] = useState(false)
  const [pros, setPros] = useState([])
  const [pro, setPro] = useState({name:"" , id:"", price:"" , bestSeller:false , image:"" })
  const [activeClass, setActiveClass] = useState(false)
  const { theme } = useContext(ThemeContext)
  
  const getProducts = async () => {
    try {
      const data = await getDocs(prosCollection)
      const filteredPros = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setPros(filteredPros)
    }
    catch(err){console.error(err)}
  }
  useEffect(() => {
    getProducts()
  }, [])
  const addProduct = async () => {
    try { 
      await addDoc(prosCollection, {
        productName:pro.name , 
        productImage: pro.image,
        price: pro.price ,
        bestSeller: pro.bestSeller,
        productId: pro.id,
      })
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setActiveClass(false)
      setPro({name:"" , id:"", price:"" , bestSeller:false , image:""})
    }
    getProducts()
  }
  const editProduct = (id) => {
    setActiveClass(true)
    SetBtnState("edit")
    const editedPro = pros.find((p) => p.id === id);
    if (editedPro) {
    setPro({
      name: editedPro.productName,
      image: editedPro.productImage,
      id: editedPro.id,
      price: editedPro.price,
      bestSeller:editedPro.bestSeller,
    })
    }
  }
  const updateProduct = async (e) => {
    e.preventDefault()
    try {
      const productRef = doc(db, "products", pro.id)
      await updateDoc(productRef, {
      productName: pro.name,
      productImage: pro.image,
      price: pro.price,
      bestSeller: pro.bestSeller,
      productId: pro.id,
    });
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setActiveClass(false)
      SetBtnState("create")
      setPro({name:"" , id:"", price:"" , bestSeller:false , image:"" })
    }
    getProducts()
  }


  const prosHtml = pros.map(pro => {
    return (
      <div className="pro" key={pro.id}>
        <div className="pro-img">
          <img src={pro?.productImage || proImg} alt="img" />
        </div>
        <h3>name: {pro?.productName}</h3>
        <h3> price: {pro?.price}$ </h3>
        <h3> orders: {pro?.orders} </h3>
        <span className={pro?.bestSeller?"bestSeller":""}> {pro?.bestSeller ? "best Seller" : ""} </span>
        <a href="#form"onClick={() => editProduct(pro.id)}> <i className="bi bi-pen"></i> edit </a>
      </div>
    )
  })
  return (
    <div >
      <SideMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <Header activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className={`container ${activeMenu ? "active" : ""} ${theme === "dark" ? "dark-mode" : ""}`}>
        <h3> all products </h3>

        <form action="" id='form' className={activeClass?"active":""}>
          <input onChange={(e)=>{setPro({...pro , id:e.target.value})}} value={pro.id} type="text" placeholder='id...' />
          <input onChange={(e)=>{setPro({...pro , name:e.target.value})}} value={pro.name} type="text" placeholder='name...' />
          <input onChange={(e)=>{setPro({...pro , price:e.target.value})}} value={pro.price} type="number" placeholder='price...' />
          <div className="check">
            <label htmlFor="">best seller:</label>
            <input onChange={(e)=>{setPro({...pro , bestSeller:e.target.checked})}} value={pro.bestSeller} type="checkbox" />
          </div>
          <input onChange={(e) => {
            const file = e.target.files[0]
            if (file) {
              const reader = new FileReader()
              reader.onloadend = ()=>{
                setPro({...pro , image:reader.result})
              }
              reader.readAsDataURL(file);
            }
        }}  type="file" className='file' />
          <a href="#" onClick={btnState == "create" ? addProduct : updateProduct}>{btnState} product</a>
        </form>
        <div className="pros-wrrap">
          {prosHtml}
        </div>

        <div className="add">
          <a href="#form" onClick={() => {
            // e.preventDefault()
            setActiveClass(true)
          }}> <i className="bi bi-plus"></i> add product </a>
        </div>

      </div>
    </div>
  )
  
}

