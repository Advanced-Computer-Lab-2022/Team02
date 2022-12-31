import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
//const params = new URLSearchParams(window.location.search)
//const courseID = params.get('Id')
//import { Link } from 'react-router-dom';

const CoursePage = ({ course }) => {
    const [Link, setfLink] = useState("")
    const {user} = useAuthContext();
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const courseTitle = params.get('courseTitle');
    const handleChange = async(e) => {

        const link = {Link}
        console.log(Link)
        const response = await fetch(`/Instructor/InstructorLink/?courseId=${courseId}`, {
            method: 'POST',
            body:JSON.stringify(link),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        if (response.ok){
            setfLink('')
        }


    }

    return(
        <div>
        <div className="course-details">
            <h4>{courseTitle}</h4>
        </div>
        <div>
        <label><strong> Upload Link:</strong></label>
        <form>
        <input 
        type="text"
        value={Link}
        onChange={(e)=> setfLink(e.target.value)}
        />
        <button className="myButton"onClick={handleChange}>Submit
        </button>
        </form>
        <button className="myButton"onClick={() => window.location.href=`/AddSubtitle?courseId=${courseId}`}>Add Subtitle
        </button>
        </div>
        </div>
    )
}
export default CoursePage