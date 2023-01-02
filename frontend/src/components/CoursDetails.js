import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {useSelector} from "react-redux"
const CourseDetails = ({ course }) => {

    const [showText, setShowText] = useState(false);
    const [rating, setRating] = useState('');
    const {user} = useAuthContext()
    const [CourseId] = useState(course._id)
    const Text = () => <div>
    {course.subtitle && Array.isArray(course.subtitle) && course.subtitle.map(({name}) => <p key={course.subtitle._id}><strong>Subtitle:</strong>{name}</p>)}
    <p><strong>Exercises:</strong>{course.exercises}</p>
    <p><strong>discount:</strong>{course.discount.discount}<strong>Time:</strong>{course.discount.time}</p>
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
    const reqCourse = async()=>{
        const response = await fetch (`/corTrainee/reqCourse`,{
            method:'POST',
            body:JSON.stringify({CourseId:course._id}),
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        const f = await response.json
        if(response.ok){
            alert(f)
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
        <button className="myButton" onClick={reqCourse}>Request Course</button>
        <button className="myButton" onClick={() => window.location.href=`/CoursePreview2?Id=${course._id}`}>Go to Course</button>
      
        </div>
        </div>
        
    )
}
export default CourseDetails