import Navbar from "./Components/Navbar"
import { useEffect, useState } from "react"
import jwtDecode from "jwt-decode"


const App = (props)=>{

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleIsLoggenIn = ()=>{
    setIsLoggedIn(!isLoggedIn)
  }

  useEffect(()=>{
    if( localStorage.getItem("token")){
      handleIsLoggenIn()
    }
  },[])





  return (
    <div>
        <h1>Product Catalouge</h1><hr/>
        <Navbar handleIsLoggenIn = {handleIsLoggenIn}/>
    </div>
  )
}

export default App
