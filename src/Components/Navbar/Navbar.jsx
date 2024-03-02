import React, { useContext, useEffect } from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { storeContext } from '../../context/storeContext';



export default function Navbar() {
  
  const {counter , showCart ,setCounter , showWishList, wishCounter , setWishCounter ,removeToken} = useContext(storeContext)
  // console.log(counter);

  useEffect(()=>{
    (async()=>{
      let data = await showCart()
      // console.log(data);
      // console.log('showCart');
      if(data.status=='success'){
        setCounter(data.numOfCartItems)
        //send num of items to set counter which changes in the cart counter
      }

      let wishData = await showWishList()
      // console.log(wishData);
      if(wishData.status=='success'){
        setWishCounter(wishData.count)
        // console.log(wishData.count);
      }
    })()
  }, [])

  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-light bg-light ">
  <div className="container-fluid mx-3">
    
    <NavLink className="navbar-brand fw-bold fs-3" to="/home">
    <img src={logo} alt="" />
    </NavLink>
    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="/collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    
    <div className="collapse navbar-collapse" id="collapsibleNavId">
      <ul className="navbar-nav me-auto mt-2 mt-lg-0">

        <li className="nav-item">
          <NavLink className="nav-link" to="/home">Home</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/products">Products</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/categories">Categories</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/brands">Brands</NavLink>
        </li>


      </ul>


      <ul className="navbar-nav mt-2 mt-lg-0 ms-auto">

        <li className="nav-item mx-2">
          <NavLink className="nav-link position-relative" to="/cart">Cart
            <i className="fa-solid fa-cart-shopping mx-1 navIcon"></i>
            {counter?<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {counter}
                <span className="visually-hidden">unread messages</span>
              </span>:''}
          </NavLink>
        </li>

        <li className="nav-item mx-2">
          <NavLink className="nav-link position-relative" to="/wishlist">Whishlist
            <i className="fa-solid fa-heart  navIcon "></i>
            {wishCounter?<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {wishCounter}
              <span className="visually-hidden">unread messages</span>
            </span>:''}
          </NavLink>
        </li>


        <li className="nav-item">
          <NavLink onClick={()=> removeToken()} className="nav-link" to="/signin">SignOut</NavLink>
        </li>


      </ul>
    </div>
    
  </div>
    </nav>

        

    </>
  )
}
