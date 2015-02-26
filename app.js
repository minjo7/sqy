// mongoose setup
require( './db' );

var express        = require( 'express' );
var http           = require( 'http' );
var path           = require( 'path' );
var engine         = require( 'ejs-locals' );
var favicon        = require( 'serve-favicon' );
var cookieParser   = require( 'cookie-parser' );
var bodyParser     = require( 'body-parser' );
var methodOverride = require( 'method-override' );
var logger         = require( 'morgan' );
var errorHandler   = require( 'errorhandler' );
var static         = require( 'serve-static' );

var app    = express();
var routes = require( './routes' );

// all environments
app.set( 'port', process.env.PORT || 3001 );
app.engine( 'ejs', engine );
app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'view engine', 'ejs' );
app.use( favicon( __dirname + '/public/favicon.ico' ));
app.use( logger( 'dev' ));
app.use( methodOverride());
app.use( cookieParser());
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended : true }));

// Routes
app.get('/', routes.index);
app.get('/welcome', routes.index);
app.get('/thanks/:pid', routes.thanks);
app.get('/tom/list', routes.list1);
app.get('/jerry/list', routes.list2);
app.get('/test', routes.test);
app.get('/settings', routes.settings);
app.get('/next/:pid/:step', routes.next);
app.post('/update', routes.update);
app.post('/save', routes.save);
app.post('/save2', routes.save2);
app.use(static( path.join( __dirname, 'public' )));

// development only
if( 'development' == app.get( 'env' )){
  app.use( errorHandler());
}

http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});