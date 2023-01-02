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
    function Reports()
    {
        navigate('/reports')
    }



    return(
        <div className="home">
            <div className="courses">
            <a onClick={Requests}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Incoming Requests
                </a>
                <a onClick={Reports}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Incoming Reports
                </a>
            </div>
            <div>
            <InstructorForm/>
            <AdministratorForm/>
            <CorpTraineeForm/>
            <br></br>
            </div>

        </div>

    )

   


}

export default Admin
  