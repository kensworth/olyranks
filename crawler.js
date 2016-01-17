var Crawler = require("crawler");
var url = require('url');

// Babel ES6/JSX Compiler
require('babel-register');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig  = require('swig');
var xml2js = require('xml2js');
var _ = require('underscore');
var util = require('util');
var cheerio = require('cheerio');

var config = require('./config');
var routes = require('./app/routes');
var Athlete = require('./models/athlete');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/characters', function(req, res, next) {
  var gender = req.body.gender;
  var number = req.body.name;
  var athleteIdLookupUrl = 'http://www.iwrp.net/?view=contestant&id_zawodnik=' + number;
  //var athleteIdLookupUrl = 'http://olystats.com/individual_profile.php?AID=' + number;


  request.get(athleteIdLookupUrl, function(err, request, html) {
    if (err) return next(err);
    
    var $ = cheerio.load(html);
    var name = $('.nazwa_pogrubiona').text();
    var gender = 

    console.log(name);

    /*
    var nationality =
    var federation = 
    var club = 
    var birthdate = 
    var age = */

    /*var athlete = new Athlete({
      name: name,
      gender: gender,
      nationality: nationality,
      federation: federation,
      club: club,
      birthdate: birthdate,
      age: age,
      random: [Math.random(), 0]
    });

    athlete.save(function(err) {
      if (err) return next(err);
      res.send({ message: name + ' has been added successfully!' });
    });*/

  });     
});

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
        var page = swig.renderFile('views/index.html', { html: html });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.use(function(err, req, res, next) {
  console.log(err.stack.red);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

/*
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        

        if(result) {
            var page = result.body;
            //polish for bold name. cool.
            console.log($('.nazwa_pogrubiona').text());
        }
    }
});

var search = function(search) {
  return 'http://www.iwrp.net/?view=contestant&id_zawodnik=' + search;
};

//34000 is around the current number of weightlifters in the database. Hardcoded to bypass hacky DOM method to check whether the end of the database has been reached (currently triggers MySQL error at too high a number)
for(i = 1; i < 34000; i++) {
    c.queue({
        uri: search(i)
    });
}*/
