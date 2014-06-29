Portfolio site for Joel Kennedy
=================

**Contributors:** Grant Kiely, John Gesimondo

Build requirements
----
* SASS
* Compass
* Node & Gulp js

Installation

------------
**SASS:**

* If you are using windows, install ruby.
* gem install compass

```sh
cd /sass
compass watch
```
Sass files will be outputted as css in in css dir.

----------

**JS:**

* Concat and uglify js
```sh

cd joelfolio
npm install -g gulp
npm install gulp-concat
npm install gulp-uglify
cd /js
gulp concat
```

Useful examples & resources: 

* http://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/

* http://yeoman.io/blog/performance-optimization.html