import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { useState } from 'react'

import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import Code from './components/Authentication/Code'
import ForgotPassword from './components/Authentication/ForgotPassword'
import ForgotPasswordComplete from './components/Authentication/ForgotPasswordComplete'
import ErrorPage from './components/Layout/ErrorPage'
import Home from './components/Home/Home'
import { verifyLogin } from './actions/authActions'
import { useEffect } from 'react'


const App = ({ loggedIn, verifyLogin }: { loggedIn: boolean, verifyLogin: any }) => {
  const navigate = useNavigate()
  const [ startLoad, setStartLoad ] = useState(false)

  useEffect(() => {
    verifyLogin()
  }, [ verifyLogin ])

  
  useEffect(() => {
    const authPaths = [ '/authentication/login', '/authentication/register', '/authentication/forgot-password' ]
    const loggedPaths = [ '/home' ]

    if(loggedIn && authPaths.some((path: string) => window.location.pathname === path)) {
      navigate('/home')
    } else if(!loggedIn && loggedPaths.some((path: string) => window.location.pathname === path)) {
      navigate('/authentication/login')
    }

    setStartLoad(true)
  }, [ loggedIn, navigate, startLoad ])

  if(!startLoad) return null;
  return (
    
      <Routes>
          <Route path='/' element={<Navigate to='/home' replace={true} />} />
          <Route path='/authentication/login' element={<Login />} />
          <Route path='/authentication/register' element={<Register />} />
          <Route path='/authentication/code/:url_param' element={<Code />} />
          <Route path='/authentication/forgot-password/:unique_url' element={<ForgotPasswordComplete />} />
          <Route path='/authentication/forgot-password' element={<ForgotPassword />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<ErrorPage />} />
      </Routes>
  );
}

export default connect((state: any) => ({ loggedIn: state.auth.loggedIn }), { verifyLogin })(App);