import { useEffect, useState } from "react"

import InstructorDetails from '../components/InstructorDetails'
import InstructorForm from '../components/InstructorForm'
import AdministratorForm from "../components/AdministratorForm"
import CorpTraineeForm from "../components/CorpTraineeForm"
const Admin = () => {




    return(
        <div className="block">
            <InstructorForm/>
            <AdministratorForm/>
            <CorpTraineeForm/>
        </div>

    )

   


}

export default Admin
  