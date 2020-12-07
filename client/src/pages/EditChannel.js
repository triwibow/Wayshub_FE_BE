import React, { useState } from 'react';
import edit_channel_icon from '../icon/edit_channel_icon.svg';

import Sidebar from '../component/sidebar/Sidebar';
import Navbar from '../component//navbar/Navbar';

const EditChannel = () => {
    const [cover, setCover] = useState('Upload Cover');
    const [photo, setPhoto] = useState('Upload Photo');

    const coverFile = React.useRef();
    const photoFile = React.useRef();

    const handleCoverInputClick = () => {
        coverFile.current.click();
    }

    const handleCoverInputChange = (e) => {
        setCover(e.target.files[0].name)
    }

    const handlePhotoInputClick = () => {
        photoFile.current.click();
    }

    const handlePhotoInputChange = (e) => {
        setPhoto(e.target.files[0].name);
    }

    return(
        <div className="wrapper">
            <Sidebar />
            <div className="container">
                <Navbar />
                <div className="form-container">
                    <h1>Edit Channel</h1>
                    <form>
                        <div className="inline-input">
                            <input type="text" placeholder="Name Channel"/>
                            <div className="file-upload" onClick={handleCoverInputClick}>
                                <label>{cover}</label>
                                <input type="file" ref={coverFile} onChange={handleCoverInputChange}/>
                                <img src={edit_channel_icon} alt="icon"/>    
                            </div>
                        </div>
                        <textarea placeholder="Description"></textarea>
                        <div className="input-file-container">
                            <div className="input-file" onClick={handlePhotoInputClick}>
                                <label>{photo}</label>
                                <input type="file" ref={photoFile} onChange={handlePhotoInputChange}/>
                                <img src={edit_channel_icon} alt="icon"/>    
                            </div>
                        </div>
                        <button className="button">Save</button>
                        
                    </form>
                </div>
            </div>

        </div>
        
    )
}

export default EditChannel;