import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
const InstructorForm = () => {
    const {user} = useAuthContext()
    const [username,SetUsername] = useState('')
    const [password,SetPassword] = useState('')
    const [error,SetError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const instructor = {username, password}

        const response = await fetch('Admin/addInstructor', {
            method: 'POST',
            body:JSON.stringify(instructor),
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
            SetUsername('')
            SetPassword('')
            SetError(null)
            console.log('new Instructor added', json)
        }
    }

    return(
        <div>
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Instructor</h3>
            <div>
            <label>Instructor Username:</label>
            <input
                type="text"
                onChange={(e)=> SetUsername(e.target.value)}
                value={username}
            />
            </div>

            <div>
            <label>Password:</label>
            <input
                type="text"
                onChange={(e)=> SetPassword(e.target.value)}
                value={password}
            />
            </div>

            <button id="addCourseButton">Add Instructor</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>

        

    )
}


export default InstructorForm