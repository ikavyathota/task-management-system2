const express = require('express');
const router = express.Router();
const { createTask, getTasks, getTaskById, updateTask, deleteTask, deleteSelectedTask } = require('../controllers/taskController');
const authenticate = require('../middlewares/authMiddleware');

// POST /api/tasks/create - Route to create a new task
router.post('/create', authenticate, createTask);

// GET /api/tasks/list - Route to fetch all tasks
router.get('/list', authenticate, getTasks);

// GET /api/tasks/:id - Route to fetch a specific task by ID
router.get('/:id', authenticate, getTaskById);

// PUT /api/tasks/:id/update - Route to update a specific task by ID
router.put('/:id/update', authenticate, updateTask);

// DELETE /api/tasks/:id/delete - Route to delete a specific task by ID
router.delete('/:id/delete', authenticate, deleteTask);

// DELETE /api/tasks/delete - Route to delete a set of  tasks 
router.delete('/delete', authenticate, deleteSelectedTask);
module.exports = router;

