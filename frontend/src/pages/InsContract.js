import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
const Contract = () =>{
    let navigate = useNavigate();
    function AcceptClick(){
        navigate('/Instructor')
    }
    const onClick = () => 
    {
        setShowText(true)
    }
    const [state, setState] = useState('');
    const [showText, setShowText] = useState(false);
    const Text = () => <div>
    <p id="error"><strong>You must accept the contract to proceed</strong></p>
    </div>;
    return(
        <div>
        <form className="Contract">
            <h4>Contract</h4>
            
            <p>I agree that all rights to videos and materials belong to the company and that for each video the company will take 5% per registered trainee</p>
            
        </form>
        <br></br>
        <br></br>


        <button id="submitButton" onClick={AcceptClick}>Accept</button><button id="submitButton" onClick={onClick}>Decline</button>
        {showText ? <Text /> : null}
        </div>
    )
}

export default Contract
