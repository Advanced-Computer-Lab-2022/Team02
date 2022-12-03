const SearchDetails = ({ course }) => {
    return(
        <div className="course-details">
            <h4>{course.title}</h4>
            <p><strong>Rating:</strong>{course.rating}</p>
            <p><strong>Hours:</strong>{course.hours}</p>
        </div>
    )
}
export default SearchDetails