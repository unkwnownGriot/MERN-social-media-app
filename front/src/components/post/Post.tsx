import './post.css';
import {useState,useEffect, useContext} from 'react'
import {MoreVert} from '@mui/icons-material'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {format} from 'timeago.js'
import { AuthContext } from '../../context/AuthContext';
import {PostsProps} from '../feed/Feed'

type MyPostProps = {
    post:PostsProps
}
export type UsersProps={
    _id:string,
    username:string,
    email:string,
    password:string,
    createdAt?:string,
    profilePicture?:string,
    coverPicture?:string,
    followers:Array <string>,
    followings:Array <string>,
    isAdmin:string |boolean ,
    desc?:string,
    city:string,
    from?:string,
    relationship:number,
}




const Post = ({post}:MyPostProps) => {
    const [like,setLike]= useState(post.likes.length)
    const [isLiked,setIsliked] = useState(false)
    const [user,setUser] = useState<UsersProps>()
    const PF:string =( process.env.REACT_APP_PUBLIC_FOLDER as string)
    const context = useContext(AuthContext)
    const currentUser = context?.state.user
    useEffect(()=>{
        const FetchUser = async () =>{
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
            console.log(res.data)
        }
        FetchUser()
    },[post.userId])

    useEffect(()=>{
        setIsliked(post.likes.includes(currentUser?._id))
    },[post.likes,currentUser?._id])

    const likeHandler = async()=>{
        try{
          await   axios.put(`/posts/${post._id}/like`,{userId:currentUser?._id})
        }catch(err){

        }
        isLiked ? setLike(like=>like-1):setLike(like=>like+1)
        setIsliked(value=>!value)
    }

    return (
        <div className='post'>
           <div className="post-wrapper">
            <div className="post-top">
                <div className="post-topLeft">
                    <Link to={`profile/${user?.username}`} >
                        <img 
                        src={user?.profilePicture ? 
                           PF+user?.profilePicture :  PF+'person/default-profile.jpg'} 
                        alt="" 
                        className="post-profilePic" />
                    </Link>
                    
                    <span className="post-username">{user?.username}</span>
                    <span className="post-date">{format(post.createdAt)}</span>
                </div>   
                <div className="post-topRight">
                    <MoreVert/>
                </div> 
               </div> 
                <div className="post-center">
                    <span className="post-desc">{post.desc} </span>
                    <img src={PF+post?.img} alt="" 
                    className="post-photo" />
                </div>
                <div className="post-bottom">
                    <div className="post-bottomLeft">
                        <img src={`${PF}like.png`} alt="" className="like-icon"
                         onClick={likeHandler} />
                        <img src={`${PF}heart.png`} alt="" className="like-icon"
                         onClick={likeHandler} />
                        <span className="like-count">{like} people like it</span>
                    </div>
                    <div className="post-bottomRight">
                        <span className="comment">  comments</span>
                    </div>
                </div>  
         </div>
        </div>
    );
};

export default Post;