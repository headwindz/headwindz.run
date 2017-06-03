class Emitter {
    constructor(){
        this.handlers = {};
    }
    
    on(evt, handler) {
        this.handlers[evt] = this.handlers[evt] || [];
        let hdl = this.handlers[evt];
        hdl.push(handler);
        return this;
    }

    removeListener(evt, handler) {
        this.handlers[evt] = this.handlers[evt] || [];
        let hdl = this.handlers[evt];
        let index = hdl.indexOf(handler);
        if(index >= 0) {
            hdl.splice(index, 1);
        }
        return this;
    }

    once(evt, handler) {
        this.handlers[evt] = this.handlers[evt] || [];
        let hdl = this.handlers[evt];
        hdl.push(function f(...args){
            handler.apply(this, args);
            this.removeListener(evt, f);
        });
        return this;
    }

    emit(evt, ...args) {
        this.handlers[evt] = this.handlers[evt] || [];
        let hdl = this.handlers[evt];
        hdl.forEach((it) => {
            it.apply(this, args);
        });
        return this;
    }

    listeners(evt) {
        return this.handlers[evt] || [];
    }

    listenerCount(evt) {
        return this.listeners(evt).length;
    }

    eventNames() {
        return Object.keys(this.handlers).reduce((arr, evt) => {
            if(this.listenerCount(evt)) {
                arr.push(evt);
            }
            return arr;
        }, []);
    }
}

//Simple Tests
let server = new Emitter();

server.on('connection', (info) => {
    console.log(`server connected`, info)
});

server.emit('connection', {host: '127.0.0.1'}); //server connected { host: '127.0.0.1' }
server.emit('connection', {host: '128.0.0.1'}); //server connected { host: '128.0.0.1' }

server.once('stop', (info) => {
    console.log(`server stopped`, info)
});

console.log(server.eventNames()); //[ 'connection', 'stop' ]

server.emit('stop', {host: '127.0.0.1'}); //server stopped { host: '127.0.0.1' }
server.emit('stop', {host: '128.0.0.1'}); //注意。这里不打印东西

console.log(server.eventNames()); //[ 'connection' ]

server.on('request', (req) => {
    console.log(`request log`, `request comming from req`)
});

server.on('request', () => {
    console.log(`request parse`, `parse request`)
});
console.log(server.eventNames()); //[ 'connection', 'request' ]
console.log(server.listeners('request')); //[ [Function], [Function] ]
console.log(server.listenerCount('request')); //2
