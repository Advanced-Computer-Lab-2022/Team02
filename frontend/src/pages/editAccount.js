import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
const EditAccount = () => {

    const[email,setEmail] = useState('')
    const[biography,setBio] = useState('')
    const[password,setPassword] = useState('')
    const [error,SetError] = useState(null)
    const {user} = useAuthContext()
    const params = new URLSearchParams(window.location.search);
    const insId = params.get('Id');
    console.log(insId);

    const handleSubmit1 = async (e) => {
        e.preventDefault()

        const instructor = {email}


        const response = await fetch(`../Instructor/editEmail?Id=${insId}`, {
            method: 'POST',
            body:JSON.stringify(instructor),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        console.log(instructor)

        if (!response.ok){
            SetError()
        }
        if (response.ok){
            setEmail('')
            SetError(null)
            console.log('Email Edited')
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const instructor = {biography}


        const response = await fetch(`../Instructor/editBio?Id=${insId}`, {
            method: 'POST',
            body:JSON.stringify(instructor),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        console.log(instructor)

        if (!response.ok){
            SetError()
        }
        if (response.ok){
            setBio('')
            SetError(null)
            console.log('Changes Done')
        }
    }
    const handleSubmit2 = async (e) => {
        e.preventDefault()

        const instructor = {password}


        const response = await fetch(`../Instructor/changePassword?Id=${insId}`, {
            method: 'POST',
            body:JSON.stringify(instructor),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        console.log(instructor)

        if (!response.ok){
            SetError()
        }
        if (response.ok){
            setPassword('')
            SetError(null)
            console.log('Changes Done')
        }
    }

    return(
        <div>
        <form className="Edit" onSubmit={handleSubmit1}>
            <h3>Edit Account</h3>

            <label>Email:</label>
            <input
                type="text"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
            />
            <button id="filterbutton">Edit Email</button>
            {error && <div className="error">{error}</div>}
        </form>
        <form className="Edit" onSubmit={handleSubmit}>
            <h3>Edit Biography</h3>
            <label>Biography:</label>
            <input
                type="text"
                onChange={(e)=> setBio(e.target.value)}
                value={biography}
            />

            <button id="filterbutton">Edit Biography</button>
            {error && <div className="error">{error}</div>}
        </form>
        <form className="Edit" onSubmit={handleSubmit2}>
            <h3>Change Password</h3>
            <label>New Password:</label>
            <input
                type="text"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
            />

            <button id="filterbutton">Change Password</button>
            {error && <div className="error">{error}</div>}
        </form>

        </div>
        

    )
    


}
export default EditAccount

