import { useEffect, useState } from "react"
import RequestDetails from "../components/RequestDetails"
import { useAuthContext } from '../hooks/useAuthContext'

import axios from "axios"

const ViewRequests = () =>
{
    const [request,setRequest]=useState(null)
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchRequests = async()=>{
            if(user !== null){
            await axios.get(`/Admin/getRequests`,{
                headers: {
                  "Authorization": `Bearer ${user.token}` //the token is a variable which holds the token
                }}).then(
                (res) => { 
                    const f = res.data
                    console.log(res.data)
                    setRequest(f)
                    
                }
                 );
            }
        }
        
        fetchRequests()
    }, [user])
    if(Array.isArray(request)){
        console.log(request[0])
    }
    return(
        <div className="home">
            <div className="Courses">
                {request && request.map((requests) => (
                    <RequestDetails key={requests._id} requests={requests}/>
                ))}
            </div>
        </div>
)
}

export default ViewRequests
