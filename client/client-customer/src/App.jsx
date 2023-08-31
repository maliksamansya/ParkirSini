// import './styles.css'
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import {Outlet} from "react-router-dom";
import NavigationBar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="defaultHome">
      <NavigationBar />
      <Outlet />
      <Footer />
    </div>

  )
}

export default App
