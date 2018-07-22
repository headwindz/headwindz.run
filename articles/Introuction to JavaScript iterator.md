## [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

ES6 introcues a new type called _symbol_. The _Symbol_ function returns a value of type _symbol_.

```javascript
const symbol1 = Symbol();
const symbol2 = Symbol("hi");

console.log(typeof symbol1); //symbol

console.log(symbol3.toString()); //Symbol(foo)

// each symbol value created by Symbol function is unique
console.log(Symbol("foo") === Symbol("foo")); // false

// Symbol itself is a function
console.log(typeof Symbol); //function
```

## [Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

An _iterator_ is an object that provides a _next_ method which returns the next item in the sequence. This method returns an object with two properties: _done_ and _value_. For an object to be _iterable_, it must have a function property with a _Symbol.iterator_ key, which returns a new _iterator_ for each call.

```javascript
// Array has build-in iteration support
function forOf(arr) {
  for (let i of arr) {
    console.log(i);
  }
}

/**
 * for...of loops is based on iterator
 * so forOf implementation above is basically:
 */
function iterating(arr) {
  let iterator = arr[Symbol.iterator](); //get the iterator for the array
  let next = iterator.next();
  while (!next.done) {
    console.log(next.value);
    next = iterator.next();
  }
}
```

## Make _Object_ iterable

_Object_ doesn't have build-in iteration support.

```javascript
let obj = { a: "b", c: "d" };
for (let i of obj) {
  //Uncaught TypeError: obj is not iterable
  console.log(i);
}
```

To make _Object_ iterable, we have to add _Symbol.iterator_, either to the instance or the prototype.

```javascript
Object.defineProperty(Object.prototype, Symbol.iterator, {
  value: function() {
    let keys = Object.keys(this);
    let index = 0;
    return {
      next: () => {
        let key = keys[index++];
        return {
          value: `${key}-${this[key]}`,
          done: index > keys.length
        };
      }
    };
  },
  enumerable: false
});

let obj = { a: "b", c: "d" };
for (let i of obj) {
  console.log(i); // a-b c-d
}
```

## [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

The function* declaration defines a *generator function*, whose return value is *generator object*. The *generator object* conforms to the *iterator protocol*. Note *generator function\* itself is a function.

```javascript
//generator function
function* generatorFn() {
  yield 1;
  return 2;
}

// generator object - iterator
let generatorObj = generatorFn();
let nextItem = generatorObj.next();

console.log(typeof generatorFn); //function
console.log(typeof generatorObj); //object
console.log(typeof generatorObj.next); //function
console.log(nextItem); //{value: 1, done: false}
```

Therefore, to make _Object_ iterable, we can define its _Symbol.iterator_ with _generator function_.

```javascript
Object.defineProperty(Object.prototype, Symbol.iterator, {
  value: function*() {
    let keys = Object.keys(this);
    for (let key of keys) {
      yield `${key}-${this[key]}`;
    }
  },
  enumerable: false
});

let obj = { a: "b", c: "d" };
for (let kv of obj) {
  console.log(kv); // a-b c-d
}
```

## In practice

With the technique in hand, we can make custom datatypes iterable.

```javascript
class Group {
  constructor() {
    this._data = [];
  }

  add(it) {
    this._data.push(it);
  }

  delete(it) {
    let index = this._data.indexOf(it);
    if (index >= 0) {
      this._data.splice(index, 1);
    }
  }

  has(it) {
    return this._data.includes(it);
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this._data[index++],
        done: index > this._data.length
      })
    };
  }

  static from(iterable) {
    let group = new Group();
    for (let item of iterable) {
      group.add(item);
    }
    return group;
  }
}

let group = Group.from(["a", "b", "c"]);
console.log(group);

for (let value of group) {
  console.log(value);
}

console.log([...group]);
```

## Reference

- [Eloquent JavaScript](https://www.amazon.com/Eloquent-JavaScript-2nd-Ed-Introduction/dp/1593275846)

## Notice

- If you want to follow the latest news/articles for the series of reading notes, Please [「Watch」](https://github.com/n0ruSh/the-art-of-reading)to Subscribe.
