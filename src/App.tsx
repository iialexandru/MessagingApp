import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import ForgotPassword from './components/Authentication/ForgotPassword'
import ForgotPasswordComplete from './components/Authentication/ForgotPasswordComplete'
import ErrorPage from './components/Layout/ErrorPage'
import Home from './components/Home/Home'


const App = () => {

  const auth = useSelector((state: { auth: { value: boolean } }) => state.auth.value)
  console.log(auth)

  return (
    <Router>
      <Routes>
          <Route path='/authentication/login' element={<Login />} />
          <Route path='/authentication/register' element={<Register />} />
          <Route path='/authentication/forgot-password/:unique_url' element={<ForgotPasswordComplete />} />
          <Route path='/authentication/forgot-password' element={<ForgotPassword />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
