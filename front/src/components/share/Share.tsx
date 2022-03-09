import './share.css';
import {PermMedia , Label, Room, EmojiEmotions} from '@mui/icons-material'
const Share = () => {
    return (
        <div className='share'>
            <div className="share-wrapper">
                <div className="share-top">
                    <img src="assets/person/3.jpg" alt="" 
                    className="share-topProfileImg" />
                    <input type="text" placeholder="what's in your mind?"
                    className="share-topInput" />
                </div>
                <hr className='share-hr' />
                <div className="share-bottom">
                    <div className="share-options">
                        <div className="share-option">
                            <PermMedia htmlColor='tomato' className='share-icon'/>
                            <span className="share-optionText">Photo or Video</span>
                        </div>
                        <div className="share-option">
                            <Label htmlColor='blue' className='share-icon'/>
                            <span className="share-optionText">Tag</span>
                        </div>
                        <div className="share-option">
                            <Room htmlColor='green' className='share-icon'/>
                            <span className="share-optionText">Location</span>
                        </div>
                        <div className="share-option">
                            <EmojiEmotions htmlColor='goldenrod' className='share-icon'/>
                            <span className="share-optionText">Feeling</span>
                        </div>
                    </div>
                    <button className="share-btn">Share</button>
                </div>
            </div>
        </div>
    );
};

export default Share;