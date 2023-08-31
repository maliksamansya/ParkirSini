import React from 'react'
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";
import swal from "sweetalert2";

const Logout = () => {

  function handleLogout() {
    localStorage.clear();
    swal.fire('Logged Out', '', 'success');
  }

  return (
    <>
      <Link to="/" className="btn btn-warning btn-lg btn-block" onClick={handleLogout}>
        Logout
      </Link>
    </>
  )
}

export default Logout
