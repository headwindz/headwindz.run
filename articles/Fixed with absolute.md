## A few concepts

* [offsetWidth](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth): gives you the width the element takes up in pixels.
* [offsetHeight](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight): gives you the height the element takes up in pixels.
* [clientWidth](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth): gives you the size of the space inside the element, ignoring border width.
* [clientHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight): gives you the size of the space inside the element, ignoring border height.
* [pageXOffset](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageXOffset): returns the number of pixels scrolled along the horizontal axis (left and right).
* [pageYOffset](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset): returns the number of pixels the document is currently scrolled along the vertical axis, with a value of 0.0 indicating that the top edge of the Document is currently aligned with the top edge of the window's content area.
* [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect): returns an object with top, bottom, left, and right properties, indicating the pixel positions of the sides of the element relative to the top left of the viewport. If you want them relative to the whole document, you must add the current scroll position, which you can find in the pageXOffset and pageYOffset bindings.
* [innerWidth](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight): width (in pixels) of the browser window viewport including, if rendered, the vertical scrollbar.
* [innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight): height (in pixels) of the browser window viewport including, if rendered, the horizontal scrollbar.
* [scrollWidth](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth): a measurement of the width of an element's content, including content not visible on the screen due to overflow.
* [scrollHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight): a measurement of the height of an element's content, including content not visible on the screen due to overflow.

## Practice

Let's put together the above concepts to achieve `fixed` position effect with `absolute` position, as well as scrolling progress functionality.

```html
// fixed.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Fixed</title>
    <style>
        body {
            margin: 0;
            position: relative;
            /* extend the body so that it can scroll to see the fixed effect */
            width: 2000px;
            height: 2000px;
        }
        #greet {
            width: 100px;
            height: 100px;
            line-height: 100px;
            padding: 5px;
            text-align: center;
            border: 2px solid green;
            position: absolute;
        }
        .progress {
            text-align: center;
            border: 1px solid black;
            /* fixed for progress as we only want to demonstrate the usage of scrollWidth and page offset for progress functionality */
            position: fixed;
            left: 50%;
            padding: 10px;
            /* center the progress info divs */
            transform: translateX(-50%);
        }
        #xprogress{
            top: 0;
        }
        #yprogress{
            top: 50px;
        }
    </style>
</head>
<body>
    <div id="greet"> Hello World </div>
    <div id="xprogress" class="progress">horizontal: 0</div>
    <div id="yprogress" class="progress">vertical: 0</div>
    <script>
        let node = document.querySelector('#greet');
        console.log(JSON.stringify({
            offsetWidth: node.offsetWidth, // 114 - with padding and border
            offsetHeight: node.offsetHeight, // 114 - with padding and border
            clientWidth: node.clientWidth, // 110 - with padding but without border
            clinetHeight: node.clientHeight, // 110 - with padding but without border
            innerWidth: innerWidth, // 1670, vary based on your setting
            innerHeight: innerHeight // 700, vary based on your setting
        }, null, '\t'));
        node.style.left = (innerWidth / 2 - node.offsetWidth / 2) + 'px';
        node.style.top = (innerHeight / 2 - node.offsetHeight / 2) + 'px';

        // for fixed div
        document.addEventListener('scroll', function() { // listen to scroll event, adjust the position based on the scroll infomation
            let rec = node.getBoundingClientRect();
            let {top, left, width, height} = rec; // top and left is based on viewport, need to take scroll offset into account
            console.log(JSON.stringify({
                width,
                height,
                top,
                left,
                pageYOffset,
                pageXOffset
            }, null, '\t'));
            node.style.left = (pageXOffset + innerWidth / 2 - width / 2) + 'px';
            node.style.top = (pageYOffset + innerHeight / 2 - height / 2) + 'px';
        });

        let yMax = document.body.scrollHeight - innerHeight;
        let xMax = document.body.scrollWidth - innerWidth;
        // for progress bar
        document.addEventListener('scroll', function () {
            let xProgress = document.querySelector('#xprogress');
            let yProgress = document.querySelector('#yprogress');

            xProgress.textContent = `horizontal: ${pageXOffset * 100/ xMax}%`;
            yProgress.textContent = `vertical: ${pageYOffset * 100 / yMax}%`;
        });
    </script>
</body>
</html>
```

[Code Sample](https://github.com/n0ruSh/the-art-of-reading/blob/master/javascript/Eloquent%20Javascript/fixed.html)

## Reference 

* [Eloquent JavaScript](https://www.amazon.com/Eloquent-JavaScript-2nd-Ed-Introduction/dp/1593275846)

## Notice

* If you want to follow the latest news/articles for the series of reading notes, Please [「Watch」](https://github.com/n0ruSh/the-art-of-reading)to Subscribe.