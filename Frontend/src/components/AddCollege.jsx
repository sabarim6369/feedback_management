import React, { useState } from "react";

const AddCollege = () => {
  const [college, setCollege] = useState({
    name: "",
    place: "",
    departments: "",
  });

  const [colleges, setColleges] = useState([
    { name: "ABC College", place: "City A", departments: "CSE, ECE" },
    { name: "XYZ Institute", place: "City B", departments: "IT, Mechanical" },
  ]);

  const handleChange = (e) => {
    setCollege({ ...college, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setColleges([...colleges, college]);
    setCollege({ name: "", place: "", departments: "" });
    console.log("College added:", college);
  };

  return (
    <div className="space-y-8">
      {/* Add College Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">College Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={college.name}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Place</label>
          <input
            type="text"
            name="place"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={college.place}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Departments</label>
          <input
            type="text"
            name="departments"
            placeholder="E.g., CSE, ECE"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={college.departments}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Add College
        </button>
      </form>

      {/* Colleges List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Available Colleges</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">College Name</th>
              <th className="px-4 py-2 border">Place</th>
              <th className="px-4 py-2 border">Departments</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((college, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{college.name}</td>
                <td className="px-4 py-2 border">{college.place}</td>
                <td className="px-4 py-2 border">{college.departments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddCollege;
