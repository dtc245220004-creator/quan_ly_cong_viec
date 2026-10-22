const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'taskdb',
  password: 'StrongPassword123!',
  port: 5432,
});

pool.query('CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, title VARCHAR(100), status VARCHAR(20))');

app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks');
  res.json(result.rows);
});

app.listen(3000, () => console.log('App running on port 3000'));
