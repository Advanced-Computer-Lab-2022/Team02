
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Home = ()=> {
    const [UserName,SetUserName] = useState('')
    const [password,SetPassword] = useState('')
    const {login,error,isLoading} = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(UserName,password)
    }
    return(
      <form className="login" onSubmit={handleSubmit}>
      <h3 className='loginn'>Login</h3>


      <label className='field'>User Name</label>
      <input
          className='login'
          type="text"
          onChange={(e)=> SetUserName(e.target.value)}
          value={UserName}
      />
      <br></br>
      <br></br>
      <label className='field'>Password</label>
      <input
          className='login'
          type="password"
          onChange={(e)=> SetPassword(e.target.value)}
          value={password}
      />
      <br></br>
        <button id="loginButton" disabled={isLoading}>Login</button>
        <button id="loginButton" onClick={() => window.location.href='/signUp'}>Sign Up</button>
        <button id="loginButtonn" onClick={() => window.location.href='/guest'}>Continue as guest</button>
        <br></br>
        {error && <div className="error">{error}</div>}
      </form>

      
    )
}

export default Home
