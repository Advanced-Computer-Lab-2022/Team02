const QuestionDetails = ({ question }) => {
    return(
        <div className="question-details">
        <h4>{question.Question}</h4>
        <p>{question.Choice1}</p>
        <p>{question.Choice2}</p>
        <p>{question.Choice3}</p>
        <p>{question.Choice4}</p>
    </div>
    )



}
export default QuestionDetails