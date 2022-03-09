import './header.css';
import {Search,Notifications,Chat,Person} from '@mui/icons-material'
const Header = () => {
    return (
        <div className='header-container'>
            <div className="header-left">
              <span className='header-logo'>ElsamSocial</span>
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
                <img src="assets/person/3.jpg" alt="" className="header-img" />
            </div>
        </div>
    );
};

export default Header;