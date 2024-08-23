import { Routes, Route } from "react-router-dom";
import Home from "./pages/homepage"
import About from "./pages/about"
import Contact from "./pages/contact"
import Register from "./pages/Register";
import Pagenotfound from "./pages/pagenotfound"
import Login from "./pages/Login"
import CartPage from "./pages/Cartpage";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path = "/" element= {<Home/>}/>
          <Route path = "/register" element= {<Register/>}/>
          <Route path = "/login" element= {<Login/>}/>
          <Route path = "/about" element= {<About/>}/>
          <Route path = "/cart" element= {<CartPage/>}/>
          <Route path = "/contact" element= {<Contact/>}/>
          <Route path = "*" element= {<Pagenotfound/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
