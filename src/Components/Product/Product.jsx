import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/storeContext";
import { toast } from "react-toastify";
import axios from "axios";
import { baseURL } from "../../utils/baseUrl";

export default function Product({item}) {

  let {counter , setCounter ,addToCart , addToWishlist , wishCounter , setWishCounter , showWishList ,allProducts} = useContext(storeContext)
  let [btnLoading , setBtnLoading] = useState(true)
  let [heart , setHeart] = useState(false)



  //function Kopry for addToCart fun as it returns promise
  async function addProductToCart(productId){
    setBtnLoading(false)
    let data = await addToCart(productId)
    // console.log(data.data);
    if(data.status=='success'){
      toast.success('Product Added to Cart')
      setBtnLoading(true)
      setCounter(data.numOfCartItems)
      // console.log(data.numOfCartItems)
    }

  }

  //function Kopry for addToCart fun as it returns promise
  async function addProductToWishlist(productId){
    let data = await addToWishlist(productId)
    console.log(data);
    if(data.status=='success'){
      toast.success('Product Added to Wishlist')
      setWishCounter(data.data.length)
      console.log(data?.data?.length);
      // if(data?.data?.length>0){
      //   console.log("its more than 1");
      //   if(data?.data?.includes(productId)){
      //     setHeart(true)
      //   }
      // }
      setHeart(true)
      // console.log(data.data.length)
    }
  }


  function getProducts(){
    let data = axios.get(baseURL+"products")
    console.log(data);
  }

  // console.log(allProducts.data.data);
  // let productIds = [...allProducts.data.data]
  // console.log(productIds);
    async function redHeart(){
      let data = await showWishList()
      let wishlist = [...data.data]
      // console.log(wishlist);
      let products = [...allProducts.data.data]
      let productIds = []
      for(let i =0 ;i<products.length;i++){
        productIds.push(products[i]._id)
      }
      let wishlistIds = []
      for(let i =0 ;i<wishlist.length;i++){
        wishlistIds.push(wishlist[i]._id)
      }


      
      console.log(wishlistIds);
      console.log(productIds);
      if(wishlist.length>0){
        for(let i =0 ; i<wishlist.length;i++){
          // console.log('from loop');
          if(wishlistIds.includes(productIds[i])){
            console.log('it contains ' + productIds[i]);
            setHeart(true)

          }



        }

      }
    }

    // redHeart()

  return (
    <>
      <div className="col-md-3 position-relative">
        <div className="product rounded-2 p-3 cursor-pointer">
          <div className="heart position-absolute" onClick={() => addProductToWishlist(item._id)}>
            <div disabled={!btnLoading}  className=" w-100 mt-1">
            {/* <i onClick={()=>redHeartIcon(item._id)} className="fa-solid fa-heart fs-3"></i> */}
              {heart?<i class="fa-solid fa-heart fs-3 text-danger"></i>:<i class="fa-solid fa-heart fs-3"></i>}
            </div>
          </div>
          <Link to={'/product-details/'+item._id}>
          <img src={item.imageCover} className="w-100 " alt="" />
          <span className="text-main">{item.category.name}</span>

          <div className="d-flex justify-content-between">

            <div className="">
              <h5 className="">{item.title.split(" ").slice(0, 2).join(" ")}</h5>
            </div>

          </div>

          <div className="mt-2 d-flex justify-content-between">
            <div>
              <span>{item.price} EGP</span>
            </div>
            <div>
              <i className="fa fa-star rating-color"></i>
              <span>{item.ratingsAverage}</span>
            </div>
          </div>
          </Link>

          <button disabled={!btnLoading} onClick={() => addProductToCart(item._id)} className="btn bg-main w-100 text-white mt-1">
            {btnLoading?'Add to Cart': 'loading...'}            
          </button>



          
        </div>
      </div>
    </>
  );
}
