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