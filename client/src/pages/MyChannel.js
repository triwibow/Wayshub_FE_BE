import '../App.css';
import {useState} from 'react'
import cover from '../icon/cover.svg';
import ChannelHeader from '../component/channel/ChannelHeader';
import ChannelDescription from '../component/channel/ChannelDescription';
import ChannelVideo from '../component/channel/ChannelVideo';
import Sidebar from '../component/sidebar/Sidebar';
import Navbar from '../component//navbar/Navbar';

const MyChannel = () => {
    const [isVideo, setIsVideo] = useState(true);

    const handleChannel = (status) => {
        setIsVideo(status)
    }

    return(
        <div className="wrapper">
            <Sidebar />
            <div className="container">
                <Navbar />
                <div className="cover">
                    <img src={cover} alt="cover" />
                </div>
                <div className="channel-wrapper">
                    <ChannelHeader current={(status) => handleChannel(status)} isVideo={isVideo}/>
                    {(isVideo)? 
                        <ChannelVideo />:
                        <ChannelDescription />
                    }
                </div>
            </div>
        </div>
        
    )
}

export default MyChannel;