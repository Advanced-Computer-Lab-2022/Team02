import { useEffect, useState} from "react"
import {useNavigate,redirect} from 'react-router-dom'

const Home = ()=> {
    let navigate = useNavigate();
  function AdminClick() {
    navigate('/admin')
  }
  function InstructorClick() {
    navigate('/Instructor')
  }
  function IndividualTraineeClick() {
    navigate('/inTrainee')
  }
  function CorporateTraineeClick() {
    navigate('/corTrainee')
  }
    return(
        <div className="Home">
            <h2>Home</h2>
            <button onClick={InstructorClick}>
                Instructor
            </button>
            <button onClick={IndividualTraineeClick}>
                Individual Trainee / Guest 
            </button>
            <button onClick={CorporateTraineeClick}>
                Corporate Trainee
            </button>
            <button onClick={AdminClick}>
                Administrator
            </button>
            
        </div>

      
    )
}

export default Home
