import { useEffect, useState } from "react"
//import { Link } from 'react-router-dom';

import CourseDetails from '../components/CoursDetails'
import SearchForm from '../components/SearchFormC'
import Ratee from "../components/RateInstructor"
import {useNavigate} from 'react-router-dom'


const Courses = () => {
    let navigate = useNavigate();
    const [courses, setCourse] = useState(null)
    const [subject, setSubject] = useState('');
    const [rating, setRating] = useState('');

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
                setSubject('');
                setRating('');
                setCourse(Courses);
            }
        }
        function EditClick(){
            navigate('/ChangeMyPasswordCor')
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
                <br></br>
                <Ratee></Ratee>
            </div>
            <form className="create">
            <button id="filterbutton"onClick={EditClick}>Edit Account</button>
            <br></br>
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



