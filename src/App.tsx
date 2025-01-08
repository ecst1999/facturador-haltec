import { BrowserRouter } from "react-router"
import { PublicRouter } from "./router/"
import { NavBar } from "./layouts"


const App = ()  => {
  

  return (
    <BrowserRouter>
      <NavBar />
      <PublicRouter/>
    </BrowserRouter>
  )
}

export default App
