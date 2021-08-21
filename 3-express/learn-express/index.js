const express = require('express');
const app = express(); // application
app.use(express.json()); // convert json body to js object and assign it to req.body;
// middleware

const data = [];

// app.method(path, route handler => callback)
app.get('/', function (req, res) {
  // res.send('Hello World');
  res.json([]);
});

// get data from request
// 1. req.body (require app.use(express.json())) -> POST, PUT, PATCH -> create or update data
// 2. req.params (route param) -> GET, POST, PUT, PATCH, DELETE -> mostly id
// 3. req.query -> GET -> filtering
app.post('/:name', (req, res) => {
  const { name } = req.params;
  const { title } = req.query;
  console.log(req);
  res.json({ name, title });
});

// respond
// res.json -> 200
// res.send -> 200
// res.sendStatus(201) -> 201
// res.status(201).json([]); -> [], 201

//res.status(401).json({error: "invalid input"}) 返回json数据
//res.sendStatus(201) 状态为201
//res.status(200).json([]) 返回json数据.
// res.json([]);

app.put('/students/:id/classes/:classId/desk', (req, res) => {
  const { id } = req.params;
});
app.delete('/students/:id', (req, res) => {});

// 3000, 4200, 8080, 9000
// 3000, 8080
// 3001, 3002, 3030
app.listen(3000, () => {
  console.log('server listening at port 3000');
});
