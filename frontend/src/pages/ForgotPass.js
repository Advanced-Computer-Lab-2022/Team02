import { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext'


const ForgotPass = () => {
    const[Email,setEmail]=useState('')
    const [error,SetError] = useState(null)
    const {user} = useAuthContext()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = {Email}
        const response = await fetch('guest/forgotPass', {
            method: 'POST',
            body:JSON.stringify(email),
            headers: {
                'Content-Type': 'application/json'
            }

        })            
        console.log(email)
        const json= await response.json()

        if (!response.ok){
            SetError(json)
        }
        if (response.ok){
            setEmail('')
            SetError(null)
            console.log(json)
            alert(json)
        }
    }

return(
    <div>
    <form className="Forgot Password" onSubmit={handleSubmit}>
        <h3> Forgot Password</h3>

        <label>Enter Email:</label>
        <input
            type="text"
            onChange={(e)=> setEmail(e.target.value)}
            value={Email}
        />
        <button id="filterbutton">Submit</button>
        {error && <div className="error">{error}</div>}
    </form>
    </div>

)
}
export default ForgotPass