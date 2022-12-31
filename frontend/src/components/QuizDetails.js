import react, {useState} from "react";

const params = new URLSearchParams(window.location.search)
const quizId= params.get('exerciseID')
var score = 0;
const QuizDetails = ({ Questions }) => {
    const[choice,setchoice]= useState('')
    const[submitted,setSubmitted]= useState(false)

    async function checkCorrect(){
        console.log(choice)
        if(choice===Questions.CorrectAnswer){
            console.log("good")
            score = score + 1;

        }
        console.log(score)
        setSubmitted(true)
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
    return(
<div className="question-card">
        <h4 className="question-test">{Questions.Question}</h4>
        <ul>
            <li onClick={Q1}>{Questions.Choice1}</li>
            <li onClick={Q2}>{Questions.Choice2}</li>
            <li onClick={Q3}>{Questions.Choice3}</li>
            <li onClick={Q4}>{Questions.Choice4}</li>
        </ul>
        <button id="Quizbutton" onClick={checkCorrect} disabled={submitted}>Submit</button>
    </div>
    )



}
export default QuizDetails