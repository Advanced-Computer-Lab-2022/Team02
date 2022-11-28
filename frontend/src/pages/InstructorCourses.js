import { useEffect, useState } from "react"
import SearchForm1 from '../components/SearchForm'

const ViewMyCourses = () => {
    const [courses, setCourse] = useState(null)
    
    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('Id');
        console.log(userId);
        const fetchCourses = async()=>{
            const response = await fetch(`/Instructor/viewMyCourses?Id=${userId}`)
            const json = await response.json()

            if(response.ok){
                setCourse(json)
            }
        }
        fetchCourses()
    }, [])

    return(
        <div className="home">
            <div className="Courses">
                {courses && courses.map((course) => (
                    <form>
                    <p><strong>Title:</strong></p><p>{course.title}</p>
                    </form>
                ))}
            </div>
            <SearchForm1></SearchForm1>
        </div>

    )
    


}

export default ViewMyCourses
