import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
const Contract = () =>{
    let navigate = useNavigate();
    const {user} = useAuthContext()
    const [state, setState] = useState('');
    const [showText, setShowText] = useState(false);
    async function AcceptClick(){
            await fetch('/Instructor/Accept', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        console.log()
        navigate('/Instructor')
    }
    const onClick = () => 
    {
        setShowText(true)
    }
       const Text = () => <div>
    <p id="error"><strong>You must accept the contract to proceed</strong></p>
    </div>;
    return(
        <div>
        <form className="Contract">
            <h4 id="account">Contract</h4>
            
            <p id="account">I agree that all rights to videos and materials belong to the company and that for each video the company will take 5% per registered trainee</p>
            
        </form>
        <br></br>
        <br></br>


        <button id="submitButton" onClick={AcceptClick}>Accept</button><button id="submitButton" onClick={onClick}>Decline</button>
        {showText ? <Text /> : null}
        </div>
    )
}

export default Contract
