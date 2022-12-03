const QuizDetails = ({ quiz }) => {
    return(
        <div className="question-details">
        <h4>{quiz.Question1}</h4>
        <h4>{quiz.Question2}</h4>
        <h4>{quiz.Question3}</h4>
        <h4>{quiz.Question4}</h4>
    </div>
    )



}
export default QuizDetails