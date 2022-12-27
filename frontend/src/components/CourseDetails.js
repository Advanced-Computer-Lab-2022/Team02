import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
const CourseDetails = ({ course }) => {
    if(typeof course.discount === 'object')
    {
        var newDis= 1-(course.discount.discount/100);
        console.log(newDis)
    }
    var price = course.price * newDis
    const [showText, setShowText] = useState(false);
    const [discount, setDiscount] = useState('');
    const [time, setTime] = useState('');
    const {user} = useAuthContext()
    const [CourseId] = useState(course._id)
    const onClick = () => 
    {
        if(showText===true)
            setShowText(false)
        if(showText===false)
            setShowText(true)
    } 
    function average(nums) {
        if(nums.length>0)
            return nums.reduce((a, b) => (a + b)) / nums.length;
    }
    const discountt = async(req,res) =>
    {
        const discounttt={CourseId,discount,time}
        console.log(discounttt)
        const response = await fetch(`/Instructor/addDiscount`, {
            method: 'POST',
            body:JSON.stringify(discounttt),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
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
    <p><strong>discount:</strong>{course.discount.discount}</p>
    </div>;
    return(

        <div className="course-details">
            
                 <h4>{course.title}</h4>
                 <p><strong>Rating:</strong>{average(course.rating)}</p>
                 <p><strong>Hours:</strong>{course.hours}</p>
                 <p><strong>Price:</strong>{price}</p>

            
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