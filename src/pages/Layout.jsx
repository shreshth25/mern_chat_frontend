import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <div className="wrapper">
        <Navbar/>
        <Sidebar/>
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <Outlet/>
            </div>
          </div>
        </div>
        <Footer/>
      <aside className="control-sidebar control-sidebar-dark">
      </aside>
    </div>
  );
}

export default Layout;
