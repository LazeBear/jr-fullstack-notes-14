const express = require('express');
const courseRouter = require('./course');
const studentRouter = require('./student');

const router = express.Router();

router.use('/courses', courseRouter);
router.use('/students', studentRouter);

module.exports = router;
