import {useState,useEffect} from 'react'
import Feed  from  '../../components/feed/Feed'
import Header from '../../components/header/Header';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from "axios"
import './profile.css';
import {useParams} from 'react-router'

type UsersProps={
    _id:string,
    username:string,
    email:string,
    password:string,
    createdAt:string,
    profilePicture?:string,
    coverPicture?:string,
    followers:Array <string>,
    followings:Array <string>,
    isAdmin:string,
    desc:string,
    city:string,
    from:string,
    relationship:number
}

const Profile = () => {
    const [user,setUser] = useState<UsersProps>()
    const PF:string =( process.env.REACT_APP_PUBLIC_FOLDER as string)
    const {username} = useParams()

    useEffect(()=>{
        const FetchUser = async () =>{
            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data)
        }
        FetchUser()
    },[username])





    return (
        <>
           <Header/> 
           <div className="profile">
                <Sidebar/>
                <div className="profile-right">
                    <div className="profile-rightTop">
                        <div className="profile-coverContainer">
                            <img src={user?.coverPicture ? PF+user.coverPicture : PF+'person/default-cover.jpg'} alt="" 
                            className="profile-coverImg" />
                            <img src={user?.profilePicture ? PF+user.profilePicture : PF+'person/default-profile.jpg'}
                            alt="" className="user-profilePic" />
                        </div>
                        <div className="profile-userInfo">
                            <h4 className='profile-username'>{user?.username}</h4>
                            <span className="profile-userDesc">{user?.desc} </span>
                        </div>
                    </div>
                    <div className="profile-rightBottom">
                        <Feed username={username} />
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;