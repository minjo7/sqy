var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var HJX = new Schema({
  pid: Number,
  type: Number,
  step: Number,
  question: Number,
  stimulus: Number,
  answer1: String,
  answer2: String,
  updated_at: Date
});

var Settings = new Schema({
  numParticipants: Number,
  numStimuli: Number,
  duration: Number,
  timeset: Number,
  timeshift: Number,
  updated_at: Date
});

var Allocation = new Schema({
  pid: Number,
  type: Number,
  testset: [Number],
  updated_at: Date
});

mongoose.model( 'HJX', HJX);
mongoose.model( 'Settings', Settings);
mongoose.model( 'Allocation', Allocation);

mongoose.connect( 'mongodb://localhost/hjx' );
