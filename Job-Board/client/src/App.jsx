import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Admin from "./pages/Admin";
import Companies from "./pages/Companies";
import AppliedJobs from "./pages/AppliedJobs";
import SavedJobs from "./pages/SavedJobs";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScrollToTop from "./components/ScrollToTop";

import jobsData from "./data/jobs";


function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : jobsData;
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home jobs={jobs} />}
        />

        <Route
          path="/jobs"
          element={<Jobs jobs={jobs} />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails jobs={jobs} />}
        />

        <Route
          path="/companies"
          element={<Companies jobs={jobs} />}
        />

        <Route
          path="/applied"
          element={<AppliedJobs />}
        />

        <Route
          path="/saved"
          element={<SavedJobs />}
        />

        <Route path="*" element={<NotFound />} />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <Admin
              jobs={jobs}
              setJobs={setJobs}
            />
          }
        />
      </Routes>

      <Footer />

      <ScrollToTop />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}


export default App;