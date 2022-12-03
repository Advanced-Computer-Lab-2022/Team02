import React, { useState } from "react";

const CourseDetails = ({ course }) => {
    const [showText, setShowText] = useState(false);
    const [discount, setDiscount] = useState('');
    const [time, setTime] = useState('');
    const [CourseId] = useState(course._id)
    const onClick = () => 
    {
        if(showText===true)
            setShowText(false)
        if(showText===false)
            setShowText(true)
    } 
    const discountt = async(req,res) =>
    {
        const discounttt={CourseId,discount,time}
        console.log(discounttt)
        const response = await fetch(`/Instructor/addDiscount`, {
            method: 'POST',
            body:JSON.stringify(discounttt),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json= await response.json

        if (response.ok){
            setDiscount('')
            setTime('')
            console.log('Discount added',json)
        }
    }
    
    const Text = () => <div>
    {course.subtitle && Array.isArray(course.subtitle) && course.subtitle.map(({name}) => <p key={course.subtitle._id}><strong>Subtitle:</strong>{name}</p>)}
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
            <input
                className="h"
                type="number"
                onChange={(e)=> setDiscount(e.target.value)}
                value={discount}
                placeholder="Discount value"
            />
            <input
                className="h"
                type="number"
                onChange={(e)=> setTime(e.target.value)}
                value={time}
                placeholder="Time"
            />
            <button className="myButton"onClick={discountt}>addDiscount</button>
            <br></br>
            <button className="myButton"onClick={() => window.location.href=`/CoursePage?courseId=${course._id}&courseTitle=${course.title}`}>Go to course
            </button>
        </div>

        
       
    )
}
export default CourseDetails