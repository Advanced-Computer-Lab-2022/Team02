import { useEffect, useState } from "react"
//import { Link } from 'react-router-dom';

import GCourseDetails from '../components/GCourseDetails'

const Guest = () => {
    const [courses, setCourse] = useState(null)
    const [Search, setSearch] = useState('');
    const [subject, setSubject] = useState('');
    const [rating, setRating] = useState('');
    const [price, setPrice] = useState('');

    useEffect(()=>{
        const fetchCourses = async()=>{
            const response = await fetch('/guest/viewAllCourses')
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
        const response = await fetch('/guest/filterCoursesSR' , {
            method : 'PUT',
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
        const response = await fetch('/guest/filterCoursesP' , {
            method : 'PUT',
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
    const handleSubmit = async(e) =>
        {
            e.preventDefault();
            const search = {Search};
            const response = await fetch('/guest/Search' , {
                method : 'POST',
                body : JSON.stringify(search),
                headers: {
                    'Content-Type': 'application/json'
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
                    <GCourseDetails key={course._id} course={course}/>
                ))}
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
            </div>
        </div>

    )
    


}

export default Guest



