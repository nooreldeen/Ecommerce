import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../assets/images/freshcart-logo.svg'
import { Link, NavLink } from 'react-router-dom'


export default function AuthLaout() {
  return (
    <>


<nav className="navbar navbar-expand-sm navbar-light bg-light">
  <div className="container-fluid mx-3">
    
    <NavLink className="navbar-brand fw-bold fs-3" to="/home">
    <img src={logo} alt="" />
    </NavLink>
    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="/collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    
    <div className="collapse navbar-collapse" id="collapsibleNavId">

    </div>
    <ul className="navbar-nav me-auto mt-2 mt-lg-0 ms-auto">


        <li className="nav-item">
          <NavLink className="nav-link" to="/signin">SignIn</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">SignUp</NavLink>
        </li>


      </ul>
  </div>
    </nav>
        
        <Outlet/>
    </>
  )
}
