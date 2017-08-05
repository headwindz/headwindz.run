# Date

## 获取某月的天数

下一月的第0天就是当前月的最后一天。
```javascript
function daysInMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}

// 注意在JS里月份是从0开始算的。下面算的是2017年3月份有多少天
console.log(daysInMonth(2017, 2)); // 31 
// 2017年2月有多少天
console.log(daysInMonth(2017, 1)); // 28
// 2016年2月有多少天
console.log(daysInMonth(2016, 1)); // 29
```

## [Date.prototype.getTimezoneOffset](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) - 获取当地时间跟UTC时区的时间差，以分钟为单位。

```javascript
let now = new Date(); 
console.log(now.toISOString()); //2017-08-05T13:16:35.363Z
//中国是东八区，北京时间是（GMT+08:00）
console.log(now.getTimezoneOffset()); // -480
//将本地时间换算成格林威治时间／零时区
let GMTDate = new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000);
console.log(GMTDate.toISOString()); //2017-08-05T05:16:35.363Z
//将本地时间换算成东3区时间
let eastZone2Date = new Date(GMTDate.getTime() + 3 * 60 * 60 * 1000);
console.log(eastZone2Date.toISOString()); //2017-08-05T08:20:55.235Z
```

# JSON

##  [JSON.stringify(value[, replacer[, space]])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

### replacer是个函数的情况 - 在stringify前对值进行操作
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

### replacer是个数组的情况 - 对key值进行白名单过滤

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

### space可以用来对输出进行格式优化

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

## Reference 

* [Speaking Javascript](https://github.com/n0ruSh/the-art-of-reading/blob/master/javascript/Speaking%20JavaScript/Speaking%20JavaScript.pdf)
* [MDN](https://developer.mozilla.org/en-US/)


## Notice

* 如果您觉得该[Repo](https://github.com/n0ruSh/the-art-of-reading/)让您有所收获，请「Star 」支持楼主。
* 如果您想持续关注楼主的最新系列文章，请「Watch」订阅