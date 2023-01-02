import { useEffect, useState } from "react"
import ReportDetails2 from "../components/ReportDetails2"
import { useAuthContext } from '../hooks/useAuthContext'

import axios from "axios"
import ReportDetails from "../components/ReportDetails"

const ReportDet = () =>
{
    const [report,setReport]=useState(null)
    const {user} = useAuthContext()
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('reportID');

    useEffect(()=>{
        const fetchReports = async()=>{
            if(user !== null){
            await axios.get(`/Admin/getReportsDetails?reportID=${userId}`,{
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
        console.log(report[0])
    }
    return(
        <div className="home">
            <div className="Courses">
                {report && report.map((report) => (
                    <ReportDetails2 key={report._id} reports={report}/>
                ))}
            </div>
        </div>
)
}

export default ReportDet
