const express = require('express');
const cors = require('cors');

const data = [];
let id = 1;

const app = express();
app.use(express.json());
app.use(cors());

app.post('/tasks', (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json('description is missing');
  }
  id = id + 1;
  const task = { description, done: false, id };
  data.push(task);
  return res.status(201).json(task);
});

app.get('/tasks', (req, res) => {
  const { description } = req.query;
  if (description) {
    const filtered = data.filter((item) =>
      item.description.includes(description)
    );
    return res.json(filtered);
  }
  return res.json(data);
});

app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  // let task;
  // data.forEach((item) => {
  //   if (item.id === parseInt(id)) {
  //     task = item;
  //   }
  // });
  const task = data.find((item) => item.id === parseInt(id));
  if (!task) {
    return res.sendStatus(404);
  }
  return res.json(task);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { done, description } = req.body;

  const task = data.find((item) => item.id === parseInt(id));
  if (!task) {
    return res.sendStatus(404);
  }

  if (done !== undefined) {
    task.done = !!done;
  }
  if (description) {
    task.description = description;
  }
  return res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  let taskIndex;

  // data.forEach((item, index) => {
  //   if (item.id == id) {
  //     taskIndex = index;
  //   }
  // });
  data.findIndex((item) => {
    return item.id === parseInt(id);
  });
  if (taskIndex === -1) {
    return res.sendStatus(404);
  }
  const [task] = data.splice(taskIndex, 1);

  // data = data.filter(item => {
  //   return item.id !== parseInt(id);
  // })
  return res.json(task);
});

app.listen('3000', () => {
  console.log('Server is running on port 3000...');
});
