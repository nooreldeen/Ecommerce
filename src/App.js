import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import {RouterProvider , createBrowserRouter} from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Signout from './Components/Signout/Signout'
import Wishlist from './Components/Wishlist/Wishlist'
import Signup from './Components/Signup/Signup'
import Signin from './Components/Signin/Signin'
import AuthLaout from './Layouts/AuthLaout'
import MainSlider from './Components/MainSlider/MainSlider'
import NotFound from './Components/NotFound/NotFound'
import { Offline,Online } from 'react-detect-offline'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import StoreContextProvider from './context/storeContext'
import { ToastContainer } from 'react-toastify';
import Address from './Components/Address/Address'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import Verify from './Components/Verify/Verify'
import ResetPassword from './Components/ResetPassword/ResetPassword'


export default function App() {

  let routes = createBrowserRouter([
    {path:'/',element:<MainLayout/>,children:[
      {index:true, element:<ProtectedRoutes> <Home /> </ProtectedRoutes>},
      {path:'home', element:<ProtectedRoutes><Home /></ProtectedRoutes>},
      {path:'navbar',element:<ProtectedRoutes><Navbar /></ProtectedRoutes>},
      {path:'products',element:<ProtectedRoutes><Products /></ProtectedRoutes>},
      {path:'categories',element:<ProtectedRoutes><Categories /></ProtectedRoutes>},
      {path:'brands',element:<ProtectedRoutes><Brands /></ProtectedRoutes>},
      {path:'cart',element:<ProtectedRoutes><Cart /></ProtectedRoutes>},
      {path:'wishlist',element:<ProtectedRoutes><Wishlist /></ProtectedRoutes>},
      {path:'signout',element:<ProtectedRoutes><Signout /></ProtectedRoutes>},
      {path:'product-details/:id',element:<ProtectedRoutes><ProductDetails /></ProtectedRoutes>},
      {path:'address/:id',element:<ProtectedRoutes><Address /></ProtectedRoutes>},
      
      {path:'*',element:<NotFound/>}

    ]},
    {path:'/',element:<AuthLaout/>,children:[
      {path:'signup', element:<Signup/>},
      {path:'signin', element:<Signin/>},
      {path:'forget-password', element:<ForgetPassword/>},
      {path:'verify-code', element:<Verify/>},
      {path:'reset-password', element:<ResetPassword/>},
    ]}
  ])


  return (
    <>
      {/* <Online> */}
      <ToastContainer theme='colored' autoClose={500}/>
      <StoreContextProvider>
        <RouterProvider router={routes}/>
      </StoreContextProvider>

      {/* </Online> */}
      
      <Offline>
          <div className='offline'>
            You are offline Now!
          </div>
      </Offline>

      

    </>
  )
}
