let fs = require('fs'),
    path = require('path');

function readOne(files, cb) {
    function next(index) {
        let fileName = files[index];
        fs.readFile(path.join(__dirname, fileName), 'utf8', (err, data) => {
            if(err) {
                return next(index + 1);
            } else {
                return cb(data);
            }
        });
    }
    next(0);
}

readOne(['a.txt', 'b.txt'], console.log); //a.txt
readOne(['filenotexist', 'b.txt'], console.log); //b.txt