## Preface

For a basic understanding about JS asynchronicity, you can take a loot at 
[Deep dive into JS asynchronicity](https://github.com/n0ruSh/the-art-of-reading/issues/1). The applications of setTimeout/setInterval, ajax in browser, Node IO won't go far without a deep understanding of Asynchronicity (e.g. Event loop, event queue etc.).

## Talk is cheap, show me the code

Assume that we have an array which contains a list of file names. We would like to read the files IN TURN until we successfully retrieve one file. For example, if the array is ['a.txt', 'b.txt'], we read *a.txt* first, we return the file content of *a.txt* if the reading succeeds. Otherwise we continue reading *b.txt*. For reading files, Nodes provides two APIs, one is sync [readFileSync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options) and the other is async [readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)。

Now assume we have two files: *a.txt* (the content of which is also *a.txt* ) and *b.txt* (the content of which is also *b.txt* ).

Synchronous solution is quite straightforward:

```javascript
let fs = require('fs'),
    path = require('path');

function readOneSync(files) {
    for(let i = 0, len = files.length; i < len; i++) {
        try {
            return fs.readFileSync(path.join(__dirname, files[i]), 'utf8');
        } catch(e) {
            //ignore
        }
    }
    // all fail, throw an exception
    throw new Error('all fail');
}

console.log(readOneSync(['a.txt', 'b.txt'])); //a.txt
console.log(readOneSync(['filenotexist', 'b.txt'])); //b.txt
```

The main problem with synchronous reading is that it will block the main thread and the looping of event queue. The program becomes unreactive if the reading is taking a long time to complete, especially when the file is large. Asynchronous reading can effectively avoid the problem. All we need to pay attention to is to deal with the order of file reading (i.e. read next file in the callback of the previous *readFile* call).

```javascript
let fs = require('fs'),
    path = require('path');

function readOne(files, cb) {
    function next(index) {
        let fileName = files[index];
        fs.readFile(path.join(__dirname, fileName), 'utf8', (err, data) => {
            if(err) {
                return next(index + 1); // if fail, read next file
            } else {
                return cb(data); // use cb to output the result
            }
        });
    }
    next(0);
}

readOne(['a.txt', 'b.txt'], console.log); //a.txt
readOne(['filenotexist', 'b.txt'], console.log); //b.txt
```

The asynchronous solution needs to take in another parameter(i.e. *cb*) to deal with the result. It also defines a *next* method to recursively read next file.

## Fire multiple asynchronous requests simultaneously.

Assume that we have an array which constains a list of file names, we aim to read the files simultaneously and return all the file contents if all readings are successful. Invoke the failing callback if any of them fails.

```javascript
let fs = require('fs'),
    path = require('path');

function readAllV1(files, onsuccess, onfail) {
    let result = [];
    files.forEach(file => {
        fs.readFile(path.join(__dirname, file), 'utf8', (err, data) => {
            if(err) {
                onfail(err);
            } else {
                result.push(data);
                if(result.length === files.length) {
                    onsuccess(result);
                }
            }
        });
    });
}

readAllV1(['a.txt', 'b.txt'], console.log, console.log);
```

There is an obvious problem in the implementation above: the order of the file contents in *result* does not match along with the file order in *files* . All reading operatioins are asynchronous so that the callback is inserted into event queue when the reading completes. Let's assume *files* is ['a.txt', 'b.txt'], the file size of *a.txt* and *b.txt* are 100M and 10kb respectively. When we read the two files in asynchronous way simultaneously, the reading of *b.txt* will complete before *a.txt* so the callback for *b.txt* will be ahead of that of *a.txt* in the event queue. The finaly *result* will be [${content of *b.txt* }, ${content of *a.txt* }]. If we want the order of file contents in *result* to follow the order of file names in *files*, we can make a minor modification to our implementation:

```javascript
let fs = require('fs'),
    path = require('path');

function readAllV2(files, onsuccess, onfail) {
    let result = [];
    files.forEach((file, index) => {
        fs.readFile(path.join(__dirname, file), 'utf8', (err, data) => {
            if(err) {
                onfail(err);
            } else {
                result[index] = data;
                if(result.length === files.length) {
                    onsuccess(result);
                }
            }
        });
    });
}

readAllV2(['a.txt', 'b.txt'], console.log, console.log); //结果不确定性
```

It seems to work at first glance, BUT!

```javascript
let arr = [];
arr[1] = 'a';
console.log(arr.length); //2
```

Based on the implementation of *readAllV2* , if reading *b.txt* completes before *a.txt* , then we are setting result[1] = ${content of *b.txt* }, resulting in *result.length === files.length* to be true. At the case, we call the success callback to terminate the function without getting result of *a.txt* . Therefore, we can't simply rely on *result.length* as the completioin indicator.

```javascript
let fs = require('fs'),
    path = require('path');

function readAllV3(files, onsuccess, onfail) {
    let result = [], counter = 0;
    files.forEach((file, index) => {
        fs.readFile(path.join(__dirname, file), 'utf8', (err, data) => {
            if(err) {
                onfail(err);
            } else {
                result[index] = data;
                counter++;
                if(counter === files.length) {
                    onsuccess(result);
                }
            }
        });
    });
}

readAllV3(['a.txt', 'b.txt'], console.log, console.log); //[ 'a.txt', 'b.txt' ]
```

If you're somehow familar with Promise, you may know there is a [Promise.all](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) method, which does exactly the same thing.

## Make your interface consistent

Let's implement our custom read file method which has cache functionality. We simply return the cache if the cache is available for the file. Otherwise we read the file and set up the cache.

```javascript
let fs = require('fs'),
    path = require('path'),
    cache = {};

function readWithCacheV1(file, onsuccess, onfail) {
    if(cache[file]) {
        onsuccess(cache[file]);
    } else {
       fs.readFile(path.join(__dirname, file), 'utf8', (err, data) => {
           if(err) {
               onfail(err);
           } else {
               cache[file] = data;
               onsuccess(data);
           }
       });
    }
}
```

Let's take a deep look:

* When cache is available, we invoke *onsuccess* **SYNCHRONOUS**

```javascript
cache['a.txt'] = 'hello'; //mock cache data
readWithCacheV1('a.txt', console.log);//synchronous, completes before going into next call.
console.log('after you');

//console output:
hello
after you
```

* When cache isn't available, it's **ASYNCHRONOUS** due to the asynchronicity of *readFile*

```javascript
readWithCacheV1('a.txt', console.log);
console.log('after you');

//console output:
after you
hello
```

This inconsistency often leads to hidden bugs which are hard to track and debug. We can improve the solution to make it behave consistently.

```javascript
 let fs = require('fs'),
    path = require('path'),
    cache = {};

function readWithCacheV2(file, onsuccess, onfail) {
    if(cache[file]) {
        setTimeout(onsuccess.bind(null, cache[file]),0);
    } else {
       fs.readFile(path.join(__dirname, file), 'utf8', (err, data) => {
           if(err) {
               onfail(err);
           } else {
               cache[file] = data;
               onsuccess(data);
           }
       });
    }
}
```

Let's reexamine two use cases: 

* with cache available
```javascript
cache['a.txt'] = 'hello'; 
readWithCacheV2('a.txt', console.log);
console.log('after you');

//console output:
after you
hello
```

* without cache

```javascript
readWithCacheV2('a.txt', console.log);
console.log('after you');

//console output:
after you
hello
```

## Reference 

* [Effective JavaScript](https://www.amazon.com/Effective-JavaScript-Specific-Software-Development/dp/0321812182/ref=sr_1_3?s=books&ie=UTF8&qid=1521248523&sr=1-3&keywords=Effective+JavaScript)

## Code Sample

* [Effective JavaSript Sample Code](https://github.com/n0ruSh/the-art-of-reading/tree/master/javascript/Effective%20Javascript)

## Notice

* If you want to follow the latest news/articles for the series of reading notes, Please 「Watch」to Subscribe.