import '../App.css';

import React, { useState } from 'react';
import attach_thumbnail from '../icon/attach_thumbnail.png';
import add_video_icon_active from '../icon/add_video_icon_active.svg';

import Sidebar from '../component/sidebar/Sidebar';
import Navbar from '../component//navbar/Navbar';

const AddVideo = () => {
    const [thumbnail, setThumbnail] = useState('Attach Thumbnail');
    const [video, setVideo] = useState('Upload Video');

    const thumbnailFile = React.useRef();
    const videoFile = React.useRef();

    const handleThumbnailInputClick = () => {
        thumbnailFile.current.click();
    }

    const handleThumbnailInputChange = (e) => {
        setThumbnail(e.target.files[0].name)
    }

    const handleVideoInputClick = () => {
        videoFile.current.click();
    }

    const handleVideoInputChange = (e) => {
        setVideo(e.target.files[0].name);
    }

    return(
        <div className="wrapper">
            <Sidebar/>
            <div className="container">
                <Navbar/>
                <div className="form-container">
                    <h1>Add Video</h1>
                    <form>
                        <div className="inline-input">
                            <input type="text" placeholder="Title"/>
                            <div className="file-upload" onClick={handleThumbnailInputClick}>
                                <label>{thumbnail}</label>
                                <input type="file" ref={thumbnailFile} onChange={handleThumbnailInputChange}/>
                                <img src={attach_thumbnail} alt="icon"/>    
                            </div>
                        </div>
                        <textarea placeholder="Description"></textarea>
                        <div className="input-file-container">
                            <div className="input-file" onClick={handleVideoInputClick}>
                                <label>{video}</label>
                                <input type="file" ref={videoFile} onChange={handleVideoInputChange}/>
                                <img src={add_video_icon_active} alt="icon"/>    
                            </div>
                        </div>
                        <button className="button">Add</button>
                        
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default AddVideo;