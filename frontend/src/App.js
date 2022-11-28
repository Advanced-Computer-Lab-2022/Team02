import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Ins from './pages/Instructor'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Ind from './pages/IndividualTrainee'
import Corporate from './pages/Corporate'
import HomePage from './pages/HomePage'
import InstructorCourses from './pages/InstructorCourses'


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
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
