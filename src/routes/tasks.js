const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    if (limit > 50) limit = 50;
    const offset = (page - 1) * limit;
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM tasks');
    const [rows] = await db.query('SELECT * FROM tasks LIMIT ? OFFSET ?', [limit, offset]);
    const totalPages = Math.ceil(total / limit);
    res.json({ totalTasks: total, totalPages, currentPage: page, limit, data: rows });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const [result] = await db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description]);
  res.json({ id: result.insertId, title, description });
});

router.put('/:id', async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;
  await db.query('UPDATE tasks SET title=?, description=?, status=? WHERE id=?', [title, description, status, id]);
  res.json({ message: 'Updated' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM tasks WHERE id=?', [id]);
  res.json({ message: 'Deleted' });
});

module.exports = router;
