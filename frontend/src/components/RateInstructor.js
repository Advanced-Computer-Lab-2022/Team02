import { useState } from "react"
import React from "react";
    const Ratee = () => {
        const [rating, setRating] = useState('');
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('Id');
      
        const handleSubmit = async(e) =>
        {
            e.preventDefault();
            const rate = {rating};
            const response = await fetch(`/indTrainee/rateInstructor?Id=${userId}`, {
                method : 'POST',
                body : JSON.stringify(rate),
                headers: {
                    'Content-Type': 'application/json'
                }

            } )
            if(response.ok)
            {
                setRating('');
            }
        }

      
        return (
            <div>
            <form className="create" onSubmit={handleSubmit}>
                <label>Rate Instructor</label>
                <input
                    type="number"
                    onChange = {(e) => setRating(e.target.value)}
                    value = {rating}
                />
                <button id="filterbutton">Rate</button>
            </form>
            </div>
            
        );
      }
      
      export default Ratee;