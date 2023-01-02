import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const MyReportDetails = ({reports}) =>
{
    const [stat] = useState(reports.status)
    const[reportID] = useState(reports._id)
    let navigate = useNavigate()
    const{user} = useAuthContext()

    function checkStatus(value)
    {
        if(value == "Resolved")
            return false
        else
            return true
    }
    function followUp()
    {
        navigate("/CorReport")
    }
    return(
             <div className="course-details">
            <h4><strong> Username:</strong> {reports.username}</h4>
            <p><strong>Course:</strong>{reports.course}</p>
            <p><strong>Status:</strong>{reports.status}</p>
            <p><strong>Details:</strong>{reports.details}</p>
            <button id="filterbutton" onClick={followUp}>Follow Up</button>

             </div>
    )
}

export default MyReportDetails