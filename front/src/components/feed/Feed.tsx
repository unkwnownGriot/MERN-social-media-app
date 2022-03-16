import {useState,useEffect, useContext} from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';



export type PostsProps = {
    __v:number,
    _id:string,
    createdAt:string,
    userId:string,
    desc?:string,
    likes:Array<string | ''>,
    img?:string,
    updatedAt:string
 
}

type UsernameProps={
    username?:string 
}


const Feed = ({username}:UsernameProps) => {
    const context = useContext(AuthContext)
    const [posts,setPosts] = useState<PostsProps[]>([])
    useEffect(()=>{
        const FetchPost = async () =>{
            const res = username ? 
            await axios.get(`/posts/profile/${username}`) :
            await axios.get(`/posts/timeline/${context?.state.user._id}` )
           setPosts(res.data.sort((post1:any,post2:any)=>{
                return new Date(post2.createdAt).getTime() - new Date(post1.createdAt).getTime()
           }))
        }
        FetchPost()
    },[username,context?.state.user._id])


    return (
        <div className='feed'>
            <div className="feed-wrapper">
              { (!username  || username=== context?.state.user.username ) && <Share/>}
                {
                    posts.map(post=>(
                        <Post key={post._id}
                        post={post} />
                    ))
                }   
                    
            </div>
        </div>
    );
};

export default Feed;