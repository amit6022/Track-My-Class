import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function AddStudentForm() {
  // let [addphoto, setaddphoto] = useState(false);
  const [descriptor, setDescriptor] = useState([]);
  const [open, setOpen] = useState(false);

  const [formInfo, setFormInfo] = useState({
    name: "",
    rollno: "",
    email: "",
    classes: "",
    father: "",
    password: "",
    descriptor: [],
  });
  // const [isCameraOn, setIsCameraOn] = useState(false); // camera toggle state

  let navigate = useNavigate();
  const videoRef = useRef(null);
  // let intervalId = useRef(null);

  const handleError = (err) => toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-right" });

  // Load models when component mounts
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    };
    loadModels();
  }, []);

  // Start webcam
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // 👇 play hone ke baad interval start kar do
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          startFaceDetection(); // detection loop start
        };
      })
      .catch((err) => console.error("Webcam error:", err));
  };
  // Stop webcam (attendance complete hone ke baad call karo)
  const stopVideo = () => {
    console.log("hello");
    if (videoRef.current && videoRef.current.srcObject) {
      let stream = videoRef.current.srcObject;
      let tracks = stream.getTracks();

      tracks.forEach((track) => track.stop()); // camera off
      videoRef.current.srcObject = null;
    }
  };

  // Detect face + get descriptor
  // useEffect(() => {
  //   if (!videoRef.current) return;

  // videoRef.current.addEventListener("play", () => {

  const startFaceDetection = () => {
    if (!videoRef.current) {
      stopVideo();
    }
    const interval = setInterval(async () => {
      console.log("hi");
      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();
      console.log(detection);
      if (detection) {
        // stopVideo();
        handleClose();
        handleSuccess("Face captured successfully ✅");
        // setDescriptor(Array.from(detection.descriptor)); // Convert Float32Array → normal array

        // save descriptor inside formInfo
        setFormInfo((info) => ({
          ...info,
          descriptor: Array.from(detection.descriptor),
        }));
        console.log("detection.descriptor" + detection.descriptor);
        clearInterval(interval); //ab interval band ho jayega
      }
    }, 3000); // check every 3 seconds

    return () => clearInterval(interval);
    // });

    // }, []);
  };

  const handleOpen = () => {
    setOpen(true);
    startVideo();
  };

  const handleClose = () => {
    setOpen(false);
    stopVideo();
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormInfo((info) => ({
      ...info,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    const { name, rollno, email, classes, father, descriptor, password } =
      formInfo;

    if (
      !name ||
      !rollno ||
      !email ||
      descriptor.length == 0 ||
      !classes ||
      !father ||
      !password
    ) {
      handleError(
        "name ,rollno, email, descriptor class, father,password  are required"
      );
      console.log(
        "name ,rollno, email, descriptor,class, father,password are required"
      );
    } else {
      handleSuccess("Form Submitted Successfully ");
      console.log(name, rollno, email, classes, father, descriptor, password);
      navigate("/"); // save hone ke baad navigate
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-white p-6">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            onChange={handleChange}
            name="name"
            value={formInfo.name}
            placeholder="Name"
            required
            className="w-full p-2 rounded bg-gray-700"
          />
          <input
            onChange={handleChange}
            name="rollno"
            value={formInfo.rollno}
            placeholder="RollNo"
            required
            className="w-full p-2 rounded bg-gray-700"
          />
          <input
            onChange={handleChange}
            name="email"
            value={formInfo.email}
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-700"
          />

          <input
            onChange={handleChange}
            name="classes"
            value={formInfo.classes}
            placeholder="Class"
            className="w-full p-2 rounded bg-gray-700"
          />

          <input
            onChange={handleChange}
            name="father"
            value={formInfo.father}
            placeholder="Father"
            className="w-full p-2 rounded bg-gray-700"
          />

          <input
            onChange={handleChange}
            name="password"
            value={formInfo.password}
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700"
          />

          {/* {addphoto && (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              width="320"
              height="240"
            />
          )} */}
          {/* <button
            // onClick={() => {
            //   setaddphoto(!addphoto);
            // }}
            onClick={startVideo}
          >
            {addphoto ? "ClosePhoto" : "Add Photo"}
          </button> */}

          {/* Button to open camera */}
          <button
            onClick={handleOpen}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Add Photo
          </button>

          {/* Modal with glass background */}

          {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
              <div className="bg-white/20 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl flex flex-col items-center border border-white/30">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  width="320"
                  height="240"
                  className="rounded-2xl border-4 border-white/40 shadow-lg"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-green-600 px-4 py-2 text-blue-600 rounded w-full"
          >
            Save Student
          </button>
          {/* Toast Container yaha ya App.js me ek hi baar */}
          <ToastContainer position="top-right" autoClose={2000} />
        </form>
      </div>
    </div>
  );
}
