import './closeFriend.css'

type UserProps ={
    user:{
        id:number;
        profilePicture:string;
        username:string
    }
}


const CloseFriend = ({user}:UserProps) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
       <li className='sidebar-friend'>
           <img src={PF+user.profilePicture} alt="" className="sidebar-friendImg" />
           <span className="sidebar-friendName">{user.username}</span>
       </li>
    );
};

export default CloseFriend;