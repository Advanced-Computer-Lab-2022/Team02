import { useEffect, useState } from "react"
//import { Link } from 'react-router-dom';
import Ratee from '../components/RateInstructor'
import {useNavigate} from 'react-router-dom'
import CourseDetailsI from '../components/CoursedetailsI'
import { useAuthContext } from "../hooks/useAuthContext"

const Courses = () => {
    let navigate = useNavigate();
    const {user} = useAuthContext()
    const [courses, setCourse] = useState(null)
    const [subject, setSubject] = useState('');
    const [Search, setSearch] = useState('');
    const [rating, setRating] = useState('');
    const [price, setPrice] = useState('');


    useEffect(()=>{
        const fetchCourses = async()=>{
            if(user!==null){

            const response = await fetch('/indTrainee/viewAllCourses',{
                headers: {
                    "Authorization": `Bearer ${user.token}` //the token is a variable which holds the token
                }})
            const json = await response.json()

            if(response.ok){
                setCourse(json)

            }}
    }
    if(user)
        fetchCourses()
    }, [user])
    const Filter = async(e) => {
        console.log(rating);
        e.preventDefault();
        const filter = {rating,subject};
        const response = await fetch('/indTrainee/filterCoursesSR' , {
            method : 'PUT',
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
    function Report(){
        navigate('/IndReport')
    }
    function MyReports(){
        navigate('/IndMyReports')
    }
    function coursess(){
        navigate('/IndMyCourses')
    }
    const Filter2 = async(e) => {
        console.log(price);
        e.preventDefault();
        const filter = {price};
        const response = await fetch('/indTrainee/filterCoursesP' , {
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
            setPrice('');
            setCourse(Courses);
        }
    }
    function EditClick(){
        navigate('/ChangeMyPassword')
    }
    const handleSubmit = async(e) =>
        {
            e.preventDefault();
            const search = {Search};
            const response = await fetch('/indTrainee/Search' , {
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
                <a onClick={MyReports}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    View Previous Reports
            </a>
            <a onClick={Report}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Report a Problem
                </a>
                <a onClick={coursess}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    View My Courses
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
                    <CourseDetailsI key={course._id} course={course}/>
                ))}
            </div>
            <div>
            <br></br>
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
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="block">
            <label>Price</label>
            <input id="filter"
                type="number"
                onChange={(e)=> setPrice(e.target.value)}
                value={price}
            />
            <button id="filterbutton" onClick={Filter2} >Filter</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Ratee></Ratee>
            </div>
            </div>
        </div>

    )
    


}

export default Courses



