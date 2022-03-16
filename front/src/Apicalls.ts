import axios from "axios"

export const login = async (userCredentials:any,dispatch:any) =>{
    dispatch({type:"LOGIN_START"})
    try{
        const res = await axios.post('auth/login',userCredentials)
        dispatch({type: "LOGIN_SUCCESS",payload: res.data})
    }catch(err){
        dispatch({type: "LOGIN_FAILURE",payload: err})
    }

}