### setImmediate 和 process.nextTick 在node.js event loop里的执行顺序
![Node.js event loop](https://miro.medium.com/max/2000/1*2yXbhvpf1kj5YT-m_fXgEQ.png)
外面一圈蓝色的部分是由libuv管理，而内部红色的部分是由node.js管理
执行顺序是
同步代码 -> nextTick queue -> promise queue --(注意：这里继续的前提是，前两个queue为空) -> timer callbacks -> nextTick queue -> promise queue -> 之后同理

（以上是node v11及之后版本的loop，[之前版本稍有不同](https://blog.insiderattack.net/new-changes-to-timers-and-microtasks-from-node-v11-0-0-and-above-68d112743eb3)，新版本的loop是和浏览器里的行为对齐）

这里带来一个问题，看下面这个例子，timer 和 setImmediate的callback永远不会被执行
```js
function addNextTickRecurs(count) {
    let self = this;
    if (self.id === undefined) {
        self.id = 0;
    }

    if (self.id === count) return;

    process.nextTick(() => {
        console.log(`process.nextTick call ${++self.id}`);
        addNextTickRecurs.call(self, count);
    });
}
addNextTickRecurs(Infinity);
setTimeout(()=>console.log(1),100);
setImmediate(()=>console.log(2));
```

### setTimeout 和 setImmediate 的执行顺序
根据上面的图，理论上来说setImmediate应该后执行，但是我们来看看下面这段代码的执行结果
```js
setImmediate(() => {
  console.log(2);
})
setTimeout(() => {
console.log(1);
})
```
这段代码我运行了三次，分别得到以下的结果
```
// 第一次
1
2
// 第二次
2
1
// 第三次
1
2
```
顺序为什么会不一致？

这是因为Node.js有一个最低timeout 1ms的限制(对齐chrome)。因为这个限制，就算我们把倒计时设为0ms，实际的倒计时仍然是1ms。
所以在实际执行的时候，当前cpu的运行速度会决定在检查timer callback时，是否有timer expired。
一个很容易的检验方法就是，多增加一些同步代码。
```js
setImmediate(() => {
  console.log(2);
})
setTimeout(() => {
console.log(1);
})
console.log(3);
console.log(3);
console.log(3);
```
上面的代码，测试过10次，都是
```
3
3
3
1
2
```

这里稍微做一个扩展，关于上文所说的1ms最低限制。在node.js和不同浏览器中，这个时限会有所不同 （这个时限计算的是callback嵌套的情况）[Ref](https://blog.insiderattack.net/javascript-event-loop-vs-node-js-event-loop-aea2b1b85f5c)

Node是固定的1ms

Chrome是前4次1ms，之后是4ms

Firefox 和 Chrome一样

Safari是前5次1ms，之后4ms

这个4ms是定义在 [HTML标准](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) 里的

`If nesting level is greater than 5, and timeout is less than 4, then set timeout to 4.`