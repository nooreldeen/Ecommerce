import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'



// token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2IyY2MwODQ2MmFiMDJjNzFlNjhjYSIsIm5hbWUiOiJtb1NhbGFoIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDg3OTU5NDgsImV4cCI6MTcxNjU3MTk0OH0.ih8ebpl4GT6gNM3Cb9nRLx8JTZakXyoSDo4WFyxMv0M

export default function Verify() {

  let navigate = useNavigate()

  const [errorMsg,setErrorMsg] = useState('')
  const [loading,setLoading] = useState(true)

   async function sendDataToApi(value){
    setLoading(false)
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',value)
    .then(({data}) =>{
      if(data.status=='Success'){
        navigate('/reset-password')
      }
      console.log(data);

    }).catch((err) => {
      setErrorMsg(err.response.data.message)
      console.log(err.response.data.message);

      setLoading(true)
    })
    
   }



  let login = useFormik({
    initialValues:{
        resetCode:'',
    },
    // custom validation using formik
    // validate, 

    onSubmit:(value)=>{
      console.log(value);
      // send to api
      sendDataToApi(value)
    }
  })
  // console.log(login.errors);


  return (
    <>
      <div className="w-75 m-auto my-4">
        <h2>Enter code sent to your email...</h2>
        <form action="" onSubmit={login.handleSubmit} >
          

          <label htmlFor="code">code:</label>
          <input placeholder='resetCode' onBlur={login.handleBlur} onChange={login.handleChange} type="text" className='form form-control mb-3' 
          id='resetCode' name='resetCode' />
          {login.errors.code && login.touched.code ?<div className='alert alert-danger'>the code isn't valid </div>:''}



          {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}
          


         
              <button  className='btn bg-main text-white ' type='submit' >
                {loading?'Verify':<i className='fa fa-spinner fa-spin'></i>}
                {/* {} */}
              </button>
          
        </form>
      </div> 
    </>
  )
}
