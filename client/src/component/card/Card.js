import './card.css';
import {Link} from 'react-router-dom';
import number_views from '../../icon/number_views.svg';
import refresh_icon from '../../icon/refresh_icon.svg';

const Card = ({data}) => {
    const {id, title, username, seen, date, thumbnail} = data;

    return(
        <div className="card">
            <img src={thumbnail} alt="card_thumbnail" className="card-thumbnail" />
            <Link to="/detail" className="link">
                <h1 className="card-title">{title}</h1>
            </Link>
            <p className="card-username">{username}</p>
            <span>
                <img src={number_views} alt="number_views" /> {seen}
            </span>
            <span>
                <img src={refresh_icon} alt="refresh_icon" /> {date}
            </span>
        </div>
    )
}

export default Card;