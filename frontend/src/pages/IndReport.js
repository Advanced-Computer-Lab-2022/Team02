import { useState,useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const ReportCourseIND = () => {
    const[Username,setUsername] = useState('')
    const[Type,setType] = useState('')
    const[Details,setDetails] = useState('')
    const[CourseName,setCourseName] = useState('')
    const [error,SetError] = useState(null)
    const {user} = useAuthContext()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const report = {Username,Type,Details,CourseName}
        const response = await fetch('indTrainee/reportCourse', {
            method: 'POST',
            body:JSON.stringify(report),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`

            }
        })
        const json= await response.json()
        if (!response.ok){
            SetError()
        }
        if (response.ok){
            setUsername('')
            setType('')
            setDetails('')
            setCourseName('')

            SetError(null)
            console.log('new Report added', json)

        }
    

    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Report Problem</h3>
<div>
            <h4>Report</h4>
            <div>
            <label>Username:</label>
            <input
                type="text"
                onChange={(e)=> setUsername(e.target.value)}
                value={Username}
            />
            </div>
            <div>
            <label>Type:</label>
            <input
                type="text"
                onChange={(e)=> setType(e.target.value)}
                value={Type}
            />
            </div>
            <div>
            <label>Course Name:</label>
            <input
                type="text"
                onChange={(e)=> setCourseName(e.target.value)}
                value={CourseName}
            />
            </div>
            <div>
            <label>Details:</label>
            <input
                type="text"
                onChange={(e)=> setDetails(e.target.value)}
                value={Details}
            />
            </div>
</div>
            <button id="filterbutton">Submit</button>
            {error && <div className="error">{error}</div>}
        </form>

        

    )
 

}
export default ReportCourseIND