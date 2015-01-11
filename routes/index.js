var utils    = require( '../utils' );
var mongoose = require( 'mongoose' );
var HJX = mongoose.model( 'HJX' );

var cur = utils.formatDate();
var ran1 = ('10' + cur + '0000') - 0;
var ran2 = ('20' + cur + '0000') - 0;

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
  HJX.find({type:'1'}).sort( '-updated_at' ).exec( function ( err, list ){
    if( err ) return next( err );
    res.render( 'list', {
      title : 'Test Result',
      list : list
    });
  });
};

exports.list2 = function ( req, res, next ){
  HJX.find({type:'2'}).sort( '-user_id' ).exec( function ( err, list ){
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
  HJX.find({user_id: req.body.user_id, question: req.body.question, type: req.body.type}, function (err, sqy) {
    if (sqy.length > 0) { // update
      sqy = sqy[0];
      sqy.content = req.body.content;
    } else {
      sqy = new HJX({
        user_id: req.body.user_id,
        type: req.body.type,
        question: req.body.question,
        content: req.body.content,
        contTime: '',
        contTable: '',
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

function toMi(se) {
  if (se >= 60) {
    var m = Math.floor(se / 60);
    var s = se % 60;
    if (s<10) {
      s = '0' + s;
    }
    return m + ':' + s;
  } else {
    if (se < 10) {
      se = '0' + se;
    }
    return '0:' + se;
  }
}
exports.save2 = function (req, res, next) {
  HJX.find({user_id: req.body.user_id, question: req.body.question, type: req.body.type}, function (err, sqy) {

    var contTime = (req.body.contTime || '').split(',');
    var contTable = [];
    var editTimes = contTime.length;

    contTime.forEach(function (time) {
      contTable.push('open@'+toMi(time));
    });

    if (sqy.length > 0) { // update
      sqy = sqy[0];
      sqy.content = req.body.content;
      sqy.contTime = contTime;
      sqy.contTable = contTable.join(',');
      sqy.editTimes = editTimes;
    } else {
      sqy = new HJX({
        user_id: req.body.user_id,
        type: req.body.type,
        question: req.body.question,
        content: req.body.content,
        contTime: contTime,
        contTable: contTable.join(','),
        editTimes: editTimes,
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