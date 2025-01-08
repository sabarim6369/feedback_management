const collegemodel = require("../models/collegeschema");


const addcollege = async (req, res) => {
    const { collegename, availabledepartment, place } = req.body;
    console.log(req.body)

    try {
        
        if (!collegename || !availabledepartment || !place) {
            return res.status(400).json({ message: "All fields are required" });
        }

        
        const newCollege = new collegemodel({
            collegename,
            availabledepartment,
            place
        });

        await newCollege.save(); 

        res.status(201).json({ message: "College added successfully", college: newCollege });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};


const updatecollege = async (req, res) => {
    try {
        const { collegeId } = req.params; 
        const { collegename, availabledepartment, place } = req.body;

        
        const college = await collegemodel.findById(collegeId);

        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }

        
        college.collegename = collegename || college.collegename;
        college.availabledepartment = availabledepartment || college.availabledepartment;
        college.place = place || college.place;

        
        await college.save();

        res.status(200).json({ message: "College updated successfully", college });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};


const deletecollege = async (req, res) => {
    try {
        const { collegeId } = req.params; 

        
        const deletedCollege = await collegemodel.findByIdAndDelete(collegeId);

        if (!deletedCollege) {
            return res.status(404).json({ message: "College not found" });
        }

        res.status(200).json({ message: "College deleted successfully", deletedCollege });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

module.exports = { addcollege, updatecollege, deletecollege };
