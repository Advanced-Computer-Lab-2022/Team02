import { useState } from "react"
import React from "react";
import SearchDetails from "../components/SearchDetails"
    const Searchh1 = () => {
        const [Search, setSearch] = useState('');
        const [Courses, setCourses] = useState('');
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('Id');
       
        const handleSubmit1 = async(e) =>
        {
            console.log(userId);
            e.preventDefault();
            const search = {Search};
            const response = await fetch(`/Instructor/SearchMyCourses?Id=${userId}` , {
                method : 'POST',
                body : JSON.stringify(search),
                headers: {
                    'Content-Type': 'application/json'
                }
            } )
            const Courses = await response.json()

            if(response.ok)
            {
                setCourses(Courses);
                setSearch('');
                
            }
        }

      
        return (
            <div>
            <form className="create" onSubmit={handleSubmit1}>
                <label>SearchBar</label>
                <input
                    type="Search"
                    onChange = {(e) => setSearch(e.target.value)}
                    value = {Search}
                />
                <button id="filterbutton">Search</button>
            </form>
            <div className="Courses">
                {Courses && Courses.map((Course) => (
                    <SearchDetails key={Course._id} course={Course}/>
                ))}
            </div>
            </div>
            
        );
      }
      
      export default Searchh1;