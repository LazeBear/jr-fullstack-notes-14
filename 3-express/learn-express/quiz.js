const express = require('express');
// const cors = require('cors');
// app.use(cors());

const app = express();

app.use(cors);

function m1(req, res, next) {
  // get token from req.headers
  // validate token
  // valid -> next
  // invalid -> res.status(401).json({error: "invalid token"})
  console.log('m1 called');
  next();
  console.log('m1 after');
}

function m2(req, res, next) {
  console.log('m2 called');
  next();
}

function m3(req, res, next) {
  console.log('m3 called');
  next();
}

function m4(req, res, next) {
  console.log('m4 called');
  next();
}

// /v1/tasks/1
app.use(m1);
app.use('/v1', m2);
app.get('/v1/tasks', m3);
app.get('/v1/tasks', m4);
app.get('/v1/tasks/:id', (req, res) => {
  res.json(req.params);
});

// app.use
// app.get
// app.put
// app.delete
// app.post
// app.patch

// quiz
// 1. GET /v1/tasks/1
// 2. GET /v1/tasks

// regex
// use /v1*
// all

// OPTIONS
// preflight
function cors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
}

app.listen(3000, () => {
  console.log(3000);
});
