import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/*sidebar brand*/}

      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">ParkirSini.com</div>
      </Link>

      {/*nav item dashboard*/}
      <li className="nav-item">
        <Link to="/" className="nav-link sidebar-brand d-flex align-items-center justify-content-center">
          <i className="fas fa-fw fa-table"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/landlords" className="nav-link sidebar-brand d-flex align-items-center justify-content-center">
          <i className="fas fa-fw fa-table"></i>
          <span>Landlords</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/customers" className="nav-link sidebar-brand d-flex align-items-center justify-content-center">
          <i className="fas fa-fw fa-table"></i>
          <span>Customers</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/parking-spaces" className="nav-link sidebar-brand d-flex align-items-center justify-content-center">
          <i className="fas fa-fw fa-table"></i>
          <span>ParkingSpaces</span>
        </Link>
      </li>
    </ul>
  )
}

export default Sidebar;
