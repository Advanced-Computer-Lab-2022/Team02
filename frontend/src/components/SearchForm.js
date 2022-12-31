import { useState } from "react"
import{ useAuthContext } from "../hooks/useAuthContext"

import React from "react";
import SearchDetails from "../components/SearchDetails"
    const Searchh = () => {
        const [Search, setSearch] = useState('');
        const [Courses, setCourses] = useState('');
        const{user} = useAuthContext()

        const handleSubmit = async(e) =>
        {
            e.preventDefault();
            const search = {Search};
            const response = await fetch('/corTrainee/Search' , {
                method : 'POST',
                body : JSON.stringify(search),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization":`Bearer.${user.token}`

                }

            } )
            const Courses = await response.json()
            if(response.ok)
            {
                setSearch('');
                setCourses(Courses);
            }
        }

      
        return (
            <div>
            <form className="create" onSubmit={handleSubmit}>
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
      
      export default Searchh;