import React from 'react';
import {Link} from "react-router-dom";
import LogoutButton from "./LogoutButton.jsx";

const Topbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className="navbar-nav ml-auto">

        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" id="userDropdown" role="button"
             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

            <LogoutButton />
          </a>
        </li>

      </ul>
    </nav>
  );
}

export default Topbar;
