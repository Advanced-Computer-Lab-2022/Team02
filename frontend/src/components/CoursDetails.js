import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
const CourseDetails = ({ course }) => {
    const [showText, setShowText] = useState(false);
    const [rating, setRating] = useState('');
    const {user} = useAuthContext()
    const [CourseId] = useState(course._id)
    const Text = () => <div>
    {course.subtitle && Array.isArray(course.subtitle) && course.subtitle.map(({name}) => <p key={course.subtitle._id}><strong>Subtitle:</strong>{name}</p>)}
    <p><strong>Exercises:</strong>{course.exercises}</p>
    <p><strong>discount:</strong>{course.discount}</p>
    </div>;
    const onClick = () => 
    {
        if(showText===true)
            setShowText(false)
        if(showText===false)
            setShowText(true)
    } 
    const rateCourse= async() =>{
        const ratingg={CourseId,rating}
        console.log(ratingg)
        const response = await fetch(`/corTrainee/rateCourse`, {
            method: 'POST',
            body:JSON.stringify(ratingg),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json= await response.json

        if (response.ok){
            setRating('')
            console.log('Course Rated',json)
        }
    }
    function average(nums) {
        if(nums.length>0)
            return nums.reduce((a, b) => (a + b)) / nums.length;
    }
    return(
        <div className="course-details">
            <h4>{course.title}</h4>
            <p><strong>Rating:</strong>{average(course.rating)}</p>
            <p><strong>Hours:</strong>{course.hours}</p>
        <div>
        <button className="myButton"onClick={onClick}>viewAllDetails</button>
        {showText ? <Text /> : null}
        </div>
            <input
                className="h"
                type="number"
                onChange={(e)=> setRating(e.target.value)}
                value={rating}
            />
            <button className="myButton"onClick={rateCourse}>Rate</button>
            <br></br>
            <button className="myButton" onClick={() => window.location.href=`/CoursePreview?Id=${course._id}`}>Go to course</button>
        </div>
        
    )
}
export default CourseDetails