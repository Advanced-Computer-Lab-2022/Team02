import { useEffect, useState } from "react"
//import { Link } from 'react-router-dom';

import CourseDetails from '../components/CourseDetails'

const Courses = () => {
    const [courses, setCourse] = useState(null)

    useEffect(()=>{
        const fetchCourses = async()=>{
            const response = await fetch('/indTrainee/viewAllCourses')
            const json = await response.json()

            if(response.ok){
                setCourse(json)

            }
        }
        fetchCourses()
    }, [])

    return(
        <div className="home">
            <div className="Courses">
                {courses && courses.map((Course) => (
                    <CourseDetails key={Course._id} course={Course}/>
                ))}
            </div>
        </div>

    )
    


}

export default Courses



