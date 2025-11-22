const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'taskdb'
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected!");
});

// GET all tasks (from MySQL)
app.get('/tasks', (req, res) => {
  const search = req.query.q;

  let query = "SELECT * FROM tasks";
  let params = [];

  if (search) {
    query += " WHERE title LIKE ?";
    params.push(`%${search}%`);
  }

  db.query(query, params, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST new task
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;

  db.query(
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
    [title, description, status],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Task added", id: result.insertId });
    }
  );
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
