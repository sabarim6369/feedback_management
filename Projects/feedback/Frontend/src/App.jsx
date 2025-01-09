import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddTutor from "./components/AddTutor";
import CreateFeedback from "./components/CreateFeedback";
// import ViewFeedbacks from "./components/ViewFeedbacks";
import AddCollege from "./components/AddCollege";
// import "./index.css";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-purple-500 text-white px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold">RAMPEX</h1>
            <div className="flex gap-4">
              <Link to="/add-tutor" className="hover:underline">
                Manage Tutor
              </Link>
              <Link to="/create-feedback" className="hover:underline">
                Create Feedback
              </Link>
              <Link to="/add-college" className="hover:underline">
                Manage College
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-tutor" element={<AddTutor />} />
            <Route path="/create-feedback" element={<CreateFeedback />} />
            <Route path="/add-college" element={<AddCollege />} />
          </Routes>
        </div>
      </div>
      
    </Router>
  );
};

export default App;
