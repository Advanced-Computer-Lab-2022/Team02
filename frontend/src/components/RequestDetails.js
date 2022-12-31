import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const RequestDetails = ({requests}) =>
{
    let navigate = useNavigate()
    const{user} = useAuthContext()

    const handleSubmit = async (e)=>
    {
        e.preventDefault()
        const response = await fetch ('Admin/accReq',{
            method: 'POST',
            body: JSON.stringify({from:requests.from,course:requests.course,id:requests._id}),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json= await response.json()
    }
    const handleSubmitt = async (e)=>
    {
        e.preventDefault()
        const response = await fetch ('Admin/rejReq',{
            method: 'POST',
            body: JSON.stringify({id:requests._id}),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        })
        const json= await response.json()
    }
    return(
        <div className="course-details">
            <h4><strong>Corporate Trainee Name:</strong> {requests.username}</h4>
                 <p><strong>Course:</strong>{requests.coursename}</p>

                 <button id="filterbutton" onClick={handleSubmit}>Accept Request</button>
                 <button id="filterbutton" onClick={handleSubmitt}>Reject Request</button>

        </div>
    )
}

export default RequestDetails