import React from "react";
import AddCollege from "./AddCollege";
import AddTutor from "./AddTutor";
import CreateFeedback from "./CreateFeedback";
import ViewFeedbacks from "./ViewFeedbacks";

const Dashboard = () => {
  return (
    <div className="p-4">
      {/* <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded shadow col-span-2">
          <h2 className="text-xl font-semibold mb-2"> Feedbacks</h2>
          <ViewFeedbacks />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
