import { React, useState, useEffect } from "react";
import dummyStudents from "../../data/dummyStudents";
import { useParams } from "react-router-dom";
// import students from "../../data/dummyStudents";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StudentDetail = () => {
  const { id } = useParams();
  console.log(id);

  const student = dummyStudents.find((s) => s.id == id);
  console.log(student.progress);

  if (!student) return <p>Student not found</p>;

  //Charts related
  // Option 1: Completed = 1, Pending = 0
  // Option 2: Running total of completed tasks
  let completedCount = 0;
  const labels = student.progress.map((p) => p.date);
  const dataValues = student.progress.map((p) => {
    if (p.completed) completedCount++;
    return completedCount; // running total
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Completed Tasks",
        data: dataValues,
        borderColor: "rgb(37, 99, 235)", // blue
        backgroundColor: "rgba(37, 99, 235, 0.5)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Progress of ${student.name}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Tasks Completed" },
      },
      x: {
        title: { display: true, text: "Date" },
      },
    },
  };

  return (
    <div className="college-img relative min-h-screen flex flex-col items-center justify-center">
      {/* Back Button
        <div className="mb-6">
          <Link
            to={`/attendence/`}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900"
          >
            ← Back
          </Link>
        </div> */}
      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mt-5">
        <div className=" bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 text-white">
          <h1 className="text-xl font-bold mb-3">Student Information</h1>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${student.name}`}
                alt={student.name}
                className="w-40 h-40 rounded-full border-4 border-indigo-400 shadow-md"
              />
            </div>
            {/* Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{student.name}</h2>
              <p className="text-gray-400 mb-6">
                Roll No:{" "}
                <span className="font-semibold">{student.roll_no}</span>
              </p>
              <p className="text-gray-400 mb-6">
                Class: <span className="font-semibold">{student.class}</span>
              </p>
              <p className="text-gray-400 mb-6">
                Password:{" "}
                <span className="font-semibold">{student.password}</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h3 className="text-sm font-semibold text-gray-300">
                    Father's Name
                  </h3>
                  <p className="text-lg">{student.father_name}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <h3 className="text-sm font-semibold text-gray-300">Email</h3>
                  <p className="text-lg">{student.email || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl z-10 rounded-lg  p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 text-white">
          <h2 className="text-2xl font-bold mb-4">Student Progress</h2>
          <div className="grid grid-cols-3 font-bold border-b pb-2">
            <span className="text-gray-300">Date</span>
            <span className="text-gray-300">Task</span>
            <span className="text-gray-300">Status</span>
          </div>

          {student.progress.map((p, index) => {
            return (
              <div key={index} className="grid grid-cols-3 border-b py-3">
                <span>{p.date}</span>
                <span>{p.task}</span>
                <span
                  className={`${
                    p.completed ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {p.completed ? "Completed " : "Pending "}
                </span>
              </div>
            );
          })}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">Progress Chart</h2>
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
