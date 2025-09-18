import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyStudents, dummyTests } from "../../data//dummyTestSchedule";

const ScheduleTestPage = () => {
  const { classCode } = useParams();
  console.log("classCode" + classCode);
  const schedule = dummyTests[classCode] || [];
  console.log(schedule);

  const navigate = useNavigate();

  // Initialize state with dummy tests filtered by branch
  const [tests, setTests] = useState(
    schedule.filter((t) => t.classCode === classCode)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !time) return alert("All fields required!");

    const test = { title, date, time, classCode };
    setTests((prev) => [...prev, test]);

    //   // Send notifications to branch students
    //   const branchStudents = dummyStudents[classCode];
    //   setTitle("");
    //   setDate("");
    //   setTime("");
  };

  return (
    <div className="min-h-screen college-img p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 text-white">
        <h2 className="text-2xl font-bold mb-4">
          Schedule Test for {classCode} Branch
        </h2>
        {/* Test Form */}
        <form className="flex flex-col gap-4 max-w-md " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Test Title"
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="time"
            onChange={(e) => setTime(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <select
            onChange={(e) => setMode(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-blue-400 font-semibold"
          >
            Schedule Test
          </button>
        </form>
      </div>

      {/* Scheduled Tests */}
      <div className="mt-6 ">
        <h3 className="text-xl font-bold mb-2">Scheduled Tests</h3>

        {schedule.length == 0 ? (
          <p className="text-gray-600">
            No schedule available for this branch.
          </p>
        ) : (
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Test No.</th>
                <th className="px-4 py-2 border">Subject</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Time</th>
                <th className="px-4 py-2 border">Duration</th>
                <th className="px-4 py-2 border">Mode</th>
                <th className="px-4 py-2 border">Invigilator</th>
              </tr>
            </thead>
            <tbody className="bg-amber-200">
              {schedule.map((test) => (
                <tr key={test.no} className="text-center">
                  <td className="px-4 py-2 border">{test.no}</td>
                  <td className="px-4 py-2 border">{test.subject}</td>
                  <td className="px-4 py-2 border">{test.date}</td>
                  <td className="px-4 py-2 border">{test.time}</td>
                  <td className="px-4 py-2 border">{test.duration}</td>
                  <td className="px-4 py-2 border">{test.mode}</td>
                  <td className="px-4 py-2 border">{test.invigilator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        onClick={() => navigate(`/attendence/${classCode}`)}
        className="mt-4 px-4 py-2 bg-red-500 text-blue rounded hover:bg-red-600"
      >
        Back
      </button>
    </div>
  );
};

export default ScheduleTestPage;
