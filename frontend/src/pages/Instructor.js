import { useEffect, useState } from "react"
//import { Link } from 'react-router-dom';
import CourseDetails from '../components/CourseDetails'
import CourseForm from '../components/CourseForm'
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
    let navigate = useNavigate();
    const [Search, setSearch] = useState('');
    const [courses, setCourse] = useState(null)
    const [subject, setSubject] = useState(undefined);
    const [rating, setRating] = useState(undefined);
    const [price, setPrice] = useState('');
    const {user} = useAuthContext()
    console.log(user)
    useEffect(()=>{
        const fetchCourses = async()=>{

            console.log(user)
            await axios.get('/Instructor/viewAllCourses',{
                headers: {
                  "Authorization": `Bearer ${user.token}`
                }}).then(
                (res) => { 
                    const courses = res.data
                    console.log(courses)
                    setCourse(courses)
                    
                }
                 );
        }
        const checkContract = async()=>{

            const respons = await fetch('../Instructor/checkAccepted', {
                headers: 
                {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await respons.json()
            if(respons.ok)
            {
                navigate('/Instructor')
                console.log(json)
            }
            else{
                navigate('/Contract')
                console.log(json)
            }
        }
        if(user)
        {
            checkContract()
             fetchCourses()
        }
    }, [user])
    console.log(courses)
    function HandelViewMyCoursesClick()
    {
        window.location.href=`/InstructorCourses?Id=${user.id}`
    }
    function HandleContractClick()
    {
        navigate('/Contract')
    }
    function EditClick(){
        navigate('/EditAccount')
    }
    async function CreateQuiz(){
        await fetch('Instructor/createQuiz', {
           method: 'POST',
       })
       navigate('/CreateQuiz')
   }
    const Filter = async(e) => {
        console.log(rating);
        console.log(subject);
        e.preventDefault();
        const filter = {rating,subject};
        const response = await fetch('/Instructor/filterCoursesSR' , {
            method : 'PUT',
            body : JSON.stringify(filter),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }

        } )
        const Courses = await response.json()
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
    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        const search = {Search};
        const response = await fetch('/Instructor/SearchAllCourses' , {
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
                <a onClick={HandelViewMyCoursesClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    View My Courses
                </a>
                <a onClick={CreateQuiz}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Create Quiz
                </a>
                <a onClick={EditClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Edit Account
                </a>
                <br></br>
                <br></br>
                <form className="create">
                <label>SearchBar</label>
                <input
                    type="Search"
                    onChange = {(e) => setSearch(e.target.value)}
                    value = {Search}
                />
                <button id="filterbutton" onClick={handleSubmit}>Search</button>
            </form>
                {courses && courses.map((course) => (
                    <CourseDetails key={course._id} course={course}/>
                ))}
        
                 <div>
      </div>
            </div>
            <form className="create">
            <label>Rating</label>
            <input id="filter"
                type="number"
                onChange={(e)=> setRating(e.target.value)}
                value={rating}
            />

            <div>
            <label>Subject</label>
            <input id="filter"
                type="text"
                onChange={(e)=> setSubject(e.target.value)}
                value={subject}
            />
            <button id="filterbutton" onClick={Filter}>Filter</button>
            </div>
            <br></br>
            <div className="block">
            <label>Price</label>
            <input id="filter"
                type="number"
                onChange={(e)=> setPrice(e.target.value)}
                value={price}
            />
            <button id="filterbutton" onClick={Filter2}>Filter</button>
            <CourseForm/>
            </div>
            </form>
        </div>

    )
    


}

export default Home

