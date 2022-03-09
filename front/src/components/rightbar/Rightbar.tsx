import './rightbar.css';
import Online from '../online/Online'
import {Users} from '../../data'

type ProfileProps={
    profile:boolean
}


const Rightbar = ({profile}:ProfileProps) => {


    return (
        <div className='rightbar'>
            <div className="rightbar-wrapper">
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
            </div>
        </div>
    );
};

export default Rightbar;