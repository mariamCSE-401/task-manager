const express = require('express');
const router = express.Router();

// GET /tasks - all tasks
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: req.app.locals.tasks
  });
});

// POST /tasks - create new task
router.post('/', (req, res) => {
  const { title } = req.body;

  // Check missing or empty title
  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }

  const newTask = {
    id: Date.now(),
    title: title.trim(),
    completed: false
  };

  req.app.locals.tasks.push(newTask);

  res.status(201).json({
    success: true,
    data: newTask
  });
});

module.exports = router;
