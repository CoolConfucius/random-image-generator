'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var getImage = require('./ngri.js');

var Todo; 


var todoSchema = mongoose.Schema({
  date: { type: Date, default: Date.now() },
  long: { type: String, default: moment().format('MM/DD/YYYY, h:mm a') }, 
  short: { type: String, default: moment().format('MM/DD/YYYY') }, 
  imagestring: {type: String }, 
  imagesubstring: {type: String}
});

todoSchema.statics.add = function (todo, cb) {
  console.log("gri todo", todo);
  var imagestring = 'default string';
  var imagesubstring = 'default string';
  getImage().then( 
    (b64image) => {
     console.log('b64image \n', b64image) 
     imagestring = b64image;
     imagesubstring = imagestring.length > 50 ? imagestring.substring(imagestring.length - 50, imagestring.length - 1) : imagestring;
      Todo.create({
        imagestring: imagestring, 
        imagesubstring: imagesubstring 
      }, cb);
    }
  ).catch( (err) => console.err(err) );

};


Todo = mongoose.model('Todo', todoSchema); 

module.exports = Todo; 