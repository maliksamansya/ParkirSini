import './sb-admin-2.css'
import Footer from "./components/Footer.jsx";
import {Outlet} from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";

function App() {
  return (
    <>
      <div id="wrapper">

        <Sidebar />

        {/*content wrapper*/}
        <div id="content-wrapper" className="d-flex flex-column">
          {/*main content*/}
          <div id="content">
            <Topbar />

            {/*page content start*/}
            <div className="container-fluid">
              <div className="row">

                <Outlet />


              </div>
            </div>
            {/*page content end*/}


          </div>
        </div>

      </div>


      <Footer />
    </>

  )
}

export default App
