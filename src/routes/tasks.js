const express = require('express');
const router = express.Router();

// GET all tasks
router.get('/', (req, res) => {
  res.json({ success: true, data: req.app.locals.tasks });
});

// POST create task
router.post('/', (req, res) => {
  const { title, priority } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }

  const validPriorities = ['low', 'medium', 'high'];
  const taskPriority = validPriorities.includes(priority) ? priority : 'low';

  const newTask = {
    id: Date.now(),
    title: title.trim(),
    completed: false,
    priority: taskPriority,
    createdAt: new Date()
  };

  req.app.locals.tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

// GET task by ID with proper invalid ID handling
router.get('/task/:id', (req, res) => {
  const idParam = req.params.id;

  if (!/^\d+$/.test(idParam)) { // check if numeric
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const taskId = Number(idParam);
  const task = req.app.locals.tasks.find(t => t.id === taskId);

  if (!task) return res.status(404).json({ error: "Task not found" });

  res.json({ success: true, data: task });
});

module.exports = router;
