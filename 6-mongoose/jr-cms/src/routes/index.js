const express = require('express');
const courseRouter = require('./course');

const router = express.Router();

router.use('/courses', courseRouter);

module.exports = router;
