import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import ForgotPassword from './components/Authentication/ForgotPassword'


const App = () => {
  return (
    <Router>
      <Routes>
          <Route path='/authentication/login' element={<Login />} />
          <Route path='/authentication/register' element={<Register />} />
          <Route path='/authentication/forgot-password' element={<ForgotPassword />} />
          <Route path='/authentication/forgot-password/:unique_url' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
