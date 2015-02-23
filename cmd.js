var mongoose = require( 'mongoose' );
var Settings = mongoose.model( 'Settings' );

module.exports = {
  update_settings: function ( req, res, next ) {
    var settings = new Settings({
      numParticipants: req.body.numParticipants,
      numStimuli: parseInt(req.body.numStimuli),
      timeset: parseInt(req.body.timeset),
      updated_at : Date.now()
    });
    settings.save( function ( err ){
      if(!err){
        res.writeHead(302, {
          'Location': '/settings'
        })
        res.end();
      }else{
        res.send( '{success: false}' );
      }
    });
  }
};