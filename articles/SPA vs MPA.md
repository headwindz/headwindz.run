## Single Page Application
A single-page application (SPA) is an app that works inside a browser and does not require page reloading during use. `The server should always return the same page with different paths and the routing is done on front end side, usually with a routing library like react-router`

* In development with webpack, when using the  [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History) , the `index.html` page will likely have to be served in place of any 404 responses. Enable devServer.historyApiFallback by setting it to true:
```web pack.config.js
module.exports = {
	entry: {
		‘app’: getPath(‘app’)
	}
	devServer: {
		...
		historyApiFallback: true
	}
}
```

* In production with nginx:

```nginx.conf

location / {
	root /home/dist;
	index index.html index.htm;
	try_files $uri $uri/ /index.html
}
```

## Multiple Page Application

Multiple-page applications work in a “traditional” way. It reloads the entire page whenever the user interacts with the website.

* In development with webpack:

```webpack.config.js

module.exports = {
	entry: {
    	'app': [getPath(‘app’)],
    	'doc': [getPath(‘doc’)]
	},
 	devServer: {
		historyApiFallback: {
			rewrites: [
        		{ from: /^\/doc/, to: 'doc.html' },
        		{ from: /./, to: 'app.html' }
			}
		}
    }
  }
}

```

* In production with nginx:

```nginx.conf

location /doc {
	root /home/dist/doc;
	index index.html index.htm;
	try_files $uri $uri/ /index.html
}

location /app {
	root /home/dist/app;
	index index.html index.htm;
	try_files $uri $uri/ /index.html
}
```

## Reference

- [React - The Complete Guide (incl. Hooks, React Router and Redux)](https://learning.oreilly.com/videos/react-the/9781789132229)

## Notice

- If you want to follow the latest news/articles for the series of reading notes, Please [「Watch」](https://github.com/n0ruSh/the-art-of-reading)to Subscribe.
