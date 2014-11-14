var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var SQY = new Schema({
  user_id: String,
  type: String,
  question: String,
  content: String,
  contTime: String,
  editTimes: String,
  updated_at : Date
});

mongoose.model( 'SQY', SQY );
mongoose.connect( 'mongodb://localhost/sqy' );
