const express = require('express');
const tasksRouter = require('./task');
const router = express.Router();

// 有哪些资源 -》 大的路径
// tasks, users
router.use('/tasks', tasksRouter);

module.exports = router;
