import './closeFriend.css'

type UserProps ={
    user:{
        id:number;
        profilePicture:string;
        username:string
    }
}


const CloseFriend = ({user}:UserProps) => {
    return (
       <li className='sidebar-friend'>
           <img src={user.profilePicture} alt="" className="sidebar-friendImg" />
           <span className="sidebar-friendName">{user.username}</span>
       </li>
    );
};

export default CloseFriend;