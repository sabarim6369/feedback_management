const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  college: { type: String, required: true },
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
