## Thoughts

Recently I have been reading the book [Async JavaScript](https://www.amazon.com/Async-JavaScript-Responsive-Pragmatic-Express-ebook/dp/B00AKM4RVG) about JS asynchronicity and JS event is one of the useful solutions to the problem. To get a deeper understanding of how events work, I create a custom EventEmitter which constains most of the working functionalities of [Node EventEmitter](https://nodejs.org/api/events.html). The [source code](https://github.com/n0ruSh/the-art-of-reading/blob/master/javascript/Async%20Javascript/event.js) is no more than 60 lines.

## General ideas

The general idea is to have an object (*this.handlers*) to hold the mapping from event name(type: string) to its associated listeners/handlers(type: Array\<Function\>). When each event is triggerd, walk through the associated listeners/handlers and execute them.

```javascript
class Emitter {
    constructor(){
        /**
         * keep mapping information。
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

## Some details about the methods

### on - event binding

```javascript
on(evt, handler) {
    this.handlers[evt] = this.handlers[evt] || [];
    let hdl = this.handlers[evt];
    hdl.push(handler);
    return this;
}
```

We don't check the duplicates when binding the handler for simplicity. That is to say, if you call *on* for the same function twice, then it will be called twice when the event is triggered. The method returns *this* to allow for method chaining。

### off - event unbinding
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

Note that here we compare the function reference with strict comparision when unbinding a function. Function in JavaScript is compared by their reference, same as how objects comparision works.

```javascript
function f1() {
    console.log('hi');
}

function f2() {
    console.log('hi');
}

let f3 = f1;
console.log(f1 === f2); //false
console.log(f1 === f3); //true
```



### once - binding, but only can be triggerd once

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

It works similarly with *on* method. But we need to wrap the handler with another function such that we can remove the binding once the handler is executed to achieve **triggered only once**.

### emit - trigger event

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

When an event is triggered, find all its associated handlers(i.e. this.handlers[evt]) and execute them.

### eventNames - get the list of registered events which has active(i.e. not-empty) handlers

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

Here we don't simply return all the keys of the *this.handlers* , as some events can be binded with some handlers and then remove them afterwards. In the case, the event name exists as a valid key in *this.handlers* but without active handlers. E.g.

```javascript
let server = new Emitter();
let fn = function(){};
server.on('connection', fn);
server.removeListener('connection', fn);
server.handlers.connection; //[]
```

Therefore, we need to filter out the events with empty hanlders. Here we use [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=example) to make the code a little bit cleaner. There are many situations where *reduce* can be useful, such as computing the sum of an array:

```javascript
function sumWithForEach(arr) { // with forEach
    let sum = 0;
    arr.forEach(it => {
        sum += it;
    })
    return sum;
}

function sumWithReduce(arr) { // with reduce
    return arr.reduce((sum, current) => {
        return sum + current;
    })
}
```

## Reference 

* [Async JavaScript](https://www.amazon.com/Async-JavaScript-Responsive-Pragmatic-Express-ebook/dp/B00AKM4RVG)


## Notice

* If you want to follow the latest news/articles for the series of reading notes, Please 「Watch」to Subscribe.