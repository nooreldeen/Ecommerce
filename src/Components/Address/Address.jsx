import React, { useContext, useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { baseURL } from '../../utils/baseUrl'
import { storeContext } from '../../context/storeContext'

export default function Address() {

  let navigate = useNavigate()
  let {pay} = useContext(storeContext)

  const [errorMsg,setErrorMsg] = useState('')
  const [loading,setLoading] = useState(true)

  let {id} = useParams()

   async function sendDataToApi(values){
    setLoading(false)
    let data = await pay(id,values)
    if(data.status=='success'){
        window.location.href =data.session.url
      }
      
    
   }


  //Validation using yup libarary
//   function validationSchema(){
//     let shcema = new Yup.object({
//       email : Yup.string().email().required(),
//       password : Yup.string().matches(/^[A-Z][a-zA-Z0-9@]{6,}$/).required(),
//     })
//     return shcema
//   }

  let login = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    // custom validation using formik
    // validate, 

    // validationSchema,
    onSubmit:(values)=>{
      console.log(values);
      // send to api
      sendDataToApi(values)
    }
  })
  // console.log(login.errors);

  return (
    <>
      <div className="w-75 m-auto my-4">
        <h2>Location Details</h2>
        <form action="" onSubmit={login.handleSubmit} >
          

          <label htmlFor="details">Details:</label>
          <textarea placeholder='Type Your Details...' onBlur={login.handleBlur} onChange={login.handleChange} type="text" className='form form-control mb-3' 
          id='details' name='details' />

          <label htmlFor="phone">Phone:</label>
          <input placeholder='Type Your phone...' onBlur={login.handleBlur} onChange={login.handleChange} type="number" 
          className='form form-control mb-3 ' id='phone' name='phone' />

          <label htmlFor="city">Address:</label>
          <input placeholder='Type Your Address...' onBlur={login.handleBlur} onChange={login.handleChange} type="text" 
          className='form form-control mb-3 ' id='city' name='city' />

            <button disabled={!(login.dirty && login.isValid)} 
            className='btn btn-outline-info  w-100' type='submit' >
              {loading?'Pay':<i className='fa fa-spinner fa-spin'></i>}
            </button>
          
        </form>
      </div> 
    </>
  )
}
