module.exports = (error, req, res, next) => {
  // console.log(error);
  // if (error.name === 'ValidationError') {
  //   // return res.status(400).json(error);
  //   // object manipulation
  //   // error.details.map()
  //   // return res.status(400).json(error.details[0].message);
  //   if (process.env.NODE_ENV === 'production') {
  //     return res.status(400).json(error.details[0].message);
  //   } else {
  //     return res.status(400).json(error);
  //   }
  // }
  // // next();

  // winston log -> monitoring system
  console.log(error);
  return res
    .status(500)
    .send('something bad happened at our side, please tyr again later');
};

// if (error instanceof CustomError) {}
// class CustomError extends Error {

// }
