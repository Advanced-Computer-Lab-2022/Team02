import react, {useState} from "react";
const params = new URLSearchParams(window.location.search)
const subtitleId= params.get('subtitleID')
const CorSubtitleDetails = ({subtitle}) => {
    const [subtitleId] = useState(subtitle._id)

    return(
    <div className="course-details">
        <h4>{subtitle.name}</h4> 
        <p><strong>Hours:</strong>{subtitle.hours}</p>
        <p><strong>Description:</strong>{subtitle.description}</p>
        <button className="myButton" onClick={()=>window.location.href=`/corSubVid?subtitleID=${subtitleId}`}>Video</button>

    </div>
    )
}

export default CorSubtitleDetails