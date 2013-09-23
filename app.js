var express = require('express'),
    nunjucks = require('nunjucks'),
    path = require('path');

var app = express(),
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname, 'views' )), {
      autoescape: true
    });

nunjucksEnv.express( app );

app.use(express.static(path.join(__dirname, "public")));
app.use( "/bower", express.static( path.join(__dirname, 'bower_components' )));
app.get( "/", function( req, res ) {
  res.render( "index.html" );
});

app.listen(8000, function() {
  console.log("Server listening ( http://localhost:8000");
});
