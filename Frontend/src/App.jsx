import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Sign from './pages/Auth/Signin'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element = {<PrivateRoute/>}>
        <Route path='/' element={<Home />}/>
      </Route>
      
      <Route path='/login' element={<Login />}/>
      <Route path='/sign-up' element={<Sign />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App