import {useNavigate} from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";

const Continue= () =>
{   
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('CourseId');
    const {user} = useAuthContext()
    let navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()


        const response = await fetch(`../indTrainee/regCourse?courseId=${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })

        if (!response.ok){
        }
        if (response.ok){
            console.log('Changes Done')
            navigate('/inTrainee')
        }
    }
 
    
    return(
        <div>
                      <a onClick={handleSubmit}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Continue
                </a>
        </div>
    )
}

export default Continue