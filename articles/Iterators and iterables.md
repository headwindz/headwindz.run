> Iterators bring the concept of iteration directly into the javascript language and provide a mechanism for customizing the behavior of `for...of`/`spread operator` loops.

Iteration -> [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) -> [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)


# [Iterator Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)

To follow this protocol, the object must implement a `next` method which returns an `object` with keys `value` and `done`:

* `value`: the current item in iteration
* `done`: a boolean that represents whether the iteration is complete or not

[E.g.](https://codepen.io/n0rush/pen/Rzaamy?editors=0010)

```javascript
function PersonQuery() {
  const mike = { first: 'mike', last: 'zheng'};
  const pane = { first: 'pane', last: 'huang'};
  const john = { first: 'john', last: 'wood'};

  let nextPerson = mike;
  this.next = () => {
    const currentPerson = nextPerson;
    switch(currentPerson) {
      case mike:
        nextPerson = pane;
        break;
      case pane:
        nextPerson = john;
        break;
      default:
        nextPerson = null;
    }

    const done = currentPerson === null;
    return {
      ...(done ? {} : { value: currentPerson }),
      done
    }
  }
}

const personIterator = new PersonQuery();
console.log(personIterator.next()); // { "value": { "first": "mike", "last": "zheng" }, "done": false }
console.log(personIterator.next()); // { "value": { "first": "pane", "last": "huang" }, "done": false }
console.log(personIterator.next()); // { "done": true }
console.log(personIterator.next()); // { "done": true }}
```

# [Iterable Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)

An object becomes iterable if it has a method (own or inherited) whose key is `Symbol.iterator`. That method must return an `iterator`, an object that enumerates the items “inside” the iterable via its `next` method.

[E.g](https://codepen.io/n0rush/pen/NZNrPV?editors=0010)

```javascript
function PersonQuery() {

  const mike = { first: 'mike', last: 'zheng'};
  const pane = { first: 'pane', last: 'huang'};
  const john = { first: 'john', last: 'wood'};

  this[Symbol.iterator] = () => {
    let nextPerson = mike;
    const next = () => {
      const currentPerson = nextPerson;
      switch(currentPerson) {
        case mike:
          nextPerson = pane;
          break;
        case pane:
          nextPerson = john;
          break;
        default:
          nextPerson = null;
      }

      const done = currentPerson === null;
      return {
        ...(done ? {} : { value: currentPerson }),
        done
      }
    }
    // conform to iterator protocol
    return { next };
  }
}

for (const record of new PersonQuery()) {
  console.log(record)
}
```

# Use Cases

## Rest operator

[Example](https://codepen.io/n0rush/pen/NZNrNQ?editors=0010)

```javascript
const [firstPerson, ...rest] = new PersonQuery();
console.log(firstPerson, rest);
```

## Spread operator

[Example](https://codepen.io/n0rush/pen/JQXKKr?editors=0010)

```javascript
const numbers1 = [1, 2,3]
const combined = [...numbers1, ...new PersonQuery()];
```

## for...of

[Example](https://codepen.io/n0rush/pen/NZNrPV?editors=0010)

## [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

> The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.

[Example](https://codepen.io/n0rush/pen/ydOJbO)

```javascript
function* PersonQuery() {
  yield { first: 'mike', last: 'zheng'};
  yield { first: 'pane', last: 'huang'};
  yield { first: 'john', last: 'wood'};
}

const generatorObject = PersonQuery();
// generatorObject has `next` and [Symbol.iterator] that comform to both iterator and iterable protocol
console.log(generatorObject);

// iterator protocol
const genObj1 = PersonQuery();
console.log(generatorObject.next());
console.log(generatorObject.next());
console.log(generatorObject.next());

// iterable protocol
const genObj2 = PersonQuery();
const iterator = genObj2[Symbol.iterator]()
console.log(iterator === genObj2);
for(let item of genObj2) {
  console.log(item);
}
```

# Notice

- If you want to follow the latest news/articles for the series of reading notes, Please [「Watch」](https://github.com/n0ruSh/the-art-of-reading)to Subscribe