import { useState } from "react"
const AdministratorForm = () => {
    const [username,SetUsername] = useState('')
    const [password,SetPassword] = useState('')
    const [error,SetError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const administrator = {username, password}

        const response = await fetch('/Admin/addAdministrator', {
            method: 'POST',
            body:JSON.stringify(administrator),
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
            console.log('new Administrator added', json)
        }
    }

    return(
        <div className="adminCreate">
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Administrator</h3>

            <div>
            <label>Administrator Username:</label>
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

            <button id="addCourseButton">Add Administrator</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>
        

    )
}

export default AdministratorForm