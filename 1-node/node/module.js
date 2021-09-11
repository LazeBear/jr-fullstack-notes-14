const moduleA = { exports: {} };
const moduleB = { exports: {} };
(function (module) {
  const msg = 'this is my secret message';
  function getMsg() {
    return msg;
  }

  function updateMsg() {
    //
  }
  module.exports = { getMsg };
})(moduleA);

(function (module) {
  let count = 0;
  function increaseCount() {
    return count++;
  }
  module.exports = { increaseCount };
})(moduleB);

moduleA.exports.getMsg();
moduleB.exports.increaseCount();
