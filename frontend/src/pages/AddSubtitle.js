import React, { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext";

const SubtitlePage = ({ course }) => {
    const [link, setfLink] = useState("")
    const [name, setname] = useState("")
    const [hours, sethours] = useState("")
    const {user} = useAuthContext()
    const [description, setdescription] = useState("")
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const courseTitle = params.get('courseTitle');
    const handleChange = async(e) => {

        const Link = {name, hours, link, description}
        console.log(Link)
        const response = await fetch(`/Instructor/addSubtitle?courseId=${courseId}`, {
            method: 'POST',
            body:JSON.stringify(Link),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`

            }
        })
        if (response.ok){
            setfLink('')
            setname('')
            sethours('')
            setdescription('')
        }


    }

    return(
        <div>
  
        <div>
            <div>
        <label><strong> Name:</strong></label>
        <input 
        type="text"
        value={name}
        onChange={(e)=> setname(e.target.value)}
        />
        </div>
        <div>
        <label><strong> Hours:</strong></label>
        <input 
        type="number"
        value={hours}
        onChange={(e)=> sethours(e.target.value)}
        />
                </div>
        <div>
        <label><strong> Description:</strong></label>
        <input 
        type="text"
        value={description}
        onChange={(e)=> setdescription(e.target.value)}
        />
        </div>
        <div>
        <label><strong> Upload Link:</strong></label>
        <form>
        <input 
        type="text"
        value={link}
        onChange={(e)=> setfLink(e.target.value)}
        />
        <button className="myButton"onClick={handleChange}>Submit
        </button>
        </form>
        </div>
        </div>
        </div>
    )
}
export default SubtitlePage