import { useState } from "react";
import{ useAuthContext } from "../hooks/useAuthContext"


const QuesForm=()=>{
    const[Question,setQuestion]=useState('')
    const[Choice1,setChoice1]=useState('')
    const[Choice2,setChoice2]=useState('')
    const[Choice3,setChoice3]=useState('')
    const[Choice4,setChoice4]=useState('')
    const[CorrectAnswer,setCorrectAnswer]=useState('')
    const[error,SetError] = useState(null)
    const{user} = useAuthContext()
    var number = 1;



    const handleSubmit = async (e) => {
        e.preventDefault()

        const question = {Question, Choice1, Choice2, Choice3, Choice4,CorrectAnswer}
        const response = await fetch('Instructor/createQuestion', {
            method: 'POST',
            body:JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`

            }
        })
        const json= await response.json()

        if (!response.ok){
            SetError()
        }
        if (response.ok){
            setQuestion('')
            setChoice1('')
            setChoice2('')
            setChoice3('')
            setChoice4('')
            setCorrectAnswer('')

            SetError(null)
            console.log('new Question added', json)
            number ++;

        }
    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add Question and Choices</h3>
<div>
            <h4>Question</h4>
            <div>
            <label>Question:</label>
            <input
                type="text"
                onChange={(e)=> setQuestion(e.target.value)}
                value={Question}
            />
            </div>
            <div>
            <label>Choice1:</label>
            <input
                type="text"
                onChange={(e)=> setChoice1(e.target.value)}
                value={Choice1}
            />
            </div>
            <div>
            <label>Choice2:</label>
            <input
                type="text"
                onChange={(e)=> setChoice2(e.target.value)}
                value={Choice2}
            />
            </div>
            <div>
            <label>Choice3:</label>
            <input
                type="text"
                onChange={(e)=> setChoice3(e.target.value)}
                value={Choice3}
            />
            </div>
            <div>
            <label>Choice4:</label>
            <input
                type="text"
                onChange={(e)=> setChoice4(e.target.value)}
                value={Choice4}
            />
            </div>
            <div>
             <label>Correct Choice:</label>
            <input
                type="text"
                onChange={(e)=> setCorrectAnswer(e.target.value)}
                value={CorrectAnswer}
            />
            </div>
</div>
            <button id="filterbutton">Submit</button>
            {error && <div className="error">{error}</div>}
        </form>

        

    )

}
export default QuesForm
