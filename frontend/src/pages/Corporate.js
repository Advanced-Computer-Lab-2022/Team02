import { useEffect, useState } from "react"
//import { Link } from 'react-router-dom';

import CourseDetails from '../components/CoursDetails'
import SearchForm from '../components/SearchFormC'
import Ratee from "../components/RateInstructor"
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"


const Courses = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('Id');
    let navigate = useNavigate();
    const {user} = useAuthContext()
    const [Search, setSearch] = useState('');
    const [courses, setCourse] = useState(null)
    const [subject, setSubject] = useState('');
    const [rating, setRating] = useState('');
    const [ratingg, setRatingg] = useState('');

    useEffect(()=>{
        const fetchCourses = async()=>{
            const response =  await fetch('/corTrainee/viewAllCourses',{
                headers: {
                  "Authorization": `Bearer ${user.token}`
                }})
            const json = await response.json()

            if(response.ok){
                setCourse(json)
            }
        }
        if(user)
            fetchCourses()
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
        function ViewMyCourse(){
            navigate('/myCourses')
        }
        function Connect(){
            navigate('/ConnectAccount')
        }
        const handleSubmit = async(e) =>
        {
            e.preventDefault();
            const search = {Search};
            const response = await fetch('/corTrainee/Search' , {
                method : 'POST',
                body : JSON.stringify(search),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user.token}`
                }

            } )
            const Courses = await response.json()
            if(response.ok)
            {
                setSearch('');
                setCourse(Courses);
            }
        }
        const handleSubmitt = async(e) =>
        {
            e.preventDefault();
            const rate = {ratingg};
            const response = await fetch(`/corTrainee/rateInstructor?Id=${userId}`, {
                method : 'POST',
                body : JSON.stringify(rate),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user.token}`
                }

            } )
            if(response.ok)
            {
                setRatingg('');
            }
        }

    return(
        <div className="home">
            <div className="Courses">
            <a onClick={EditClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Edit Account
            </a>
            <a onClick={ViewMyCourse}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    My Courses
            </a>
            <a onClick={Connect}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Connect Email
            </a>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <form className="create" onSubmit={handleSubmit}>
            <label>SearchBar</label>
                <input
                    type="Search"
                    onChange = {(e) => setSearch(e.target.value)}
                    value = {Search}
                />
                <button id="filterbutton">Search</button>
            </form>
                {courses && courses.map((course) => (
                    <CourseDetails key={course._id} course={course}/>
                ))}
            </div>
            <div>
            <form className="create">
            <br></br>
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
            <br></br>
            <form className="create" onSubmit={handleSubmitt}>
                <label>Rate Instructor</label>
                <input
                    type="number"
                    onChange = {(e) => setRatingg(e.target.value)}
                    value = {ratingg}
                />
                <button id="filterbutton">Rate</button>
            </form>
            </div>
        </div>

    )
    


}


export default Courses



