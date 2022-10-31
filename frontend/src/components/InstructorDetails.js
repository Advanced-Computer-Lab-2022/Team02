const InstructorDetails = ({ instructor }) => {
    return(
        <div className="instructor-details">
            <h4>{instructor.username}</h4>
            <p>{instructor.createdAt}</p>
        </div>
    )
}
export default InstructorDetails