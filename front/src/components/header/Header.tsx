import './header.css';
import {Search,Notifications,Chat,Person} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
const Header = () => {
    const PF:string =( process.env.REACT_APP_PUBLIC_FOLDER as string)
    const context = useContext(AuthContext)
    return (
        <div className='header-container'>
            <div className="header-left">
                <Link to='/' style={{textDecoration:'none'}}>
                    <span className='header-logo'>ElsamSocial</span>
                </Link>
            </div>
            <div className="header-center">
                <div className="search-bar">
                    <Search className='search-barIcon'/>
                    <input type="text" className="searh-barInput" 
                    placeholder="Search friends"/>
                </div>
            </div>
            <div className='header-right'>
                <div className='header-links'>
                  <span className='header-link'>Homepage</span>
                  <span className='header-link'>Timeline</span>
                </div>
                <div className="header-itemIcons">
                    <div className="header-iconItem">
                        <Person/>
                        <span className="header-iconBadge">1</span>
                    </div>
                    <div className="header-iconItem">
                        <Chat/>
                        <span className="header-iconBadge">2</span>
                    </div>
                    <div className="header-iconItem">
                        <Notifications/>
                        <span className="header-iconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${context?.state.user.username}`}>
                     <img src={context?.state.user.profilePicture ?
                            PF+context.state.user.profilePicture :
                        PF+'person/default-profile.jpg'} alt="" className="header-img" />
                </Link>
            </div>
        </div>
    );
};

export default Header;