const express = require('express');
const {
  getAllTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  addTask,
} = require('../controllers/task');
const parseId = require('../middleware/parseId');
const checkTaskExist = require('../middleware/checkTaskExist');

const router = express.Router();

// app.get()
// /api/tasks
router.get('', getAllTask);

router.get('/:id', parseId, checkTaskExist, getTaskById);

router.post('', addTask);

router.put('/:id', parseId, checkTaskExist, updateTaskById);

router.delete('/:id', parseId, checkTaskExist, deleteTaskById);

module.exports = router;
