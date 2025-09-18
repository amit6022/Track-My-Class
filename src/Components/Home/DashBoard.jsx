import React from "react";
import { BookOpen, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const teacherClasses = [
    {
      name: "Data Structures",
      code: "CSE",
      schedule: "9:00 to 10:00 AM",
    },
    {
      name: "Operating Systems",
      code: "IT",
      schedule: "10:00 to 11:00 AM",
    },
    {
      name: "Database Management",
      code: "ECE",
      schedule: "11:00 to 12:00 AM",
    },
    {
      name: "Computer Networks",
      code: "Mechanical",
      schedule: "12:00 to 1:00 PM",
    },
    {
      name: "AI & ML",
      code: "Civil",
      schedule: "1:30 to 2:30 PM",
    },
  ];

  return (
    <div className="min-h-screen college-img p-8">
      <h2 className="text-3xl text-center italic font-bold text-gray-800 mb-6">
        Today's your class TimeTable
      </h2>

      {/* classroom Section*/}
      <div>
        <div className="flex flex-wrap gap-6">
          {teacherClasses.map((cls, index) => {
            return (
              <Link
                to={`/attendence/${cls.code}`}
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 border transform transition duration-300 
             hover:scale-105 hover:shadow-2xl"
              >
                {/* Subject */}
                <h2 className="text-lg font-semibold text-indigo-700 flex items-center gap-2 mb-2">
                  <BookOpen size={20} /> {cls.name}
                </h2>

                {/* Subject Code */}
                <p className="text-sm text-gray-600 mb-3">{cls.code}</p>

                {/* Schedule */}
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={16} /> {cls.schedule}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Link to="/addStudent">
        <button className="mt-3 bg-blue-600 text-blue px-4 py-2 rounded-xl">
          Add Student
        </button>
      </Link>
    </div>
  );
};

export default DashBoard;
