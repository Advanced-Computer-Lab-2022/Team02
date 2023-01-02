import react, {useState} from "react"
import { useAuthContext } from "../hooks/useAuthContext";
const params = new URLSearchParams(window.location.search)
const courseId = params.get('courseId')
var num = 1;
const CorExerciseDetails = ({exercises}) =>{
    const {user} = useAuthContext()
    const [grade,setGrades] = useState("")
    console.log(grade)
    const startQuiz= async() =>{
        const response = await fetch(`/corTrainee/startQuiz`, {
            method: 'POST',
            body:JSON.stringify({quizID:exercises._id}),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        if (response.ok){
            window.location.href=`/corQuiz?exerciseID=${exercises._id}&courseId=${courseId}`
            alert("Quiz Started")
        }
    }
    const getGrade= async() =>{
        const response = await fetch(`/corTrainee/grade`, {
            method: 'POST',
            body:JSON.stringify({exerciseID:exercises._id}),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json= await response.json()
        if (response.ok){
            setGrades(json)
            console.log(json)
        }
    }
    function checkStatus(value)
    {
        if(value == "finished")
        {
            console.log("hello")
            return true
        }
        else
            return false
    }
    return(
        <div className="course-details">
        <h4>Quiz {((num++)/2)}</h4>
        {((grade && !checkStatus(grade.Status)) || grade == null) && <button className="myButton" onClick={startQuiz}>Start Quiz</button>}
        {grade && checkStatus(grade.Status) && <div><p><strong>Grade:</strong>{grade.Grade}</p><br></br><button className="myButton" onClick={() => window.location.href=`/answers?exerciseID=${exercises._id}`}>Check Correct Answers</button></div>}
        <button className="myButton" onClick={getGrade}>check Status</button>
    </div>
    )
}

export default CorExerciseDetails