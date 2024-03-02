import React from 'react'
import { baseURL } from '../../utils/baseUrl'
import axios from 'axios'
import { useQuery } from 'react-query';

export default function Brands() {

  async function getBrands(){
    return await axios.get(baseURL+'brands')
    // console.log(data.data);
  }

  let {data , isLoading} = useQuery('getBrands',getBrands)

  console.log(data?.data.data[0].image);
  console.log(isLoading);

  
  




  if(isLoading) return <div className="fa fa-spinner fa-spin d-flex justify-content-center fa-5x mt-5 text-main"></div>
  return (
    <>
    <h1 className='mt-5 text-main fw-bolder text-uppercase text-center'>Brands</h1>
      <div className="container my-5">
        <div className="row g-5">
          {data?.data.data.map((item , index) => {
            return <div  className="col-md-3">
            <div className="card brand" data-bs-toggle="#exampleModal">
              <div className="card-img">
                <img src={item.image} className='w-100'  alt="" />
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
