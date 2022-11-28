import { useEffect, useState } from "react"

import InstructorDetails from '../components/InstructorDetails'
import InstructorForm from '../components/InstructorForm'
import AdministratorForm from "../components/AdministratorForm"
import CorpTraineeForm from "../components/CorpTraineeForm"
const Admin = () => {
    const [instructors, setInstructor] = useState(null)

    useEffect(()=>{
        const fetchInstructors = async()=>{
            const response = await fetch('/')
            const json = await response.json()

            if(response.ok){
                setInstructor(json)

            }
        }
        fetchInstructors()
    }, [])

    return(
        <div className="admin">
            <div className="Instructors">
                {instructors && instructors.map((Instructor) => (
                    <InstructorDetails key={Instructor._id} course={Instructor}/>
                ))}
            </div>
            <InstructorForm/>
            <AdministratorForm/>
            <CorpTraineeForm/>
        </div>

    )

   


}

export default Admin//,Adminn}
  