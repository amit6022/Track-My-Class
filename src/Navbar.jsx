import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    // <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 text-white shadow-lg">
    <nav className="nav border-bottom">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo & About */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="TrackMyClassLogo.jpg"
            alt="trackmyclass"
            className="h-20 w-20 rounded-full border-4 border-indigo-400 shadow-md"
          />
          <h2 className="text-xl font-bold text-black">TrackMyClass</h2>
        </Link>
        {/* profile Section */}
        <Link to="/teacherProfile" className="text-center">
          <FontAwesomeIcon icon={faUser} className="text-2xl text-black" />
          <h2>TeacherName</h2>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
