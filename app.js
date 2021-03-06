var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const Account = require("./models/account");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const Session = require("./models/session");

// Load routes
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const permit = require("./routes/permit");
const track = require("./routes/track");
const fishCatch = require("./routes/catch");
const vessel = require("./routes/vessel");
const username = require("./routes/username");
const fish = require("./routes/fish");
const search = require("./routes/search");

const config = require("./config");

var app = express();

// use q for mongoose promise
var mongoose = require("mongoose");
mongoose.Promise = require('q').Promise;
mongoose.connect(config.dbpath);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

config.passport = passport;

// Passport middleware
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    Account.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Account.findById(id, function(err, user) {
    done(err, user);
  });
});

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, PATCH")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type"); 
    next();
});

app.use('/auth', auth); 

// token auth for api call
app.use(function(req, res, next) {
    Session.findOne({token: req.query.token})
    .then(function (doc) {
        if (!doc) {
            return res.status("401").json({});
        }
        next();
    })
    .catch(function (err) {
        res.status("500").json({error: err.toString()});
    })
});

app.use('/profile', profile);
app.use('/permit', permit);
app.use('/track', track);
app.use('/catch', fishCatch);
app.use('/vessel', vessel);
app.use('/username', username);
app.use('/fish', fish);
app.use('/search', search);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({err: "not_found"});
});

// error handlers
/*
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

module.exports = app;
