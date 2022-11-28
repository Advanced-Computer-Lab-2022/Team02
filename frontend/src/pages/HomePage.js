
import {useNavigate} from 'react-router-dom'

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
  function GuestClick(){
    navigate('/guest')
  }
    return(
        <div>
            <h3>Home</h3>

            <button id="homeButtons" onClick={InstructorClick}>
                Instructor
            </button>
            <button id="homeButtons" onClick={IndividualTraineeClick}>
                Individual Trainee
            </button>
            <button id="homeButtons" onClick={CorporateTraineeClick}>
                Corporate Trainee
            </button>
            <button id="homeButtons" onClick={AdminClick}>
                Administrator
            </button>
            <button id="homeButtons" onClick={GuestClick}>
                Guest
            </button>
            
        </div>

      
    )
}

export default Home
