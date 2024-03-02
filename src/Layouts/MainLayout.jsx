import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Categories from '../Components/Categories/Categories'
import MainSlider from '../Components/MainSlider/MainSlider'

export default function 
() {
  return (
    <>
        <Navbar/>
        {/* <MainSlider/> */}
        {/* <Categories/> */}
        <Outlet/>
    </>
  )
}
