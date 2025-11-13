const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();

// JSON parsing middleware
app.use(express.json());

// In-memory tasks
const tasks = [
  { id: 1, title: 'Sample Task 1', completed: false },
  { id: 2, title: 'Sample Task 2', completed: true },
  { id: 3, title: 'Sample Task 3', completed: false },
  { id: 4, title: 'Sample Task 4', completed: false },
  { id: 5, title: 'Sample Task 5', completed: true }
];

app.locals.tasks = tasks;

// Routes
app.use('/tasks', taskRouter);

// Optional: Home route
app.get('/', (req, res) => {
  res.send('Welcome to Task Manager API. Use /tasks to view tasks.');
});

// Error handling for invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
  next();
});

// Start server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
