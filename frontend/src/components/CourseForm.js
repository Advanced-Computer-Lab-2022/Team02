import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
const CourseForm = () => {
    const [title,SetTitle] = useState('')
    const [subtitlee,SetSubtitle] = useState('')
    const [exercises,SetExercises] = useState('')
    const [summary,SetSummary] = useState('')
    const [subject,SetSubject] = useState('')
    const [hours,SetHours] = useState('')
    const [price,SetPrice] = useState('')
    const {user} = useAuthContext()
    const [error,SetError] = useState(null)
    const params = new URLSearchParams(window.location.search);
    const instructorID = params.get('Id');
    console.log(instructorID);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const subtitle = {name : subtitlee , hours : (hours/2)}
        const course = {title, summary, subject, hours, price}

        if(!user)
        {
            SetError('You must be logged in')
        }
        const response = await fetch('/Instructor/addCourse', {
            method: 'POST',
            body:JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json= await response.json()

        if (!response.ok){
            SetError(json.error)
        }
        if (response.ok){
            SetTitle('')
            SetSubtitle('')
            SetExercises('')
            SetSummary('')
            SetSubject('')
            SetHours('')
            SetPrice('')
            SetError(null)
            console.log('new Course added', json)
        }
    }

    return(
        <div className="create">
            <h3>Add a New Course</h3>
            <div>
            <label>Course Title</label>
            <input
                type="text"
                onChange={(e)=> SetTitle(e.target.value)}
                value={title}
            />
            </div>

            <div>
            <label>Summary</label>
            <input
                type="text"
                onChange={(e)=> SetSummary(e.target.value)}
                value={summary}
            />
            </div>
    
            <div>
            <label>Subject</label>
            <input
                type="text"
                onChange={(e)=> SetSubject(e.target.value)}
                value={subject}
            />
            </div>

            <div>
            <label>Hours</label>
            <input
                type="number"
                onChange={(e)=> SetHours(e.target.value)}
                value={hours}
            />
            </div>

            <div>
            <label>Price</label>
            <input
                type="number"
                onChange={(e)=> SetPrice(e.target.value)}
                value={price}
            />
            </div>

            <button id="addCourseButton" onClick={handleSubmit}>Add Course</button>
            {error && <div className="error">{error}</div>}
          
        </div>
        

    )
}

export default CourseForm