const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();
app.use(express.json());

const tasks = [
  { id: 1, title: 'Task 1', description: 'Description 1', status: 'pending', createdAt: new Date() },
  { id: 2, title: 'Task 2', description: 'Description 2', status: 'pending', createdAt: new Date() },
  { id: 3, title: 'Task 3', description: 'Description 3', status: 'pending', createdAt: new Date() },
  { id: 4, title: 'Task 4', description: 'Description 4', status: 'pending', createdAt: new Date() },
  { id: 5, title: 'Task 5', description: 'Description 5', status: 'pending', createdAt: new Date() },
  { id: 6, title: 'Task 6', description: 'Description 6', status: 'pending', createdAt: new Date() },
  { id: 7, title: 'Task 7', description: 'Description 7', status: 'pending', createdAt: new Date() },
  { id: 8, title: 'Task 8', description: 'Description 8', status: 'pending', createdAt: new Date() },
  { id: 9, title: 'Task 9', description: 'Description 9', status: 'pending', createdAt: new Date() },
  { id: 10, title: 'Task 10', description: 'Description 10', status: 'pending', createdAt: new Date() }
];


app.locals.tasks = tasks;

app.use('/tasks', taskRouter);

app.get('/health', (req, res) => {
  res.json({ status: "healthy", uptime: process.uptime() });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
