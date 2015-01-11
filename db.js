var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var HJX = new Schema({
  user_id: String,
  type: String,
  question: String,
  content: String,
  contTime: String,
  contTable: String,
  editTimes: String,
  updated_at : Date
});

mongoose.model( 'HJX', HJX);
mongoose.connect( 'mongodb://localhost/hjx' );
