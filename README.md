# node-xbrowsertesting

[![Travis CI](https://img.shields.io/travis-ci/jeremyworboys/node-xbrowsertesting.png)](https://travis-ci.org/jeremyworboys/node-xbrowsertesting)
[![Gittip](https://img.shields.io/gittip/jeremyworboys.png)](https://www.gittip.com/jeremyworboys/)

Node client for accessing the http://crossbrowsertesting.com API

## Installation

    $ npm install xbrowsertesting

## Usage

```js
var xBrowserTesting = require('xbrowsertesting');

var client = xBrowserTesting.createClient({
    username: "myusername",
    password: "securepassword"
});

var config = {};

client.listScreenshotBrowsers(config, function(err, data) {
    if (err) throw err;
    console.log(data);
});
```

## Running Tests

You need to have the [Grunt](http://gruntjs.com/) binary installed.

    $ npm install -g grunt-cli

Then install deps and run the test suit.

    $ npm install
    $ grunt test

## License

The MIT License (MIT)

Copyright (c) 2014 Jeremy Worboys &lt;jw@jeremyworboys.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
