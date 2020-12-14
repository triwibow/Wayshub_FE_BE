import './channel.css';
import {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import navbar_photo_profile from '../../icon/navbar_photo_profile.svg';

const ChannelHeader = (props) => {
    const [activeNav, setActiveNav] = useState(true);
    const handleChannel = (status) => {
        props.current(status);
        (status)? setActiveNav('active') : setActiveNav('');
        
    }

    return (
        <Fragment>
            <div className="channel-header">
                <img src={`http://localhost:5000/photo/${props.data.photo}`} alt="foto profil"/>
                <div className="channel-username">
                    <span className="content-creator-username">{props.data.chanelName}</span>
                    <span className="count-subscriber">{props.data.subscribers.length} Subscriber</span>
                </div>
                <div className="button-wrapper">
                    <Link to="/edit-channel" className="link">
                        <button className="btn-channel">Edit Channel</button>
                    </Link>
                </div>
            </div>
            <ul className="channel-nav">
                <li 
                    onClick={()=>handleChannel(true)}
                    className={activeNav? "active": ""}
                >
                    Video
                </li>
                <li
                    className={activeNav? "":"active"} 
                    onClick={()=>handleChannel(false)}
                >
                    Description
                </li>
            </ul>
        </Fragment>
        
    )
}

export default ChannelHeader;