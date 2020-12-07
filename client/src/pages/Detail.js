// css
import '../App.css';

// component
import Video from '../component/video/Video';
import Card from '../component/card/Card';
import PostVideo from '../api/PostVideo';
import Sidebar from '../component/sidebar/Sidebar';
import Navbar from '../component//navbar/Navbar';

const Detail = () => {
    return(
        <div className="wrapper">
            <Sidebar />
            <div className="container">
                <Navbar />
                <div className="video-container">
                    <Video/>
                    <div className="recomendation-video">
                        {PostVideo.map(item => {                       
                            return <Card key={item.id} data={item} />
                        })}
                    </div>
                </div>
            </div>
        </div>
        
   )
}

export default Detail;