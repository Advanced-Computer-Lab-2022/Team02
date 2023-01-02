import { useState, useEffect } from "react";
import QuizDetails from "../components/QuizDetailsC";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
const params =  new URLSearchParams(window.location.search)
const exerciseId = params.get('exerciseID')
const courseId = params.get('courseId')
console.log(exerciseId)
console.log(courseId)



const CorGetQuiz = () =>
{   const[score,setScore]= useState(0)
    const[question,setquestion]= useState('')
    const [showResults, setShowResults] = useState(false);
    const {user} = useAuthContext()


    useEffect(()=>{
        const fetchQuestion = async()=>{
            console.log("hello")
            const response = await fetch(`../corTrainee/getQuestions?exerciseID=${exerciseId}`,{
                headers: {
                  "Authorization": `Bearer ${user.token}` //the token is a variable which holds the token
                }})
                const json = await response.json()
                if(response.ok)
                {
                    setquestion(json)
                    console.log(json)
                    console.log(score)
                }
                else
                {
                    alert("no questions available")
                }

            }
                 
            if(user)
                fetchQuestion()
        
    }, [user])
    const nav = () => {
        window.location.href=`/corCourseExercises?courseId=${courseId}`
    }
    return(
        <div className="home">
            <div className="Courses">
                {question && question.map((Questions)=>(
                    <QuizDetails key={Questions._id} Questions={Questions} sendData={setScore}/>
                ))}
                <button className="myButton" onClick={nav}>Finish</button>

            </div>
        </div>
    )
}

export default CorGetQuiz