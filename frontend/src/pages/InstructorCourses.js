import { useEffect, useState } from "react"
import SearchForm1 from '../components/SearchForm'

const ViewMyCourses = () => {
    const [courses, setCourse] = useState(null)
    const [subject, setSubject] = useState('');
    const [price, setPrice] = useState('');
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('Id');
    console.log(userId);
    
    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('Id');
        const fetchCourses = async()=>{
            const response = await fetch(`/Instructor/viewMyCourses?Id=${userId}`)
            const json = await response.json()

            if(response.ok){
                setCourse(json)
            }
        }
        fetchCourses()
    }, [])
    const Filter = async(e) => {
        const filter = {price,subject};
        const response = await fetch(`/Instructor/filterMyCourses?Id=${userId}` , {
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
            setCourse(Courses);
            setSubject('');
            setPrice('');
        }
    }

    return(
        <div className="home">
            <div className="Courses">
                {courses && courses.map((course) => (
                    <form>
                    <p><strong>Title:</strong></p><p>{course.title}</p>
                    <p><strong>Rating:</strong></p><p>{course.title}</p>
                    </form>
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
            </div>
            <SearchForm1></SearchForm1>
        </div>

    )
    


}

export default ViewMyCourses
