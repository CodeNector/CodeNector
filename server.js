const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

// - Danny added this for passport. 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');

//connect to the db - Danny -
mongoose.connect('mongodb://localhost/CodeNector');
const db = mongoose.connection;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// Body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport middle ware --
app.use(cookieParser());

// Passport init
app.use(passport.initialize());
app.use(passport.session());

//this is for important for login stuff
app.use(require('express-session')({
	secret: "secret String here - be sure to make this hidden when we go live",
	resave: false,
	saveUninitialized: false
}));
 
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
	  var namespace = param.split('.')
	  , root = namespace.shift()
	  , formParam = root;
  
	  while(namespace.length) {
		formParam += '[' + namespace.shift() + ']';
	  }
	  return {
		param: formParam,
		msg: msg,
		value: value
	  };
	}
}));

app.use(flash());
app.use(function (req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

// End -- Passport middle ware --
app.use(routes);



io.on('connection', socket => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('room', data => socket.join(data.room));

	socket.on('leave room', data => {
		socket.leave(data.room);
	});

	socket.on('coding event', data => {
		socket.broadcast.to(data.room).emit('receive code', data);
	});

});


server.listen(PORT, function() {
	console.log(`🌎 ==> Server now on port ${PORT}!`);
});

