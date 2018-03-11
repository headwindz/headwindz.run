let t2 = +new Date;
console.log('script2 is running at', t2);

console.log('script2 element', document.getElementById('load-experiment'));
while((+new Date) - t2 < 2000) {
    // delay 2 seconds
}
console.log('script2 finishes running at', +new Date);