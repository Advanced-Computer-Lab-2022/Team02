import QuesForm from "../components/QuesForm";
import {useNavigate} from 'react-router-dom'
const QuizCrea = () => {
    let navigate=useNavigate()
    function BackToInstructor()
    {
        navigate('/Instructor')
    }

    return(
        <div className="admin">
            <QuesForm/>
            <button id="filterbutton" onClick={BackToInstructor}>create exam</button>
        </div>
        

    )



}
export default QuizCrea