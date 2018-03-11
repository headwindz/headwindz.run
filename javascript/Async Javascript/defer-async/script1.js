let t1 = +new Date;
console.log('script1 is running at', t1);

console.log('script1 element', document.getElementById('load-experiment'));
while((+new Date) - t1 < 1000) {
    // delay 1 seconds
}
console.log('script1 finishes running at', +new Date);