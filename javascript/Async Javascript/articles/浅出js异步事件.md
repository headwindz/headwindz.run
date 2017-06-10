## JS的单线程

如果把主线程也看成是一个大块的函数体的话，单线程可以理解成是每次只运行一个函数体。这样做的好处就是不用考虑变量被多线程同时操作而引发的问题。每个程序都有个主线程，异步触发的事件会被放到事件队列(event queue)。主线程程序执行完毕后，会去事件队列里逐个执行队列里的handler(因为是单线程，所以每次只能处理一个事件，也就是事件之间会相互block)。这个事件轮询的过程可以表示为

```javascript
runYourScript(); 
while (atLeastOneEventIsQueued) {
    fireNextQueuedEvent();
};
```

用setTimeout举个简单的例子:

```javascript
let start = +new Date;
setTimeout(function Task1(){
    let end = +new Date;
    console.log(`Task1: Time elapsed ${end - start} ms`);
}, 500); //500ms后，Task1被放到事件队列

// single thread
setTimeout(function Task2(){
    let end = +new Date;
    console.log(`Task2: Time elapsed ${end -start} ms`);
    while(+new Date - start < 3000) {} //延迟到3秒后再结束。这里会block住队列里的下一个执行
}, 300); //300ms后，Task2被放到事件队列

while(+new Date - start < 1000) {} //主线程1秒后结束
console.log('main thread ends');
//output: 
//main thread ends
//Task2: Time elapsed 1049 ms
//Task1: Time elapsed 3000 ms
```

主线程里运行了2个setTimeout方法。setTimeout方法可以理解成把第一个函数参数放到事件队列里。所以

* 300ms后，Task2被放到事件队列。
* 500ms后，Task1被放到事件队列。
* 1秒后，主线程结束，打印出"main thread ends"。
* 主线程结束后会去事件队列里轮询事件。事件队列里的第一个事件是Task2。注意这里Task2打印出来的事件是大于300ms的。这也证明了setTimeout并非是严格按照设置的delay时间执行，具体执行时间取决于主线程和事件队列里的其他事件执行情况。
* Task2处理完后，事件队列里还有个Task1。开始执行Task1。

## 什么是异步函数
JS里的异步函数指的是它可以接收一个回调函数并把该回调函数放入事件队列里，后续执行。因为回调函数是放到事件队列里的，所以异步函数是非阻塞的。异步函数可以保证下面这个单元测试永远通过：

```javascript
var functionHasReturned = false; 
asyncFunction(() => {
    console.assert(functionHasReturned); 
}); 
functionHasReturned = true;
```

并非所有接收回调函数作为参数的函数都是异步函数。例如Array.prototype.forEach就是同步的。
```javascript
let before = false;
[1].forEach(() => {
    console.assert(before); 
}); 
before = true;
```
所以从函数的调用是无法看出该函数是否为异步函数，而应该由函数体的实现进行判断。有些函数甚至有可能是既可以是异步的也可以是同步的。

## 异步函数的异常捕获

因为异步函数的回调是在事件队列里单独拉出来执行的。所以在异步函数外面包裹try-catch是无法捕捉到回调函数里抛出的异常的。因为当回调函数从队列里被拉出来执行的时候try-catch所在的代码块已经执行完毕了。

```javascript
try {
    setTimeout(() => {
        throw new Error('callback error'); 
    }, 0);
} catch (e) {
    console.error('caught callback error');
}
console.log('try-catch block ends');
```
在上述例子中，当回调里的异常被抛出但没被捕获的时候，该异常会直接被主程序所捕获。在浏览器里可以通过window.onerror，在node里通过process.uncaughtException可以捕获此类异常。

处理异步函数异常的话只能通过回调函数。例如

```javascript
let fs = require('fs'); 
fs.readFile('abc.txt', function(err, data) {
    if (err) {
        return console.error(err); 
    }; 
    console.log(data);
});
```

## Reference 

* [Async Javascript](https://github.com/n0ruSh/the-art-of-reading/blob/master/javascript/Async%20Javascript/Async%20JavaScript.pdf)


## Notice

* 如果您觉得该[Repo](https://github.com/n0ruSh/the-art-of-reading/)让您有所收获，请点击右上角的「Star 」支持楼主。
* 如果您想持续关注楼主的最新系列文章，请点击右上角的「Watch」订阅