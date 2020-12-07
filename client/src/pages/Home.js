// css
import '../App.css';

// component
import Sidebar from '../component/sidebar/Sidebar';
import Navbar from '../component//navbar/Navbar';
import Card from '../component/card/Card';

// fake data
import PostVideo from '../api/PostVideo';

const Home = () => {
   return(
    <div className="wrapper">
        <Sidebar />
        <div className="container">
            <Navbar />
            <div className="card-content">
                {PostVideo.map(item => {                       
                    return <Card key={item.id} data={item} />
                })}
            </div>
        </div>
    </div>
        
   )
}

export default Home;