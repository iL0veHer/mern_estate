import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import About from "./pages/about"

function App() {
  return <BrowserRouter>
    <Route>
      <Route path="/" element={<Home />}/>
      <Route path="/sign-in" element={<SignIn />}/>
      <Route path="/sign-up" element={<SignUp />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/about" element={<About />}/>
    </Route>
  </BrowserRouter>
}

export default App
