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
    throw new Error('all fail');
}

console.log(readOneSync(['a.txt', 'b.txt'])); //a.txt
console.log(readOneSync(['filenotexist', 'b.txt'])); //b.txt