## 想法

因为最近在看异步相关书籍[Async Javascript](https://github.com/n0ruSh/the-art-of-reading/blob/master/javascript/Async%20Javascript/Async%20JavaScript.pdf)。事件也是处理异步的一种方法。为了加深理解就模仿[Node EventEmitter](https://nodejs.org/api/events.html)造了个简单可玩的自定义事件库。[源码](https://github.com/n0ruSh/the-art-of-reading/blob/master/javascript/Async%20Javascript/event.js)不到60行，欢迎star。

## 整体思路

大致思路是用一个对象(this.handlers)保存了事件名字(字符类型)到监听器(数组类型,每个元素是函数)的映射。当事件触发的时候，把该事件上的所有监听器取出来遍历执行。

```javascript
class Emitter {
    constructor(){
        /**
         * 用来保存映射信息。
         * e.g. 
         *   {
         *      'event1': [fn1, fn2],
         *      'event2': [fn3, fn4, fn5]
         *   }
         */
        this.handlers = {};
    }
}
```

## 几个主要方法的实现细节

### on，事件绑定

```javascript
on(evt, handler) {
    this.handlers[evt] = this.handlers[evt] || [];
    let hdl = this.handlers[evt];
    hdl.push(handler);
    return this;
}
```
这里不做重复判断，也就是可以多次添加同个监听器，会多次执行。最后返回this方便链式调用。实现挺直接简单的。就是把监听器(i.e. handler)加入到映射对象(i.e. this.handlers)的相应位置(i.e. this.handlers.evt)。

### off，事件解绑
```javascript
removeListener(evt, handler) {
    this.handlers[evt] = this.handlers[evt] || [];
    let hdl = this.handlers[evt];
    let index = hdl.indexOf(handler);
    if(index >= 0) {
        hdl.splice(index, 1);
    }
    return this;
}
```
注意这里解绑的话比较的是handler的引用值。

### once，绑定，只可触发一次

```javascript
once(evt, handler) {
    this.handlers[evt] = this.handlers[evt] || [];
    let hdl = this.handlers[evt];
    hdl.push(function f(...args){
        handler.apply(this, args);
        this.removeListener(evt, f);
    });
    return this;
}
```
原理其实跟on一样。也是往映射对象(i.e. this.handlers)的相应位置(i.e. this.handlers.evt)里添加监听器函数。只不过需要一个外层函数包装一下这个函数。一旦执行后会调用removeListener将外层函数移出this.handlers.evt。

### emit, 事件触发

```javascript
emit(evt, ...args) {
    this.handlers[evt] = this.handlers[evt] || [];
    let hdl = this.handlers[evt];
    hdl.forEach((it) => {
        it.apply(this, args);
    });
    return this;
}
```
事件一但触发，就拉出注册在这事件上的监听器函数数组(this.handlers[evt])，遍历循环运行即可。

### eventNames, 获取有注册监听器的事件列表

```javascript
eventNames() {
    return Object.keys(this.handlers).reduce((arr, evt) => {
        if(this.listenerCount(evt)) {
            arr.push(evt);
        }
        return arr;
    }, []);
}
```
这里并非只是返回this.handlers的键值组就可以了。因为有些事件可以先绑定后解绑，最后会导致它确实拥有该事件的键，但是该键的值为空数组。例如:

```javascript
let server = new Emitter();
let fn = function(){};
server.on('connection', fn);
server.removeListener('connection', fn);
server.handlers.connection; //[]
```
因此我们还需要过滤空数组的情况。这里也是用了下reduce(i.e. [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=example))，感觉会比较简洁。reduce会有很多妙用，例如当需要求一个数组的和时:

```javascript
function sumWithForEach(arr) {
    let sum = 0;
    arr.forEach(it => {
        sum += it;
    })
    return sum;
}

function sumWithReduce(arr) {
    return arr.reduce((sum, current) => {
        return sum + current;
    })
}
```