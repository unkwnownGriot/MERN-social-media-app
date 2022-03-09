import './online.css';

type UserProps ={
    user:{
        id:number;
        profilePicture:string;
        username:string
    }
}

const Online = ({user}:UserProps) => {
    return (
        <li className='rightbar-friend'>
            <div className="rightbar-profileContainer">
               <img src={user.profilePicture} alt=""
                className="rightbar-profilePic" />
                <span className="rightbar-online"></span>
            </div>
            <span className="rightbar-username">{user.username}</span>
        </li>  
    );
};

export default Online;