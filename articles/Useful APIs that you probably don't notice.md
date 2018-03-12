# Date

## Get the number of days in a month 

The 0th day of next month is the last day of the current month.
```javascript
function daysInMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}

/**
 * Note that JS Date month starts with 0
 * The following computes how many days in March 2017
 */
console.log(daysInMonth(2017, 2)); // 31 
// how many days in Feb 2017
console.log(daysInMonth(2017, 1)); // 28
// how many days in Feb 2016
console.log(daysInMonth(2016, 1)); // 29
```

## [getTimezoneOffset](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) - get the time zone difference, in minutes, from current locale (host system settings) to UTC.

```javascript
let now = new Date(); 
console.log(now.toISOString()); //2018-03-12T01:12:29.566Z
// China is UTC+08:00
console.log(now.getTimezoneOffset()); // -480
// convert to UTC 
let UTCDate = new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000);
console.log(UTCDate.toISOString()); //2018-03-11T17:12:29.566Z
//convert to UTC+03:00
let eastZone3Date = new Date(UTCDate.getTime() + 3 * 60 * 60 * 1000);
console.log(eastZone3Date.toISOString()); //2018-03-11T20:12:29.566Z
```

# JSON

##  [JSON.stringify(value[, replacer[, space]])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

### When *replacer* is a function - apply *replacer* before stringify the value.
```javascript
JSON.stringify({
    a: 4,
    b: [3, 5, 'hello'],
}, (key, val) => {
    if(typeof val === 'number') {
        return val * 2;
    }
    return val;
}); //{"a":8,"b":[6,10,"hello"]}
```

### when *replacer* is an array - use *replacer* as a white list to filter the keys

```javascript
JSON.stringify({
    a: 4,
    b: {
        a: 5,
        d: 6
    },
    c: 8
}, ['a', 'b']); //{"a":4,"b":{"a":5}}
```

### *space* can be used to beautify the output

```javascript
JSON.stringify({
    a: [3,4,5],
    b: 'hello'
}, null, '|--\t');
/**结果:
{
|--	"a": [
|--	|--	3,
|--	|--	4,
|--	|--	5
|--	],
|--	"b": "hello"
}
*/
```

# String

##  [String.prototype.split([separator[, limit]])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)

###
```javascript
''.split('') // []
```

### separator can be a regular expression!
```javascript
'abc1def2ghi'.split(/\d/);  //["abc", "def", "ghi"]
```

If the seperator is a regular expression that contains capturing groups, the capturing groups will appear in the result as well.
```javascript
'abc1def2ghi'.split(/(\d)/);  // ["abc", "1", "def", "2", "ghi"]
```

##  [Tagged  string literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

```javascript
let person = 'Mike';
let age = 28;

function myTag(strings, personExp, ageExp) {
  let str0 = strings[0]; // "that "
  let str1 = strings[1]; // " is a "

  // There is technically a string after
  // the final expression (in our example),
  // but it is empty (""), so disregard.
  // var str2 = strings[2];

  let ageStr;
  if (ageExp > 99){
    ageStr = 'centenarian';
  } else {
    ageStr = 'youngster';
  }

  return str0 + personExp + str1 + ageStr;
}

let output = myTag`that ${ person } is a ${ age }`;
console.log(output);
// that Mike is a youngster
```

# null vs undefined

If we don't want to distinguish null and undefined, we can use *==*

```javascript
undefined == undefined //true
null == undefined // true
0 == undefined // false
'' == undefined // false
false == undefined // false
```

Don't simply use *==* to check for the existence of a global variable as it will throw *ReferenceError*. Use *typeof* instead.

```javascript
// a is not defiend under global scope
a == null // ReferenceError
typeof a // 'undefined'
```

# Spread Operator(...)

spread operator works for objects!
```javascript
const point2D = {x: 1, y: 2};
const point3D = {...point2D, z: 3};
```

## Reference 

* [Speaking Javascript](https://github.com/n0ruSh/the-art-of-reading/blob/master/javascript/Speaking%20JavaScript/Speaking%20JavaScript.pdf)
* [MDN](https://developer.mozilla.org/en-US/)


## Notice

* If you want to follow the latest news/articles for the series of reading notes, Please 「Watch」to Subscribe.