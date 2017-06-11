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