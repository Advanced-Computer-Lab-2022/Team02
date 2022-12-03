const CourseDetailsIns = ({course}) =>{
    return(
        <div className="course-details">
            <h4>{course.title}</h4>
            {course.rating && Array.isArray(course.rating) && course.rating.map((rate) => <p key={course._id}><strong>Rating:</strong>{rate}</p>)} 
            <p><strong>Price:</strong>{course.price}</p>      
            <p><strong>Reviews:</strong>{course.reviews.join('-')}</p>     
        </div>
    )
}

export default CourseDetailsIns