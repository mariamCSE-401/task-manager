const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, data: req.app.locals.tasks });
});

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

module.exports = router;
