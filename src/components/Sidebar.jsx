import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const user = useSelector((state)=>state.user)
  const name = user.user.firstname
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <a href="index3.html" className="brand-link">
      <img
        src="dist/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        className="brand-image img-circle elevation-3"
        style={{ opacity: ".8" }}
      />
      <span className="brand-text font-weight-light">Manaze</span>
    </a>
    <div className="sidebar">
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img
            src="dist/img/AdminLTELogo.png"
            className="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div className="info">
          <a href="#" className="d-block">
            Welcome {name}
          </a>
        </div>
      </div>
      <nav className="mt-2">
        <ul
          className="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li className="nav-item menu-open">
            <a to="/" className="nav-link">
              <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Dashboard
                <i className="right fas fa-angle-left" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Home</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/holiday" className="nav-link">
                  <i className="far fa-circle nav-icon" />
                  <p>Manaze Holiday Calander</p>
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/logout" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Logout</p>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/aichat" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>AI Chat</p>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/users" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Users</p>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/attendance" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Attendance</p>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/progress" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Progress</p>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/profile" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Profile</p>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/upload" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Upload File</p>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/chat" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Group Chat</p>
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/privatechat" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Private Chat</p>
              </NavLink>
              </li>
              
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
  )
}

export default Sidebar
