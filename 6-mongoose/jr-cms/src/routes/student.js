const express = require('express');
const {
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  addStudent,
  addCourseToStudent,
} = require('../controllers/student');

const router = express.Router();

router.get('', getAllStudents);
router.get('/:id', getStudentById);
router.post('', addStudent);
router.put('/:id', updateStudentById);
router.delete('/:id', deleteStudentById);
router.post('/:id/courses/:code', addCourseToStudent);

module.exports = router;
