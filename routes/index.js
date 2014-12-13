var utils    = require( '../utils' );
var mongoose = require( 'mongoose' );
var SQY      = mongoose.model( 'SQY' );

var cur = utils.formatDate();
var ran1 = ('10' + cur + '0000') * 1;
var ran2 = ('20' + cur + '0000') * 1;

exports.index1 = function ( req, res, next ){
  res.render( 'index1' );
};

exports.index2 = function ( req, res, next ) {
  res.render( 'index2' );
};

exports.thanks = function ( req, res, next ){
  res.render( 'thanks',  {num: req.params.num});
};

exports.list1 = function ( req, res, next ){
  SQY.find({type:'1'}).sort( '-updated_at' ).exec( function ( err, list ){
    if( err ) return next( err );
    res.render( 'list', {
      title : 'Test Result',
      list : list
    });
  });
};

exports.list2 = function ( req, res, next ){
  SQY.find({type:'2'}).sort( '-user_id' ).exec( function ( err, list ){
    if( err ) return next( err );
    res.render( 'list', {
      title : 'Test Result',
      list : list
    });
  });
};

exports.test1 = function (req, res, next) {
  ran1 += 1;
  res.render( 'test1', {
    user_id: ran1,
    type: '1'
  } );
};

exports.test2 = function (req, res, next) {
  ran2 += 2;
  res.render( 'test2', {
    user_id: ran2,
    type: '2'
  });
};

exports.save1 = function (req, res, next) {
  SQY.find({user_id: req.body.user_id, question: req.body.question, type: req.body.type}, function (err, sqy) {
    if (sqy.length > 0) { // update
      sqy = sqy[0];
      sqy.content = req.body.content;
    } else {
      sqy = new SQY({
        user_id: req.body.user_id,
        type: req.body.type,
        question: req.body.question,
        content: req.body.content,
        contTime: '',
        editTimes: '',
        updated_at : Date.now()
      });
    }
    sqy.save( function ( err ){
      if(!err){
        res.send('{success:true}');
      }else{
        res.send('{success:false}');
      }
    });
  });
};

exports.save2 = function (req, res, next) {
  SQY.find({user_id: req.body.user_id, question: req.body.question, type: req.body.type}, function (err, sqy) {
    if (sqy.length > 0) { // update
      sqy = sqy[0];
      sqy.content = req.body.content;
      sqy.contTime = req.body.contTime;
      sqy.editTimes = req.body.editTimes;
    } else {
      sqy = new SQY({
        user_id: req.body.user_id,
        type: req.body.type,
        question: req.body.question,
        content: req.body.content,
        contTime: req.body.contTime,
        editTimes: req.body.editTimes,
        updated_at : Date.now()
      });
    }
    sqy.save( function ( err ){
      if(!err){
        res.send('{success:true}');
      }else{
        res.send('{success:false}');
      }
    });
  });
};