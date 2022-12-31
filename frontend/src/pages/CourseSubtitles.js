import { useEffect, useState } from "react"
import SubtitleDetails from "../components/SubtitleDetails"
import { useAuthContext } from '../hooks/useAuthContext'

import axios from "axios"

const params = new URLSearchParams(window.location.search)
const courseID = params.get('courseId')

const ViewSub = () => {
    const [subtitles, setSubtitle] = useState(null)
    const {user} = useAuthContext()


    useEffect(()=>{
        const fetchSubtitles = async()=>{
            if(user !== null){
            await axios.get(`/indTrainee/viewSubtitles?courseId=${courseID}`,{
                headers: {
                  "Authorization": `Bearer ${user.token}` //the token is a variable which holds the token
                }}).then(
                (res) => { 
                    const f = res.data
                    console.log(res.data)
                    setSubtitle(f)
                    
                }
                 );
            }
        }
        
        fetchSubtitles()
    }, [user])
    if(Array.isArray(subtitles)){
        console.log(subtitles[0])
    }
    return(
        <div className="home">
            <div className="Courses">
                {subtitles && subtitles.map((subtitle) => (
                    <SubtitleDetails key={subtitle._id} subtitle={subtitle}/>
                ))}
            </div>
        </div>
)
}

export default ViewSub