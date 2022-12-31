import react, {useState} from "react"
const params = new URLSearchParams(window.location.search)
const exerciseId = params.get('exercisesID')
const ExerciseDetails = ({exercises}) =>{
    const [exerciseId]= useState(exercises._id)

    return(
        <div className="course-details">
        <h4>Quiz</h4> 
        <p><strong>Quiz ID:</strong>{exercises._id}</p>
        <button className="myButton" onClick={()=>window.location.href=`/Quiz?exerciseID=${exerciseId}`}>Start Quiz</button>
    </div>
    )
}

export default ExerciseDetails