import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { baseURL } from '../../utils/baseUrl'
import { useQuery } from 'react-query'

export default function Categories() {

  async function getCategories(){
    return axios.get(baseURL+'categories/')
  }
  let {data , isLoading} = useQuery('getCategories',getCategories)
  console.log(data?.data?.data);

  // const [data,setCategories]= useState([])
  // async function getCategories(){
  //   let {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/categories/')
  //   setCategories(data.data)
  //   console.log(data);
  // }
  // useEffect(()=>{
  //   getCategories()
  // },[])

  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 7,
  //   slidesToScroll: 1,
  //   adaptiveHeight:true,
  //   autoplay:true,
  //   autoplaySpeed:1000,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 5,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: true
  //       }}
  //   ]

  // }

  if(isLoading) return <div className="fa fa-spinner fa-spin d-flex justify-content-center fa-5x mt-5 text-main"></div>
  return (
    // <div className='container my-5'>
    //   <h3>Shop Popular Categories</h3>
    //   <Slider {...settings} >
    //     {
    //       data?.data?.data?.map((val)=>(
    //         <div className='px-1'>
    //           <img src={val.image} className='w-100' height={250} alt="" />
    //           <h5>{val.name}</h5>
    //         </div>
    //       ))
    //     }  


    //   </Slider>
    // </div>

  <>
  <div className="container py-5">
    <div className="row g-4">
      {data?.data.data.map((item) => {
            return <div className="col-md-4 ">
            <div className="card brand">
              <div className="card-img">
                <img src={item.image} className=' w-100 ' height={550} alt="" />
              </div>
              <div className="card-body">
                <h5 className='text-center'>{item.name}</h5>
              </div>
            </div>
          </div>
          })}
    </div>
  </div>
  </>

  )
}
