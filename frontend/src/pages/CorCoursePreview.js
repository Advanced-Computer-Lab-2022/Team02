
import React, { useState,useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
const params = new URLSearchParams(window.location.search)
const courseID = params.get('Id')


const CoursePrevCor = () => 
{
    const [getLink, setgetLink] = useState("")
    const {user}= useAuthContext()
    const [Prog,setProg] = useState(0)
    const courseId = params.get('courseId');

    useEffect(()=>{
        const handleChange = async(e) => {

            if(courseID!==null){
            console.log(courseID)
            const response = await fetch(`/guest/getLink?Id=${courseID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const f = await response.json()
            if (response.ok){
                setgetLink(f.Link)
            }
            console.log(f.Link)
        }
    
        }
        const getProg = async(e) => {

            if(courseID!==null){
            console.log(courseID)
            const response = await fetch(`/corTrainee/getProg?courseId=${courseID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const f = await response.json()
            if (response.ok){
                setProg(f)
            }
            console.log(f)
        }
    
        }
        handleChange()
        if(user)
            getProg()
    }, [user])
    
    
    return (
        <div>
            <h3>Course Preview</h3>

      {/* <video url={getLink} width="1080" controls ></video>*/}
        
        <iframe width="900" height="500" src={getLink}></iframe>
             

        <br></br>
        <h3 id="account"><strong>Progression:</strong>{Prog}</h3>
         <button className="myButton" onClick={() => window.location.href=`/corCourseSubtitle?courseId=${courseID}`}>Subtitles
        </button> 
        <br></br>
        <button className="myButton" onClick={() => window.location.href=`/corCourseExercises?courseId=${courseID}`}>Exercises
        </button> 
        </div>

    )

}

export default CoursePrevCor

