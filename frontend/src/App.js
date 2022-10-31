import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Courses from './pages/Courses'
import Corporate from './pages/Corporate'
import HomePage from './pages/HomePage'


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
          element={<Courses/>}
          />
            <Route
         path='/'
         element= {<HomePage/>}
            />
          <Route
            path="/Instructor"
            element={<Home/>}
          />
          <Route
            path="/admin"
            element={<Admin/>}
          />
          <Route
            path="/corTrainee"
            element={<Corporate/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
