import { useState } from "react"
const CorpTraineeForm = () => {
    const [username,SetUsername] = useState('')
    const [password,SetPassword] = useState('')
    const [error,SetError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const corpTrainee = {username, password}

        const response = await fetch('Admin/addCorpTrainee', {
            method: 'POST',
            body:JSON.stringify(corpTrainee),
            headers: {
                'Content-Type': 'application/json'
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
            console.log('new Corporate Trainee added', json)
        }
    }

    return(
        <div className="adminCreate">
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Corporate Trainee</h3>

            <div>
            <label>Corporate Trainee Username:</label>
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

            <button id="addCourseButton">Add Corporate Trainee</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>
        

    )
}


export default CorpTraineeForm