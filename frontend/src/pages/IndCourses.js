import { useEffect, useState } from "react"
import SearchForm from '../components/SearchFormC'
import Ratee from "../components/RateInstructor"
import MyCourseDetails from "../components/MyCourseDetails"
import CourseDetails from "../components/CoursedetailsI"
import ICourseDetails from "../components/ICourseDetails"
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"
const MyCoursesInd = () => {
    let navigate = useNavigate();
    const {user} = useAuthContext()
    const [courses, setCourse] = useState(null)
    const [subject, setSubject] = useState('');
    const [rating, setRating] = useState('');

    useEffect(()=>{
        const fetchMyCourses = async()=>{
            if(user!==null){
            const response =  await fetch('/indTrainee/getMyCourses',{
                headers: {
                  "Authorization": `Bearer ${user.token}`
                }})
            const json = await response.json()

            if(response.ok){
                setCourse(json)
            }
        }
    }
        fetchMyCourses()
    }, [user])

    const Filter = async(e) => {
            console.log(rating);
            e.preventDefault();
            const filter = {rating,subject};
            const response = await fetch('/corTrainee/filterCoursesSR' , {
                method : 'POST',
                body : JSON.stringify(filter),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user.token}`
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
                    <ICourseDetails key={course._id} course={course}/>
                ))}
            </div>
            <div>
                <SearchForm></SearchForm>
                <br></br>
                <Ratee></Ratee>
            </div>
            <form className="create">
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


export default MyCoursesInd



