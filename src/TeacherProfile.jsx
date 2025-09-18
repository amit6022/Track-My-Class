import React from "react";

const TeacherProfile = () => {
  return (
    <div className=" min-h-screen college-img z-10  flex items-center justify-center mt-5">
      <div className=" bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={`https://api.dicebear.com/8.x/avataaars/svg?seed=AmitSingh`}
              alt="AmitSingh"
              className="w-40 h-40 rounded-full border-4 border-indigo-400 shadow-md"
            />
          </div>
          {/* Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Amit Singh</h2>
            <p className="text-gray-400 mb-6">
              Course :<span className="text-white"> Btech</span>
            </p>
            <p className="text-gray-400 mb-6">
              Branch :
              <span className="text-white"> Information Technology</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                <h3 className="text-sm font-semibold text-gray-300">
                  Email :{" "}
                </h3>
                <p className="text-lg">{"amit81212609@gmail.com" || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
