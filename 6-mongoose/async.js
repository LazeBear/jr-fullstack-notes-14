// function fetchFakeData(url) {
//   // return new Promise((res, rej) => {
//   //   setTimeout(() => rej(url), 1000);
//   // });
//   return Promise.resolve(1);
//   return 1;
// }

// // fetch();

// async function foo() {
//   try {
//     const data = await fetchFakeData('url');
//     console.log(data);
//   } catch (e) {
//     console.log(e);
//   }
// }

// // async function foo() {
// //   fetchFakeData('url').then((data) => {
// //     console.log(data);
// //   }).catch(e => {
// //     console.log(e);
// //   });
// // }

// const a = foo();
// console.log(a);

async function foo() {
  console.log(1);

  Promise((res, rej) => {
    bar();
  }).then(() => {
    console.log(3);
  });
}

async function bar() {
  console.log(2);
}

console.log(4);
foo();
console.log(5);

// 4 1 2 5 3
