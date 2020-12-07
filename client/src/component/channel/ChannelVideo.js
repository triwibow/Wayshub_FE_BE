import './channel.css';
import Card from '../card/Card';

import PostVideo from '../../api/PostVideo';

const ChannelVideo = () => {
    return(
        <div className="channel-card">
            {PostVideo.map(item => {                       
                return <Card key={item.id} data={item} />
            })}
        </div>
    )
}

export default ChannelVideo;