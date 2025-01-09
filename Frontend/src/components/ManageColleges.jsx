const ManageColleges = ({ activeTab }) => {
    return (
      <div>
        {activeTab === "manage-colleges" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Colleges</h2>
            {/* Add College Button */}
            <button className="bg-purple-500 text-white py-2 px-4 rounded-md mb-6">
              Add College
            </button>
            {/* Add College Form or List */}
            <div className="mt-6">
              {/* Display list of colleges here */}
              <p>List of Colleges:</p>
              {/* You can map through college data here */}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ManageColleges;
  