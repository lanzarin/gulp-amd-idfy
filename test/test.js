'use strict';

var fs = require('fs');
var idfy = require('../index.js');
var File = require('vinyl');
var assert = require('assert');

describe('gulp-amd-idfy', function() {
  describe('plugin', function () {
    var file, stream;
    it('should add the module name', function () {
      
      file = new File({
        path: 'test/fixtures/no-dependancy.js',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: new Buffer(fs.readFileSync('test/fixtures/no-dependancy.js', 'utf8'))
      });
      
      stream = idfy();
      stream.on('data', function(file) {
        assert.equal(file.contents.toString(), fs.readFileSync('test/expected/no-dependancy.js', 'utf8'));
      });
      stream.write(file);
      stream.end();
      
      file = new File({
        path: 'test/fixtures/with-dependancy.js',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: new Buffer(fs.readFileSync('test/fixtures/with-dependancy.js', 'utf8'))
      });
      
      stream = idfy();
      stream.on('data', function(file) {
        assert.equal(file.contents.toString(), fs.readFileSync('test/expected/with-dependancy.js', 'utf8'));
      });
      stream.write(file);
      stream.end();
      
      
    });
    it('should not modify the file', function () {
      file = new File({
        path: 'test/fixtures/no-module.js',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: new Buffer(fs.readFileSync('test/fixtures/no-module.js', 'utf8'))
      });
      
      stream = idfy();
      stream.on('data', function(file) {
        assert.equal(file.contents.toString(), fs.readFileSync('test/fixtures/no-module.js', 'utf8'));
      });
      stream.write(file);
      stream.end();
    });
  });
});