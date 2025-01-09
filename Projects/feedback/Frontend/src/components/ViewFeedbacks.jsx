import React, { useState } from "react";

const ViewFeedbacks = () => {
  const [filters, setFilters] = useState({
    college: "",
    tutor: "",
    date: "",
  });

  const feedbacks = [
    { id: 1, college: "College A", tutor: "Tutor A", date: "2024-01-10", feedback: "Excellent session!" },
    { id: 2, college: "College B", tutor: "Tutor B", date: "2024-01-12", feedback: "Very informative." },
    // Add more mock feedback data here
  ];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    return (
      (!filters.college || feedback.college === filters.college) &&
      (!filters.tutor || feedback.tutor === filters.tutor) &&
      (!filters.date || feedback.date === filters.date)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <select
          name="college"
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleFilterChange}
        >
          <option value="">All Colleges</option>
          <option value="College A">College A</option>
          <option value="College B">College B</option>
        </select>
        <select
          name="tutor"
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleFilterChange}
        >
          <option value="">All Tutors</option>
          <option value="Tutor A">Tutor A</option>
          <option value="Tutor B">Tutor B</option>
        </select>
        <input
          type="date"
          name="date"
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleFilterChange}
        />
      </div>
      <div>
        {filteredFeedbacks.map((feedback) => (
          <div key={feedback.id} className="p-4 bg-gray-100 rounded shadow mb-2">
            <p><strong>College:</strong> {feedback.college}</p>
            <p><strong>Tutor:</strong> {feedback.tutor}</p>
            <p><strong>Date:</strong> {feedback.date}</p>
            <p><strong>Feedback:</strong> {feedback.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewFeedbacks;
