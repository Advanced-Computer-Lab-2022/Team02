import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Courses from './pages/Courses'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
          path="/Course"
          element={<Courses/>}
          />
          <Route
            path="/Instructor"
            element={<Home/>}
          />
          <Route
            path="/admin"
            element={<Admin/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
