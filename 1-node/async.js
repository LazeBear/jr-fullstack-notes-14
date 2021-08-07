function fetchData(url, cb) {
  setTimeout(() => cb(url), 1000);
}

// callback hell
fetchData("http://example.com", (data1) => {
  // logic for process data1
  fetchData("http://example1.com", (data2) => {
    // logic for process data1
    fetchData("http://example2.com", (data3) => {
      // logic for process data1
      // callbackfunction();
    });
  });
})

// Promise
/**
 * 三种状态
 * pending fulfilled(resolved) rejected
 * 
 * 状态变化 pending -> fulfilled, pending -> rejected
 * 变化不可逆
 * 
 * .then, .catch
 * then 获取resolved的结果 (.then接受一个callback， 这个callback返回的也是一个Promise)
 * catch 获取错误信息 (.catch接受一个callback， 这个callback返回的也是一个Promise)
 */

// promise.then(() => { }).then(()=>{})

function fetchFakeData(url) {
  return new Promise((res, rej) => {
    setTimeout(()=>res(url), 1000);  
  })
}

let isLoading = true;
fetchFakeData("http://example.com")
.then(data1 => {
  // some logic here
  return fetchFakeData("http://fake.com");
  // return Promise.resolve(undefined);
}).then(data2 => {
  // some logic here
  return fetchFakeData("http://data.com");
}).then(data3 => {
  // logic here
}).catch(error => console.log(error)).finally(() => {
  isLoading = false;
})

// 异步 = 非阻塞 = 不等待
// 同步 = 阻塞 = 等待

// electron


// 宏任务，微任务
// 宏任务 -> setTimeout, ajax call, DOM events
// 微任务 -> promise

setTimeout(() => console.log(1));
Promise.resolve(1).then(console.log);
// 同步代码执行，碰到异步代码，在web api注册 （丢给web api处理）, 同步代码继续执行
// 同步代码执行完
// 当call stack为空的时候 - 并行
// 事件结束 -> 事件进入callback queue (macro task queue) - 并行
// 当call stack为空的时候 - 并行
// event loop 从micro task queue里取前列的event，进行执行
// 进行DOM渲染
// event loop 会从callback queue取前列的event，进行执行
