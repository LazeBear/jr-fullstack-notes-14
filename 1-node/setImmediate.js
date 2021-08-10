// const { setImmediate } = require('async');

// playground
setImmediate(() => {
  console.log(2);
})
setTimeout(() => {
console.log(1);
})

// repl -> read evaluate process language shell