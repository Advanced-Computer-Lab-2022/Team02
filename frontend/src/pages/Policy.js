import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Contract = () =>{
    let navigate = useNavigate();
    const {user} = useAuthContext()
    const {logout} = useLogout();
    async function AcceptClick(){
        if(user){
            const response = await fetch('/guest/acceptPolicy', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            if (response.ok){
                window.location.href='/'
                logout()
                alert("Please Login Again")
            }
        }
        
    }
    const onClick = () => 
    {
        setShowText(true)
    }
    const [state, setState] = useState('');
    const [showText, setShowText] = useState(false);
    const Text = () => <div>
    <p id="error"><strong>You must accept the policy to proceed</strong></p>
    </div>;

    return(
        <div>
        <form className="Contract">
            <h4 id ="account">Refund Policy</h4>
            
            <p id = "account">In certain cases and within certain limits, a permit fee may be refunded if the
permitted work will not be completed.

If the work has not started, a fifty dollar ($50) processing fee will be retained
by the city. State Surcharge and Plan Review fees are deducted separately.

If the authorized work has been started, the department may retain an
appropriate portion of the permit fee in addition to the processing fee.
A full refund will be made if the department is in error.

Submit written explanation of refund request within 180 calendar days of
payment of the permit fee. Request refunds by fax (612-370-1416) or mail
to, Attention Refund, Development Review Customer Service Center

Refunds are paid by check only. It takes 4 to 6 weeks for a refund check to
be issued.</p>
            
        </form>
        <br></br>
        <br></br>


        <button id="submitButton" onClick={AcceptClick}>Accept</button><button id="submitButton" onClick={onClick}>Decline</button>
        {showText ? <Text /> : null}
        </div>
    )
}

export default Contract