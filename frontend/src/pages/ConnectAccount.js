import { JsonWebTokenError } from "jsonwebtoken"
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
const ConnectMailCor =()=>{
    const [Email,setEmail]=useState('')
    const {user} = useAuthContext()
    const [error,SetError] = useState(null)
    const params = new URLSearchParams(window.location.search);
    const Id = params.get('Id');
    console.log(Id);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userr = {Email}


        const response = await fetch('../corTrainee/connectMail', {
            method: 'POST',
            body:JSON.stringify(userr),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        console.log(response)

        if (!response.ok){
            SetError()
        }
        if (response.ok){
            setEmail('')
            SetError(null)
            console.log('Changes Done')
        }
    }

    return(
        <div>
        <form className="Change Password" onSubmit={handleSubmit}>
            <h3>Connect Email</h3>

            <label>Enter Email:</label>
            <input
                type="text"
                onChange={(e)=> setEmail(e.target.value)}
                value={Email}
            />
            <button id="filterbutton">Confirm Changes</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>
        )
}

export default ConnectMailCor