const CourseDetails = ({ course }) => {
    return(
        <div className="course-details">
            <h4>{course.title}</h4>
            <p><strong>Rating:</strong>{course.rating}</p>
            <p><strong>Hours:</strong>{course.hours}</p>
            <p><strong>Price:</strong>{course.price}</p>
            <p>{course.createdAt}</p>
        </div>
    )
}
export default CourseDetails