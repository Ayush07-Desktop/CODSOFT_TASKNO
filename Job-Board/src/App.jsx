import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Admin from "./pages/Admin";

import jobsData from "./data/jobs";

function App() {
  const [jobs, setJobs] = useState(jobsData);

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
    </>
  );
}

export default App;