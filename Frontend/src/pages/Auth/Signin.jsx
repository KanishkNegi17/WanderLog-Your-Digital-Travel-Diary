import { useEffect, useState } from 'react'
import PasswordInput from '../../components/PasswordInput.jsx'
import {useNavigate} from "react-router-dom"
import { validateEmail } from '../../utils/helper.js'
import axiosInstance from '../../utils/axiosInstance.js'
import { useDispatch, useSelector } from 'react-redux'

const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const {loading, currentUser} = useSelector((state)=> state.user)

  const handleSignup = async(e) =>{
    e.preventDefault()
    if(!name){
      setError("Please Enter Your Name")
      return
    }
    if(!validateEmail(email)){
      setError("Please Enter Valid Email!!")
      return
    }
    if(!password){
      setError("Please Enter Your Password")
      return
    }
    setError(null)

    //SIGNIN API CALL 
    try {
  
      const response = await axiosInstance.post("/auth/signup",{username: name,email, password,})

      //HANDLING SIGNUP RESPONSE
      if(response.data){
        navigate("/login")
      }
    } catch (error) {
      if(error?.response?.data?.message){
        setError(error?.response?.data?.message)
      }else{
        setError("Something Went Wrong, Please Try again!!")
      }
    }
  }

  useEffect(()=>{
      if(!loading && currentUser){
        navigate("/")
      }
    },[currentUser])

  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className='login-ui-box right-10 -top-40'/>
      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
      <div className='w-2/4 h-[90vh] flex items-end bg-[url("https://images.pexels.com/photos/586687/pexels-photo-586687.jpeg")] bg-cover bg-center rounded-lg p-10 z-50'>
      <div>
        <h4 className='text-5xl text-white font-semibold leading-[58px]'>
          Create Your <br /> Travel Stories
        </h4>
        <p className='text-[15px]  text-white  leading-6 pr-7 mt-4'>
          Record Your Travel Experiences and memories in your Travel journey  
        </p>
      </div>
      </div>
      <div className='w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20'> 
        <form onSubmit={handleSignup}>
          <h4 className='text-2xl font-semibold mb-7'>CREATE YOUR ACCOUNT</h4>
          
          <input type="text" placeholder='Enter Your Name' className='input-box' value={name} onChange={(e)=>setName(e.target.value)}/>

          <input type="email" placeholder='Email' className='input-box' value={email} onChange={(e)=>setEmail(e.target.value)}/>

          <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>

          {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

          {loading ? (<p className='animate-pulse w-full text-center btn-primary'>LOADING....</p>): ( <button type='submit' className='btn-primary'>
            SIGN UP
          </button>)}

          <p className='text-xs text-slate-500 text-center my-4'>OR</p>

          <button type='submit' className='btn-primary btn-light' onClick={()=> navigate("/login")}>
            LOG IN 
          </button>
        </form>
      </div>
      </div>
      </div>
  )
}

export default Signin