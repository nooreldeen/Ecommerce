import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { baseURL } from '../../utils/baseUrl'
import { storeContext } from '../../context/storeContext'
import { toast } from 'react-toastify'
import { Link, Navigate } from 'react-router-dom'




export default function Cart() {

  let {showCart , removeItem ,setCounter ,updateQuantity , clearCart} = useContext(storeContext)
  
  const [cartItems , setCartItems ] = useState([])
  const [loading,setLoading] = useState(true)

  // function Kopry
  async function removeProduct(id){
    let data = await removeItem(id)
    setCartItems(data)
    console.log(data);
    setCounter(data.numOfCartItems)
    toast.error('Product Deleted From Cart')
  }

  // function Kopry
  async function deleteCart(){
    let data = await clearCart()
    console.log(data);
    setCartItems(data)
    setCounter(data.numOfCartItems)
    toast.error('Products Deleted From Cart')
    // Navigate to= (baseURL+'home')
  }

  // function Kopry
  async function updateQTY(id,count){
    let data = await updateQuantity(id,count)
    console.log(data);
    if(data.status == 'success'){
      setCartItems(data)
      console.log(data);
    }
    
  }


  useEffect(()=>{
    (async () => {
      let data = await showCart()
      // console.log(data);
      if(data.status=='success'){
        setCartItems(data)
        // console.log(data);
        setLoading(false)
      }
    })()

  }, [])

  if(loading) return <div className="fa fa-spinner fa-spin d-flex justify-content-center fa-5x mt-5 text-main"></div>
  if(cartItems.numOfCartItems==0 || cartItems==0) {
  return <div className='text-center'>
    <h2 className='text-center my-5 text-main fw-bold '>Your cart is Empty</h2>
    <span className='text-main fw-bold'>Add Some...
    <Link to={'/products'} className='btn bg-main text-white ms-3 fw-bold'>Products</Link>
    </span>
    </div>

  }
  // if(loading) return <div className="fa fa-spinner fa-spin d-flex justify-content-center fa-5x mt-5 text-main"></div>
  return (
    <>
      <div className="container my-4 bg-body-secondary rounded-4 py-3 px-4 ">

          <div className="d-flex justify-content-between align-items-center">
          <h2 className='fw-bold py-3 '>Shop Cart :</h2>
          <Link to={`/address/${cartItems.data?._id}`} className='btn bg-main text-white my-3 ms-auto'>Check Out</Link>
          </div>

          <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
          <span className='text-main fw-bold'>Total Cart Price: {cartItems?.data?.totalCartPrice} EGP </span>
          <span className='text-main fw-bold'>Toatal Number of Items: {cartItems.numOfCartItems} </span>
          </div>
          

          
          {cartItems.data?.products?.map(item => {
           return <div key={item?._id} className="row py-2 align-items-center my-2 border-bottom" >
              <div className="col-md-2">
                <img src={item.product.imageCover} className='w-100' alt="" />
              </div>

              <div className="col-md-8">
                  <h5>{(item.product.title)}</h5>
                  <h6 className='text-main my-3'>Price: {item.price} EGP</h6>
                  <button onClick={()=> removeProduct(item.product?._id)} className='btn p-0'><i class="fa-solid fa-trash-can text-main cursor-pointer me-1"></i> Remove</button>
              </div>

              <div className="col-md-2">
                <button onClick={()=> updateQTY(item.product?._id , item.count+1)} className='btn brdr '>
                  <i className="fa-solid fa-plus text-main cursor-pointer"></i>
                </button>
                <span className='mx-2' >{item.count}</span>
                <button onClick={item.count==1?()=>removeProduct(item.product?._id):()=> updateQTY(item.product?._id , item.count-1) }
                   className='btn brdr '>
                  <i className="fa-solid fa-minus text-main cursor-pointer"></i>
                </button>
              </div>


            </div>
          })}

          <Link to={'/home'} onClick={()=> deleteCart()} className='btn bg-main text-white d-block mx-auto mt-3'>Clear Cart</Link>
          
      </div>

    </>
  )
}
