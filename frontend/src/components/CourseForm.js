import { useState } from "react"
const CourseForm = () => {
    const [title,SetTitle] = useState('')
    const [subtitle,SetSubtitle] = useState('')
    const [exercises,SetExercises] = useState('')
    const [summary,SetSummary] = useState('')
    const [subject,SetSubject] = useState('')
    const [hours,SetHours] = useState('')
    const [price,SetPrice] = useState('')
    const [discount,SetDiscunt] = useState('')
    const [rating,SetRating] = useState('')
    const [error,SetError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const course = {title, subtitle, exercises, summary, subject, hours, price, discount, rating}

        const response = await fetch('/Instructor/addCourse', {
            method: 'POST',
            body:JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json= await response.json

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
            SetDiscunt('')
            SetRating('')
            SetError(null)
            console.log('new Course added', json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Course</h3>

            <label>Course Title:</label>
            <input
                type="text"
                onChange={(e)=> SetTitle(e.target.value)}
                value={title}
            />

            <label>Subtitle:</label>
            <input
                type="text"
                onChange={(e)=> SetSubtitle(e.target.value)}
                value={subtitle}
            />

            <label>Exercises:</label>
            <input
                type="text"
                onChange={(e)=> SetExercises(e.target.value)}
                value={exercises}
            />

            <label>Summary:</label>
            <input
                type="text"
                onChange={(e)=> SetSummary(e.target.value)}
                value={summary}
            />

            <label>Subject:</label>
            <input
                type="text"
                onChange={(e)=> SetSubject(e.target.value)}
                value={subject}
            />

            <label>Hours:</label>
            <input
                type="number"
                onChange={(e)=> SetHours(e.target.value)}
                value={hours}
            />

            <label>Price:</label>
            <input
                type="number"
                onChange={(e)=> SetPrice(e.target.value)}
                value={price}
            />

            <label>Discount:</label>
            <input
                type="number"
                onChange={(e)=> SetDiscunt(e.target.value)}
                value={discount}
            />

            <label>Rating:</label>
            <input
                type="number"
                onChange={(e)=> SetRating(e.target.value)}
                value={rating}
            />

            <button>Add Course</button>
            {error && <div className="error">{error}</div>}
        </form>
        

    )
}

export default CourseForm