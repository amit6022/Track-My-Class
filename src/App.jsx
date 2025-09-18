import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Components/Home/Home.jsx";
import AttendencePortal from "./Components/Attendence/AttendencePortal.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStudentForm from "./Components/Student/AddStudentForm.jsx";
import StudentDetail from "./Components/Student/StudentDetail.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeacherProfile from "./TeacherProfile.jsx";
import TestSchedulePage from "./Components/Test/TestSchedulePage.jsx";
import Login from "../src/Login.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[550px] college-img mt-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/attendence/:classCode"
              element={<AttendencePortal />}
            />
            <Route path="/addStudent" element={<AddStudentForm />} />
            <Route
              path="/attendence/:id/studentProfile"
              element={<StudentDetail />}
            />
            <Route path="/teacherProfile" element={<TeacherProfile />} />
            <Route
              path="/attendence/:classCode/schedule-test"
              element={<TestSchedulePage />}
            />
            <Route path="*" element={<Home />} /> {/* fallback */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <div className="max-w-full">
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
