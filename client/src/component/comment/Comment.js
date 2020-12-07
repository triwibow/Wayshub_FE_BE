import './comment.css';
import CommentList from './CommentList';
import navbar_photo_profile from '../../icon/navbar_photo_profile.svg'

const Comment = () => {
    return(
        <div className="comment-container">
            <form className="comment-form">
                <div className="comment-input">
                    <img src={navbar_photo_profile} alt="profile" />
                    <input type="text" placeholder="Add Comment..." />
                </div>
                <button className="button">Comment</button>
            </form>
            <CommentList/>
            <CommentList/>
            <CommentList/>
            <CommentList/>
        </div>
    )
}

export default Comment;