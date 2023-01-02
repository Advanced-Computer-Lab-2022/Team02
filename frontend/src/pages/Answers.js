import { useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'

const params = new URLSearchParams(window.location.search)
const exerciseId = params.get('exerciseID')

const ViewAns = () => {
    const [answers, setAnswers] = useState(null)
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchAnswers = async()=>{
            if(user !== null){
            await axios.get(`/indTrainee/correctAnswer?exerciseID=${exerciseId}`,{
                headers: {
                  "Authorization": `Bearer ${user.token}` //the token is a variable which holds the token
                }}).then(
                (res) => { 
                    const f = res.data
                    console.log(res.data)
                    setAnswers(f)
                }
                 );
            }
        }
        
        fetchAnswers()
    }, [user])

    return(
        <div className="home">
            <div className="Courses">
                {answers && answers.map((answer) => (
                    <div className="course-details" key={answer._id}>
                        <p id ="account"><strong>Question:</strong>{answer.Question}</p>
                        <p><strong>Answer:</strong>{answer.CorrectAnswer}</p>
                    </div>
                ))}
            </div>
        </div>
)
}

export default ViewAns