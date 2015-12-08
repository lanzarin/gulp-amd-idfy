# gulp-amd-idfy
[![Build Status](https://travis-ci.org/pferdinand/gulp-amd-idfy.svg?branch=master)](https://travis-ci.org/pferdinand/gulp-amd-idfy)
> A gulp plugin to add identifier to AMD modules.

Use this plugin to give an identifier to your AMD modules when writing your own optimizer.

## Install
[Use npm](https://docs.npmjs.com/cli/install).

```
$ npm install --save-dev gulp-amd-idfy
```

## Usage
```
var gulp = require('gulp');
var idfy = require('gulp-amd-idfy');
 
gulp.task('default', function () {
	return gulp.src('mymodule.js')
		.pipe(idfy())
		.pipe(gulp.dest('dist'));
});
```

**Notes:**

* The plugin does not add an identifier if there is already one.
* The `define()` must be at the root of the javascript file, it cannot be enclosed in another function but it can be preceded by other functions, call, comments or directives such as `'use strict'`. 


## License

MIT © [Philippe FERDINAND](https://github.com/pferdinand)