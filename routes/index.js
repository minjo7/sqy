var utils    = require( '../utils' );
var mongoose = require( 'mongoose' );
var SQY     = mongoose.model( 'SQY' );

exports.index = function ( req, res, next ){
    res.render( 'index');
};
exports.thanks = function ( req, res, next ){
  res.render( 'thanks');
};
exports.list = function ( req, res, next ){
  SQY.find().sort( '-updated_at' ).exec( function ( err, list ){
      if( err ) return next( err );
      res.render( 'list', {
        title : 'Express Todo Example',
        list : list
      });
    });
};

exports.test1 = function (req, res, next) {
  res.render( 'test1', {
    user_id: utils.uid(10),
    type: '1'
  } );
};

exports.test2 = function (req, res, next) {
  res.render( 'test2', {
    user_id: utils.uid(10),
    type: '2'
  } );
};

exports.save = function (req, res, next) {
  SQY.find({user_id: req.body.user_id, question: req.body.question, type: req.body.type}, function (err, sqy) {
    if (sqy.length > 0) { // update
      sqy = sqy[0];
      sqy.content = req.body.content;
      sqy.contTime = req.body.contTime;
      sqy.editTimes = req.body.editTimes;
      sqy.updated_at = Date.now();
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
