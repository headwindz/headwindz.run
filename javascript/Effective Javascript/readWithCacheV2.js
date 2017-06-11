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