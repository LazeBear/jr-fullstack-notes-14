const Course = require('../models/course');

async function getAllCourses(req, res) {
  const courses = await Course.find();
  res.json(courses);
}

async function addCourse(req, res) {
  const { name, code, description } = req.body;
  // validate data
  const course = new Course({
    name,
    description,
    code,
  });

  await course.save();
  return res.json(course);
}
function getCourseById(req, res) {}
function updateCourseById(req, res) {}
function deleteCourseById(req, res) {}

module.exports = {
  getAllCourses,
  addCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
