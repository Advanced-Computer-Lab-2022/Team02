import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const ReportDetails = ({reports}) =>
{
    const [stat] = useState(reports.status)
    const[reportID] = useState(reports._id)
    let navigate = useNavigate()
    const{user} = useAuthContext()

    function viewReport(){
        navigate('/reportDetails')
    }
    function checkStatus(value)
    {
        if(value == "Resolved")
            return false
        else
            return true
    }
    return(
        <div>
            <div className="course-details">
            <h4><strong> Username:</strong> {reports.username}</h4>
            <p><strong>Course:</strong>{reports.course}</p>
            <p><strong>Status:</strong>{reports.status}</p>
            <p><strong>{reports.seeen}</strong></p>

            <button id="filterbutton" onClick={()=>window.location.href=`/reportDetails?reportID=${reportID}`}>View Report</button>
            </div>
        </div>
    )
}

export default ReportDetails