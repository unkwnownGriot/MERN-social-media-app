import React, { createContext,useReducer} from 'react'
import AuthReducer from './AuthReducer'
import { Actions,MyState } from './AuthReducer'

type MyContext={
    state:MyState,
    dispatch:React.Dispatch<Actions>
}

const INITIAL_STATE:MyState = {
    user:{
        _id:"622b54ba802107fac7907374",
        username:"John Koffi",
        email:"test2@gmail.com",
        password:"$2b$10$L/DumyfzF8qNe0T4zpaOmuV36T7/BYn6P.AsA66wGfblVAV/bv0Rq",
        profilePicture:"person/3.jpg",
        coverPicture:"",
        followers:["622b5420802107fac7907370","622b5497802107fac7907372"],
        followings:[],
        isAdmin:false,
    },
    isFetching:false,
    error:false
}

export const AuthContext = createContext<MyContext | null >(null)

export const AuthContextProvider =({ children }:{ children:JSX.Element })=>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)
    
    return(
        <AuthContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}