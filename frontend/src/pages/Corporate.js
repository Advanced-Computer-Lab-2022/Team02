import { useEffect, useState } from "react"
//import { Link } from 'react-router-dom';

import CourseDetails from '../components/CoursDetails'
import SearchForm from '../components/SearchForm'


const Courses = () => {
    const [courses, setCourse] = useState(null)
    const [subject, setSubject] = useState(undefined);
    const [rating, setRating] = useState(undefined);

    useEffect(()=>{
        const fetchCourses = async()=>{
            const response =  await fetch('/indTrainee/viewAllCourses')
            const json = await response.json()

            if(response.ok){
                setCourse(json)
            }
        }
        fetchCourses()
    }, [])

    const Filter = async(e) => {
            console.log(rating);
            e.preventDefault();
            const filter = {rating,subject};
            const response = await fetch('/corTrainee/filterCoursesSR' , {
                method : 'POST',
                body : JSON.stringify(filter),
                headers: {
                    'Content-Type': 'application/json'
                }

            } )
            const Courses = await response.json()
            console.log(Courses);
            if(response.ok)
            {
                setSubject(undefined);
                setRating(undefined);
                setCourse(Courses);
            }
        }


    return(
        <div className="home">
            <div className="Courses">
                {courses && courses.map((course) => (
                    <CourseDetails key={course._id} course={course}/>
                ))}
            </div>
            <div>
                <SearchForm></SearchForm>
            </div>
            <form className="create">
            <div>
            <label>Rating</label>
            <input id="filter"
                type="number"
                onChange={(e)=> setRating(e.target.value)}
                value={rating}
            />
            </div>

            <div>
            <label>Subject</label>
            <input id="filter"
                type="text"
                onChange={(e)=> setSubject(e.target.value)}
                value={subject}
            />
            <button id="filterbutton" onClick={Filter} >Filter</button>
            </div>
            </form>
        </div>

    )
    


}


export default Courses



