import './rightbar.css';
import {useState,useEffect, useContext} from 'react'
import Online from '../online/Online'
import {Users} from '../../data'
import {UsersProps} from '../post/Post'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';

type FriendList ={
    _id:string,
    username:string,
    profilePicture:string
}



type RightbarUserProps ={
    user?:UsersProps
}


const Rightbar = ({user}:RightbarUserProps) => {
    const context = useContext(AuthContext)
    const currentUser = context?.state.user
    const [friends,setFriends] = useState<FriendList[]>([])
    const [followed,setFollowed] = useState<boolean>(currentUser.followings.includes(user?._id))
    
    
    useEffect(()=>{
        const getFriends =async()=>{
            try{
                const friendList = await axios.get(`/users/friends/${currentUser._id}`)
                setFriends(friendList.data)
            }catch(err){
                console.log(err)
            }
        }

        getFriends()
    },[currentUser._id])

    useEffect(()=>{
        setFollowed(currentUser.followings.includes(user?._id))
    },[currentUser,user?._id])

    const handleFollow = async() =>{
        try{
            if(followed){
                await axios.put(`/users/${user?._id}/unfollow`,{userId:currentUser._id})
                context?.dispatch({type:"UNFOLLOW",payload:user?._id})
            }else{
                await axios.put(`/users/${user?._id}/follow`,{userId:currentUser._id})
                context?.dispatch({type:"FOLLOW",payload:user?._id})
            }

        }catch(err){
            console.log(err)
        }

        setFollowed(v=>!v)
    }

    const PF= process.env.REACT_APP_PUBLIC_FOLDER

    // composant home rightbar qui va s'afficher sur la home page
    const HomeRightbar =()=>{
        return(
            <>
                  <div className="birthday-container">
                    <img src="assets/gift.png" alt="" 
                    className="birthday-img" />
                    <span className="birthday-text"> <b>Elsam Atchole</b> and <b>2 other friends</b> have a birthday today
                     </span>
                </div>    
                <img src="assets/ad.png" alt="" 
                     className="birthday-ad" />
                <h4 className='rightbar-title'>Online Friends</h4>
                <ul className="rightbar-friendList">
                   { Users.map(user=>(
                        <Online key={user.id} user={user} />
                   ))}
                </ul>
            </>
        )
    }

    // composant profile rightbar qui va s'afficher sur la profile page
    const ProfileRightbar = ()=>{
        return(
            <>
            {
                user?.username !== currentUser.username && (
                    <button className="follow-btn"onClick={handleFollow}>
                         {followed ?"Unfollow" : "Follow" } 
                         {followed ?<Remove/> : <Add/> } 
                    </button>
                )
            }
                <h3 className='profile-rightbarTitle'>User information</h3>
                <div className="rightbar-infoContainer">
                    <div className="rightbar-infoItems">
                        <div className="rightbar-infoItem">
                            <span className="user-infoKey">City:</span>
                            <span className="user-infoValue">{user?.city} </span>
                        </div>
                        <div className="rightbar-infoItem">
                            <span className="user-infoKey">From:</span>
                            <span className="user-infoValue">{user?.from} </span>
                        </div>
                        <div className="rightbar-infoItem">
                            <span className="user-infoKey">Relationship:</span>
                            <span className="user-infoValue">
                                {user?.relationship === 1 ? "single":
                                user?.relationship === 2 ? "married":"complicated"}
                            </span>
                        </div>
                    </div>
                 </div>
                 <h3 className='profile-rightbarTitle'>User Friends</h3>
                 <div className="rightbar-friends">
                    <div className="rightbar-followings">
                        {
                            friends.map(friend=>(
                                <Link to={`/profile/${friend.username}`}
                                style={{textDecoration:"none"}} key={friend._id} >
                                     <div className="rightbar-Following">
                                        <img src={friend.profilePicture? PF+friend.profilePicture :
                                        `${PF}person/default-profile.jpg`} alt="" 
                                        className="rightbar-followingImg" />
                                        <span className="rightbar-followingUsername">{friend.username} </span>
                                    </div>
                                </Link>
                            ))
                        }
                        
                    </div>
                </div>
            </>
        )
    }


    return (
        <div className='rightbar'>
            <div className="rightbar-wrapper">
              {user ? <ProfileRightbar/> : <HomeRightbar/> }
            </div>
        </div>
    );
};

export default Rightbar;