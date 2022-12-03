
import React, { useState,useEffect } from "react"
const params = new URLSearchParams(window.location.search)
const courseID = params.get('Id')


const CoursePrev = () => 
{
    const [getLink, setgetLink] = useState("")

    useEffect(()=>{
        const handleChange = async(e) => {

            if(courseID!==null){
            console.log(courseID)
            const response = await fetch(`/Instructor/getLink?Id=${courseID}`, {
                method: 'GET'
            })
            const f = await response.json()
            if (response.ok){
                setgetLink(f.Link)
            }
            console.log(f.Link)
        }
    
        }
        handleChange()
    }, [])
    
    
    
    return (
        <div>
            <h3>Course Preview</h3>

      {/* <video url={getLink} width="1080" controls ></video>*/}
        
        <iframe width="900" height="500" src={getLink}></iframe>
             
        </div>

    )

}

export default CoursePrev

