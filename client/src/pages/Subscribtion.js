// css
import '../App.css';

// component
import Card from '../component/card/Card';
import Sidebar from '../component/sidebar/Sidebar';
import Navbar from '../component//navbar/Navbar';

// fake data
import SubscribtionVideo from '../api/SubscribtionVideo';

const Subscribtion = () => {
   return(
    <div className="wrapper">
        <Sidebar />
        <div className="container">
            <Navbar />
            <div className="card-content">
                {SubscribtionVideo.map(item => {                       
                    return <Card key={item.id} data={item} />
                })}
            </div>
        </div>
    </div>
    
   )
}

export default Subscribtion;