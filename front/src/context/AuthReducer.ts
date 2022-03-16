
export type Actions={
    type:string,
    payload?:any
}


export  type MyState ={
    user:any,
    isFetching:boolean,
    error:boolean
}
const AuthReducer = (state:MyState,action:Actions)=>{
        switch(action.type){
            case "LOGIN_START":
                return{
                    user:null,
                    isFetching:true,
                    error:false
                };
                case "LOGIN_SUCCESS":
                    return {
                        user:action.payload,
                        isFetching:false,
                        error:false
                    };
                    case "LOGIN_FAILURE":
                        return{
                            user:null,
                            isFetching:false,
                            error:action.payload
                        };
                    case "FOLLOW":
                        return{
                          ...state,
                          user:{
                              ...state.user,
                              followings:[...state.user.followings,action.payload]
                          }
                        };
                    case "UNFOLLOW":
                        return{
                          ...state,
                          user:{
                              ...state.user,
                              followings:state.user.followings.filter(
                                  (id:any)=>id !==action.payload)
                          }
                        };
                        default:
                         return state   
        }
}

export default AuthReducer