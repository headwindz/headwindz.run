# Use ESNext features without bundling tool

## type = module

All you need is `type=module` on the script element, and the browser will treat the inline or external script as an ECMAScript module.

```html
<script type=“module”>
  import {sum} from ‘./utils.js’;
  console.log(sum(2,3));
</script>
```

```javascript
// utils.js
export function sum(a, b) {
	return a + b;
}
```

## babel

One of the easiest ways to get babel working is to include a link to the Babel CDN directly in HTML, which will compile any code in script blocks that have  a type of `text/babel`. 

```html
<!doctype html>
<html>
<head>
  <title>Babel</title>
  <script src='https://unpkg.com/babel-standalone@6.26.0/babel.min.js'></script>
</head>

<body>
  <script type='text/babel'>
    async function f() {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve('hello world');
        }, 1000)
      });
      console.log(data);
    }

    f();
  </script>
</body>
</html>
```

## Reference

- [Learning React, 2nd Edition Book](https://www.oreilly.com/library/view/learning-react-2nd/9781492051718/)

## Notice

- If you want to follow the latest news/articles for the series of reading notes, Please [「Watch」](https://github.com/n0ruSh/the-art-of-reading)to Subscribe.