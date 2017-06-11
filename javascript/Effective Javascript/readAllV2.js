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