import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { storeContext } from "../../context/storeContext";
import { toast } from "react-toastify";

export default function ProductDetails() {

  let {counter,setCounter ,addToCart} = useContext(storeContext)


  let { id } = useParams();
  console.log(id);
  let [product, setProduct] = useState({});
  let [loading, setLoading] = useState(true);
  let [btnLoading , setBtnLoading] = useState(true)

  async function addProductToCart(productId){
    setBtnLoading(false)
    let data = await addToCart(productId)
    console.log(data);
    if(data.status=='success'){
      toast.success('Product Added to Cart')
      setBtnLoading(true)
      setCounter(data.numOfCartItems)
      // console.log(data.numOfCartItems)
    }

  }

  async function getProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProduct(data.data);
    setLoading(false);
  }

  useState(() => {
    getProduct();
  }, []);

  if (loading)
    return (
      <div className="fa fa-spinner fa-spin d-flex justify-content-center fa-5x mt-5 text-main"></div>
    );
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <img src={product.imageCover} className="w-100" alt="" />
          </div>

          <div className="col-md-9 mt-5">
            <h4>{product.title}</h4>
            <p className="my-3">{product.description}</p>
            <div>
              <span>{product.category.name}</span>

              <div className="d-flex justify-content-between my-4">
                <div>{product.price} EGP</div>
                <div>
                  <div>
                    <i className="fa fa-star rating-color"></i>
                    <span>{product.ratingsAverage}</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => {addProductToCart(id)}} className="btn bg-main text-white w-100">
            {btnLoading?'Add to Cart': 'loading...'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
