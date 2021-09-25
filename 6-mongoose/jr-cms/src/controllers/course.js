const Course = require('../models/course');
const Student = require('../models/student');
const Joi = require('joi');

async function getAllCourses(req, res) {
  const courses = await Course.find().exec();
  res.json(courses);
}

async function addCourse(req, res) {
  // const { name, code, description } = req.body;
  // validate data
  const stringValidator = Joi.string().required();
  const schema = Joi.object({
    name: stringValidator,
    // COMP101, COMP 101, $COMP101
    code: Joi.string()
      .regex(/^[a-zA-Z]+[0-9]+$/)
      .required(),
    description: Joi.string(),
  });
  const { name, code, description } = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
  });

  const existingCourse = await Course.findById(code).exec();
  if (existingCourse) {
    return res.sendStatus(409);
  }

  const course = new Course({
    name,
    description,
    code,
  });

  await course.save();
  return res.status(201).json(course);
}
async function getCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findById(id).exec();
  if (!course) {
    return res.sendStatus(404);
  }
  return res.json(course);
}
async function updateCourseById(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  // updateOne {_id:id},{}
  const course = await Course.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  ).exec();
  if (!course) {
    return res.sendStatus(404);
  }
  return res.json(course);
}
async function deleteCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id).exec();
  if (!course) {
    return res.sendStatus(404);
  }
  await Student.updateMany(
    { courses: course._id },
    {
      $pull: {
        courses: course._id,
      },
    }
  ).exec();
  return res.sendStatus(204);
}

module.exports = {
  getAllCourses,
  addCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
