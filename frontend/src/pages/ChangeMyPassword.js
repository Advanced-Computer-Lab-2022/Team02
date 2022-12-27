import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
const ChangeMyPassword =()=>{
    const [password,setPassword]=useState('')
    const [error,SetError] = useState(null)
    const {user} = useAuthContext()
    const params = new URLSearchParams(window.location.search);
    const Id = params.get('Id');
    console.log(Id);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userr = {password}

        const response = await fetch('../indTrainee/changePassword', {
            method: 'POST',
            body:JSON.stringify(userr),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        console.log(userr)

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
        <form className="Change Password" onSubmit={handleSubmit}>
            <h3>Change My Password</h3>

            <label>New Password:</label>
            <input
                type="text"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
            />
            <button id="filterbutton">Confirm Changes</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>
        )
}

export default ChangeMyPassword