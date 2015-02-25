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
  updated_at: Date
});

var Settings = new Schema({
  numParticipants: Number,
  numStimuli: Number,
  duration: Number,
  timeset: Number,
  updated_at: Date
});

var Allocation = new Schema({
  participantId: Number,
  testset: [Number],
  updated_at: Date
});

mongoose.model( 'HJX', HJX);
mongoose.model( 'Settings', Settings);
mongoose.model( 'Allocation', Allocation);

mongoose.connect( 'mongodb://localhost/hjx' );
