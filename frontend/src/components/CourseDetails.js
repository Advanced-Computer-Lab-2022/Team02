import React, { useState } from "react";

const CourseDetails = ({ course }) => {
    const [showText, setShowText] = useState(false);
    const onClick = () => 
    {
        if(showText===true)
            setShowText(false)
        if(showText===false)
            setShowText(true)
    }
    const Text = () => <div>
    <p><strong>Subtitle:</strong>{course.subtitle}</p>
    <p><strong>Exercises:</strong>{course.exercises}</p>
    <p><strong>discount:</strong>{course.discount}</p>
    </div>;
    return(
        <div className="course-details">
            <h4>{course.title}</h4>
            <p><strong>Rating:</strong>{course.rating}</p>
            <p><strong>Hours:</strong>{course.hours}</p>
            <p><strong>Price:</strong>{course.price}</p>
            <div>
            <button className="myButton"onClick={onClick}>viewAllDetails</button>
            {showText ? <Text /> : null}
            </div>
        </div>
            
        
       
    )
}
export default CourseDetails