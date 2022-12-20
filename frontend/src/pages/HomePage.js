
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Home = ()=> {
    let navigate = useNavigate();
    const [UserName,SetUserName] = useState('')
    const [password,SetPassword] = useState('')
    const [type,SetType] = useState('')
    const [error,SetError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {UserName, password}

        const response = await fetch('/indTrainee/login', {
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
            SetPassword('')
            SetUserName('')
            SetType(json)
            SetError(null)
        }
        console.log(json)
        if(json === "1")
            navigate('/admin')
        if(json === "2")
            navigate('/Instructor')
        if(json === "3")
            navigate('/InTrainee')
        if(json === "4")
            navigate('/CorTrainee')
    }
    return(
      <form className="create" onSubmit={handleSubmit}>
      <h3 className='loginn'>Login</h3>

      <div className='loginn'>
      <label>User Name</label>
      <input
          className='login'
          type="text"
          onChange={(e)=> SetUserName(e.target.value)}
          value={UserName}
      />
      </div>

      <div className='loginn'>
      <label>Password</label>
      <input
          className='login'
          type="password"
          onChange={(e)=> SetPassword(e.target.value)}
          value={password}
      />
      </div>
        <button id="loginButton">Login</button>
        <button id="loginButton" onClick={() => window.location.href='/signUp'}>Sign Up</button>
        <button id="loginButton" onClick={() => window.location.href='/guest'}>Continue as guest</button>
        <br></br>
        {error && <div className="error">{error}</div>}
      </form>

      
    )
}

export default Home
