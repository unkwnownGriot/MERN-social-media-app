import './login.css';
import { useContext, useEffect, useRef } from 'react';
import{useNavigate} from 'react-router-dom'
import { login } from '../../Apicalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';

const Login = () => {
    const navigate = useNavigate()
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    
    const context = useContext(AuthContext)

    const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        login({ email:email.current?.value,
                password:password.current?.value
         },context?.dispatch)
    }
    useEffect(()=>{
        if(context?.state.user){
            navigate('/',{ replace:true})
        }
    },[context?.state.user])
    
    return (
        <div className='login'>
            <div className='login-wrapper'>
                <div className='login-left'>
                    <h3 className="login-logo">ElsamSocial</h3>
                    <span className="login-desc">
                      Connect with friends and the world around you on Elsamsocial.
                    </span>
                </div>
                <div className="login-right">
                    <form className="login-box" onSubmit={handleSubmit}>
                         <input placeholder='Email' type="email" 
                         required className='login-input'  ref={email} />
                        <input placeholder='Password' type="password" ref={password}
                        required  className='login-input' />
                        <button className="login-btn" disabled={context?.state.isFetching}>
                            {context?.state.isFetching? <CircularProgress 
                            color='inherit' size={20} /> : "Log In"}
                            </button>
                        <span className='login-forgot'>Forgot password?</span>
                        <button className="login-registerBtn" disabled={context?.state.isFetching}>
                        {context?.state.isFetching? <CircularProgress 
                            color='inherit' size={20} /> : "Create a new account"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;