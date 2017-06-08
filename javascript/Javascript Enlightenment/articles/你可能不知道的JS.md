最近读了[Javascript Enlightenment](https://github.com/n0ruSh/the-art-of-reading/blob/master/javascript/Javascript%20Enlightenment/JavaScript%20Enlightenment.pdf)。整体感觉还是比较基础的。这里记录跟扩展下其中一些知识点。

## Math
JS里有个不成文的规定，构造函数首字母大写。所以可能容易让人产生误解Math是构造函数。其实Math只是一个简单的封装了很多数学相关方法的对象。

```javascript
console.log(typeof Math); //"object"
console.log(typeof Array); //"function"
```

## Function

构造一个函数实例有2种方法：

* 函数声明

```javascript
function sum(x, y) {
    return x + y;
}
console.log(sum(3,4)); //7
```

* 通过构造函数

```javascript
let multiply = new Function("x", "y", "return x * y;");
console.log(multiply(3,4)); //12
```

工作中经常会有需要用到call或者apply来切换函数执行上下文的情况。例如:

```javascript
function print(){
    console.log(this.a);
}

print.call({a: 'hello'}); //hello
```

有些面试题可能会问为啥print上没有定义call方法，但是print.call()调用为啥不会报错。其实是因为print是Function的一个实例化对象，call方法定义在Function.prototype上，通过原型链查找到的call方法。

## 数组判断

typeof可以用来判断基础类型，无法用typeof区分数组跟对象。

```javascript
console.log(typeof [1,2]); //object
console.log(typeof {}); //object
```

可以有下面2种常见的方法区分数组:

* 原生API: Array.isArray

```javascript
console.log(Array.isArray([1,2])); //true
```

* toString

```javascript
console.log(Object.prototype.toString.call([1,2])
            .toLowerCase() === '[object array]'); //true
```

这里注意下，我们使用了toString方法，然后用call方法切换toString调用时的上下文为我们要进行判断的数组。所以有些人会误以为Object.prototype.toString.call([1,2])跟 [1,2].toString()是等价的。其实不然:

```javascript
console.log(Object.prototype.toString.call([1,2])); //[object Array]
console.log([1,2].toString()); //1,2
```
这是因为原型链查找有个就近原则。所以当使用[1,2].toString的时候，查找到并被使用的是Array.prototype.toString，这个方法覆盖了Object.prototype.toString。

## delete 操作符
delete只会删除自身属性。不会删除原型链上的属性。

```javascript
let obj = {a: 'self'};
Object.prototype.a = 'prototype';
console.log(obj.a); //self
delete obj.a;
console.log(obj.a); //prototype
delete Object.prototype.a;
console.log(obj.a); //undefined
```

## 全局对象
访问全局对象有2种方法:

* 变量方法: 浏览器里用window, Node里用global
* 在全局作用域里使用 this

当我们访问一个变量的时候会形成一个作用域链。作用域的顶端就是全局变量(i.e. 全局对象下的对应变量)。相对应的我们也有[全局函数和全局属性](http://www.w3school.com.cn/jsref/jsref_obj_global.asp)。曾经有一段代码坑了我下：

```javacript
console.log(hasOwnProperty); //ƒ hasOwnProperty() { [native code] }
```
刚开始我以为输出应该是undefined因为印象中hasOwnProperty并非是全局函数。通过下面的例子大家可以想下为什么hasOwnProperty不是全局函数但是上面的输出不是undefined ~

```javascript
Object.prototype.hasOwnProperty.call(window, 'encodeURI'); // true
'hasOwnProperty' in window //true
Object.prototype.hasOwnProperty.call(window, 'hasOwnProperty'); // false
```

## undefined vs null
undefined代表没值。有2种情况可能出现没值。

* 定义了变量但是未赋值

```javascript
let s;
console.log(s); //undefined
```

* 未定义

```javascript
let obj1 = {};
console.log(obj1.a); //undefined
```

null表示有值，null是这个特殊的值。

```javascript
let obj2 = {a: null};
console.log(obj2.a); //null
```

如果需要同时过滤undefined跟null的话，可以使用弱等于检查。

```javascript
console.log(null == undefined); //true
let arr = [null, undefined, 1];
let fil = arr.filter(it => {
    return it != null;
});
console.log(fil); //[1]
```

另外undefined其实也是个全局变量, 但是null确不是。null也不挂载在window下。那么null是哪来的呢？
```
window.hasOwnProperty('undefined'); //true
window.hasOwnProperty('null'); //false
window.null //undefined
```

## Notice

* 如果您觉得该[Repo](https://github.com/n0ruSh/the-art-of-reading/)让您有所收获，请点击右上角的「Star 」支持楼主。
* 如果您想持续关注楼主的最新系列文章，请点击右上角的「Watch」订阅