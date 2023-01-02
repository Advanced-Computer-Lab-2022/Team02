import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const ReportDetails2 = ({reports}) =>
{
    const[status,setStatus]=useState('')
    const[error,SetError] = useState(null)
    const{user} = useAuthContext()
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('reportID');
    
    const handleSubmit = async(e)=>
    {
        e.preventDefault()

        const report = {status}
        const response = await fetch(`Admin/Reportss?reportID=${userId}`, {
            method: 'POST',
            body:JSON.stringify(report),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`

            }
        })
        const json= await response.json()

        if (!response.ok){
            SetError()
        }
        if (response.ok){
            setStatus('')


            SetError(null)
            console.log('Resolved')
        }
    }
    


    return(
        <div className="course-details">
            <h4><strong> Username:</strong> {reports.username}</h4>
                 <p><strong>Course:</strong>{reports.course}</p>
                 <p><strong>Type:</strong>{reports.type}</p>
                 <p><strong>Details:</strong>{reports.details}</p>
 
                 <button id="filterbutton" onClick={handleSubmit}>Resolved</button>



        </div>
    )
}

export default ReportDetails2