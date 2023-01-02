
import { useState,useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
const ChangeMyPasswordCor =()=>{
    const [password,setPassword]=useState('')
    const {user} = useAuthContext()
    const [info,setInfo] = useState(null)
    const [error,SetError] = useState(null)
    const [courses,setCourses] = useState(null)
    const params = new URLSearchParams(window.location.search);
    const Id = params.get('Id');

    useEffect(()=>{
        const getAccount = async() => {
            const response = await fetch('../corTrainee/Account', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await response.json();
            console.log(json)
            if (response.ok){
                setInfo(json)
            }
        }
        const getCourses = async() => {
            const response = await fetch('../corTrainee/getMyCoursesDetails', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await response.json();
            console.log(json)
            if (response.ok){
                setCourses(json)
            }
        }
        if(user)
        {
            getAccount();
            getCourses();
        }
            
        }, [user])
    const handleSubmit = async (e) => {
        e.preventDefault()

        const userr = {password}


        const response = await fetch('../corTrainee/changePassword', {
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
            setPassword('')
            SetError(null)
            console.log('Changes Done')
        }
    }

    return(
        <div>
        <form className="Change Password" onSubmit={handleSubmit}>
        {info && <div>
            <p id="account"><strong>Email:</strong>{info.Email}</p>
            <p id="account" type="password"><strong>Password:</strong>{info.password}</p>
            <p id="account"><strong>Username:</strong>{info.UserName}</p>
            <p id="account"><strong>FirstName:</strong>{info.FirstName}</p>
            <p id="account"><strong>LastName:</strong>{info.LastName}</p>
            <p id="account"><strong>Gender:</strong>{info.Gender}</p>
            <p id="account"><strong>Your Courses: </strong>{courses && courses.join('-')}</p>
            </div>}
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

export default ChangeMyPasswordCor