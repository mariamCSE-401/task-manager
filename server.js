const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();

app.use(express.json());

// 5 tasks
const tasks = [
  { id: 1, title: 'Task 1', completed: false, priority: 'low', createdAt: new Date() },
  { id: 2, title: 'Task 2', completed: true, priority: 'medium', createdAt: new Date() },
  { id: 3, title: 'Task 3', completed: false, priority: 'high', createdAt: new Date() },
  { id: 4, title: 'Task 4', completed: false, priority: 'medium', createdAt: new Date() },
  { id: 5, title: 'Task 5', completed: true, priority: 'low', createdAt: new Date() }
];

// Make tasks available globally
app.locals.tasks = tasks;

// Task routes
app.use('/tasks', taskRouter);

// NEW: Health Check Route
app.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime()
  });
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Task Manager API. Use /tasks');
});

// Error handling
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
  next();
});

// Start server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
