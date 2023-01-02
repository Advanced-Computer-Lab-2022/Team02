import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom'

import Ins from './pages/Instructor'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Answers from './pages/Answers'
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
import SubtitlePage from './pages/AddSubtitle'
import ViewSub from './pages/CourseSubtitles'
import ForgotPass from './pages/ForgotPass'
import SubVid from './pages/Vid'
import GetExercises from './pages/CourseExercises'
import GetQuiz from './pages/Quiz'
import MyCourses from './pages/CorporateCourses'
import CoursePrev2 from './pages/CoursePreview2'
import ViewRequests from './pages/Requests'
import ViewSubCor from './pages/CorSubtitlePage'
import SubVidCor from './pages/CorVid'
import GetExercisesCor from './pages/CorCourseExercises'
import CoursePrevCor from './pages/CorCoursePreview'
import CorGetQuiz from './pages/CorQuiz'
import ConnectMailCor from './pages/ConnectAccount'
import ReportCourseCOR from './pages/CorReport'
import ReportCourseIND from './pages/IndReport'
import ReportCourseINS from './pages/InsReport'
import ViewReports from './pages/Reports'
import ReportDet from './pages/ReportDet'
import ViewMyReports from './pages/IndMyReports'
import CorViewMyReports from './pages/CorMyReport'
import InsViewMyReports from './pages/InsMyReport'
import MyCoursesInd from './pages/IndCourses'
import CancelPayment from './pages/CancelPayment'
import Continue from './pages/Continue'

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
          element={<Ind/>}
          />
            <Route
         path='/'
         element= {<HomePage/>}
            />
            <Route
         path='/signUp'
         element= {<SignUp/>}
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
          <Route
            path="/Policy"
            element={<Policy/>}
          />
          <Route
            path="/corCoursePreview"
            element={<CoursePrevCor/>}
          />
                   <Route
            path="/CourseSubtitle"
            element={<ViewSub/>}
          />
          <Route
            path="/AddSubtitle"
            element={<SubtitlePage/>}
          />
          <Route
            path="/ConnectAccount"
            element={<ConnectMailCor/>}
          />
           <Route
            path="/ForgotPass"
            element={<ForgotPass/>}
          />
           <Route
            path="/SubVid"
            element={<SubVid/>}
          />
          <Route
            path="/CourseExercises"
            element={<GetExercises/>}
          />
            <Route
            path="/corCourseExercises"
            element={<GetExercisesCor/>}
          />
           <Route
            path="/Quiz"
            element={<GetQuiz/>}
          />
          <Route
            path="/corQuiz"
            element={<CorGetQuiz/>}
          />
          <Route
            path="/myCourses"
            element={<MyCourses/>}
          />
          <Route
            path="/CoursePreview2"
            element={<CoursePrev2/>}
          />
          <Route
            path="/requests"
            element={<ViewRequests/>}
          />
          <Route
            path="/corCourseSubtitle"
            element={<ViewSubCor/>}
          />
          <Route
            path="/CorSubVid"
            element={<SubVidCor/>}
          />
          <Route
            path="/answers"
            element={<Answers/>}
          />
          <Route
            path="/CorReport"
            element={<ReportCourseCOR/>}
          />
          <Route
            path="/IndReport"
            element={<ReportCourseIND/>}
          />
          <Route
            path="/InsReport"
            element={<ReportCourseINS/>}
          />
          <Route
            path="/reports"
            element={<ViewReports/>}
          />
          <Route
            path="/reportDetails"
            element={<ReportDet/>}
          />
          <Route
            path="/IndMyReports"
            element={<ViewMyReports/>}
          />
          <Route
            path="/CorMyReports"
            element={<CorViewMyReports/>}
          />
          <Route
            path="/InsMyReports"
            element={<InsViewMyReports/>}
          />
          <Route
            path="/IndMyCourses"
            element={<MyCoursesInd/>}
          />
          <Route
            path="/PaymentCancelled"
            element={<CancelPayment/>}
          />
          <Route
            path="/Continue"
            element={<Continue/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
