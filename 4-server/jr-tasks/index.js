const express = require('express');

const app = express();

app.use(cors);
app.use(express.json());

const tasks = [];
let id = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  res.json();
});

app.post('/tasks', (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json('description is missing');
  }
  id = id + 1;
  const task = { description, done: false, id };
  tasks.push(task);
  return res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  res.json();
});

app.delete('/tasks/:id', (req, res) => {
  res.json();
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});

function cors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
}
