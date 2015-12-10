# gulp-amd-idfy
[![Build Status](https://travis-ci.org/pferdinand/gulp-amd-idfy.svg?branch=master)](https://travis-ci.org/pferdinand/gulp-amd-idfy) [![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/gulp-amd-idfy)
> A gulp plugin to add identifier to AMD modules.

Use this plugin to give an identifier to your AMD modules when writing your own optimizer.

## Install
[Use npm](https://docs.npmjs.com/cli/install).

```
$ npm install --save-dev gulp-amd-idfy
```

## Usage
```javascript
var gulp = require('gulp');
var idfy = require('gulp-amd-idfy');
 
gulp.task('default', function () {
  return gulp.src('scripts/**/*.js')
    .pipe(idfy())
    .pipe(gulp.dest('dist'));
});
```

**Notes:**

* The module identifier depends on the file name and path.
* The plugin does not add an identifier if there is already one.
* The `define()` must be at the root of the javascript file, it cannot be enclosed in another function but it can be preceded by other functions, call, comments or directives such as `'use strict'`. 

### Examples
**Source files:**

```
├── gulpfile.js
└── scripts
    ├── a
    │   └── module2.js
    ├── b
    │   └── module3.js
    └── module1.js
```
**gulp task:**

```javascript
gulp.src('scripts/**/*.js')
  .pipe(idfy())
  .pipe(concat('all.js'))
  .pipe(gulp.dest('dist'));
```
**result:**

```
$ cat dist/all.js 
define("module1", function () {
  return 'module1';
});
define("a/module2", function () {
  return 'module2';
});
define("b/module3", function () {
  return 'module3';
});
```

## License

MIT © [Philippe FERDINAND](https://github.com/pferdinand)