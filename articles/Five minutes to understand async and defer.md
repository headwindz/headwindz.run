## Script tag

When we want to insert a script into a web page, the standard way is to use the script tag(i.e. \<script\>). The first impression that comes to people's mind about script tag is -  __BLOCKING__ . 
The book [High Performance Web Sites](https://www.amazon.com/High-Performance-Web-Sites-Essential/dp/0596529309/ref=sr_1_1?s=books&ie=UTF8&qid=1521248657&sr=1-1&keywords=high+performance+websites) Rule 6 suggests to put scripts at the bottom of html body. The article will examine how putting scripts at varying positions affects performance and how *async* and *defer* attributes work for script tag.

First thing first, when a script is referenced in a html page, the browser does two things for you:

* Retrieve/Load the script content, this is NON-BLOCKING!
* Run the script content, this is BLOCKING !

Assume we have two scripts on the page: 

```javascript
//script1.js
let t1 = +new Date;
console.log('script1 is running at', t1);

console.log('script1 element', document.getElementById('load-experiment'));
while((+new Date) - t1 < 1000) {
    // delay 1 seconds
}
console.log('script1 finishes running at', +new Date);
```

```javascript
//script2.js
let t2 = +new Date;
console.log('script2 is running at', t2);

console.log('script2 element', document.getElementById('load-experiment'));
while((+new Date) - t2 < 2000) {
    // delay 2 seconds
}
console.log('script2 finishes running at', +new Date);
```

## Put script tags in head
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

The console output:

```
script1 is running at 1496747869008
script1.js:4 script1 element null
script1.js:8 script1 finishes running at 1496747870008
script2.js:2 script2 is running at 1496747870009
script2.js:4 script2 element null
script2.js:8 script2 finishes running at 1496747872009
```

Conclusion:

* When we open the html in the browser, we can notice the delay of page load. The page goes blank before it renders correctly. This is due to the fact that the running of the two scripts blocks the DOM rendering. 
* When scripts are running, they are not able to fetch the DOM element (i.e. document.getElementById('load-experiment') being null). This is because scripts are run before DOM is rendered.
* Scripts themselves are blocking each other. They are run in the order specified in the html. Script2 is run after script1 finishes running.

## Put script tags at the bottom of body

This is the suggestion from the Rule 6 of the book [High Performance Web Sites](https://www.amazon.com/High-Performance-Web-Sites-Essential/dp/0596529309/ref=sr_1_1?s=books&ie=UTF8&qid=1521248657&sr=1-1&keywords=high+performance+websites).

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

The console output:

```
script1 is running at 1496751597679
script1.js:4 script1 element <h1 id=​"load-experiment">​ hello world ​</h1>​
script1.js:8 script1 finishes running at 1496751598679
script2.js:2 script2 is running at 1496751598680
script2.js:4 script2 element <h1 id=​"load-experiment">​ hello world ​</h1>​
script2.js:8 script2 finishes running at 1496751600680
```

Conclusion:

* No page delay and blank page when opening the page in browser, as scripts are put/run after the DOM is ready.
* Scripts can correctly fetch DOM elements.
* Scripts themselves are blocking each other, as the same as the first example.

However, puting all scripts at the bottom of body sometimes doesn't fit in some specific real life cases. For example, if we aim to calculate the ATF[https://en.wikipedia.org/wiki/Above_the_fold] of a page, we can't simple wait for the DOM to render. We have to load and run some scripts beforehand and then fire the ATF marker when the ATF is ready, which is definitely before DOM is ready for web pages with scrolling content. Therefore, it seems reasonable to come out with the next solution.

## Put scripts seperately in head and body based on requirements.

Put scripts that needs pre-running at head and others at the bottom of body. E.g.

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

The main disadvantage of putting scripts at the bottom of body is that the scripts will only be retrieved/loaded after the DOM is rendered. As we said, retrieving/loading the script content is NON-BLOCKING while running the script content is the BLOCKING part. We can improve the web performance if we can retrieve/load the scripts while the DOM is rendering, rather than wait for the DOM to complete rendering. This works pretty well especially when the scripts are large. This is why *defer* is introduced. *defer* loads the scripts simultaneously but only runs the scripts after the DOM is ready.

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

The console output:

```
script1 is running at 1496760312686
script1.js:4 script1 element <h1 id=​"load-experiment">​ hello world ​</h1>​
script1.js:8 script1 finishes running at 1496760313686
script2.js:2 script2 is running at 1496760313686
script2.js:4 script2 element <h1 id=​"load-experiment">​ hello world ​</h1>​
script2.js:8 script2 finishes running at 1496760315686
```

Conclusion:

* The result is the same as putting scripts at the bottom of body. We can conclude from the result that the scripts are run after the DOM is ready as we can indeed fetch the DOM elements.
* Even the *defered* scripts follow the order rule specified in html, script1 is run after script2.

## async!

Web pages often contain some add-on features which are strictly independently and NOT must-to-have, such as the comment and chat functionalities on some pages. As the features are independent, they don't have the running order restriction. In this case, we can use *async*

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

We can observe different console outputs when we refresh the page: 

* The running order of script1 and script2 varies
* The result of fetching DOM element is inconsistent

As async scripts don't guarantee the running order, this is often the source of potential hidden bugs. Have a second thought before using async and mare sure these scripts are strictly independent.

## Conclusion

The general rule to import script is: 

```html
<html> 
    <head> 
        <!--headScripts.js is the script that has to be loaded and run before DOM is ready-->
        <script src="headScripts.js"></scripts> 
        <!--bodyScripts.js loads first and runs after DOM is ready-->
        <script defer src="bodyScripts.js"></script> 
    </head> 
    <body>
        <!--body content-->
        <h1 id='load-experiment'> hello world </h1>
        <!--independent scripts，nice-to-have -->
        <script async src="forumWidget.js"></script>
        <script async src="chatWidget.js"></script>
    </body>
</html>
```

[Code Sample](https://github.com/n0ruSh/the-art-of-reading/tree/master/javascript/Async%20Javascript/defer-async)


## Reference

* [Async JavaScript](https://www.amazon.com/Async-JavaScript-Responsive-Pragmatic-Express-ebook/dp/B00AKM4RVG)

* [High Performance Web Sites](https://www.amazon.com/High-Performance-Web-Sites-Essential/dp/0596529309/ref=sr_1_1?s=books&ie=UTF8&qid=1521248657&sr=1-1&keywords=high+performance+websites)

## Notice

* If you want to follow the latest news/articles for the series of reading notes, Please [「Watch」](https://github.com/n0ruSh/the-art-of-reading)to Subscribe.