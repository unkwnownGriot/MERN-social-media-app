import React,{useContext} from 'react';
import {Outlet ,Navigate,useLocation} from 'react-router-dom'
import { AuthContext } from './../context/AuthContext';

const PrivateRoute = () => {
    const location = useLocation()
    const context = useContext(AuthContext)
   
  
    return context?.state.user ? < Outlet /> : <Navigate to='/login' state={{from:location}} replace />
};

export default PrivateRoute;