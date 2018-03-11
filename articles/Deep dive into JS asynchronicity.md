## Single thread JavaScript

JavaScript has a concurrency model based on [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). Each message is processed completely before any other message is processed. This offers some nice properties when reasoning about your program, including the fact that whenever a function runs, it cannot be pre-empted and will run entirely before any other code runs (and can modify data the function manipulates).

```javascript
runYourScript(); 
while (atLeastOneEventIsQueued) {
    fireNextQueuedEvent();
};
```

Let's use setTimeout as a simple example:

```javascript
let start = +new Date;
setTimeout(function Task1(){
    let end = +new Date;
    console.log(`Task1: Time elapsed ${end - start} ms`);
}, 500); //500ms later，Task1 will be inserted into event queue

// single thread
setTimeout(function Task2(){
    let end = +new Date;
    console.log(`Task2: Time elapsed ${end -start} ms`);
    /**
     * use while loop to delay the completion of the function for 3 seconds
     * this will block the execution of the next function in event loop
     * i.e. looping through the event queue has to happen after the main thread finishes its task
     */
    while(+new Date - start < 3000) {}
}, 300); //300ms later，Task2 will be inserted into event queue

while(+new Date - start < 1000) {} //main thread delay completion for 1 second
console.log('main thread ends');
//output: 
//main thread ends
//Task2: Time elapsed 1049 ms
//Task1: Time elapsed 3000 ms
```

[setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) will put the first argument(type Function) into event queue. Here is what happens in the code above: 

* 300ms later，Task2 is inserted into event queue.
* 500ms later，Task1 is inserted into event queue.
* 1 second later, the main thread finishes, "main thread ends" is printed on the console.
* The main thread will loop through the event queue when it finishes its job at hand. The first function in the event queue is Task2(as it's inserted first). So Task2 is fetched and executed, resulting the console output "Task2: Time elapsed 1049 ms". The elapsed time you see may differ as setTimeout is not exactly dealying the execution of your function. All it does is to put the function into the event queue with the delay you set. When the function will be executed depends on the queueing functions in the event queue, as well as the status of the main thread (whether it has remaining task running).
* Execute Task1 after Task2 finishes.

## What are Asynchronous functions

Asynchronous functions in JavaScript usually can accept a last parameter of function type (it's usually called *callback*) and the callback will be inserted into event queue when the function completes. As the callback is in event queue, the function is NON-BLOCKING. Asynchronous functions can guarantee the following unit test will always pass:

```javascript
let functionHasReturned = false; 
asyncFunction(() => {
    console.assert(functionHasReturned); 
}); 
functionHasReturned = true;
```

Note that NOT all functions with a callback parameter are asynchronous. E.g. [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) is synchronous.

```javascript
let before = false;
[1].forEach(() => {
    console.assert(before); 
}); 
before = true;
```

## Exceptions in asynchronous functions

Since the callback function is put in the event queue and executed later with it's own invoking context, wrapping the asynchronous functions with try-catch mechanism won't be able to catch the exception from the callback. 

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

In the example, the exception thrown in the callback is not caught by our own program (i.e. the catch block - no 'caught callback error' is printed on the console). We can catch these uncaught exceptions with [window.onerror](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror) in brower and [process.uncaughtException](https://nodejs.org/api/process.html#process_event_uncaughtexception) in Node.

If we want to deliberately catch the error, as we should always do, we can do it in the callback. E.g. 

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

* [Async JavaScript](https://github.com/n0ruSh/the-art-of-reading/blob/master/javascript/Async%20Javascript/Async%20JavaScript.pdf)


## Notice

* If you benefit from this [Repo](https://github.com/n0ruSh/the-art-of-reading/)，Please「Star 」to Support.
* If you want to follow the latest news/articles for the series of reading notes, Please 「Watch」to Subscribe.