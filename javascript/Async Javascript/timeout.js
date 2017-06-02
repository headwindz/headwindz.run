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