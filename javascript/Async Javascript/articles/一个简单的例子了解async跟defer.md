## script标签

当我们要在页面当中引入脚本的时候，一般用的是script标签(i.e. \<script\>)。很多人对script标签的第一印象就是- __阻塞__。在[High Performance Web Sites](https://github.com/n0ruSh/the-art-of-reading/blob/master/performance/High%20Performance%20Web%20Sites/High%20Performance%20Web%20Sites.pdf) 雅虎军规第6条中也提到尽量把script脚本放在body尾部。通过一个小例子我们看看script放在不同位置所产生的不同效果最后得出一丢丢优化结论。

首先明确一点，当在html页面里引入script时，浏览器做了2件事情：

* 获取／加载脚本内容，这部分不会阻塞！
* 运行获取的脚本内容，会阻塞！

假设我们有2个脚本:

```javascript
//script1.js
let t1 = +new Date;
console.log('script1 is loading at', t1);

console.log('script1 element', document.getElementById('load-experiment'));
while((+new Date) - t1 < 1000) {
    // delay 1 seconds
}
console.log('script1 finishes loading at', +new Date);
```

```javascript
//script2.js
let t2 = +new Date;
console.log('script2 is loading at', t2);

console.log('script2 element', document.getElementById('load-experiment'));
while((+new Date) - t2 < 2000) {
    // delay 2 seconds
}
console.log('script2 finishes loading at', +new Date);
```

## 把script标签都放head里
```html
<!--all-in-head.html-->
<html>
    <head>
        <title> test js tag async and defer attributes</title>
        <script src='./script1.js'></script>
        <script src='./script2.js'></script>
    </head>
    <body>
        <h1 id='load-experiment'> hello world </h1>
    </body>
</html>

```
console里的输出为:

```
script1 is loading at 1496747869008
script1.js:4 script1 element null
script1.js:8 script1 finishes loading at 1496747870008
script2.js:2 script2 is loading at 1496747870009
script2.js:4 script2 element null
script2.js:8 script2 finishes loading at 1496747872009
```

发现:

* 用浏览器打开这个html会发现有明显的空白时间。这是因为script1跟script2的 __执行__ 阻塞了DOM的加载。
* script脚本执行的时候并不能获取DOM元素(getElementById返回null)。验证了上一条
* script之间也是相互阻塞的。script2是等script1执行好后才执行。

## 把script标签都放body尾部

这也是雅虎军规[High Performance Web Sites](https://github.com/n0ruSh/the-art-of-reading/blob/master/performance/High%20Performance%20Web%20Sites.pdf)第6条里的建议。

```html
<!--all-in-body.html-->
<html>
    <head>
        <title> test js tag async and defer attributes</title>
    </head>
    <body>
        <h1 id='load-experiment'> hello world </h1>
        <script src='./script1.js'></script>
        <script src='./script2.js'></script>
    </body>
</html>
```

console里的输出为:

```
script1 is loading at 1496751597679
script1.js:4 script1 element <h1 id=​"load-experiment">​ hello world ​</h1>​
script1.js:8 script1 finishes loading at 1496751598679
script2.js:2 script2 is loading at 1496751598680
script2.js:4 script2 element <h1 id=​"load-experiment">​ hello world ​</h1>​
script2.js:8 script2 finishes loading at 1496751600680
```

发现:

* 用浏览器打开这个html不会有明显的空白时间。这是因为script1跟script2的发生在DOM加载后。
* script脚本执行的时候能获取DOM元素(getElementById返回节点)。验证了上一条
* script之间是相互阻塞的。script2是等script1执行好后才执行。

把所有的script脚本放body尾部的情况过于理想化了。例如body里有些内联JS需要引用到的功能代码就需要放head里提前运行好。最常见的例子就是计算首屏加载时间(Above The Fold)，首屏加载时间肯定是不能等DOM加载完。这时候一般是在head里加载功能库并触发首屏加载开始计时，然后在首屏的末尾处用内联JS触发首屏加载结束计时。这时候就需要有些代码是在head里的。

## script标签相应地放head跟body里

根据需要把script脚本相应地放在head跟body里。这是最常见的情况。

```javascript
<html> 
    <head> 
        <script src="headScripts.js"></scripts> 
    </head> 
    <body>
        <h1 id='load-experiment'> hello world </h1>
        <script src="bodyScripts.js"></script> 
    </body>
</html>
```

## defer!

把script放body尾的话有个缺点就是要等DOM加载好了才会去加载并执行script脚本。前面开头的时候说过获取／加载脚本内容不会阻塞，只有运行脚本内容的时候才会阻塞！如果能在加载DOM的同时加载script脚本，等到DOM解析好了再运行脚本，这样就可以节省部分加载脚本的时间。当脚本比较大时提高的效率会很可观。于是就有了script标签里的defer属性: 并行加载该脚本，直到DOM解析完了并且它前面含有defer的脚本都运行完后，才可以运行该脚本。

```html
<!--defer.html-->
<html>
    <head>
        <title> test js tag async and defer attributes</title>
        <script defer src='./script1.js'></script>
        <script defer src='./script2.js'></script>
    </head>
    <body>
        <h1 id='load-experiment'> hello world </h1>
    </body>
</html>
```

console里的输出为:

```
script1 is loading at 1496760312686
script1.js:4 script1 element <h1 id=​"load-experiment">​ hello world ​</h1>​
script1.js:8 script1 finishes loading at 1496760313686
script2.js:2 script2 is loading at 1496760313686
script2.js:4 script2 element <h1 id=​"load-experiment">​ hello world ​</h1>​
script2.js:8 script2 finishes loading at 1496760315686
```

发现:

* 跟把script放body的情况输出一样。从可以获取到DOM元素可以看出它会等到DOM解析好再运行。
* 添加了defer属性的脚本是会按顺序运行的。script1先于script2运行。

## async!

通常页面上会有些附加功能组件。这种组件相互独立并且不是该页面必需组件。也就是说该种脚本无运行顺序要求（因为独立）并且就算加载或者运行失败也不会对页面造成致命影响的。例如页面上的评论功能跟聊天功能。

```
<!--async.html-->
<html>
    <head>
        <title> test js tag async and defer attributes</title>
    </head>
    <body>
        <h1 id='load-experiment'> hello world </h1>
        <script async src='./script1.js'></script>
        <script async src='./script2.js'></script>
    </body>
</html>
```

多次刷新页面可以看到每次输出结果不一样。体现在：

* scrip1跟script2的执行顺序在变
* 获取DOM元素的结果在变。有时能获取到有时获取不到

页面上加了async的脚本无法保证其运行顺序，这通常也是隐藏bug的来源。除非你确定该脚本跟页面其他脚本无依赖关系，不然慎用async吧。

## 总结

综上所述，最后引入脚本的形式大概是这样滴：

```html
<html> 
    <head> 
        <!--headScripts.js为必须在DOM解析前加载并执行的脚本-->
        <script src="headScripts.js"></scripts> 
        <!--bodyScripts.js加个defer,先加载。等DOM解析好了再执行-->
        <script defer src="bodyScripts.js"></script> 
    </head> 
    <body>
        <!--body内容-->
        <h1 id='load-experiment'> hello world </h1>
        <!--独立的组件，不依赖DOM, 锦上添花型的，可用async-->
        <script async src="forumWidget.js"></script>
        <script async src="chatWidget.js"></script>
    </body>
</html>
```

[代码示例](https://github.com/n0ruSh/the-art-of-reading/tree/master/javascript/Async%20Javascript/defer-async)


## Reference

* [Async Javascript](https://github.com/n0ruSh/the-art-of-reading/blob/master/javascript/Async%20Javascript/Async%20JavaScript.pdf)

* [High Performance Web Sites](https://github.com/n0ruSh/the-art-of-reading/blob/master/performance/High%20Performance%20Web%20Sites/High%20Performance%20Web%20Sites.pdf)

## Notice

* 如果您觉得该[Repo](https://github.com/n0ruSh/the-art-of-reading/)让您有所收获，请点击右上角的「Star 」支持楼主。
* 如果您想持续关注楼主的最新系列文章，请点击右上角的「Watch」订阅