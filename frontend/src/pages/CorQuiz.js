import { useState, useEffect } from "react";
import QuizDetails from "../components/QuizDetails";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext'
const params =  new URLSearchParams(window.location.search)
const exerciseId = params.get('exerciseID')



const CorGetQuiz = () =>
{   var score = 0;
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
                }
                else
                {
                    alert("no questions available")
                }

            }
                 
            if(user)
                fetchQuestion()
        
    }, [user])


    return(
        <div className="home">
            <div className="Courses">
                {question && question.map((Questions)=>(
                    <QuizDetails key={Questions._id} Questions={Questions}/>
                ))}
                <button className="myButton">Finish</button>

            </div>
        </div>
    )
}

export default CorGetQuiz