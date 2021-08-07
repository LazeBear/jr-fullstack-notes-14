var arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log('Index: ' + i + ', element: ' + arr[i]);
  }, 1000);
}

// async
let arr = [10, 12, 15, 21];
for (let i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log('Index: ' + i + ', element: ' + arr[i]);
  }, 1000);
}

const obj = { color: 'red', name: 'apple', color: 'green' };

/* ----------------------------------------------*/
const add = function (x, y) {
  return x + y;
};

// vs
const add = (x, y) => {
  return x + y;
};
// equals
const add = (x, y) => x + y;

// return object
const foo = (x, y) => {
  return { a: x, b: y };
};
// equals
const foo = (x, y) => ({ a: x, b: y });

//
const add = (x, y) => x + y;

/* ----------------------------------------------*/
function normalFunction(param) {
  console.log(param);
}
function sum(x, y, callback) {
  const sum = x + y;
  setTimeout(() => {
    callback(sum);
  });
}
sum(1, 2, normalFunction);

// const sum = sum();
// normalFunction(sum);
// 回调函数就是给涉及到异步的函数拍个顺序,挨个执行
/* ----------------------------------------------*/
const calendar = {
  currentDay: 6,
  normal: function () {
    console.log(1, this);
    setTimeout(function () {
      console.log(2, this);
    });
  },
  arrow: function () {
    console.log(3, this);
    setTimeout(() => {
      console.log(4, this);
    });
  },
  nextDay: function () {
    this.currentDay++;
  }
};

// object literal

function foo(a) {
  // xxxx
}

foo(calendar);
calendar.normal();
calendar.arrow();

/* ----------------------------------------------*/
const object = {
  arrow: () => {}
};
// equals
const object = {};
object.arrow = () => {};
// object literal
// this -> window

const arrowFn = () => {};
arrowFn();

const fn = function () {};
fn.apply({ x: 1 });

const set = new Set([
  { name: 'pear', color: 'green' },
  { name: 'pear', color: 'green' }
]);


const number = 1;
function foo() {
  console.log(number);
}
function bar(fn) {
  const number = 2;
  fn();
}
bar(foo); // 1

/* ----------------------------------------------*/

function createCounter() {
  let counter = 0;
  const increment = () => {
    counter++;
  };
  const getCount = () => {
    return counter;
  };
  return {
    // increment: increment,
    // getCount: getCount
    increment,
    getCount
  };
}
const counter = createCounter();
counter.increment();
console.log(counter.getCount());


/* ----------------------------------------------*/
(function () { })()
