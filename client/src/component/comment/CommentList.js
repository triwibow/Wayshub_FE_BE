import './comment.css';
import navbar_photo_profile from '../../icon/navbar_photo_profile.svg';

const CommentList = () => {
    return(
        <div className="comment-list">
            <img src={navbar_photo_profile} alt="proifl"/>
            <div className="comment-body">
                <h2>Michael Scumaker</h2>
                <p>Man you don't know how important your work is to me, to us. As a med student I spend more time studying than doing anything else, I spend more time on my own with my computer than with my family and friends. I really gotta say thank you for actually making these "hard" moments enjoyable ! When I'll be a doctor I'll remember that people like you helped me more that probably realize</p>
            </div>
        </div>
    )
}

export default CommentList;