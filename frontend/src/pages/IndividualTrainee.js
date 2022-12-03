import { useEffect, useState } from "react"
//import { Link } from 'react-router-dom';
import SearchForm from '../components/SearchForm'
import Ratee from '../components/RateInstructor'
import {useNavigate} from 'react-router-dom'
import CourseDetailsI from '../components/CoursedetailsI'

const Courses = () => {
    let navigate = useNavigate();
    const [courses, setCourse] = useState(null)
    const [subject, setSubject] = useState('');
    const [rating, setRating] = useState('');
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
            setSubject('');
            setRating('');
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
    function EditClick(){
        navigate('/ChangeMyPassword')
    }
    return(
        <div className="home">
            <div className="Courses">
                {courses && courses.map((course) => (
                    <CourseDetailsI key={course._id} course={course}/>
                ))}
            <form className="create">
            <button id="filterbutton"onClick={EditClick}>Edit Account</button>
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
                value={price}
            />
            <button id="filterbutton" onClick={Filter2} >Filter</button>
            </div>
            </form>
            </div>
            <div>
            <SearchForm></SearchForm>
            <br></br>
            <Ratee></Ratee>
            </div>
        </div>

    )
    


}

export default Courses



