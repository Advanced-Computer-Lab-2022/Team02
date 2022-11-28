import { useEffect, useState } from "react"
//import { Link } from 'react-router-dom';
import SearchForm from '../components/SearchForm'

import CourseDetails from '../components/CourseDetails'

const Courses = () => {
    const [courses, setCourse] = useState(null)
    const [subject, setSubject] = useState(undefined);
    const [rating, setRating] = useState(undefined);
    const [price, setPrice] = useState('');

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
    const Filter2 = async(e) => {
        console.log(price);
        e.preventDefault();
        const filter = {price};
        const response = await fetch('/Instructor/filterCoursesP' , {
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
            setPrice('');
            setCourse(Courses);
        }
    }
    return(
        <div className="home">
            <div className="Courses">
                {courses && courses.map((course) => (
                    <CourseDetails key={course._id} course={course}/>
                ))}
            <form className="create">
            <div className="block">
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

            <div className="block">
            <label>Price</label>
            <input id="filter"
                type="number"
                onChange={(e)=> setPrice(e.target.value)}
                value={subject}
            />
            <button id="filterbutton" onClick={Filter2} >Filter</button>
            </div>
            </form>
            </div>
            <SearchForm></SearchForm>
        </div>

    )
    


}

export default Courses



