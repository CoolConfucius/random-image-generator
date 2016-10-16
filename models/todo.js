'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var getImage = require('./ngri.js');

var Todo; 


var todoSchema = mongoose.Schema({
  description: { type: String}, 
  date: { type: Date, default: Date.now() },
  long: { type: String, default: moment().format('MM/DD/YYYY, h:mm a') }, 
  short: { type: String, default: moment().format('MM/DD/YYYY') }, 
  iscomplete: { type: Boolean, default: false }, 
  due: { type: Date },
  duelong: { type: String }, 
  dueshort: { type: String },
  imagestring: {type: String }
});

todoSchema.statics.add = function (todo, cb) {
  console.log("carete todo", todo);
  var duelong = ''; 
  var dueshort = ''; 
  if (todo.due) {
    duelong = moment(todo.due).format('MM/DD/YYYY, h:mm a');
    dueshort = moment(todo.due).format('MM/DD/YYYY');
  };
  Todo.create({
    description: todo.description,
    due: todo.due,
    duelong: duelong,
    dueshort: dueshort
  }, cb);
};


todoSchema.statics.gri = function (todo, cb) {
  console.log("gri todo", todo);
  var imagestring = 
  getImage().then( (b64image) => console.log('b64image \n', b64image) )
  .catch( (err) => console.err(err) );



  // var duelong = ''; 
  // var dueshort = ''; 
  // if (todo.due) {
  //   duelong = moment(todo.due).format('MM/DD/YYYY, h:mm a');
  //   dueshort = moment(todo.due).format('MM/DD/YYYY');
  // };
  Todo.create({
    imagestring: imagestring    
  }, cb);
};


Todo = mongoose.model('Todo', todoSchema); 

module.exports = Todo; 