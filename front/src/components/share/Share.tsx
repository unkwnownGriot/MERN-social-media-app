import './share.css';
import {PermMedia , Label, Room, EmojiEmotions, Cancel} from '@mui/icons-material'
import React, { useContext, useRef,useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
type NewPost ={
    userId?:string,
    desc?:string,
    img?:string
}
const Share = () => {
    const PF:string =( process.env.REACT_APP_PUBLIC_FOLDER as string)
    const context = useContext(AuthContext)
    const currentUser = context?.state.user
    const desc = useRef<HTMLInputElement>(null)
    const [file,setFile] = useState<File | null>(null)

    const handleChange = (e:any) =>{
        setFile(e.target.files[0])
    }
    
    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        const newPost:NewPost={
            userId:currentUser._id,
            desc:desc.current?.value
        }
        if(file){
            const data = new FormData()
            const fileName = Date.now()+ file.name
            data.append("name",fileName)
            data.append("file",file)
            newPost.img = fileName
           try{
                await axios.post('/upload',data )
            }catch(err){
                console.log(err)
            }
        }
        try{
            await axios.post('/posts',newPost)
                window.location.reload()

        }catch(err){
            console.log(err)
        }
        
        

    }




    return (
        <div className='share'>
            <div className="share-wrapper">
                <div className="share-top">
                    <img src={currentUser.profilePicture? PF+currentUser.profilePicture:
                    PF+'person/default-picture.jpg'} alt="" 
                    className="share-topProfileImg" />
                    <input type="text" placeholder={`what's in your mind ${currentUser.username}?`}
                    className="share-topInput" ref={desc}  />
                </div>
                <hr className='share-hr' />
                {
                    file && (
                        <div className="share-imgContainer">
                            <img src={URL.createObjectURL(file)} alt="" className='share-img' />
                            <Cancel className='share-cancel' onClick={()=>setFile(null)} />
                        </div>
                    )
                }
                <form className="share-bottom"onSubmit={handleSubmit} >
                    <div className="share-options">
                        <label htmlFor='file' className="share-option">
                            <PermMedia htmlColor='tomato' className='share-icon'/>
                            <span className="share-optionText">Photo or Video</span>
                            <input style={{display:"none"}} type="file" id ="file" accept='.png,.jpg,.jpeg' 
                           onChange={handleChange} />
                        </label>
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
                </form>
            </div>
        </div>
    );
};

export default Share;