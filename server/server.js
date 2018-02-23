const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('../routes');
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('./passport');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require ('dotenv').config();

//connect to the db - Danny -
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/CodeNector');
const db = mongoose.connection;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// Middleware
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: process.env.SALT || 'NOJABAWONGA',
		store: new MongoStore({ mongooseConnection: db }),
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session()); 

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});


app.use('/auth', require('./auth'));

app.use((err,req,res,next) => {
	console.log('error');
	console.error(err.stack);
	res.status(500);
});

app.use(routes);


//Socket.io
io.on('connection', socket => {
	console.log(socket.id, 'a user connected');


	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.join('room', data => {
		let rooms = Object.keys(socket.rooms);
		console.log(rooms);
		io.to('room', ' a new user has joined the room');
	});

	socket.on('leave room', data => {
		socket.leave(data.room);
	});

	socket.on('coding event', data => {
		socket.broadcast.emit('receive code', data);
	});

	socket.on('code execution', function(data) {
		socket.broadcast.emit('receive result', data);
	});

});

// Start server
server.listen(PORT, function() {
	console.log(`🌎 ==> Server now on port ${PORT}!`);
});

