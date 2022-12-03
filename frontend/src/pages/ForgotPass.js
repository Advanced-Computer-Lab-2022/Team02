import { useState } from "react";


const ForgotPass = () => {
    const[email,setEmail]=useState('')
    const [error,SetError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {email}
        const response = await fetch('Instructor/forgotPass', {
            method: 'POST',
            body:JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json= await response.json()

        if (!response.ok){
            SetError()
        }
        if (response.ok){
           setEmail('')
            SetError(null)
            console.log(response)
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
            value={email}
        />
        <button id="filterbutton">Submit</button>
        {error && <div className="error">{error}</div>}
    </form>
    </div>

)
}
export default ForgotPass