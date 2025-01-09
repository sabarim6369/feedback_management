import React, { useState } from "react";

const CreateFeedback = () => {
  const [feedback, setFeedback] = useState({
    college: "",
    department: "",
    tutor: "",
    sessionName: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback session created:", feedback);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">College</label>
        <select
          name="college"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        >
          <option value="">Select College</option>
          <option value="College A">College A</option>
          <option value="College B">College B</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Department</label>
        <select
          name="department"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Tutor</label>
        <select
          name="tutor"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        >
          <option value="">Select Tutor</option>
          <option value="Tutor A">Tutor A</option>
          <option value="Tutor B">Tutor B</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Session Name</label>
        <input
          type="text"
          name="sessionName"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Start Date</label>
        <input
          type="date"
          name="startDate"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">End Date</label>
        <input
          type="date"
          name="endDate"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Create Feedback
      </button>
    </form>
  );
};

export default CreateFeedback;
