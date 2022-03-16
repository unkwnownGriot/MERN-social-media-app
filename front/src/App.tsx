import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import PrivateRoute from './pages/PrivateRoute';



function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <PrivateRoute/> }>
           <Route path='/' element={ <Home/> } />
        </Route>
        <Route path='/login' element={ <Login/> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/profile/:username'element={ <Profile/> } />
       
      </Routes>
    </BrowserRouter>
     
    </>
  );
}

export default App;
