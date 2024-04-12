import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/SIgnup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ListingDetails from './pages/ListingsDetails/ListingDetails';
import './App.scss';
import { AuthProvider } from './contexts/AuthContext';




function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/listings/:id" element={<ListingDetails />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
        </Routes>
      </BrowserRouter>  
    </AuthProvider>
    
  )
}

export default App;
