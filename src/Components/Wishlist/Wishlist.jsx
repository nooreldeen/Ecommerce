import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { baseURL } from '../../utils/baseUrl'
import { addToCart, storeContext } from '../../context/storeContext'
import { toast } from 'react-toastify'
import { Link, Navigate } from 'react-router-dom'



export default function WishList() {
  let {showWishList , setWishCounter ,addToCart ,setCounter ,removeItemWishlist} = useContext(storeContext)
  
  const [wishListItems , setWishListItems ] = useState([])
  const [loading,setLoading] = useState(true)
  let [btnLoading , setBtnLoading] = useState(true)


  // console.log(wishListItems?.data?.length);

    //function Kopry for addToCart fun as it returns promise
    async function addProductToCart(productId){
      setBtnLoading(false)
      let data = await addToCart(productId)
      // console.log(data);
      if(data.status=='success'){
        toast.success('Product Added to Wishlist')
        setBtnLoading(true)
        setCounter(data.numOfCartItems)
        // console.log(data.numOfCartItems)
      }
  
    }


  // function Kopry
  async function removeProductWish(id){
    let data = await removeItemWishlist(id)
    let showData = await showWishList()
    console.log(data);
    setWishCounter(data.data?.length)
    toast.error('Product Deleted From WishList')
    setWishListItems(showData)
  }





  useEffect(()=>{
    (async () => {
      let data = await showWishList()
      console.log(data);  
      if(data.status=='success'){
        setWishListItems(data)
        // console.log(data);
        // console.log(data?.data?.products[0]);
        setLoading(false)
      }
    })()

  }, [])

  // console.log(wishListItems?.data[0]._id);


  if(loading) return <div className="fa fa-spinner fa-spin d-flex justify-content-center fa-5x mt-5 text-main"></div>
  if(wishListItems?.data?.length==0 || wishListItems==0) {
  return <div className='text-center'>
    <h2 className='text-center my-5 text-main fw-bold '>Your Wishlist is Empty</h2>
    <span className='text-main fw-bold'>Add Some...
    <Link to={'/products'} className='btn bg-main text-white ms-3 fw-bold'>Products</Link>
    </span>
    </div>
  }

  if(loading) return <div className="fa fa-spinner fa-spin d-flex justify-content-center fa-5x mt-5 text-main"></div>
  return (
    <>
      <div className="container my-4 bg-body-secondary rounded-4 py-3 px-4 ">

          <div className="d-flex justify-content-between align-items-center">
          <h2 className='fw-bold py-3 '>Wishlist Products :</h2>
          </div>

          
          {wishListItems.data?.map(item => {
            
           return <div key={item?._id} className="row py-2 align-items-center my-2 border-bottom" >
              <div className="col-md-2">
                <img src={item.imageCover} className='w-100' alt="" />
              </div>

              <div className="col-md-8">
                  <h5>{(item.title)}</h5>
                  <h6 className='text-main my-3'>Price: {item.price} EGP</h6>
                  <button onClick={()=> removeProductWish(item._id)} className='btn p-0'><i 
                    class="fa-solid fa-trash-can text-main cursor-pointer me-1"></i> Remove</button>
              </div>

              <div className="col-md-2">

                <button disabled={!btnLoading} onClick={() => addProductToCart(item._id)} 
                className="btn bg-main w-100 text-white">
                  {btnLoading?'Add to Cart': 'loading...'}            
                </button>


              </div>

            </div>
          })}

      </div>

    </>
  )
}
