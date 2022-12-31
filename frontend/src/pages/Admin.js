import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import InstructorDetails from '../components/InstructorDetails'
import InstructorForm from '../components/InstructorForm'
import AdministratorForm from "../components/AdministratorForm"
import CorpTraineeForm from "../components/CorpTraineeForm"
const Admin = () => {
    let navigate = useNavigate();

    function Requests()
    {
        navigate('/requests')
    }



    return(
        <div className="home">
            <div className="courses">

            </div>
            <div>
            <InstructorForm/>
            <AdministratorForm/>
            <CorpTraineeForm/>
            <br></br>
            <button id="filterbutton" onClick={Requests}>Incoming Requests</button>
            </div>
        </div>

    )

   


}

export default Admin
  