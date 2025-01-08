const feedbackmodel=require("../models/feedbackschema");
const collegemodel=require("../models/collegeschema");
const addfeedback = async (req, res) => {
    try {
        const { college_id, departments, days, staffs, sessionname, startdate, enddate } = req.body;

        if (!college_id || !days) {
            return res.status(400).json({ message: "College ID and days are required" });
        }

        const newFeedback = new feedbackmodel({
            college_id,
            departments,
            days,
            staffs,
            sessionname,
            startdate,
            enddate,
        });

        await newFeedback.save();
        res.status(201).json({ message: "Feedback added successfully", feedback: newFeedback });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

const addFeedbackContent = async (req, res) => {
    try {
        const { feedbackcontent,feedbackId } = req.body; 

        if (!feedbackcontent || !Array.isArray(feedbackcontent)) {
            return res.status(400).json({ message: "Feedback content must be an array" });
        }

        const feedback = await feedbackmodel.findById(feedbackId);

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        feedback.feedbackcontent.push(...feedbackcontent);

        await feedback.save();
        res.status(200).json({ message: "Feedback content added successfully", feedback });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

const updatefeedback = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const updates = req.body;

        const feedback = await feedbackmodel.findById(feedbackId);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        Object.keys(updates).forEach((key) => {
            feedback[key] = updates[key];
        });

        await feedback.save();
        res.status(200).json({ message: "Feedback updated successfully", feedback });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

const deletefeedback = async (req, res) => {
    try {
        const { feedbackId } = req.params;

        const feedback = await feedbackmodel.findByIdAndDelete(feedbackId);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        res.status(200).json({ message: "Feedback deleted successfully", feedback });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

module.exports={addfeedback,updatefeedback,deletefeedback,addFeedbackContent}