import React, { useContext, useEffect, useState } from "react";
import Categories from "../Categories/Categories";
import MainSlider from "../MainSlider/MainSlider";
import axios from "axios";
import Product from "../Product/Product";
import { useQuery } from "react-query";
import { baseURL } from "../../utils/baseUrl";
import { storeContext } from "../../context/storeContext";


export default function Products() {


  function getProducts(){
    return axios.get(baseURL+"products")
  }

  let {data , isLoading} = useQuery('getProducts',getProducts)
  // console.log(data?.data.data);
  


  // use react-query insted
  // let [products, setProducts] = useState([]);
  // let [loading, setLoading] = useState(true);

  // async function getProducts() {
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   // console.log(data.data);
  //   // console.log(data.data[0].imageCover);
  //   setProducts(data.data);
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);


  if(isLoading) return <div className="fa fa-spinner fa-spin d-flex justify-content-center fa-5x mt-5 text-main"></div>
  return (
    <>
      <div className="container my-5">
      <input className='search mx-auto form-control w-50 my-5' placeholder='search...'> 
          </input>
        <div className="row">
          {data?.data.data.map((item) => {
            return <Product item={item} key={item._id} />
          })}
        </div>
      </div>
    </>
  );
}
