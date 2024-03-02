import axios from "axios";
import { createContext, useState } from "react";
import { baseURL } from "../utils/baseUrl";
import { date } from "yup";
import { Navigate, useNavigate } from "react-router-dom";


export const storeContext = createContext()

export async function getAllProducts(){
    return axios.get(baseURL+"products")
  }

export let allProducts = await getAllProducts()

//   console.log(allProducts.data);

export async function addToCart(productId){
    return  axios.post(baseURL +  'cart',{productId},{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    .then(({data})=> data).catch(err=>err)

    
}

export async function addToWishlist(productId){

    return  axios.post(baseURL +  'wishlist',{productId},{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    .then(({data})=> data).catch(err=>err)
    
}

// export function redHeart(data,productId){
//     console.log(productId);
//     console.log(data?.data?.data?.length);
//     if(data?.data?.data?.length>0){
//         if(data.data.data.includes(productId)){
//             return true
//         }
//     }
  
// }




export async function removeItemWishlist(productId){
    return  axios.delete(baseURL +  'wishlist/'+ productId,{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    .then(({data})=> data).catch(err=>err)
    
}

export async function removeItem(productId){
    
    return  axios.delete(baseURL +  'cart/'+ productId,{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    .then(({data})=> data).catch(err=>err)
}


export function removeToken(){
    
    return localStorage.removeItem('token')

}


export async function updateQuantity(productId , count){
    return  axios.put(baseURL +  'cart/'+ productId,{count},{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    .then(({data})=> data).catch(err=>err)


    
}


async function showWishList(){
    return axios.get(baseURL + 'wishlist',{
        headers: {
            token : localStorage.getItem('token')
        }
    }).then(({data}) => data).catch(err => err)
    
}


async function showCart(){
    return axios.get(baseURL + 'cart',{
        headers: {
            token : localStorage.getItem('token')
        }
    }).then(({data}) => data).catch(err => err)
}

async function pay(cartId,shippingAddress){
    return axios.post(baseURL + 'orders/checkout-session/' + cartId, {shippingAddress}, {
        headers: {
            token : localStorage.getItem('token')
        }
    }).then(({data}) => data).catch(err => err)
}

async function clearCart(){
    console.log('Deleted');
    return axios.delete(baseURL + 'cart' ,{
        headers: {
            token : localStorage.getItem('token')
        }
    }).then(({data}) => data).catch(err => err)

    
    
}




export default function StoreContextProvider({children}){
    
    const [counter , setCounter] = useState(0)
    const [wishCounter , setWishCounter] = useState(0)
    // const [heart , setHeart] = useState(false)


    return <storeContext.Provider 
    value={{
        counter ,
        setCounter,
        addToCart,
        showCart,
        removeItem,
        updateQuantity ,
        pay,
        clearCart,
        showWishList,
        addToWishlist,
        wishCounter,
        setWishCounter,
        removeItemWishlist,
        removeToken,
        getAllProducts,
        allProducts
        // redHeart,
        // heart,
        // setHeart

        }}>

        {children}
        
    </storeContext.Provider>
}

