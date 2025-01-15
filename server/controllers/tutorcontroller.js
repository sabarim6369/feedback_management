const Tutor = require('../models/tutor');

// Get all tutors
const getTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    if (!tutors || tutors.length === 0) {
      return res.status(404).json({ message: "No tutors found" });
    }
    res.status(200).json({ message: "Tutors retrieved successfully", tutors });
  } catch (err) {
    console.error('Error fetching tutors:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Add a new tutor
const addTutor = async (req, res) => {
  const { name, specialization, experience, college } = req.body;
  try {
    if (!name || !specialization || !experience || !college) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTutor = new Tutor({
      name,
      specialization,
      experience,
      college,
    });

    await newTutor.save();
    res.status(201).json({ message: 'Tutor added successfully', tutor: newTutor });
  } catch (err) {
    console.error('Error adding tutor:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Update a tutor
const updateTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const { name, specialization, experience, college } = req.body;

    const tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    tutor.name = name || tutor.name;
    tutor.specialization = specialization || tutor.specialization;
    tutor.experience = experience || tutor.experience;
    tutor.college = college || tutor.college;

    await tutor.save();

    res.status(200).json({ message: 'Tutor updated successfully', tutor });
  } catch (err) {
    console.error('Error updating tutor:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Delete a tutor
const deleteTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;

    const deletedTutor = await Tutor.findByIdAndDelete(tutorId);
    if (!deletedTutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    res.status(200).json({ message: 'Tutor deleted successfully', deletedTutor });
  } catch (err) {
    console.error('Error deleting tutor:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = { getTutors, addTutor, updateTutor, deleteTutor };
