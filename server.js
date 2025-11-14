const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();

app.use(express.json());

const tasks = [
  { id: 1, title: 'Task 1', completed: false, priority: 'low', createdAt: new Date() },
  { id: 2, title: 'Task 2', completed: true, priority: 'medium', createdAt: new Date() },
  { id: 3, title: 'Task 3', completed: false, priority: 'high', createdAt: new Date() },
  { id: 4, title: 'Task 4', completed: false, priority: 'medium', createdAt: new Date() },
  { id: 5, title: 'Task 5', completed: true, priority: 'low', createdAt: new Date() }
];

app.locals.tasks = tasks;

app.use('/tasks', taskRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Task Manager API. Use /tasks');
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
  next();
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
