import React, { useState } from "react";

const AddTutor = () => {
  const [tutor, setTutor] = useState({
    name: "",
    email: "",
    expertise: "", // changed from department to expertise
  });

  const [tutors, setTutors] = useState([
    { name: "John Doe", email: "john.doe@example.com", expertise: "CSE" },
    { name: "Jane Smith", email: "jane.smith@example.com", expertise: "ECE" },
  ]);

  const handleChange = (e) => {
    setTutor({ ...tutor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTutors([...tutors, tutor]);
    setTutor({ name: "", email: "", expertise: "" });
    console.log("Tutor added:", tutor);
  };

  return (
    <div className="space-y-8">
      {/* Add Tutor Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Tutor Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={tutor.name}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={tutor.email}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Expertise/Domain</label> {/* updated label */}
          <input
            type="text"
            name="expertise"
            placeholder="E.g., Web Development, Data Science"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            value={tutor.expertise} // updated to expertise
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
        >
          Add Tutor
        </button>
      </form>

      {/* Tutors List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Available Tutors</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Expertise/Domain</th> {/* updated column header */}
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{tutor.name}</td>
                <td className="px-4 py-2 border">{tutor.email}</td>
                <td className="px-4 py-2 border">{tutor.expertise}</td> {/* updated to expertise */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddTutor;
