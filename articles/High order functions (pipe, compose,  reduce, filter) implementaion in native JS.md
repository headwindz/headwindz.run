## compose

> f . g = f(g(x))  

```javascript
const compose = (...fns) => {
	if (fns.length === 1) {
		return fns[0];
	}
	const lastFn = fns[fns.length - 1];
	const restFns = fns.slice(1);
	return (...args) => {
		return restFns.reduceRight((result, fn) => {
			return fn(result)
		}, lastFn(...args))
	}
}

const double = x => x * 2;
const plus5 = x => x + 5;

const doubleAndPlus5 = compose(plus5, double);
console.log(doubleAndPlus5(2)); // 2 * 2 + 5 => 9
```

## pipe

> f . g = g(f(x))  

```javascript
const pipe = (fn, ...restFns) => {
	if (restFns.length === 0) {
		return fn;
	}
	return (...args) => {
		return restFns.reduce((result, nextFn) => {
			return nextFn(result)
		}, fn(...args))
	}
}

const double = x => x * 2;
const plus5 = x => x + 5;

const plus5AndDouble = pipe(plus5, double);
console.log(plus5AndDouble(2)); // (2 + 5) * 2 = 14
```

## array filter

```javascript
const filter = (arr, predicate) => {
	if(arr.length === 0) {
		return arr;
	}
	const [element, ...restArr] = arr;
	return predicate(element) ? [
		element,
		...(filter(restArr, predicate))
	] : filter(restArr, predicate)	
}

const lessThan5 = x => x < 5;

const arr = [1,10, 6, 4];

console.log(filter(arr, lessThan5)); // [1,4]
```

## array reduce

```javascript
const reduce = (arr, reducer, accumulator) => {
	if(arr.length === 0) {
		return accumulator;
	}

	const [ element, ...restArr ] = arr;
	return reduce(
		restArr,
		reducer,
		reducer(accumulator, element)
	)
}

const sum = (a, b) => a + b;

console.log(reduce(
	[1,2,3,4],
	sum,
	0
))
```


## Reference

- [Deep Dive into Functional JavaScript](https://www.udemy.com/course/deep-dive-into-functional-javascript)

## Notice

- If you want to follow the latest news/articles for the series of reading notes, Please [「Watch」](https://github.com/n0ruSh/the-art-of-reading)to Subscribe
