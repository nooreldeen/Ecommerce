import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {

  let navigate = useNavigate()

  const [errorMsg,setErrorMsg] = useState('')
  const [loading,setLoading] = useState(true)

   async function sendDataToApi(values){
    setLoading(false)
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
    .then(({data}) =>{
      if(data.message=='success'){
        navigate('/signin')
      }
      console.log(data);

    }).catch((err) => {
      setErrorMsg(err.response.data.message)
      console.log(err.response.data.message);

      setLoading(true)
    })
    
   }

  //Custom validation using formik libarary
  // function validate(values){

  //   const myErrors ={}

  //   if(!values.name){
  //     myErrors.name = 'name is required'
  //   }
  //   if(!values.email){
  //     myErrors.email = 'email is required'
  //   }
  //   if(!/^[A-Z][A-Za-z0-9@]{6,}$/.test(values.password)){
  //     myErrors.password = 'password must be 7'
  //   }
  //   if(values.password != values.rePassword){
  //     myErrors.rePassword='rePassword must match password'
  //   }
    
  //   return myErrors

  // }

  //Validation using yup libarary
  function validationSchema(){
    let shcema = new Yup.object({
      name : Yup.string().min(3).max(20).required(),
      email : Yup.string().email().required(),
      password : Yup.string().matches(/^[A-Z][a-zA-Z0-9@]{6,}$/).required(),
      rePassword : Yup.string().oneOf([Yup.ref('password')]).required(),
      phone : Yup.number().required()
    })
    return shcema
  }

  let register = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
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
  console.log(register.errors);

  return (
    <>
      <div className="w-75 m-auto my-4">
        <h2>Register Now</h2>
        <form action="" onSubmit={register.handleSubmit} >
          <label htmlFor="name">Name:</label>
          <input placeholder='Type Your Name...' onBlur={register.handleBlur} onChange={register.handleChange} type="text" className='form form-control mb-3 ' 
          id='name' name='name' />
          {register.errors.name && register.touched.name ?<div className='alert alert-danger'>Name is required</div>:''}
          

          <label htmlFor="email">Email:</label>
          <input placeholder='Type Your Email...' onBlur={register.handleBlur} onChange={register.handleChange} type="email" className='form form-control mb-3' 
          id='email' name='email' />
          {register.errors.email && register.touched.email ?<div className='alert alert-danger'>Email is required </div>:''}

          <label htmlFor="password">Password:</label>
          <input placeholder='Type Your Password...' onBlur={register.handleBlur} onChange={register.handleChange} type="password" 
          className='form form-control mb-3 ' id='password' name='password' />
          {register.errors.password && register.touched.password ?<div className='alert alert-danger'>Password is required </div>:''}
          
          <label htmlFor="rePassword">Repassword:</label>
          <input placeholder='Type Your rePassword...' onBlur={register.handleBlur} onChange={register.handleChange} type="password" 
          className='form form-control mb-3' id='rePassword' name='rePassword' />
          {register.errors.rePassword && register.touched.rePassword ?<div className='alert alert-danger'>rePassword must match password </div>:''}
          
          <label htmlFor="phone">Phone:</label>
          <input placeholder='Type Your phone numper...' onBlur={register.handleBlur} onChange={register.handleChange} type="number" 
          className='form form-control mb-3' id='phone' name='phone' />
          {register.errors.phone && register.touched.phone ?<div className='alert alert-danger'>Phone is required </div>:''}


          {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:''}

          <button disabled={!(register.dirty && register.isValid)} className='btn bg-main text-white ' type='submit' >
            {loading?'SignUp':<i className='fa fa-spinner fa-spin'></i>}
          </button>
        </form>
      </div> 
    </>
  )
}
