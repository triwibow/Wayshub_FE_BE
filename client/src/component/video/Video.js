import './video.css';
import {Link} from 'react-router-dom';
import ReactPlayer from 'react-player';

import Comment from '../comment/Comment';

import number_views from '../../icon/number_views.svg';
import refresh_icon from '../../icon/refresh_icon.svg';
import navbar_photo_profile from '../../icon/navbar_photo_profile.svg';

const Video = () => {
    return(
        <div>
            <div className="video-wrapper">
                <ReactPlayer className="video-player" url="https://www.youtube.com/watch?v=6pzfX1FePdo" />
                <h1 className="video-title">BBQ Montain Boys Episode 5 : A Day in The Life of Farmer</h1>
                <span>
                    <img src={number_views} alt="number_views" /> 162K
                </span>
                <span>
                    <img src={refresh_icon} alt="refresh_icon" /> 06 Sep 2020
                </span>
            </div>
            <div className="video-description-wrapper">
                <div className="video-description-header">
                    <img src={navbar_photo_profile} alt="foto profil"/>
                    <div className="video-username">
                        <Link to="/content-creator" className="link">
                            <span className="content-creator-username">Egi Jos</span>
                        </Link>
                        <span className="count-subscriber">15K Subscriber</span>
                    </div>
                    <div className="button-wrapper">
                        <button className="btn-subscribe">Subscribe</button>
                    </div>
                </div>
                <div className="video-description-body">
                    <p>I hope these videos bring you joy! A very special thanks to each and every one of you who support my channel through Patreon and Paypal. Do you enjoy my channel? Please consider supporting me! I can’t earn revenue on YouTube due to copyright restrictions, so help the channel continue to gr</p>
                    <button className="show-more">Show More</button>
                </div>
                <Comment />
            </div>
        </div>
    )
}

export default Video;