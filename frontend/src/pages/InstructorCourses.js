import { useEffect, useState } from "react"
import SearchForm1 from '../components/SearchForm1'
import CourseDetailsIns from "../components/InstructorCourseDetails"
import { useAuthContext } from "../hooks/useAuthContext"

const ViewMyCourses = () => {
    const [courses, setCourse] = useState(null)
    const [subject, setSubject] = useState('');
    const [price, setPrice] = useState('');
    const {user} = useAuthContext()
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('Id');
    
    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('Id');
        const fetchCourses = async()=>{
            const response = await fetch(`/Instructor/viewMyCourses?Id=${userId}`,{
                headers:{"Authorization": `Bearer ${user.token}`}
            })
            const json = await response.json()

            if(response.ok){
                setCourse(json)
            }
        }
        
        if(user)
       { fetchCourses()
    }
    }, [user])
    const Filter = async(e) => {
        const filter = {price,subject};
        const response = await fetch(`/Instructor/filterMyCourses?Id=${userId}` , {
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
            setCourse(Courses);
            setSubject('');
            setPrice('');
        }
    }

    return(
        <div>
            <header>
            <div className="Searchh">
            <SearchForm1></SearchForm1>
            <h4 id="hy">--------Your Courses--------</h4>
            </div>
            </header>
                {courses && courses.map((course) => (
                    <CourseDetailsIns key={course._id} course={course}></CourseDetailsIns>
                ))}
            <div>
            <label>Subject</label>
            <input id="filter"
                type="text"
                onChange={(e)=> setSubject(e.target.value)}
                value={subject}
            />
            </div>

            <div className="block">
            <label>Price</label>
            <input id="filter"
                type="number"
                onChange={(e)=> setPrice(e.target.value)}
                value={price}
            />
            <button id="filterbutton" onClick={Filter} >Filter</button>
            </div>
            <br></br>
        </div>

    )
    


}

export default ViewMyCourses
