const express = require('express');
const router = express.Router();
const { getTutors, addTutor, updateTutor, deleteTutor } = require('../controllers/tutorcontroller');

// Use GET for fetching tutors
router.get('/gettutors', getTutors);

// Use POST for adding a new tutor
router.post('/addtutor', addTutor);

// Use PUT for updating a tutor
router.put('/updatetutor/:tutorId', updateTutor);

// Use DELETE for deleting a tutor
router.delete('/deletetutor/:tutorId', deleteTutor);

module.exports = router;
