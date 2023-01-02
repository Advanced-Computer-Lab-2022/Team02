import react, {useState} from "react";
import { useAuthContext } from "../hooks/useAuthContext";
const params = new URLSearchParams(window.location.search)
const exerciseId= params.get('exerciseID')
var score = 0;
var check = 0;
const QuizDetails = ({ Questions }) => {
    const[choice,setchoice]= useState('')
    const {user} = useAuthContext();
    const [showText, setShowText] = useState(false);
    const [Finish,setFinish] = useState(true)
    const[submitted,setSubmitted]= useState(false)

    async function checkCorrect(){
        console.log(choice)
        if(choice===Questions.CorrectAnswer){
            console.log("good")
            score++;
            console.log(score)

        }
        console.log(score)
        check++;
        setShowText(true)
        setSubmitted(true)
    }
    function button()
    {
        if(check == Questions.length)
            return true
        else
            return false
    }
    function Q1()
    {
        setchoice(Questions.Choice1)
    }
    function Q2()
    {
        setchoice(Questions.Choice2)
    }
    function Q3()
    {
        setchoice(Questions.Choice3)
    }
    function Q4()
    {
        setchoice(Questions.Choice4)
    }
    const Text = () => <div>
    <p><strong>Correct Answer:</strong>{Questions.CorrectAnswer}</p>
    </div>;
    const submitExam = async()=>{
        const response = await fetch(`../corTrainee/setGrade?exerciseID=${exerciseId}`,{
            method:'POST',
            body:JSON.stringify({"grade":score}),
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${user.token}` //the token is a variable which holds the token
            }})
            const json = await response.json()
            if(response.ok)
            {
                console.log(json)
            }

        }
    return(
<div className="question-card">
        {!showText && <div><h4 className="question-test">{Questions.Question}</h4>
        <ul>
            <li onClick={Q1}>{Questions.Choice1}</li>
            <li onClick={Q2}>{Questions.Choice2}</li>
            <li onClick={Q3}>{Questions.Choice3}</li>
            <li onClick={Q4}>{Questions.Choice4}</li>
        </ul></div>}
        {!showText && <button id="Quizbutton" onClick={checkCorrect} disabled={submitted}>Submit</button>}
        {button && <button id="Quizbutton" onClick={submitExam}>Press to finish exam</button>}
        {showText ? <Text /> : null}
    </div>
    )



}
export default QuizDetails