module.exports = (req, res, next) => {
  let { id } = req.params;
  req.params.id = Number(id);
  next();
};

// function foo(obj) {
//   obj.xx = 'xx';
//   // copy obj
//   const newObj = { ...obj };
//   newObj.xx = 0;
//   return newObj;
// }

// module.exports = function(req, res, next) {}

// function parseId(req, res, next) { };
// module.exports = parseId;
