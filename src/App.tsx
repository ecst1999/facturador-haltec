import { BrowserRouter } from "react-router"
import { NavBar } from "./layouts"
import { RouterIndex } from "./router/"


const App = ()  => {
  

  return (
    <BrowserRouter>      
      <RouterIndex/>
    </BrowserRouter>
  )
}

export default App
