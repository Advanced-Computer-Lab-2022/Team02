import { useEffect, useState } from "react"
import RequestDetails from "../components/RequestDetails"
import { useAuthContext } from '../hooks/useAuthContext'

import axios from "axios"
import ReportDetails from "../components/ReportDetails"

const ViewReports = () =>
{
    const [report,setReport]=useState(null)
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchReports = async()=>{
            if(user !== null){
            await axios.get(`/Admin/getReports`,{
                headers: {
                  "Authorization": `Bearer ${user.token}` //the token is a variable which holds the token
                }}).then(
                (res) => { 
                    const f = res.data
                    console.log(res.data)
                    setReport(f)
                    
                }
                 );
            }
        }
        
        fetchReports()
    }, [user])
    if(Array.isArray(report)){
        console.log(report)
    }
    return(
        <div className="home">
            <div className="Courses">
                {report && report.map((report) => (
                    <ReportDetails key={report._id} reports={report}/>
                ))}
            </div>
        </div>
)
}

export default ViewReports
