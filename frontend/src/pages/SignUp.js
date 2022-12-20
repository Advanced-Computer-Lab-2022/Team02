import { useState } from "react"
const CourseForm = () => {
    const [UserName,SetUserName] = useState('')
    const [password,SetPassword] = useState('')
    const [Email,SetEmail] = useState('')
    const [FirstName,SetFirstName] = useState('')
    const [LastName,SetLastName] = useState('')
    const [Gender,SetGender] = useState('')
    const [error,SetError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {UserName, password, Email, FirstName, LastName, Gender}

        const response = await fetch('/indTrainee/signUp', {
            method: 'POST',
            body:JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json= await response.json()

        if (!response.ok){
            SetError(json.error)
        }
        if (response.ok){
            SetGender('')
            SetEmail('')
            SetLastName('')
            SetFirstName('')
            SetPassword('')
            SetUserName('')
            SetError(null)
            console.log('Signed Up', json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div>
            <label>User Name</label>
            <input
                className="Sign"
                type="text"
                onChange={(e)=> SetUserName(e.target.value)}
                value={UserName}
            />
            </div>

            <div>
            <label>First Name</label>
            <input
                className="Sign"
                type="text"
                onChange={(e)=> SetFirstName(e.target.value)}
                value={FirstName}
            />
            </div>

            <div>
            <label>Last Name</label>
            <input
                className="Sign"
                type="text"
                onChange={(e)=> SetLastName(e.target.value)}
                value={LastName}
            />
            </div>

            <div>
            <label>Gender</label>
            <input
                className="Sign"
                type="text"
                onChange={(e)=> SetGender(e.target.value)}
                value={Gender}
            />
            </div>

            <div>
            <label>Email</label>
            <input
                className="Sign"
                type="text"
                onChange={(e)=> SetEmail(e.target.value)}
                value={Email}
            />
            </div>
    
            <div>
            <label>Password</label>
            <input
                className="Sign"
                type="password"
                onChange={(e)=> SetPassword(e.target.value)}
                value={password}
            />
            </div>

            <button id="addCourseButton" onClick={handleSubmit}>Sign Up</button>
            <br></br>
            <button id="addCourseButton" onClick={() => window.location.href='/'}>Already registered? Login</button>
            <br></br>
            {error && <div className="error">{error}</div>}
          
        </form>
        

    )
}

export default CourseForm