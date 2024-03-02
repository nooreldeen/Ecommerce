import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'



// token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Y2IyY2MwODQ2MmFiMDJjNzFlNjhjYSIsIm5hbWUiOiJtb1NhbGFoIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDg3OTU5NDgsImV4cCI6MTcxNjU3MTk0OH0.ih8ebpl4GT6gNM3Cb9nRLx8JTZakXyoSDo4WFyxMv0M

export default function ForgetPassword() {

  let navigate = useNavigate()

  const [errorMsg,setErrorMsg] = useState('')
  const [loading,setLoading] = useState(true)

   async function sendDataToApi(values){
    setLoading(false)
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
    .then(({data}) =>{
      if(data.statusMsg=='success'){
        navigate('/verify-code')
      }
      console.log(data);

    }).catch((err) => {
      setErrorMsg(err.response.data.message)
      console.log(err.response.data.message);

      setLoading(true)
    })
    
   }


  //Validation using yup libarary
  function validationSchema(){
    let shcema = new Yup.object({
      email : Yup.string().email().required(),
    })
    return shcema
  }

  let login = useFormik({
    initialValues:{
      email:'',
    },
    // custom validation using formik
    // validate, 

    validationSchema,
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
        <h2>Enter Your Email to Reset Password</h2>
        <form action="" onSubmit={login.handleSubmit} >
          

          <label htmlFor="email">Email:</label>
          <input placeholder='Type Your Email...' onBlur={login.handleBlur} onChange={login.handleChange} type="email" className='form form-control mb-3' 
          id='email' name='email' />
          {login.errors.email && login.touched.email ?<div className='alert alert-danger'>Email is required </div>:''}



          {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}
          


         
              <button disabled={!(login.dirty && login.isValid)} className='btn bg-main text-white ' type='submit' >
                {loading?'Verify':<i className='fa fa-spinner fa-spin'></i>}
                {/* {} */}
              </button>
          
        </form>
      </div> 
    </>
  )
}
