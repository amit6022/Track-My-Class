import React from "react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-6 text-center shadow-lg">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
        Smart Attendance & Student Progress
      </h1>
      <p className="text-lg md:text-xl text-gray-200 mb-8">
        Manage daily attendance, assign tasks, and monitor student performance
        in one place.
      </p>
    </div>
  );
};

export default HeroSection;
