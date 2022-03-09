import './post.css';
import {MoreVert} from '@mui/icons-material'
import {Users} from '../../data'

type PostsProps ={
    post:{
        id:number,
        desc?:string ;
        photo:string;
        date:string;
        userId:number;
        like:number;
        comment:number
    }
   
}


const Post = ({post}:PostsProps) => {
    return (
        <div className='post'>
           <div className="post-wrapper">
            <div className="post-top">
                <div className="post-topLeft">
                    <img 
                    src={Users.filter(user=>user.id===post.userId)[0].profilePicture} 
                    alt="" 
                    className="post-profilePic" />
                    <span className="post-username">{Users.filter(user=>user.id===post.userId)[0].username} </span>
                    <span className="post-date">{post.date}</span>
                </div>   
                <div className="post-topRight">
                    <MoreVert/>
                </div> 
               </div> 
                <div className="post-center">
                    <span className="post-desc">{post.desc} </span>
                    <img src={post.photo} alt="" 
                    className="post-photo" />
                </div>
                <div className="post-bottom">
                    <div className="post-bottomLeft">
                        <img src="assets/like.png" alt="" className="like-icon" />
                        <img src="assets/heart.png" alt="" className="like-icon" />
                        <span className="like-count">{post.like} people like it</span>
                    </div>
                    <div className="post-bottomRight">
                        <span className="comment">{post.comment} comments</span>
                    </div>
                </div>  
         </div>
        </div>
    );
};

export default Post;