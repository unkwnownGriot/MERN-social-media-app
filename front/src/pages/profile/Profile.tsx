import Feed  from  '../../components/feed/Feed'
import Header from '../../components/header/Header';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './profile.css';

const Profile = () => {
    return (
        <>
           <Header/> 
           <div className="profile">
                <Sidebar/>
                <div className="profile-right">
                    <div className="profile-rightTop">
                        <div className="profile-coverContainer">
                            <img src="assets/post/5.jpg" alt="" 
                            className="profile-coverImg" />
                            <img src="assets/person/4.jpg" 
                            alt="" className="user-profilePic" />
                        </div>
                        <div className="profile-userInfo">
                            <h4 className='profile-username'>Theo Atchole</h4>
                            <span className="profile-userDesc">Hello did you see unknonw griot?</span>
                        </div>
                    </div>
                    <div className="profile-rightBottom">
                        <Feed/>
                        <Rightbar profile/>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Profile;