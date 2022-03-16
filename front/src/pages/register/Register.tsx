import './register.css';
import { useNavigate } from 'react-router';
import { useContext,useEffect,useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2'
import axios from 'axios'
const Register = () => {
    const navigate = useNavigate()
    const context = useContext(AuthContext)

    const username = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const passwordAgain = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        if(context?.state.user){
            navigate('/',{ replace:true})
        }
    },[context?.state.user])
    
    

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(passwordAgain.current?.value !== password.current?.value){
           password.current?.setCustomValidity('password dont match')
        }else{
            let user ={
                username:username.current?.value,
                email:email.current?.value,
                password:password.current?.value,
            }
            try{
                 await axios.post('/auth/register',user)
                 navigate('/login')
            }catch(err){
              console.log(err)
            }
            
        }
    }
    
    return (
        <div className='login'>
            <div className="login-wrapper">
                <div className="login-left">
                    <h3 className='login-logo'>Elsamsocial</h3>
                    <span className="login-description">
                     Connect with friends and the world around you on Elsamsocial.
                    </span>
                </div>
                <div className="login-right">
                    <form className="login-box" onSubmit={handleSubmit}>
                        <input placeholder='Username' required  ref={username} 
                        type="text" className='login-input' />
                        <input placeholder='Email' required ref={email}
                         type="email" className='login-input' />
                        <input placeholder='Password' required  ref={password}
                         type="password" className='login-input' />
                        <input placeholder='Password again' required  ref={passwordAgain}
                         type="password" className='login-input' />
                        <button className="login-btn" type='submit'>Sign Up</button>
                        <button className="login-registerBtn">Log into account</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;