import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Ins from './pages/Instructor'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
          //indvidual and guest
          path="/inTrainee"
          element={<Ind/>}
          />
            <Route
         path='/'
         element= {<HomePage/>}
            />
          <Route
            path="/Instructor"
            element={<Ins/>}
          />
          <Route
            path="/admin"
            element={<Admin/>}
          />
          <Route
            path="/corTrainee"
            element={<Corporate/>}
          />
          <Route
            path="/InstructorCourses"
            element={<InstructorCourses/>}
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
            element={<QuizCrea/>}
          />
          <Route
          path="/ChangeMyPassword"
          element={<ChangeMyPassword/>}
          />
          <Route
          path="/ChangeMyPasswordCor"
          element={<ChangeMyPasswordCor/>}
          />
          <Route
            path="/EditAccount"
            element={<EditAccount/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
