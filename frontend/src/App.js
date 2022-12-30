import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom'

import Ins from './pages/Instructor'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import { useAuthContext } from './hooks/useAuthContext'
import Ind from './pages/IndividualTrainee'
import Corporate from './pages/Corporate'
import HomePage from './pages/HomePage'
import InstructorCourses from './pages/InstructorCourses'
import Guest from './pages/Guest'
import Contract from './pages/InsContract'
import CoursePreview from './pages/CoursePreview'
import CoursePage from './pages/CoursePage'
import EditAccount from './pages/editAccount'
import QuizCrea from './pages/CreateQuiz'
import ChangeMyPassword from './pages/ChangeMyPassword'
import ChangeMyPasswordCor from './pages/ChangeMyPasswordCor'
import SignUp from './pages/SignUp'
import Policy from './pages/Policy'

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
          //indvidual and guest
          path="/inTrainee"
          element={user ? <Ind/> : <Navigate to="/"/>}
          />
            <Route
         path='/'
         element= {!user ? <HomePage/> : <Navigate to="/Instructor"/>}
            />
            <Route
         path='/signUp'
         element= {<SignUp/>}
            />
          <Route
            path="/Instructor"
            element={user ? <Ins/> : <Navigate to="/"/>}
          />
          <Route
            path="/admin"
            element={user ? <Admin/> : <Navigate to="/"/>}
          />
          <Route
            path="/corTrainee"
            element={user ? <Corporate/> : <Navigate to="/"/>}
          />
          <Route
            path="/InstructorCourses"
            element={user ? <InstructorCourses/> : <Navigate to="/"/>}
          />
          <Route
            path="/Guest"
            element={<Guest/>}
          />
          <Route
            path="/Contract"
            element={<Contract/>}
          />
          <Route
            path="/CoursePreview"
            element={<CoursePreview/>}
          />
          <Route
            path="/CoursePage"
            element={<CoursePage/>}
          />
          <Route
            path="/CreateQuiz"
            element={user ? <QuizCrea/> : <Navigate to="/"/>}
          />
          <Route
          path="/ChangeMyPassword"
          element={user ? <ChangeMyPassword/> : <Navigate to="/"/>}
          />
          <Route
          path="/ChangeMyPasswordCor"
          element={user ? <ChangeMyPasswordCor/> : <Navigate to="/"/>}
          />
          <Route
            path="/EditAccount"
            element={user ? <EditAccount/> : <Navigate to="/"/>}
          />
          <Route
            path="/Policy"
            element={user ? <Policy/> : <Navigate to="/"/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
