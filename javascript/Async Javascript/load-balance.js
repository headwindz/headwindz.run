let http = require('http'),
    cluster = require('cluster');

const NUM_OF_SERVERS = 3;

if(cluster.isMaster) {
    for(let i = 0; i < NUM_OF_SERVERS; i++) {
        cluster.fork();
    }
} else {
    http.createServer((req, res) => {
        res.end(`hello world from pid ${process.pid}`);
    }).listen(9999);
    console.log(`Worker ${process.pid} started`);
}