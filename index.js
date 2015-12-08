var path = require('path');
var babel = require('babel-core');
var through = require('through2');
var PluginError = require('gulp-util').PluginError;

// consts
var PLUGIN_NAME = 'gulp-amd-idfy';

console.log(PLUGIN_NAME + ' started');

module.exports = function() {
    
  function findDefine(body) {
    for (var i = 0; i < body.length; i++) {
      if (body[i].type === 'ExpressionStatement'
         && body[i].expression._paths[0].node.type === 'Identifier'
         && body[i].expression._paths[0].node.name === 'define') {
        return body[i];
      }      
    }
    return null;
  }
  
  return through.obj(function(file, encoding, callback) {
      if (file.isNull()) {
        // nothing to do
        return callback(null, file);
      }

      if (file.isStream()) {
        // file.contents is a Stream - https://nodejs.org/api/stream.html
        this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
      } else if (file.isBuffer()) {
        // file.contents is a Buffer - https://nodejs.org/api/buffer.html
        var result = babel.transform(file.contents.toString());
        
        // Search for the define() call at the root of the AST.
        var defineNode = findDefine(result.ast.program.body);
        if (defineNode && defineNode.expression.arguments.length) {
          // If the first argument of define is a string literal that means the module already 
          // has a name.
          if (defineNode.expression.arguments[0].type !== 'StringLiteral') {
            defineNode.expression.arguments.splice(0, 0, {
              "type": "StringLiteral",
              "value": path.relative(file.base, file.path).match(/(.*)\.[^.]+$/, '')[1]
            });
            file.contents = new Buffer(babel.transformFromAst(result.ast).code);
          }
        }
        
        return callback(null, file);
      }
  });
};