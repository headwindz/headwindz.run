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

readAllV1(['a.txt', 'b.txt'], console.log, console.log); //结果不确定性