var mongoose = require( 'mongoose' );
var Settings = mongoose.model( 'Settings' );
var Allocation = mongoose.model( 'Allocation' );

module.exports = {
  update_settings: function ( req, res, next ) {
    var PRESET = [[1,2,3,4],[4,1,2,3],[3,4,1,2],[2,3,4,1],[1,3,2,4],[1,4,2,3]];
    Allocation.remove().exec();
    for (i = 1; i <= req.body.numParticipants; i++) {
      if (0 == (i-1) % PRESET.length)
        seed = Math.floor(Math.random() * PRESET.length);
      else
        seed = (seed + 1) % PRESET.length;
      var allocation = new Allocation({
        participantId: i,
        testset: PRESET[seed],
        updated_at: Date.now()
      })
      allocation.save( function ( err ){
        if (err) res.send( '{success: false}' );
      });
    }
    var settings = new Settings({
      numParticipants: req.body.numParticipants,
      numStimuli: parseInt(req.body.numStimuli),
      duration: parseInt(req.body.duration),
      timeset: parseInt(req.body.timeset),
      updated_at : Date.now()
    });
    settings.save( function ( err ){
      if(!err){
        res.writeHead(302, {'Location': '/settings'});
        res.end();
      } else res.send( '{success: false}' );
    });
  }
};