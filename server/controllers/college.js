const collegemodel = require("../models/collegeschema");
const getColleges = async (req, res) => {
    try {
        const colleges = await collegemodel.find();

        if (!colleges || colleges.length === 0) {
            return res.status(404).json({ message: "No colleges found" });
        }

        res.status(200).json({ message: "Colleges retrieved successfully", colleges });
    } catch (err) {
        console.error("Error occurred while fetching colleges:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

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

// In your college controller
const updatecollege = async (req, res) => {
    const { collegeId } = req.params;
    const { collegename, availabledepartment, place } = req.body;

    try {
        const college = await collegemodel.findByIdAndUpdate(
            collegeId,
            { collegename, availabledepartment, place },
            { new: true }
        );

        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }

        res.status(200).json({ message: "College updated successfully", college });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

const deletecollege = async (req, res) => {
    const { collegeId } = req.params;

    try {
        const deletedCollege = await collegemodel.findByIdAndDelete(collegeId);

        if (!deletedCollege) {
            return res.status(404).json({ message: "College not found" });
        }

        res.status(200).json({ message: "College deleted successfully" });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};


module.exports = { addcollege, updatecollege, deletecollege,getColleges };
