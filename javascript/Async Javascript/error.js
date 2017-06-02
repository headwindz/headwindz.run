try {
    setTimeout(() => {
        throw new Error('callback error'); 
    }, 0);
} catch (e) {
    console.error('caught callback error');
}
console.log('try-catch block ends');