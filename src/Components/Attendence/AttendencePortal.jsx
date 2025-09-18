import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import dummyStudents from "../../data/dummyStudents";

const AttendencePortal = () => {
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  const [Students, setStudents] = useState([]);

  const { classCode } = useParams();
  console.log(classCode);
  const navigate = useNavigate();

  useEffect(() => {
    // Example data (yeh aap backend se fetch karoge)
    setStudents(dummyStudents);
  }, []);

  // const filteredStudents = isActive
  //   ? Students.filter((s) => s.present === true)
  //   : [];

  const presentCount = Students.filter((s) => s.present == true).length;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const toggleAttendence = (id) => {
    setStudents((prev) =>
      prev.map((stu) => {
        if (stu.id === id) {
          console.log(stu);
        }
        return stu.id === id ? { ...stu, present: !stu.present } : stu;
      })
    );
  };

  const handleViewPDF = () => {
    // PDFs ko public/pdfs folder me rakho (CSE.pdf, IT.pdf, ECE.pdf)
    window.open(`/public/pdfs/${classCode}.pdf`, "_blank");
  };

  return (
    <div className="min-h-screen  flex flex-col items-center   p-5 mt-3">
      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">
        Teacher Panel for {classCode} Class
      </h1>

      <div className="mt-16 ">
        <button
          onClick={handleViewPDF}
          className="px-6 py-3 rounded-xl text-black font-semibold transition mb-6 mr-3"
        >
          Syllabus For {classCode}
        </button>

        <Link to={`/attendence/${classCode}/schedule-test`}>
          <button className="px-6 py-3 rounded-xl text-black font-semibold transition mb-6 mr-3">
            Test Schedule
          </button>
        </Link>

        {/* ON/OFF Button */}
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-6 py-3 rounded-xl text-black font-semibold transition mb-6 ${
            isActive
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isActive ? "Stop Attendance" : "Start Attendance"}
        </button>
      </div>

      {isActive && (
        <div className="flex flex-col items-center">
          <div className=" shadow-md bg-white rounded-xl p-6 w-64 text-center mb-6">
            <h3 className="text-base font-bold text-gray-700">
              Total Attendance
            </h3>
            <p className="text-3xl font-extrabold text-indigo-600">
              {presentCount}
            </p>
          </div>
          <p className="text-lg text-gray-600">
            You are taking attendance for{" "}
            <span className="font-bold">{classCode}</span>
          </p>
        </div>
      )}
      <div className=" p-6 mt-6  bg-gradient-to-r from-indigo-600/80 via-purple-600/80 to-pink-600/80 rounded-2xl shadow-xl border border-white/20 ">
        <h2
          className="text-xl font-bold mb-6 text-white drop-shadow-lg"
          // style={{ color: "#9966FF" }}
        >
          Students Record
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-white/20 backdrop-blur-md">
          <div
            className="grid grid-cols-8 bg-white/20 text-white font-semibold px-4 py-3 rounded-t-lg backdrop-blur-sm"
            // style={{ backgroundColor: "#9966FF" }}
          >
            {" "}
            <p className="text-center">Sr_no.</p>
            <p className="text-center">Std_Name</p>
            <p className="text-center">roll_no</p>
            <p className="text-center">Std_FatherName</p>
            <p className="text-center">Status</p>
            <p className="text-center">Stu_Info</p>
            <p className="text-center">Delete</p>
            <p className="text-center">Toggle_Stu</p>
          </div>
          {Students.map((s, index) => {
            return (
              <div
                key={s.id || index}
                to={`/attendence/${s.id}/studentProfile`}
                className="grid grid-cols-8 items-center justify-center border-b mt-3"
                // style={{ backgroundColor: "#9999FF" }}
              >
                {/* Serial Number */}
                <p className="text-center text-white font-medium">
                  {index + 1}
                </p>
                <p className="text-center text-white">{s.name}</p>
                <p className="text-center text-white">{s.roll_no}</p>
                <p className="text-center text-white">{s.father_name}</p>

                {s.present == true ? (
                  <p className=" px-3 py-1 font-semibold bg-green-500/30 text-green-100 text-center shadow-md">
                    Present
                  </p>
                ) : (
                  <p className="px-3 py-1 font-medium bg-red-500/30 text-red-100 text-center shadow-md">
                    Absent
                  </p>
                )}
                {/* Student Info -> navigate */}
                <button
                  onClick={() => navigate(`/attendence/${s.id}/studentProfile`)}
                  className="text-center px-1 py-1 mx-1 rounded-lg text-sm bg-green-500/20 text-blue-500 hover:bg-blue-500/40 transition shadow-md"
                >
                  Stu_Info
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="px-1 pr-1 mx-1 rounded-lg text-sm bg-red-500/20 text-red-100 hover:bg-red-500/40 transition shadow-md"
                >
                  Delete_Stu
                </button>
                <button
                  onClick={() => toggleAttendence(s.id)}
                  className="bg-gradient-to-r mx-1 from-purple-500/40 to-pink-500/40 text-white hover:from-purple-500 hover:to-pink-500 transition shadow-md"
                >
                  Toggle_Stu
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendencePortal;
