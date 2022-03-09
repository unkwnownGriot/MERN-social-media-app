import './sidebar.css';
import {RssFeed,Chat,PlayCircleFilledOutlined ,Group,Bookmark,
    HelpCenterOutlined,WorkOffOutlined,Event,School} from '@mui/icons-material'
import CloseFriend from '../closeFriend/CloseFriend';
import {Users} from '../../data'



const Sidebar = () => {
    return (
       <div className="sidebar">
            <div className="sidebar-wrapper">
                <ul className="sidebar-list">
                    <li className="sidebar-listItem">
                        <RssFeed className='sidebar-iconItem'/>
                        <span className="sidebar-iconItemText">Feed</span>
                    </li>
                    <li className="sidebar-listItem">
                        <Chat className='sidebar-iconItem'/>
                        <span className="sidebar-iconItemText">Chats</span>
                    </li>
                    <li className="sidebar-listItem">
                        <PlayCircleFilledOutlined className='sidebar-iconItem'/>
                        <span className="sidebar-iconItemText">Videos</span>
                    </li>
                    <li className="sidebar-listItem">
                        <Group className='sidebar-iconItem'/>
                        <span className="sidebar-iconItemText">Groups</span>
                    </li>
                    <li className="sidebar-listItem">
                        <Bookmark className='sidebar-iconItem'/>
                        <span className="sidebar-iconItemText">Bookmarks</span>
                    </li>
                    <li className="sidebar-listItem">
                        <HelpCenterOutlined className='sidebar-iconItem'/>
                        <span className="sidebar-iconItemText">Questions</span>
                    </li>
                    <li className="sidebar-listItem">
                        <WorkOffOutlined className='sidebar-iconItem'/>
                        <span className="sidebar-iconItemText">Jobs</span>
                    </li>
                    <li className="sidebar-listItem">
                        <Event className='sidebar-iconItem'/>
                        <span className="sidebar-iconItemText">Events</span>
                    </li>
                    <li className="sidebar-listItem">
                        <School className='sidebar-iconItem'/>
                        <span className="sidebar-iconItemText">Courses</span>
                    </li>
                </ul> 
                <button className='sidebar-btn'>Show more</button>
                <hr className='sidebar-hr' />
                <ul className="sidebar-friendList">
                   {
                       Users.map(user=>(
                            <CloseFriend  key={user.id}
                            user={user} />
                       ))
                   }     
                       
                </ul>           
            </div>  
        </div>
    );
};

export default Sidebar;