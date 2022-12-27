import { useEffect, useState } from "react"
//import { Link } from 'react-router-dom';
import CourseDetails from '../components/CourseDetails'
import CourseForm from '../components/CourseForm'
import {useNavigate} from 'react-router-dom'
import SearchForm from '../components/SearchForm'
import axios from "axios"
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
    let navigate = useNavigate();
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
                  "Authorization": `Bearer ${user.token}` //the token is a variable which holds the token
                }}).then(
                (res) => { 
                    const courses = res.data
                    console.log(courses)
                    setCourse(courses)
                    
                }
                 );
        }
        if(user)
             fetchCourses()
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

    return(
        <div>
        <div className="home">
            <div className="Courses">
                {courses && courses.map((course) => (
                    <CourseDetails key={course._id} course={course}/>
                ))}
        
                 <div>
      </div>
                <button id="filterbutton"onClick={EditClick}>Edit Account</button>
                <button id="filterbutton"onClick={CreateQuiz}>Create Quiz</button>   
                <button id="filterbutton" onClick={HandelViewMyCoursesClick}>ViewMyCourses</button>
                <button id="filterbutton"onClick={HandleContractClick}>ViewContract</button>
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
                value={price}
            />
            <button id="filterbutton" onClick={Filter2} >Filter</button>
            </div>
            </form>
                <CourseForm/>
            </div>
            <SearchForm></SearchForm>
        </div>
        </div>

    )
    


}

export default Home

