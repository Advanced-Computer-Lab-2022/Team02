import React, { useState,useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext";
const params = new URLSearchParams(window.location.search)
//const subtitleId = params.get('Id')



const SubVidCor = () => {
    const [Link, setLink] = useState('');
    const subtitleId= params.get('subtitleID')
    const {user} = useAuthContext()

    useEffect(()=>{
        const handleChange= async(e) =>
        {
            if(subtitleId!==null && user !== null){
                console.log(subtitleId)
                const response = await fetch (`/corTrainee/subVideo?subtitleId=${subtitleId}`,
                {
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user.token}`
                    }
                })
                const f = await response.json()
                if(response.ok){
                   setLink(f.link)
                  // console.log(f)
                }
                console.log(f.link)
            }
        }
        handleChange()
    }, [user,subtitleId])
    return(
        <div>
            <iframe width="900" height="500" src={Link}></iframe>
        </div>
    )
}
export default SubVidCor