# String - Character set
In the Unicode character set, every character is represented by a base 10 decimal number called a code point. A code unit is a fixed number of bits in memory to represent a code point. An encoding schema determines the length of code unit. A code unit is 8 bits if the UTF-8 encoding schema is used or 16 bits if the UTF-16 encoding schema is used. If a code point doesn't fit in a code unit, it is split into multiple code units, that is, multiple characters in a sequence representing a single character. JavaScript strings are always a sequence of UTF-16 code points. Any Unicode character with a code point less than 65,536 can be escaped in a JavaScript string or source code using the hexadecimal value of its code point, prefixed with \u. 

```javascript
const \u0061 = "\u0061\u0062\u0063";
console.log(a); // abc

const you = '你';
console.log(you.charCodeAt(0)); // 20320
console.log(you.codePointAt(0)); // 20320

const emoj = '💯';
console.log(emoj.codePointAt(0)); // 128175
console.log(emoj.charCodeAt(0)); //55357
console.log(emoj.charCodeAt(1)); // 56495
console.log(emoj.length); //2

```

# [Array.from(arrayLike\[, mapFn\[, thisArg\]\])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

Creates a new, shallow-copied Array instance from an array-like or iterable object.

```javascript
Array.from([1, 2, 3], x => x + x); // [2, 4, 6]
```

# [Page Visibility](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)

The Page Visibility API allows developers to run specific code whenever the page user goes in focus or out of foucs.

```javascript

function pageChanged() {
  if (document.hidden) {
    console.log('blur')
  } else {
    console.log('focus')
  }
}

document.addEventListener("visibilitychange", pageChanged);
```

# [Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

Related concepts:

* [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)
* [setSelectionRange](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)

```javascript
<script>
  function copy2Clipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.setSelectionRange(0, text.length);
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
</script>
```

# [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Related concepts:

* [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
* [Blob - Binary Large Object](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
* [URL.createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)

```javascript
const getImages = async () => {
  const image = await fetch('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_150x54dp.png');
  console.log(image); // gives us response as an object
  const blob = await image.blob();
  
  const url = URL.createObjectURL(blob);
  let imgElement = document.createElement('img');
  imgElement.src = url;
  document.body.appendChild(imgElement);
}
```

# [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

```javascript

// mainscript.js
const awesomeworker = new Worker('worker.js'); // load worker.js and execute
awesomeworker.addEventListener('message', e => {
  if(e.data.task == "add") { 
    // task completed. do something with result
    document.write(e.data.result);
  }
});

const data = {task: "add", nums: [5, 10, 15, 20]};
// send data to worker
awesomeworker.postMessage(data);

// worker.js
self.addEventListener('message', e => {
    if(e.data.task == "add") {
      const res = e.data.nums.reduce((sum, num) => sum+num, 0);
      postMessage({task: "add", result: res}); // self.postMessage will also work
    }
});
```

## Reference

- [Learn ECMAScript](https://www.amazon.com/dp/1788620062)

## Notice

- If you want to follow the latest news/articles for the series of reading notes, Please [「Watch」](https://github.com/n0ruSh/the-art-of-reading)to Subscribe.
