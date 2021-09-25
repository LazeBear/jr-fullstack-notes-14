const express = require('express');
const {
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  addStudent,
  addCourseToStudent,
  removeCourseFromStudent,
} = require('../controllers/student');

const router = express.Router();

router.get('', getAllStudents);
router.get('/:id', getStudentById);
router.post('', addStudent);
router.put('/:id', updateStudentById);
router.delete('/:id', deleteStudentById);
router.post('/:id/courses/:code', addCourseToStudent);
router.delete('/:id/courses/:code', removeCourseFromStudent);

module.exports = router;
