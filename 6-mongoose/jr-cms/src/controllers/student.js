const Student = require('../models/student');
const Course = require('../models/course');

// function tryCatch(routeHandler) {
//   return (req, res, next) => {
//     try {
//       routeHandler(req, res, next);
//     } catch (e) {
//       next(e);
//     }
//   }
// }

async function getAllStudents(req, res) {
  const students = await Student.find().exec();
  res.json(students);
}

async function addStudent(req, res) {
  const { firstName, lastName, email } = req.body;
  // validate data
  const student = new Student({
    firstName,
    lastName,
    email,
  });

  await student.save();
  return res.status(201).json(student);

  // student.save().then((result) => { }).catch(error => { });
  //
  // try {
  //   await student.save();
  // } catch (e) {
  //   console.log(e);
  // }
  //
  // student.save((error, result) => {
  //   if (error) {
  //     console.log(error);
  //     return next(error);
  //     return res.status(400).json({ "error": "cannot create" });
  //   }
  //   return res.status(201).json(student);
  // })
}
async function getStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id)
    .populate('courses', 'name description')
    .exec();
  if (!student) {
    return res.sendStatus(404);
  }
  return res.json(student);
}

// student.firstName = req.body.firstName
// student.save();
async function updateStudentById(req, res) {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  // updateOne {_id:id},{}
  const student = await Student.findByIdAndUpdate(
    id,
    { firstName, lastName, email },
    { new: true }
  ).exec();
  if (!student) {
    return res.sendStatus(404);
  }
  return res.json(student);
}
async function deleteStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    return res.sendStatus(404);
  }
  await Course.updateMany(
    { students: student._id },
    {
      $pull: {
        students: student._id,
      },
    }
  ).exec();
  return res.sendStatus(204);
}

async function addCourseToStudent(req, res) {
  const { id, code } = req.params;
  const course = await Course.findById(code);
  const student = await Student.findById(id);
  if (!student || !course) {
    return res.sendStatus(404);
  }
  // transaction
  student.courses.addToSet(course._id);
  course.students.addToSet(student._id);
  await student.save();
  await course.save();
  return res.json(student);
}

async function removeCourseFromStudent(req, res) {
  const { id, code } = req.params;
  const course = await Course.findById(code);
  const student = await Student.findById(id);
  if (!student || !course) {
    return res.sendStatus(404);
  }
  student.courses.pull(course._id);
  course.students.pull(student._id);
  await student.save();
  await course.save();
  return res.json(student);
}

// {
//   error: "",
//   data: []
// }

module.exports = {
  getAllStudents,
  addStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  addCourseToStudent,
  removeCourseFromStudent,
};
