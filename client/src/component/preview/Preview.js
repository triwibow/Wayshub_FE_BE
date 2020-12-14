import './preview.css';

const Preview = (props) => {

    
    return (
        <div className="preview-container">
            <div className="preview-image">
                <h2>Photo</h2>
                <img src={props.data.photo} alt="preview" />
            </div>
            <div className="preview-image">
                <h2>Thumbnail</h2>
                <img src={props.data.thumbnail} alt="preview" />
            </div>     

        </div>
    )
}

export default Preview;

