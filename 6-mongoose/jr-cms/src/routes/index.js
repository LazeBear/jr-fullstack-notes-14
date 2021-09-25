const express = require('express');
const courseRouter = require('./course');
const studentRouter = require('./student');
const userRouter = require('./user');
const authRouter = require('./auth');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.use('/courses', courseRouter);
router.use('/students', authGuard, studentRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

module.exports = router;
